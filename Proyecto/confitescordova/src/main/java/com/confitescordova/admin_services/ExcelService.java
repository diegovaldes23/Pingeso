package com.confitescordova.admin_services;

import com.alibaba.excel.EasyExcel;
import com.alibaba.excel.context.AnalysisContext;
import com.alibaba.excel.event.AnalysisEventListener;
import com.alibaba.excel.read.listener.ReadListener;
import com.confitescordova.admin_entities.OrderProduct;
import com.confitescordova.admin_entities.Orders;
import com.confitescordova.admin_repositories.OrdersRepository;
import com.confitescordova.services.OrderSyncService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.InputStream;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Set;

@Service
public class ExcelService {

    @Autowired
    private OrdersRepository ordersRepository;

    @Autowired
    private OrderSyncService orderSyncService;

    public void saveOrdersFromExcel(MultipartFile file) {
        try (InputStream is = file.getInputStream()) {
            List<Orders> ordersList = new ArrayList<>();

            EasyExcel.read(is, new ReadListener<Map<Integer, String>>() {
                @Override
                public void invoke(Map<Integer, String> data, AnalysisContext context) {
                    int rowIndex = context.readRowHolder().getRowIndex();
                    System.out.println("Procesando fila: " + rowIndex);

                    try {
                        // Obtener valores crudos de las columnas
                        String name = data.get(0);
                        String phone = data.get(1);
                        String products = data.get(2);
                        String initialPaymentStr = data.get(3);
                        String topay = data.get(4);
                        String order_date = data.get(5);
                        String delivery_date = data.get(6);
                        String dispatch = data.get(7);
                        String address = data.get(8);
                        String commune = data.get(9);
                        String subtotalStr = data.get(10);
                        String shipping_cost = data.get(11);
                        String totalStr = data.get(12);
                        String purchase_source = data.get(13);
                        String customer_type = data.get(14);
                        String email = data.get(15);

                        // Validaciones y conversiones
                        Double initialPayment = parseDoubleOrDefault(initialPaymentStr, 0.0);
                        LocalDate orderDate = parseDateOrDefault(order_date, null);
                        LocalDate deliveryDate = parseDateOrDefault(delivery_date, null);
                        Double shippingCost = parseDoubleOrDefault(shipping_cost, 0.0);
                        Double subtotal = parseDoubleOrDefault(subtotalStr, 0.0);
                        Double total = parseDoubleOrDefault(totalStr, 0.0);

                        // Crear una entidad de orden
                        Orders order = new Orders();
                        order.setName(capitalizeEachWord(name));

                        order.setPhone(orderSyncService.formatPhoneNumber(phone));
                        order.setOrder_date(orderDate);
                        order.setDelivery_date(deliveryDate);
                        order.setAddress(capitalizeFirstLetter(address));
                        order.setCommune(RegionComunaMapper.formatComuna(commune));
                        order.setRegion(RegionComunaMapper.getRegionByComuna(commune));
                        order.setShipping_cost(parseDoubleIgnoringCommasAndDollarSign(shipping_cost, 0.0));
                        order.setSubtotal(parseDoubleIgnoringCommasAndDollarSign(subtotalStr, 0.0));
                        order.setTotal(parseDoubleIgnoringCommasAndDollarSign(totalStr, 0.0));
                        order.setInitial_payment(parseDoubleIgnoringCommasAndDollarSign(initialPaymentStr, order.getTotal()));
                        order.setPurchase_source(capitalizeFirstLetter(purchase_source));
                        order.setCustomer_type(capitalizeFirstLetter(customer_type));

                        if(order.getInitial_payment().equals(order.getTotal())){
                            order.setStatus("Completada");
                        } else if (order.getInitial_payment() < order.getTotal() && order.getInitial_payment() > 0) {
                            order.setStatus("En proceso");
                        } else {
                            order.setStatus("Pendiente");
                        }
                        order.setEmail(email);
                        order.setCreation_date(LocalDate.now());

                        // Asignar productos
                        List<OrderProduct> productsList = parseProducts(products, order);
                        order.setOrderProducts(productsList);

                        // Agregar a la lista para guardar después
                        ordersList.add(order);

                        System.out.println("Fila procesada correctamente: " + order);
                    } catch (Exception e) {
                        System.err.println("Error procesando fila " + rowIndex + ": " + e.getMessage());
                    }
                }

                @Override
                public void doAfterAllAnalysed(AnalysisContext context) {
                    System.out.println("Lectura completada.");
                }
            }).sheet().doRead();

            // Guardar todas las órdenes procesadas en la base de datos
            ordersRepository.saveAll(ordersList);
            System.out.println("Órdenes guardadas exitosamente.");
        } catch (Exception e) {
            throw new RuntimeException("Error al procesar el archivo Excel: " + e.getMessage(), e);
        }
    }

    /**
     * Convierte una cadena a Double. Si no es válida, devuelve un valor predeterminado.
     */
    private Double parseDoubleOrDefault(String value, Double defaultValue) {
        if (value == null || value.trim().isEmpty()) {
            return defaultValue;
        }

        try {
            // Maneja casos específicos
            if (value.equalsIgnoreCase("pagado 100%")) {
                return 0.0; // Saldo a pagar es cero
            }
            if (value.equals("-")) {
                return defaultValue; // Maneja valores con "-"
            }
            // Limpia caracteres no numéricos
            value = value.replaceAll("[^\\d.,-]", "").replace(",", ".");
            return Double.parseDouble(value);
        } catch (NumberFormatException e) {
            System.err.println("Error al convertir a Double: " + value);
            return defaultValue;
        }
    }


    /**
     * Convierte una cadena a LocalDate. Si no es válida, devuelve un valor predeterminado.
     */
    private LocalDate parseDateOrDefault(String value, LocalDate defaultValue) {
        try {
            // Normaliza la fecha al formato correcto
            String normalizedDate = normalizeDate(value);
            // Convierte usando el formato especificado
            return LocalDate.parse(normalizedDate, DateTimeFormatter.ofPattern("yyyy/MM/dd"));
        } catch (Exception e) {
            System.err.println("Error al convertir a LocalDate: " + value);
            return defaultValue != null ? defaultValue : LocalDate.now(); // Usa `LocalDate.now()` o algún valor fijo
        }
    }

    /**
     * Parsea productos de una cadena cruda.
     */
    public List<OrderProduct> parseProducts(String rawProducts, Orders order) {
        List<OrderProduct> products = new ArrayList<>();

        if (rawProducts == null || rawProducts.trim().isEmpty()) {
            return products;
        }

        OrderProduct product = new OrderProduct();
        product.setOrder(order);
        product.setName(rawProducts.trim());
        product.setQuantity(1); // Cantidad predeterminada
        product.setUnit_cost(0.0); // Precio unitario predeterminado
        product.setCost(0.0); // Costo total predeterminado
        products.add(product);

        return products;
    }

    private String normalizeDate(String dateStr) {
        if (dateStr == null || dateStr.trim().isEmpty()) {
            return null;
        }

        // Divide la fecha en partes
        String[] parts = dateStr.split("/");
        if (parts.length != 3) {
            throw new IllegalArgumentException("Formato de fecha inválido: " + dateStr);
        }

        // Normaliza cada parte (año, mes, día)
        String year = parts[0].trim();
        String month = parts[1].trim().length() == 1 ? "0" + parts[1].trim() : parts[1].trim();
        String day = parts[2].trim().length() == 1 ? "0" + parts[2].trim() : parts[2].trim();

        return year + "/" + month + "/" + day;
    }

    private String capitalizeFirstLetter(String input) {
        if (input == null || input.trim().isEmpty()) {
            return input; // Retorna el valor original si es nulo o vacío
        }
        input = input.trim(); // Elimina espacios en blanco al principio y al final
        return input.substring(0, 1).toUpperCase() + input.substring(1).toLowerCase();
    }

    private Double parseDoubleIgnoringCommasAndDollarSign(String value, Double defaultValue) {
        if (value == null || value.trim().isEmpty()) {
            return defaultValue;
        }

        try {
            // Elimina el signo de dólar, las comas y los espacios
            String sanitizedValue = value.replace("$", "").replace(",", "").trim();
            return Double.parseDouble(sanitizedValue);
        } catch (NumberFormatException e) {
            System.err.println("Error al convertir: '" + value + "' a número. Usando valor predeterminado.");
            return defaultValue;
        }
    }

    private String capitalizeEachWord(String input) {
        if (input == null || input.trim().isEmpty()) {
            return input; // Retorna el valor original si es nulo o vacío
        }

        String[] words = input.trim().toLowerCase().split("\\s+");
        StringBuilder capitalized = new StringBuilder();

        for (String word : words) {
            if (!word.isEmpty()) {
                capitalized.append(Character.toUpperCase(word.charAt(0))).append(word.substring(1)).append(" ");
            }
        }

        return capitalized.toString().trim();
    }



}

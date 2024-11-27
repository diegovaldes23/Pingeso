CREATE TABLE IF NOT EXISTS products (
    id_product SERIAL PRIMARY KEY, -- Llave primaria con auto-incremento
    name VARCHAR(255) NOT NULL, -- Nombre del producto
    description TEXT, -- Descripción del producto
    cost NUMERIC(10, 2) NOT NULL -- Costo con dos decimales
);

INSERT INTO products (name, description, cost)
VALUES 
('Helado de Chocolate', 'Sabor Chocolate', 6000),
('Tarta de Manzana', 'Es de Manzana', 7000),
('Brownie de Nueces', 'Hecho de Nueces', 5000),
('Galletas de Chocolate', 'Sabor Chocolate', 4500);

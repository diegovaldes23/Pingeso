import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
    const [showModal, setShowModal] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [form_role, setform_Role] = useState("MODERATOR");
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const [userData, setUserData] = useState(null);
    useEffect(() => {
        const username = localStorage.getItem("username");
        const authToken = localStorage.getItem("authToken");
    
        if (!username || !authToken) {
          setErrorMessage("Error de autenticación.");
          return;
        }
    
        const fetchUserData = async () => {
          try {
            const response = await fetch(`http://localhost:8080/admin/user/${username}`, {
              headers: {
                Authorization: `Bearer ${authToken}`,
              },
            });
    
            if (!response.ok) {
              throw new Error("Error al obtener los datos del usuario.");
            }
    
            const data = await response.json();
            setUserData(data);
            setActiveTab(data.role === "ADMIN" ? "users_system" : "my_orders");
          } catch (error) {
            setErrorMessage("Error al cargar los datos del perfil.");
          }
        };
    
        fetchUserData();
      }, []);
    const navigate = useNavigate();

    useEffect(() => {
        const username = localStorage.getItem("username");
        const authToken = localStorage.getItem("authToken");
    
        if (!username || !authToken) {
          setErrorMessage("Error de autenticación.");
          return;
        }
    
        const fetchUserData = async () => {
          try {
            const response = await fetch(`http://localhost:8080/admin/user/${username}`, {
              headers: {
                Authorization: `Bearer ${authToken}`,
              },
            });
    
            if (!response.ok) {
              throw new Error("Error al obtener los datos del usuario.");
            }
    
            const data = await response.json();
            setUserData(data);
            setActiveTab(data.role === "ADMIN" ? "users_system" : "my_orders");
          } catch (error) {
            setErrorMessage("Error al cargar los datos del perfil.");
          }
        };
    
        fetchUserData();
      }, []);

    // Para obtener el color del cuadrado según rol
    const getRoleColor = (role) => {
        switch (role) {
            case "ADMIN":
                return "bg-[#FF6384]"; // Color rosado para ADMIN 
            case "ANALYST":
                return "bg-[#FF9D3C]"; // Color naranja para ANALISTA 
            case "MODERATOR":
                return "bg-[#8E55FF]"; // Color morado para MODERATOR
            default:
                return "bg-gray-500"; // Color gris por defecto para otros roles
        }
    }

    // Para obtener el color de texto según el rol
    const getRoleTextColor = (role) => {
        switch (role) {
            case "ADMIN":
                return "text-[#FF6384]"; // Color rosado para ADMIN
            case "ANALYST":
                return "text-[#FF9D3C]"; // Color naranja para ANALISTA
            case "MODERATOR":
                return "text-[#8E55FF]"; // Color morado para MODERATOR
            default:
                return "text-gray-500"; // Color gris por defecto para otros roles
        }
    }

    // Función para traducir el rol
    const translateRole = (role) => {
        switch (role) {
            case "ADMIN":
                return "Administrador";
            case "MODERATOR":
                return "Moderador";
            case "ANALYST":
                return "Analista";
            default:
                return role;
        }
    };

    ///////////////////////////////////////////////////////////// getRoleTextColor
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        date.setMinutes(date.getMinutes() + date.getTimezoneOffset());
        return date.toLocaleDateString('es-CL', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
        });
      };



    // Cambiar estado inicial según el rol
    const [activeTab, setActiveTab] = useState(() => {
        if (userData.role === "ADMIN") {
            return "users_system";
        } else if (userData.role === "MODERATOR") {
            return "my_orders";
        } else {
            return "confites";
        }
    });

    // Obtener el color dinámico para el texto del título
    const titleTextColor = getRoleTextColor(userData.role);

    const users = [
        {
            "id": 1,
            "username": "valenpy7787",
            "password": null,
            "firstname": "Valentina",
            "lastname": "Campos",
            "email": "valentina.camposusach.cl",
            "role": "MODERATOR",
            "authorities": [
                {
                    "authority": "MODERATOR"
                }
            ],
            "enabled": true,
            "accountNonExpired": true,
            "credentialsNonExpired": true,
            "accountNonLocked": true
        },
        {
            "id": 2,
            "username": "valenpy7987",
            "password": null,
            "firstname": "Valentina",
            "lastname": "Campos",
            "email": "valentina.camposusach.cl",
            "role": "MODERATOR",
            "authorities": [
                {
                    "authority": "MODERATOR"
                }
            ],
            "enabled": true,
            "accountNonExpired": true,
            "credentialsNonExpired": true,
            "accountNonLocked": true
        }
    ]

    const orders = [
        {
            "id": 1,
            "name": "Ana Luisa Lavado",
            "phone": "+56987566160",
            "region": "Metropolitana de Santiago",
            "commune": "Quilicura",
            "order_date": "2024-12-11",
            "customer_type": "Antiguo",
            "purchase_source": "Tiendanube",
            "shipping_cost": 5000.0,
            "subtotal": 29000.0,
            "total": 34000.0,
            "initial_payment": 0.0,
            "status": "Pendiente",
            "delivery_date": null,
            "description": "Entrega lunes 16 de diciembre",
            "address": "villaPalacios  568, ",
            "orderProducts": [
                {
                    "id": 1,
                    "id_product": 2127671664,
                    "name": "Caja de 70 Macarons.",
                    "quantity": 1,
                    "description": "No disponible",
                    "unit_cost": 34000.0,
                    "cost": 34000.0
                },
                {
                    "id": 1,
                    "id_product": 2127671664,
                    "name": "Caja de 90 Macarons.",
                    "quantity": 1,
                    "description": "No disponible",
                    "unit_cost": 34000.0,
                    "cost": 34000.0
                }
            ],
            "email": "allavado@hotmail.com",
            "creation_date": "24-12-2024",
            "externalOrderId": 1611325096
        },
        {
            "id": 2,
            "name": "Maria Luisa YAÑEZ ARRIAGADA",
            "phone": "+56953344741",
            "region": "La Araucanía",
            "commune": "Temuco",
            "order_date": "2024-12-11",
            "customer_type": "Antiguo",
            "purchase_source": "Tiendanube",
            "shipping_cost": 4000.0,
            "subtotal": 34000.0,
            "total": 38000.0,
            "initial_payment": 0.0,
            "status": "Pendiente",
            "delivery_date": null,
            "description": "De preferencia Virtnes 13",
            "address": "Holandesa   910, 602",
            "orderProducts": [
                {
                    "id": 2,
                    "id_product": 2127707716,
                    "name": "Caja de 70 Macarons.",
                    "quantity": 1,
                    "description": "No disponible",
                    "unit_cost": 34000.0,
                    "cost": 34000.0
                }
            ],
            "email": "mluisayaneza@gmail.com",
            "creation_date": "24-12-2024",
            "externalOrderId": 1611338063
        }
    ]

    const handleOpenModal = () => {
        setShowModal(true);
        setUsername("");
        setPassword("");
        setFirstname("");
        setLastname("");
        setEmail("");
        setform_Role("MODERATOR");
        setErrorMessage("");
        setSuccessMessage("");
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setErrorMessage("");
        setSuccessMessage("");
    };

    // Para conectar backend con el modal de registro
    const handleRegisterUser = async () => {
        // Validación de los campos obligatorios
        if (!username || !password || !firstname || !lastname || !form_role) {
            setErrorMessage("Por favor, complete todos los campos obligatorios.");
            setSuccessMessage("");
            return;
        }
        const newUser = {
            username,
            password,
            firstname,
            lastname,
            email,
            role: form_role,
        };
        try {
            const response = await fetch("http://localhost:8080/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newUser),
            });

            if (response.ok) {
                setSuccessMessage("Registro de usuario con éxito");
                setErrorMessage("");
                
                // Cierra el modal después de 3 segundos (3000ms)
                setTimeout(() => {
                    setShowModal(false);
                }, 3000);
            } else {
                setErrorMessage("Error en registro de usuario");
                setSuccessMessage("");
            }
        } catch (error) {
            setErrorMessage("Error en registro de usuario");
            setSuccessMessage("");
        }
    };

    // Modal de registro
    const renderModal = () => (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50">
            <div className="bg-white p-6 rounded-lg w-96">
                <h2 className="text-2xl text-[#FF6384] font-bold mb-4">Registrar Usuario</h2>
                <div className="mb-4">
                    <label className="block text-sm font-semibold mb-1">Username - Nombre de usuario</label>
                    <input
                        type="text"
                        className="w-full p-2 border border-gray-300 rounded"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-semibold mb-1">Contraseña</label>
                    <input
                        type="password"
                        className="w-full p-2 border border-gray-300 rounded"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-semibold mb-1">Nombre</label>
                    <input
                        type="text"
                        className="w-full p-2 border border-gray-300 rounded"
                        value={firstname}
                        onChange={(e) => setFirstname(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-semibold mb-1">Apellido</label>
                    <input
                        type="text"
                        className="w-full p-2 border border-gray-300 rounded"
                        value={lastname}
                        onChange={(e) => setLastname(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-semibold mb-1">Correo (Opcional)</label>
                    <input
                        type="email"
                        className="w-full p-2 border border-gray-300 rounded"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-semibold mb-1">Rol</label>
                    <select
                        className="w-full p-2 border border-gray-300 rounded"
                        value={form_role}
                        onChange={(e) => setform_Role(e.target.value)}
                    >
                        <option value="MODERATOR">Moderador</option>
                        <option value="ANALYST">Analista</option>
                    </select>
                </div>
                {/* Mostrar las notas dependiendo del rol */}
                {form_role === "MODERATOR" && (
                    <p><strong className="text-[#8E55FF]">Moderador:</strong> puede ver estadísticas, pedidos y agregar pedidos</p>
                )}
                {form_role === "ANALYST" && (
                    <p><strong className="text-[#FF9D3C]">Analista:</strong> puede ver estadísticas y pedidos, pero no agregar pedidos</p>
                )}
                {errorMessage && <p className="text-red-500">{errorMessage}</p>}
                {successMessage && <p className="text-green-500">{successMessage}</p>}

                <div className="mt-4 flex justify-between">
                    <button
                        className="px-4 py-2 bg-[#FFABBD] rounded hover:bg-[#FF6384] hover:text-white"
                        onClick={handleCloseModal}
                    >
                        Cerrar
                    </button>
                    <button
                        className="px-4 py-2 bg-[#FF4B72] text-white rounded hover:bg-[#FF6384] hover:text-white"
                        onClick={handleRegisterUser}
                    >
                        Registrar
                    </button>
                </div>
            </div>
        </div>
    );



    // Para mostrar dos paneles: el de usuarios en el sistema y el de mis pedidos

    const renderContent = () => {
        switch (activeTab) {
            case 'users_system':
                return (
                    <div className="p-6 min-h-[48vh] h-auto">
                        <div>
                            <h2 className="text-2xl font-bold mb-6">Usuarios del Sistema:</h2>

                            <div className="flex flex-row items-center  space-x-2">
                                <h2 className="text-xl font-bold mb-6">Cantidad de usuarios administrativos en el sistema:</h2>
                                <h2 className="text-xl mb-6">{users.length}</h2>
                            </div>

                            {users.length > 0 ? (
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b">
                                        <th className="py-2 px-4 text-center">ID</th>
                                        <th className="py-2 px-4 text-center">Nombre de usuario</th>
                                        <th className="py-2 px-4 text-center">Nombres</th>
                                        <th className="py-2 px-4 text-center">Correo</th>
                                        <th className="py-2 px-4 text-center">Rol</th>
                                        <th className="py-2 px-4 text-center">Acción</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users.map((user) => (
                                        <tr key={user.id} className="border-b">
                                            <td className="py-2 px-4 text-center">{user.id}</td>
                                            <td className="py-2 px-4 text-center">{user.username}</td>
                                            <td className="py-2 px-4 text-center">{user.name} {user.firstname}</td>
                                            <td className="py-2 px-4 text-center">{user.email}</td>
                                            <td className="py-2 px-4 text-center">{translateRole(userData.role)}</td>
                                            <td className="py-2 px-4 text-center">borrar</td>
                                        </tr>
                                    ))}
                                </tbody>

                            </table>
                            ):(
                                <p>No hay usuarios en este sistema</p>
                            )}

                            <button
                                className="mt-4 px-4 py-2 bg-[#FFABBD] hover:text-white rounded hover:bg-[#FF6384]"
                                onClick={handleOpenModal}
                            >
                                Insertar Usuario
                            </button>

            {showModal && renderModal()}
                        </div>                  
                </div>
                );

                case 'my_orders':
                    return (
                        <div className="p-6 min-h-[48vh] h-auto">
                        <h2 className="text-2xl font-bold mb-6">Mis Pedidos:</h2>

                            <div className=" flex flex-row items-center  space-x-2">
                                <h2 className="text-xl font-bold mb-6">Pedidos agregados por mi (en este sistema):</h2>
                                <h2 className="text-xl mb-6">{orders.length}</h2>
                            </div>
                            {orders.length > 0 ? (
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b">
                                        <th className="py-2 px-4 text-center">ID</th>
                                        <th className="py-2 px-4 text-center">Cliente</th>
                                        <th className="py-2 px-4 text-center">Teléfono</th>
                                        <th className="py-2 px-4 text-center">Comuna</th>
                                        <th className="py-2 px-4 text-center">Dirección</th>
                                        <th className="py-2 px-4 text-center">Fecha pedido</th>
                                        <th className="py-2 px-4 text-center">Productos</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {orders.map((order) => (
                                        <tr key={order.id} className="border-b">
                                            <td className="py-2 px-4 text-center">{order.id}</td>
                                            <td className="py-2 px-4 text-center">{order.name}</td>
                                            <td className="py-2 px-4 text-center">{order.phone}</td>
                                            <td className="py-2 px-4 text-center">{order.commune}</td>
                                            <td className="py-2 px-4 text-center">{order.address}</td>
                                            <td className="py-2 px-4 text-center">{order.order_date ? formatDate(order.order_date) : 'Fecha no disponible'}</td>
                                            <td className="py-1 px-2 h-full truncate max-w-12">{order.orderProducts.map((product) => product.name).join(', ')}</td>
                                        </tr>
                                    ))}
                                </tbody>

                            </table>
                            ):(
                                <p>No hay ordenes agregadas por ti en este sistema</p>
                            )}
                        </div>
                    );
                    case 'confites':
                        return (
                            <div className="p-6 min-h-[48vh] h-auto">
                                <h2 className="text-2xl font-bold mb-6">Contactos y enlace a Confites Cordova:</h2>
                    
                                <div className="space-y-2 border-t-2 border-dashed pt-4">
                                    <div className="flex space-x-2">
                                        <h3 className="text-xl font-bold mb-6">Correo:</h3>
                                        <h3 className="text-xl mb-6">ventas@cordovaconfites.cl</h3>
                                    </div>
                                    <div className="flex space-x-2">
                                        <h3 className="text-xl font-bold mb-6">Contacto:</h3>
                                        <h3 className="text-xl mb-6">+56 9 3006 7653</h3>
                                    </div>
                                    <div className="flex space-x-2">
                                        <h3 className="text-xl font-bold mb-6">Ubicación:</h3>
                                        <h3 className="text-xl mb-6">Calle el Cambucho s/n parcela 69 lote 3 casa 2, Pudahuel Norte Sector Noviciado</h3>
                                    </div>
                                </div>
                    
                                <div className="space-y-2 border-t-2 border-dashed pt-4">
                                    <div className="flex space-x-2">
                                        <h3 className="text-xl font-bold mb-6">Confites Cordova (Tienda Nube):</h3>
                                        <a 
                                            href="https://www.cordovaconfites.cl/" 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            className={`text-xl mb-6 underline ${titleTextColor} hover:${titleTextColor}`}
                                        >
                                            Enlace a Tienda Nube
                                        </a>
                                    </div>
                    
                                    <div className="flex space-x-2">
                                        <h3 className="text-xl font-bold mb-6">Instagram de Confites Cordova:</h3>
                                        <a 
                                            href="https://www.instagram.com/amor_macaron/" 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            className={`text-xl mb-6 underline ${titleTextColor} hover:${titleTextColor}`}
                                        >
                                            Enlace a Instagram
                                        </a>
                                    </div>
                    
                                    <div className="flex space-x-2">
                                        <h3 className="text-xl font-bold mb-6">Pinterest de Confites Cordova:</h3>
                                        <a 
                                            href="https://cl.pinterest.com/confitescordova/" 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            className={`text-xl mb-6 underline ${titleTextColor} hover:${titleTextColor}`}
                                        >
                                            Enlace a Pinterest
                                        </a>
                                    </div>
                                </div>
                    
                                {/* Borde punteado al final */}
                                <div className="border-b-2 border-dashed mt-6"></div>
                            </div>
                        );
            default: 
                return null;
    
        }
      }

      

    return(
        <div className="orders-container">    
            <div className="mt-10 mb-10 flex flex-row items-center  space-x-4">
                {/* Cuadrado con color según el rol */}
                <div className={`${getRoleColor(userData.role)} w-20 h-20 rounded-full flex items-center justify-center`}>
                    <span className="text-white text-xs font-bold">{userData.role}</span>
                </div> 
                <h1 className={`text-4xl font-extrabold ${titleTextColor}`}>Perfil Administrativo:</h1>
                <h1 className="text-4xl font-bold text-gray-800">#{userData.id} {userData.username}</h1> 
            </div>

            <h2 className="text-2xl font-bold mb-6">Detalles del perfil: (ID: {userData.id})</h2>
            <div className="grid grid-cols-4 gap-4 mb-12">
                <div className="bg-gray-50 p-4 rounded-lg flex flex-col items-center">
                    <p className="text-sm text-gray-600">Nombre de Usuario</p>
                    <p className="text-2xl font-bold"> {userData.username}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg flex flex-col items-center">
                    <p className="text-sm text-gray-600">Nombre</p>
                    <p className="text-2xl font-bold">{userData.firstName} {userData.secondName}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg flex flex-col items-center">
                    <p className="text-sm text-gray-600">Rol</p>
                    <p className="text-2xl font-bold">{translateRole(userData.role)}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg flex flex-col items-center">
                    <p className="text-sm text-gray-600">Correo</p>
                    <p className="text-2xl font-bold">{userData.email}</p>
                </div>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
                <div className="flex space-x-4 mb-6">
                    {userData.role === "ADMIN" && (
                        <button 
                            className={`px-4 py-2 rounded ${activeTab === 'users_system' ? ` ${getRoleColor(userData.role)} text-white` : `${getRoleColor(userData.role)} bg-opacity-20`}`}
                            onClick={() => setActiveTab('users_system')}
                        >
                            Usuarios del Sistema
                        </button> // errorRegisterMessage setErrorRegisterMessage
                    )}
                    {["ADMIN", "MODERATOR"].includes(userData.role) && (
                        <button
                            className={`px-4 py-2 rounded ${activeTab === "my_orders" ? `${getRoleColor(userData.role)} text-white` : `${getRoleColor(userData.role)} bg-opacity-20`}`}
                            onClick={() => setActiveTab("my_orders")}
                        >
                            Pedidos agregados por mi
                        </button>
                    )}
                    <button
                        className={`px-4 py-2 rounded ${activeTab === "confites" ? `${getRoleColor(userData.role)} text-white` : `${getRoleColor(userData.role)} bg-opacity-20`}`}
                        onClick={() => setActiveTab("confites")}
                    >
                        Contactos Confites Cordova
                    </button>
                </div>
                {renderContent()}               
            </div>
        </div>
    );
};

export default Profile;

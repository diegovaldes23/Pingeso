import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../utils/GlobalModelContext";

const Profile = () => {
    const [userData, setUserData] = useState(null); // Inicialmente null
    const [activeTab, setActiveTab] = useState("loading"); // Estado inicial "loading"
    const [errorMessage, setErrorMessage] = useState("");

    const [showModal, setShowModal] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [form_role, setform_Role] = useState("MODERATOR");
    const [errorRegisterMessage, setErrorRegisterMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const navigate = useNavigate();

    const [showChangePasswordModal, setShowChangePasswordModal] = useState(false); // Estado para modal de cambio de contraseña
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [errorChangePasswordMessage, setErrorChangePasswordMessage] = useState("");
    const [successChangePasswordMessage, setSuccessChangePasswordMessage] = useState("");

    const [showEditProfileModal, setShowEditProfileModal] = useState(false); // Estado para modal de editar perfil
    const [successEditProfileMessage, setSuccessEditProfileMessage] = useState("");
    const [errorEditProfileMessage, setErrorEditProfileMessage] = useState("");

    const [orders, setOrders] = useState([]); // Estado dinámico para las órdenes
    const [errorOrdersMessage, setErrorOrdersMessage] = useState(""); // Mensaje de error específico para órdenes
    const [users, setUsers] = useState([]); // Estado para usuarios del sistema
    const [errorUsersMessage, setErrorUsersMessage] = useState(""); // Mensaje de error específico para usuarios
    const { backend } = useGlobalContext();

    const handleDeleteUser = async (userId) => {
      const authToken = localStorage.getItem("authToken");
    
      if (!authToken) {
        alert("Error de autenticación. Por favor, inicia sesión nuevamente.");
        return;
      }
    
      const confirmDelete = window.confirm(
        `¿Estás seguro de que deseas eliminar al usuario con ID ${userId}?`
      );
    
      if (!confirmDelete) return;
    
      try {
        const response = await fetch(`${backend}/admin/user/${userId}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });
    
        if (!response.ok) {
          throw new Error("Error al eliminar el usuario.");
        }
    
        alert("Usuario eliminado exitosamente.");
        setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
      } catch (error) {
        alert("No se pudo eliminar el usuario. Por favor, inténtalo nuevamente.");
      }
    };

    const getRoleColor = (role) => {
      switch (role) {
        case "ADMIN":
          return "bg-[#36A2EB]";
        case "ANALYST":
          return "bg-[#FF9D3C]";
        case "MODERATOR":
          return "bg-[#8E55FF]";
        default:
          return "bg-gray-500";
      }
    };
  
    const getRoleTextColor = (role) => {
      switch (role) {
        case "ADMIN":
          return "text-[#36A2EB]";
        case "ANALYST":
          return "text-[#FF9D3C]";
        case "MODERATOR":
          return "text-[#8E55FF]";
        default:
          return "text-gray-500";
      }
    };
  useEffect(() => {
    const username = localStorage.getItem("username");
    const authToken = localStorage.getItem("authToken");

    if (!username || !authToken) {
      setErrorMessage("Error de autenticación.");
      return;
    }

    const fetchUserData = async () => {
      try {
        const response = await fetch(`${backend}/admin/user/${username}`, {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });

        if (!response.ok) {
          throw new Error("Error al obtener los datos del usuario.");
        }

        const data = await response.json();
        setUserData(data);

        // Cambiar estado inicial del tab según el rol
        if (data.role === "ADMIN") {
          setActiveTab("users_system");
        } else if (data.role === "MODERATOR") {
          setActiveTab("my_orders");
        } else {
          setActiveTab("confites");
        }
      } catch (error) {
        setErrorMessage("Error al cargar los datos del perfil.");
      }
    };

    const fetchUsers = async () => {
        try {
          const response = await fetch(`${backend}/admin/user`, {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          });
  
          if (!response.ok) {
            throw new Error("Error al obtener los usuarios del sistema.");
          }
  
          const data = await response.json();
          setUsers(data);
        } catch (error) {
          setErrorUsersMessage("No se pudieron cargar los usuarios del sistema.");
        }
      };

    const fetchUserOrders = async () => {
        try {
          const response = await fetch(`${backend}/admin/orders/byCreator/${username}`, {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          });
  
          if (!response.ok) {
            throw new Error("Error al obtener las órdenes.");
          }
  
          const data2 = await response.json();
          setOrders(data2);
        } catch (error) {
          setErrorOrdersMessage("No se pudieron cargar las órdenes.");
        }
      };

    fetchUserData();
    fetchUsers();
    fetchUserOrders();
    
  }, []);

  // Modal de editar perfil
  const handleOpenEditProfileModal = () => {
    setShowEditProfileModal(true);
    setErrorEditProfileMessage("");
    setSuccessEditProfileMessage("");
  };

  const handleCloseEditProfileModal = () => {
    setShowEditProfileModal(false);
    setErrorEditProfileMessage("");
    setSuccessEditProfileMessage("");
    setFirstname("");
    setLastname("");
    setEmail("");
  };

  const handleEditProfile = async () => {
    const username = localStorage.getItem("username");
    const authToken = localStorage.getItem("authToken");

    if (!firstname || !lastname || !email) {
      setErrorEditProfileMessage("Por favor, complete todos los campos.");
      return;
    }

    const payload = {
      username,
      firstname,
      lastname,
      email,
    };

    try {
      const response = await fetch(`${backend}/admin/user/profile`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        setSuccessEditProfileMessage("Perfil actualizado con éxito.");
        setErrorEditProfileMessage("");

        // Actualizar la información del usuario local
        const updatedUserData = { ...userData, firstname, lastname, email };
        setUserData(updatedUserData);

        // Cierra el modal después de 2 segundos
        setTimeout(() => {
          setShowEditProfileModal(false);
        }, 700);
      } else {
        setErrorEditProfileMessage("Error al actualizar el perfil.");
      }
    } catch (error) {
      setErrorEditProfileMessage("Error al actualizar el perfil.");
    }
  };

  const renderEditProfileModal = () => (
    <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg w-96">
        <h2 className={`text-2xl mb-4 font-bold  ${getRoleTextColor(userData.role)}`} >Editar perfil</h2>
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
          <label className="block text-sm font-semibold mb-1">Correo electrónico</label>
          <input
            type="email"
            className="w-full p-2 border border-gray-300 rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="space-y-3">
          <p><strong className={`${getRoleTextColor(userData.role)}`}>Nota:</strong> El nombre de usuario (username) es el único parámetro que no se puede cambiar.</p>
          <p><strong className={`${getRoleTextColor(userData.role)}`}>Contraseña:</strong> Si desea cambiar la contraseña cierre este modal y presione el botón de <strong>Cambiar contraseña</strong></p>
        </div>
        

        {errorEditProfileMessage && <p className="text-red-500">{errorEditProfileMessage}</p>}
        {successEditProfileMessage && <p className="text-green-500">{successEditProfileMessage}</p>}
        <div className="mt-4 flex justify-between">
          <button
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
            onClick={handleCloseEditProfileModal}
          >
            Cerrar
          </button>
          <button
            className={`px-4 py-2 text-white rounded ${getRoleColor(userData.role)} hover:text-black`} 
            onClick={handleEditProfile}
          >
            Guardar cambios
          </button>

          
        </div>
      </div>
    </div>
  );

  const handleOpenChangePasswordModal = () => {
    setShowChangePasswordModal(true);
    setOldPassword("");
    setNewPassword("");
    setErrorChangePasswordMessage("");
    setSuccessChangePasswordMessage("");
  };

  const handleCloseChangePasswordModal = () => {
    setShowChangePasswordModal(false);
    setErrorChangePasswordMessage("");
    setSuccessChangePasswordMessage("");
  };

  const handleChangePassword = async () => {
    const username = localStorage.getItem("username");
    const authToken = localStorage.getItem("authToken");

    if (!oldPassword || !newPassword) {
      setErrorChangePasswordMessage("Por favor, complete todos los campos.");
      return;
    }

    const payload = {
      username,
      oldPassword,
      newPassword,
    };

    try {
      const response = await fetch(`${backend}/admin/user/change_password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        setSuccessChangePasswordMessage("Contraseña cambiada con éxito.");
        setErrorChangePasswordMessage("");

        // Cierra el modal después de 2 segundos
        setTimeout(() => {
          setShowChangePasswordModal(false);
        }, 700);
      } else {
        setErrorChangePasswordMessage("Error al cambiar la contraseña.");
      }
    } catch (error) {
      setErrorChangePasswordMessage("Error al cambiar la contraseña.");
    }
  };

  const renderChangePasswordModal = () => (
    <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg w-96">
        <h2 className={`text-2xl mb-4 font-bold  ${getRoleTextColor(userData.role)}`} >Cambiar contraseña</h2>
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-1">Contraseña actual</label>
          <input
            type="password"
            className="w-full p-2 border border-gray-300 rounded"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-1">Nueva contraseña</label>
          <input
            type="password"
            className="w-full p-2 border border-gray-300 rounded"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </div>
        {errorChangePasswordMessage && <p className="text-red-500">{errorChangePasswordMessage}</p>}
        {successChangePasswordMessage && <p className="text-green-500">{successChangePasswordMessage}</p>}
        <div className="mt-4 flex justify-between">
          <button
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
            onClick={handleCloseChangePasswordModal}
          >
            Cerrar
          </button>
          <button
            className={`px-4 py-2 text-white rounded ${getRoleColor(userData.role)} hover:text-black`} 
            onClick={handleChangePassword}
          >
            Cambiar contraseña
          </button>
        </div>
      </div>
    </div>
  );

  

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

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    date.setMinutes(date.getMinutes() + date.getTimezoneOffset());
    return date.toLocaleDateString('es-CL', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };


  // Para el modal de registro:
    const handleOpenModal = () => {
        setShowModal(true);
        setUsername("");
        setPassword("");
        setFirstname("");
        setLastname("");
        setEmail("");
        setform_Role("MODERATOR");
        setErrorRegisterMessage("");
        setSuccessMessage("");
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setErrorRegisterMessage("");
        setSuccessMessage("");
    };

    // Para conectar backend con el modal de registro
    const handleRegisterUser = async () => {
        // Validación de los campos obligatorios
        if (!username || !password || !firstname || !lastname || !form_role) {
            setErrorRegisterMessage("Por favor, complete todos los campos obligatorios.");
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
            const response = await fetch(`${backend}/auth/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newUser),
            });

            if (response.ok) {
                setSuccessMessage("Registro de usuario con éxito");
                setErrorRegisterMessage("");
                
                // Cierra el modal y refresca la página después de 0,7 segundos (700 ms)
                setTimeout(() => {
                    setShowModal(false);
                    // navigate("/profile"); // Redirigir al inicio de sesión
                    // window.location.reload(); 
                }, 700);
            } else {
                setErrorRegisterMessage("Error en registro de usuario");
                setSuccessMessage("");
            }
        } catch (error) {
            setErrorRegisterMessage("Error en registro de usuario");
            setSuccessMessage("");
        }
    };

    // Modal de registro
    const renderModal = () => (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50">
            <div className="bg-white p-6 rounded-lg w-96">
                <h2 className="text-2xl text-[#36A2EB] font-bold mb-4">Registrar usuario</h2>
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
                {setErrorRegisterMessage && <p className="text-red-500">{errorRegisterMessage}</p>}
                {successMessage && <p className="text-green-500">{successMessage}</p>}

                <div className="mt-4 flex justify-between">
                    <button
                        className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                        onClick={handleCloseModal}
                    >
                        Cerrar
                    </button>
                    <button
      
                        className={`px-4 py-2 text-white rounded ${getRoleColor(userData.role)} hover:text-black`} 
                        
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
                            <h2 className="text-2xl font-bold mb-6">Usuarios del sistema:</h2>

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
                                    {users.map((user) => {
                                        const isCurrentUser = user.username === localStorage.getItem("username");; // Verificar si el usuario es el mismo que el del localStorage
                                        return (
                                            <tr 
                                                key={user.id} 
                                                className={`border-b ${isCurrentUser ? 'font-bold' : ''}`} // Si es el mismo usuario, poner la fila en negrita
                                            >
                                            <td className="py-2 px-4 text-center">{user.id}</td>
                                            <td className="py-2 px-4 text-center">{user.username}</td>
                                            <td className="py-2 px-4 text-center">{user.name} {user.firstname}</td>
                                            <td className="py-2 px-4 text-center">{user.email ? user.email : "No ingresado"}</td>
                                            <td className="py-2 px-4 text-center">{translateRole(user.role)}</td>
                                            <td className="py-2 px-4 text-center">
                                            {isCurrentUser ? (
                                              "Yo (mi usuario)"
                                            ) : user.role !== "ADMIN" ? (
                                              <button
                                                onClick={() => handleDeleteUser(user.id)}
                                                className= {` px-2 py-1 ${getRoleColor(userData.role)}  text-white rounded hover:text-black`}
                                              >
                                                Eliminar
                                              </button>
                                            ) : null}
                                          </td>
                                        </tr>
                                       );
                                  })}
                                </tbody>

                            </table>
                            ):(
                                <p>No hay usuarios en este sistema</p>
                            )}

                            <button
                                className="mt-4 px-4 py-2 bg-[#36A2EB] text-white hover:text-black rounded hover:bg-[#36A2EB]"
                                onClick={handleOpenModal}
                            >
                                Insertar usuario
                            </button>

            {showModal && renderModal()}
                        </div>                  
                </div>
                );

                case 'my_orders':
                    return (
                        <div className="p-6 min-h-[48vh] h-auto">
                        <h2 className="text-2xl font-bold mb-6">Mis pedidos:</h2>

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
                                        <td className="py-2 px-4 text-center">{order.order_date}</td>
                                        <td className="py-2 px-4 text-center">
                                            {order.orderProducts.map((product) => product.name).join(", ") || "Ninguno"}
                                        </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            ):(
                                <div>
                                <p>No hay ordenes agregadas por ti en este sistema</p>
                                </div>
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
                                            className={`text-xl mb-6 underline ${getRoleTextColor(userData.role)} hover:${getRoleTextColor(userData.role)}`}
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
                                            className={`text-xl mb-6 underline ${getRoleTextColor(userData.role)} hover:${getRoleTextColor(userData.role)}`}
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
                                            className={`text-xl mb-6 underline ${getRoleTextColor(userData.role)} hover:${getRoleTextColor(userData.role)}`}
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

    

  if (errorMessage) {
    return <div className="flex items-center justify-center min-h-screen text-red-500">{errorMessage}</div>;
  }

  if (!userData || activeTab === "loading") {
    return <div className="flex items-center justify-center min-h-screen">Cargando...</div>;
  }

  return (
    <div className="orders-container">
      <div className="mt-10 mb-10 flex flex-row items-center space-x-4">
        <div className={`${getRoleColor(userData.role)} w-20 h-20 rounded-full flex items-center justify-center`}>
          <span className="text-white text-xs font-bold">{userData.role}</span>
        </div>
        <h1 className={`text-4xl font-extrabold ${getRoleTextColor(userData.role)}`}>Perfil administrativo:</h1>
        <h1 className="text-4xl font-bold text-gray-800">
          #{userData.id} {userData.username}
        </h1>
      </div>
      <h2 className="text-2xl font-bold py-2">Detalles del perfil:</h2>

      <div className="grid grid-cols-4 gap-4 mb-12">
        <div className="bg-gray-50 p-4 rounded-lg flex flex-col items-center">
          <p className="text-sm text-gray-600">Nombre de usuario</p>
          <p className="text-2xl font-bold">{userData.username}</p>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg flex flex-col items-center">
          <p className="text-sm text-gray-600">Nombre</p>
          <p className="text-2xl font-bold">{userData.firstname} {userData.lastname}</p>
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

      <div className="flex flex-row items-center justify-center space-x-20">
        <button
            className={`w-80 px-4 py-2 rounded ${getRoleColor(userData?.role)} text-white hover:text-black`}
            onClick={handleOpenChangePasswordModal}
          >
            Cambiar contraseña
        </button>

        <button
          className={`w-80 px-4 py-2 rounded ${getRoleColor(userData?.role)} text-white hover:text-black`}
          onClick={handleOpenEditProfileModal}
        >
          Editar perfil
        </button>
      </div>

      {showChangePasswordModal && renderChangePasswordModal()}
      {showEditProfileModal && renderEditProfileModal()}

      <div className="bg-white rounded-lg shadow p-6">
      <div className="flex space-x-4 mb-6">
            {userData.role === "ADMIN" && (
                <button 
                    className={`px-4 py-2 rounded ${activeTab === 'users_system' ? ` ${getRoleColor(userData.role)} text-white` : `${getRoleColor(userData.role)} bg-opacity-20`}`}
                    onClick={() => setActiveTab('users_system')}
                >
                    Usuarios del sistema
                </button>
            )}
            {["ADMIN", "MODERATOR"].includes(userData.role) && (
                <button
                    className={`px-4 py-2 rounded ${activeTab === "my_orders" ? `${getRoleColor(userData.role)} text-white` : `${getRoleColor(userData.role)} bg-opacity-20`}`}
                    onClick={() => setActiveTab("my_orders")}
                >
                    Pedidos agregados por mí
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

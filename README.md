<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dinamarca App</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <style>
        body {
            font-family: 'Inter', sans-serif;
            background-color: #d1fae5; /* Verde claro para el fondo general */
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            padding: 20px;
            box-sizing: border-box;
            overflow-x: hidden; /* Evita el scroll horizontal */
        }
        .app-container {
            background-color: #ffffff; /* Blanco para el contenedor principal de la app */
            border-radius: 1rem;
            box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
            width: 100%;
            max-width: 1400px; /* Ancho máximo para la aplicación */
            display: flex;
            flex-direction: column;
            overflow: hidden;
        }
        @media (min-width: 768px) {
            .app-container {
                flex-direction: row;
            }
        }

        /* Estilos específicos para la sección de Login */
        .login-section {
            background-color: #ffffff; /* Blanco para el contenedor del login */
            border-radius: 1.5rem;
            box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
            width: 100%;
            max-width: 450px;
            padding: 2.5rem;
            text-align: center;
        }
        .input-field {
            width: 100%;
            padding: 0.75rem 1rem;
            margin-bottom: 1.5rem;
            border: 1px solid #e5e7eb;
            border-radius: 0.5rem;
            outline: none;
            transition: border-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
            background-color: #f9fafb; /* Fondo ligeramente gris para inputs */
        }
        .input-field:focus {
            border-color: #34d399;
            box-shadow: 0 0 0 3px rgba(52, 211, 153, 0.4);
        }
        .btn-primary {
            width: 100%;
            padding: 0.8rem 1.5rem;
            background-color: #10b981;
            color: white;
            font-weight: 600;
            border-radius: 0.75rem;
            transition: background-color 0.2s ease-in-out, transform 0.2s ease-in-out;
            cursor: pointer;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
        }
        .btn-primary:hover {
            background-color: #059669;
            transform: translateY(-2px);
        }
        .btn-secondary {
            background-color: transparent;
            color: #10b981;
            border: 2px solid #10b981;
            padding: 0.8rem 1.5rem;
            font-weight: 600;
            border-radius: 0.75rem;
            transition: background-color 0.2s ease-in-out, color 0.2s ease-in-out;
            cursor: pointer;
            display: inline-block;
            margin-top: 1.5rem;
        }
        .btn-secondary:hover {
            background-color: #10b981;
            color: white;
        }

        /* Estilos para placeholders de imagen */
        .product-image-placeholder {
            width: 100%;
            padding-bottom: 100%; /* Mantiene una relación de aspecto cuadrada */
            background-color: #e5e7eb; /* Gris claro para el placeholder */
            border-radius: 0.75rem;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #6b7280;
            font-size: 1.25rem;
            font-weight: 500;
        }
    </style>
</head>
<body>
    <!-- Sección de Login - Visible al inicio -->
    <div id="login-screen" class="login-section">
        <h1 class="text-4xl font-extrabold text-green-700 mb-8 tracking-wide">Dinamarca</h1>
        <h2 class="text-3xl font-bold text-gray-800 mb-6">LOGIN</h2>

        <form onsubmit="event.preventDefault(); loginApp();">
            <div class="mb-4">
                <label for="username" class="sr-only">Usuario</label>
                <input type="text" id="username" placeholder="Usuario" class="input-field" required>
            </div>
            <div class="mb-6">
                <label for="password" class="sr-only">Contraseña</label>
                <input type="password" id="password" placeholder="Contraseña" class="input-field" required>
            </div>
            <button type="submit" class="btn-primary">
                Iniciar Sesión
            </button>
        </form>

        <button type="button" class="btn-secondary" onclick="loginApp()">
            Crear cuenta
        </button>
    </div>

    <!-- Contenedor principal de la aplicación - Oculto al inicio -->
    <div id="main-app-screen" class="app-container hidden">
        <!-- Barra de navegación lateral -->
        <div class="w-full md:w-1/4 bg-green-500 text-white p-6 rounded-l-xl md:rounded-l-none md:rounded-tl-xl md:rounded-bl-xl flex flex-col justify-between">
            <div>
                <h2 class="text-3xl font-bold mb-8 text-center">Dinamarca</h2>
                <nav>
                    <ul>
                        <li class="mb-4">
                            <a href="#" class="block p-3 rounded-lg hover:bg-green-600 transition duration-200 ease-in-out" onclick="showContent('locales')">Locales</a>
                        </li>
                        <li class="mb-4">
                            <a href="#" class="block p-3 rounded-lg hover:bg-green-600 transition duration-200 ease-in-out" onclick="showContent('catalogo')">Catálogo</a>
                        </li>
                        <li class="mb-4">
                            <a href="#" class="block p-3 rounded-lg hover:bg-green-600 transition duration-200 ease-in-out" onclick="showContent('stock')">Stock</a>
                        </li>
                        <li class="mb-4">
                            <a href="#" class="block p-3 rounded-lg hover:bg-green-600 transition duration-200 ease-in-out" onclick="showContent('envios')">Envíos</a>
                        </li>
                        <li class="mb-4">
                            <a href="#" class="block p-3 rounded-lg hover:bg-green-600 transition duration-200 ease-in-out" onclick="showContent('ventas')">Ver ventas</a>
                        </li>
                        <li class="mb-4">
                            <a href="#" class="block p-3 rounded-lg hover:bg-green-600 transition duration-200 ease-in-out" onclick="showContent('vendedores')">Ver vendedores</a>
                        </li>
                        <li class="mb-4">
                            <a href="#" class="block p-3 rounded-lg hover:bg-green-600 transition duration-200 ease-in-out" onclick="showContent('clientes')">Ver clientes</a>
                        </li>
                        <li class="mb-4">
                            <a href="#" class="block p-3 rounded-lg hover:bg-green-600 transition duration-200 ease-in-out" onclick="showContent('proveedores')">Ver proveedores</a>
                        </li>
                        <li class="mb-4">
                            <a href="#" class="block p-3 rounded-lg hover:bg-green-600 transition duration-200 ease-in-out" onclick="showContent('pedido')">Hacer pedido</a>
                        </li>
                    </ul>
                </nav>
            </div>
            <!-- Icono de perfil de usuario en la barra lateral -->
            <div class="mt-8 text-center">
                <i class="fas fa-user-circle text-6xl text-green-200 hover:text-green-300 transition duration-200 ease-in-out cursor-pointer"></i>
            </div>
        </div>

        <!-- Contenido principal dinámico -->
        <div class="w-full md:w-3/4 p-8 bg-white rounded-r-xl md:rounded-r-none md:rounded-tr-xl md:rounded-br-xl">

            <!-- Sección de Locales -->
            <div id="content-locales" class="content-section">
                <h3 class="text-2xl font-semibold mb-6 text-gray-800">Gestión de Locales</h3>

                <!-- Tarjeta de Local #H01 -->
                <div class="bg-gray-50 p-6 mb-6 rounded-lg shadow-sm border border-gray-200">
                    <div class="flex justify-between items-center mb-4">
                        <h4 class="text-xl font-medium text-gray-700">Local #H01</h4>
                        <span class="text-green-600 font-semibold text-sm">Completado</span>
                    </div>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-600">
                        <div>
                            <p class="mb-2"><strong class="font-semibold">Dirección:</strong> <span class="text-gray-500">Calle Ficticia 123, Ciudad</span></p>
                            <p><strong class="font-semibold">Vendedores:</strong> <span class="text-gray-500">Juan Pérez, Ana Gómez</span></p>
                        </div>
                        <div>
                            <p class="mb-2"><strong class="font-semibold">Horarios:</strong> <span class="text-gray-500">Lun-Vie 9:00-14:00, 15:00-20:00</span></p>
                        </div>
                    </div>
                    <div class="flex justify-end mt-4 space-x-3">
                        <button class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
                            Modificar
                        </button>
                        <button class="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50">
                            Eliminar
                        </button>
                    </div>
                </div>

                <!-- Tarjeta de Local #H02 (Similar al H01) -->
                <div class="bg-gray-50 p-6 mb-6 rounded-lg shadow-sm border border-gray-200">
                    <div class="flex justify-between items-center mb-4">
                        <h4 class="text-xl font-medium text-gray-700">Local #H02</h4>
                        <span class="text-orange-600 font-semibold text-sm">Pendiente</span>
                    </div>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-600">
                        <div>
                            <p class="mb-2"><strong class="font-semibold">Dirección:</strong> <span class="text-gray-500">Avenida Inventada 456, Pueblo</span></p>
                            <p><strong class="font-semibold">Vendedores:</strong> <span class="text-gray-500">Carlos Ruiz</span></p>
                        </div>
                        <div>
                            <p class="mb-2"><strong class="font-semibold">Horarios:</strong> <span class="text-gray-500">Sáb 10:00-18:00</span></p>
                        </div>
                    </div>
                    <div class="flex justify-end mt-4 space-x-3">
                        <button class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
                            Modificar
                        </button>
                        <button class="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50">
                            Eliminar
                        </button>
                    </div>
                </div>

                <!-- Botón para añadir local -->
                <div class="text-center mt-8">
                    <button class="px-6 py-3 bg-green-500 text-white font-semibold rounded-full shadow-lg hover:bg-green-600 transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50">
                        <i class="fas fa-plus mr-2"></i> Agregar local
                    </button>
                </div>
            </div>

            <!-- Sección de Envíos -->
            <div id="content-envios" class="content-section hidden">
                <!-- Barra de navegación superior con Venta Stock y Perfil (dentro de esta sección) -->
                <div class="flex justify-between items-center mb-6 pb-4 border-b border-gray-200">
                    <div class="flex space-x-6">
                        <a href="#" class="text-lg font-medium text-gray-700 hover:text-green-600 transition duration-200">Ventas</a>
                        <a href="#" class="text-lg font-medium text-gray-700 hover:text-green-600 transition duration-200">Stock</a>
                    </div>
                    <div class="flex items-center space-x-3">
                        <span class="text-gray-700 font-medium">Usuario (activo)</span>
                        <i class="fas fa-user-circle text-3xl text-gray-600 cursor-pointer hover:text-green-600 transition duration-200"></i>
                    </div>
                </div>

                <h3 class="text-2xl font-semibold mb-6 text-gray-800">Registro de Envíos</h3>

                <!-- Formulario de nuevo envío -->
                <div class="bg-gray-50 p-6 mb-6 rounded-lg shadow-sm border border-gray-200">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div>
                            <label for="codigo-envio" class="block text-sm font-medium text-gray-700 mb-1">Código de Envío:</label>
                            <input type="text" id="codigo-envio" value="#A0S1" class="input-field" readonly>
                        </div>
                        <div>
                            <label for="salida" class="block text-sm font-medium text-gray-700 mb-1">Salida:</label>
                            <input type="text" id="salida" placeholder="Origen del envío" class="input-field">
                        </div>
                        <div>
                            <label for="destino" class="block text-sm font-medium text-gray-700 mb-1">Destino:</label>
                            <input type="text" id="destino" placeholder="Destino del envío" class="input-field">
                        </div>
                        <div>
                            <label for="fecha" class="block text-sm font-medium text-gray-700 mb-1">Fecha:</label>
                            <input type="date" id="fecha" class="input-field">
                        </div>
                        <div>
                            <label for="hora" class="block text-sm font-medium text-gray-700 mb-1">Hora:</label>
                            <input type="time" id="hora" class="input-field">
                        </div>
                        <div>
                            <label for="vehiculo" class="block text-sm font-medium text-gray-700 mb-1">Vehículo de Envío:</label>
                            <select id="vehiculo" class="input-field">
                                <option value="">Seleccionar vehículo</option>
                                <option value="camioneta">Camioneta</option>
                                <option value="moto">Moto</option>
                                <option value="furgoneta">Furgoneta</option>
                            </select>
                        </div>
                    </div>

                    <div class="mb-6">
                        <label class="block text-sm font-medium text-gray-700 mb-2">Código de Productos:</label>
                        <div class="bg-white p-4 rounded-md border border-gray-200 min-h-[100px] flex flex-wrap gap-2 items-start content-start">
                            <span class="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">#B503</span>
                            <span class="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">#C201</span>
                            <span class="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">#B308</span>
                            <span class="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">#C105</span>
                            <span class="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">#C275</span>
                            <span class="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">#C218</span>
                            <input type="text" placeholder="Añadir código..." class="input-field flex-grow max-w-[150px] bg-white">
                        </div>
                    </div>

                    <div class="flex justify-end space-x-3">
                        <button class="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-200">
                            Guardar Envío
                        </button>
                        <button class="px-6 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 transition duration-200">
                            Cancelar
                        </button>
                    </div>
                </div>

                <h4 class="text-xl font-semibold mb-4 text-gray-800">Envíos Programados</h4>
                <div class="space-y-3">
                    <div class="bg-white p-4 rounded-lg shadow-sm border border-gray-200 flex justify-between items-center">
                        <p class="text-lg text-gray-700 font-medium">#A0345</p>
                        <div class="flex space-x-3">
                            <button class="text-blue-500 hover:text-blue-700 transition duration-200"><i class="fas fa-edit"></i></button>
                            <button class="text-red-500 hover:text-red-700 transition duration-200"><i class="fas fa-trash-alt"></i></button>
                        </div>
                    </div>
                    <div class="bg-white p-4 rounded-lg shadow-sm border border-gray-200 flex justify-between items-center">
                        <p class="text-lg text-gray-700 font-medium">#A0347</p>
                        <div class="flex space-x-3">
                            <button class="text-blue-500 hover:text-blue-700 transition duration-200"><i class="fas fa-edit"></i></button>
                            <button class="text-red-500 hover:text-red-700 transition duration-200"><i class="fas fa-trash-alt"></i></button>
                        </div>
                    </div>
                    <div class="bg-white p-4 rounded-lg shadow-sm border border-gray-200 flex justify-between items-center">
                        <p class="text-lg text-gray-700 font-medium">#A0348</p>
                        <div class="flex space-x-3">
                            <button class="text-blue-500 hover:text-blue-700 transition duration-200"><i class="fas fa-edit"></i></button>
                            <button class="text-red-500 hover:text-red-700 transition duration-200"><i class="fas fa-trash-alt"></i></button>
                        </div>
                    </div>
                    <div class="bg-white p-4 rounded-lg shadow-sm border border-gray-200 flex justify-between items-center">
                        <p class="text-lg text-gray-700 font-medium">#A0350</p>
                        <div class="flex space-x-3">
                            <button class="text-blue-500 hover:text-blue-700 transition duration-200"><i class="fas fa-edit"></i></button>
                            <button class="text-red-500 hover:text-red-700 transition duration-200"><i class="fas fa-trash-alt"></i></button>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Sección de Catálogo -->
            <div id="content-catalogo" class="content-section hidden">
                <!-- Barra de navegación superior (Mis Compras, Pedido, Perfil) -->
                <div class="flex justify-between items-center mb-6 pb-4 border-b border-gray-200">
                    <div class="flex space-x-6 text-gray-700">
                        <a href="#" class="text-lg font-medium hover:text-green-600 transition duration-200 flex items-center">
                            <i class="fas fa-truck mr-2"></i>Hacer Pedido
                        </a>
                        <a href="#" class="text-lg font-medium hover:text-green-600 transition duration-200 flex items-center">
                            <i class="fas fa-shopping-bag mr-2"></i>Mis Compras
                        </a>
                    </div>
                    <div class="flex items-center space-x-3">
                        <span class="text-gray-700 font-medium">Pepito-11</span>
                        <i class="fas fa-user-circle text-3xl text-gray-600 cursor-pointer hover:text-green-600 transition duration-200"></i>
                        <a href="#" class="text-lg font-medium text-gray-700 hover:text-green-600 transition duration-200">Cuenta</a>
                    </div>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                    <!-- Dropdown de Nuestros Locales -->
                    <div>
                        <label for="nuestros-locales" class="block text-sm font-medium text-gray-700 mb-1">Nuestros Locales:</label>
                        <select id="nuestros-locales" class="input-field">
                            <option value="">Seleccionar Local</option>
                            <option value="local1">Local #H01</option>
                            <option value="local2">Local #H02</option>
                        </select>
                    </div>
                    <!-- Dropdown de Catálogo -->
                    <div class="md:col-span-2">
                        <label for="catalogo-productos" class="block text-sm font-medium text-gray-700 mb-1">Catálogo:</label>
                        <select id="catalogo-productos" class="input-field">
                            <option value="">Seleccionar Categoría</option>
                            <option value="chombas">Chombas</option>
                            <option value="camisas">Camisas</option>
                            <option value="pantalones">Pantalones</option>
                        </select>
                    </div>
                </div>

                <!-- Sección de Detalle del Producto -->
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
                    <!-- Imagen del Producto -->
                    <div class="bg-gray-100 p-6 rounded-xl flex items-center justify-center">
                        <div class="w-full h-80 product-image-placeholder relative overflow-hidden">
                            <!-- Placeholder de imagen -->
                            <img src="https://placehold.co/400x400/9ca3af/ffffff?text=Chomba+Polo" alt="Imagen de Chomba Polo" class="absolute inset-0 w-full h-full object-cover rounded-md" onerror="this.onerror=null;this.src='https://placehold.co/400x400/9ca3af/ffffff?text=Imagen+No+Disponible';">
                            <span class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white text-lg font-semibold bg-black bg-opacity-40 px-3 py-1 rounded-md">Chomba Polo</span>
                        </div>
                    </div>

                    <!-- Información del Producto -->
                    <div class="bg-gray-50 p-6 rounded-xl shadow-sm border border-gray-200 flex flex-col justify-between">
                        <div>
                            <h3 class="text-3xl font-bold text-gray-800 mb-2">Chomba Polo</h3>
                            <p class="text-2xl font-semibold text-green-700 mb-4">$30.500</p>

                            <div class="mb-4">
                                <strong class="block text-md font-semibold text-gray-700 mb-1">Marca:</strong>
                                <p class="text-gray-600">OxFord Polo Club</p>
                            </div>

                            <div class="mb-4">
                                <strong class="block text-md font-semibold text-gray-700 mb-1">Talles:</strong>
                                <div class="flex space-x-2">
                                    <span class="px-3 py-1 bg-green-200 text-green-800 rounded-full text-sm font-medium">S</span>
                                    <span class="px-3 py-1 bg-green-200 text-green-800 rounded-full text-sm font-medium">M</span>
                                    <span class="px-3 py-1 bg-green-200 text-green-800 rounded-full text-sm font-medium">L</span>
                                    <span class="px-3 py-1 bg-green-200 text-green-800 rounded-full text-sm font-medium">XL</span>
                                </div>
                            </div>

                            <div class="mb-6">
                                <strong class="block text-md font-semibold text-gray-700 mb-1">Descripción:</strong>
                                <p class="text-gray-600">Producto 100% algodón, ideal para cualquier ocasión. Comodidad y estilo garantizados.</p>
                            </div>

                            <div class="mb-6">
                                <strong class="block text-md font-semibold text-gray-700 mb-2">Colores:</strong>
                                <div class="flex space-x-3">
                                    <button class="w-12 h-12 bg-blue-500 rounded-md border-2 border-transparent hover:border-blue-700 transition duration-200 flex items-center justify-center text-white text-sm">
                                        <i class="fas fa-tshirt text-3xl"></i>
                                    </button>
                                    <button class="w-12 h-12 bg-red-500 rounded-md border-2 border-transparent hover:border-red-700 transition duration-200 flex items-center justify-center text-white text-sm">
                                         <i class="fas fa-tshirt text-3xl"></i>
                                    </button>
                                    <button class="w-12 h-12 bg-yellow-500 rounded-md border-2 border-transparent hover:border-yellow-700 transition duration-200 flex items-center justify-center text-white text-sm">
                                         <i class="fas fa-tshirt text-3xl"></i>
                                    </button>
                                    <button class="w-12 h-12 bg-gray-500 rounded-md border-2 border-transparent hover:border-gray-700 transition duration-200 flex items-center justify-center text-white text-sm">
                                         <i class="fas fa-tshirt text-3xl"></i>
                                    </button>
                                </div>
                            </div>
                        </div>

                        <button class="w-full px-6 py-3 bg-green-600 text-white font-semibold rounded-lg shadow-lg hover:bg-green-700 transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-opacity-50">
                            <i class="fas fa-cart-plus mr-2"></i> Agregar a Compra
                        </button>
                    </div>
                </div>
            </div>

            <!-- Aquí irían otras secciones si fueran necesarias, inicialmente ocultas -->
            <div id="content-stock" class="content-section hidden">
                <h3 class="text-2xl font-semibold mb-6 text-gray-800">Sección de Stock (Próximamente)</h3>
                <p class="text-gray-600">Contenido para la gestión de stock.</p>
            </div>
            <div id="content-ventas" class="content-section hidden">
                <h3 class="text-2xl font-semibold mb-6 text-gray-800">Sección de Ver Ventas (Próximamente)</h3>
                <p class="text-gray-600">Contenido para visualizar ventas.</p>
            </div>
            <div id="content-vendedores" class="content-section hidden">
                <h3 class="text-2xl font-semibold mb-6 text-gray-800">Sección de Ver Vendedores (Próximamente)</h3>
                <p class="text-gray-600">Contenido para gestionar vendedores.</p>
            </div>
            <div id="content-clientes" class="content-section hidden">
                <h3 class="text-2xl font-semibold mb-6 text-gray-800">Sección de Ver Clientes (Próximamente)</h3>
                <p class="text-gray-600">Contenido para la base de datos de clientes.</p>
            </div>
            <div id="content-proveedores" class="content-section hidden">
                <h3 class="text-2xl font-semibold mb-6 text-gray-800">Sección de Ver Proveedores (Próximamente)</h3>
                <p class="text-gray-600">Contenido para la gestión de proveedores.</p>
            </div>
            <div id="content-pedido" class="content-section hidden">
                <h3 class="text-2xl font-semibold mb-6 text-gray-800">Sección de Hacer Pedido (Próximamente)</h3>
                <p class="text-gray-600">Formulario o interfaz para realizar pedidos.</p>
            </div>


        </div>
    </div>

    <script>
        // Función para mostrar una sección de contenido y ocultar las demás
        function showContent(sectionId) {
            // Oculta todas las secciones de contenido
            document.querySelectorAll('.content-section').forEach(section => {
                section.classList.add('hidden');
            });
            // Muestra la sección deseada
            const targetSection = document.getElementById(`content-${sectionId}`);
            if (targetSection) {
                targetSection.classList.remove('hidden');
            }

            // Actualiza el estilo del enlace activo en la barra lateral
            document.querySelectorAll('nav a').forEach(link => {
                link.classList.remove('bg-green-600');
                link.classList.add('hover:bg-green-600');
            });
            const activeLink = document.querySelector(`nav a[onclick="showContent('${sectionId}')"]`);
            if (activeLink) {
                activeLink.classList.add('bg-green-600');
                activeLink.classList.remove('hover:bg-green-600');
            }
        }

        // Función para manejar el login y mostrar la aplicación principal
        function loginApp() {
            // Aquí puedes añadir lógica de validación de credenciales real.
            // Por ahora, simplemente oculta la pantalla de login y muestra la app.Ggg
            document.getElementById('login-screen').classList.add('hidden');
            document.getElementById('main-app-screen').classList.remove('hidden');
            // Muestra la sección de Locales por defecto al iniciar sesión
            showContent('locales');
        }

        // Se ejecuta cuando el DOM está completamente cargado
        document.addEventListener('DOMContentLoaded', () => {
            // Oculta la pantalla de la aplicación principal al inicio
            document.getElementById('main-app-screen').classList.add('hidden');
            // Asegura que la pantalla de login sea visible
            document.getElementById('login-screen').classList.remove('hidden');
        });

    </script>
</body>
</html>
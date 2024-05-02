<template>
    <div>
        <div v-if="cargando" class="pantalla-carga text-center">
            <div class="logo-carga">
                <img class="logo-img" src="/favicon.ico" width="50" alt="">
                <div class="texto-carga">
                    Cargando productos
                </div>
            </div>
        </div>
        <div v-else>
            <nav class="navbar navbar-expand-lg navbar-light bg-light">
                <div class="container-fluid">
                    <a class="navbar-brand" @click="scrollToInicio" href="#">~ {{ nombreNegocio.toUpperCase() }} ~</a>
                    <button class="navbar-brand navbar-toggler" type="button" data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                        aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                            <div v-for="(categoria, index) in categoriasOrdenadas" :key="index">
                                <li v-if="categoriasConProductosFiltrados.includes(categoria)" class="nav-item">
                                    <a class="nav-link" @click="scrollToCategoria(categoria); collapseNavbar()">{{
                                        categoria }}</a>
                                </li>
                            </div>
                        </ul>
                    </div>
                </div>
            </nav>
            <div class="container2">
                <div v-if="productos.length">
                    <div class="presentacion">
                        <!-- Imagen del negocio con texto superpuesto -->
                        <div class="imagen-container">
                            <img :src="negocio.imagen" alt="" class="img-negocio">
                            <div class="texto-superpuesto">BIENVENIDOS
                                <div class="texto-superpuesto2">"{{ negocio.descripcion }}"</div>
                                <div class="text-center redes">
                                    <a v-if="negocio.instagram" class="mauto" :href="negocio.instagram"
                                        target="blank"><img width='40' src="/recursos/instagram.png"></a>
                                    <a v-if="negocio.facebook" class="mauto" :href="negocio.facebook"
                                        target="blank"><img width='36' src="/recursos/facebook.png"></a>
                                    <a v-if="negocio.direccion"
                                        :href="'https://www.google.com/maps/search/' + encodeURIComponent(negocio.direccion)"
                                        target="_blank"><img width='40' src="/recursos/pin.png"></a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="tarjeta-container">

                        <div class="ancho">
                            <div class="izquierda ancho-busqueda">
                                <input class="form-control barra-busqueda" v-model="busqueda" type="text"
                                    name="busqueda" id="" placeholder="Buscar producto"
                                    title="Ingrese una palabra clave...">
                            </div>
                            <div class="mt-2" v-for="(categoria, index) in categoriasOrdenadas" :key="index"
                                :id="categoria">
                                <div v-if="filteredProductos(categoria)">

                                    <div class="titulo-categoria" @click="toggleCategoria(categoria)">{{ categoria }}
                                    </div>
                                    <div
                                        :class="{ 'categoria-productos': true, 'categoria-activa': categoriaSeleccionada === categoria }">
                                        <div class="p-2">
                                            <div class="item-container mt-2"
                                                v-for="(producto, index) in filteredProductos(categoria)" :key="index">
                                                <div class="item-imagen" v-if="producto.producto_imagen">
                                                    <div>
                                                        <img class="imagen" :src="producto.producto_imagen" alt=" ">
                                                    </div>
                                                </div>
                                                <!-- Nombre del producto -->
                                                <div class="item-texto-block">
                                                    <div class="item-texto-block-start">
                                                        <div class="item-nombre">
                                                            {{ producto.producto_nombre }}
                                                        </div>
                                                        <div class="item-precio">
                                                            ${{ producto.producto_precio }}
                                                        </div>
                                                        <div class="item-descripcion"
                                                            v-if="producto.producto_descripcion">
                                                            "{{ producto.producto_descripcion }}"
                                                        </div>
                                                    </div>
                                                </div>
                                                <div v-if="negocio.fechaVence !== 2100" class="item-texto-block-end">
                                                    <button class="btn-mas" @click="agregarAlCarrito(producto)">
                                                        +
                                                    </button>
                                                    <div class="cantidad">
                                                        {{ producto.cantidadSeleccionada }}
                                                    </div>
                                                    <button class="btn-menos" @click="quitarDelCarrito(producto)"
                                                        :disabled="!producto.cantidadSeleccionada">
                                                        -
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="ver-carrito-btn" v-if="carrito.length > 0">
                                <button data-bs-toggle="modal" data-bs-target="#modalCarrito">Ver Carrito ${{ total
                                    }}</button>
                            </div>
                            <div v-if="productosFiltrados.length === 0" class="text-center mt-3">
                                No se encontraron resultados para esa búsqueda.
                            </div>
                        </div>
                    </div>
                </div>
                <div v-else class="container text-center mt-4 no-negocio">
                    <div class="error-container">
                        <div class="error-content">
                            <h1 class="display-1 text-danger">404</h1>
                            <h2 class="display-4">Página no encontrada</h2>
                            <p class="lead">Lo sentimos, la página que buscas no se encuentra disponible o no tiene
                                productos disponibles.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="modal fade" id="modalCarrito" tabindex="-1" aria-labelledby="modalCarritoLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">¿Todo listo para encargar?</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="item-container mt-2" v-for="(producto, index) in carrito" :key="index">
                            <div class="item-imagen" v-if="producto.producto_imagen">
                                <div>
                                    <img class="imagen" :src="producto.producto_imagen" alt=" ">
                                </div>
                            </div>
                            <!-- Nombre del producto -->
                            <div class="item-texto-block">
                                <div class="item-texto-block-start">
                                    <div class="item-nombre">
                                        {{ producto.producto_nombre }}
                                    </div>
                                    <div class="item-precio">
                                        ${{ producto.producto_precio }}
                                    </div>
                                    <div class="item-descripcion" v-if="producto.producto_descripcion">
                                        "{{ producto.producto_descripcion }}"
                                    </div>
                                </div>
                            </div>
                            <div class="item-texto-block-end">
                                <button class="btn-mas" @click="agregarAlCarrito(producto)">
                                    +
                                </button>
                                <div class="cantidad">
                                    {{ producto.cantidadSeleccionada }}
                                </div>
                                <button class="btn-menos" @click="quitarDelCarrito(producto)"
                                    :disabled="!producto.cantidadSeleccionada">
                                    -
                                </button>
                            </div>
                        </div>
                        <h4 class="text-end mt-4">Total: ${{ total }}</h4>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="ver-carrito-btn2" :disabled="!carrito.length > 0"
                            data-bs-toggle="modal" data-bs-target="#modalPedido">Realizar pedido</button>
                    </div>
                </div>
            </div>
        </div>

        <div class="modal fade" id="modalPedido" tabindex="-1" aria-labelledby="modalPedidoLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Información del pedido</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <form @submit.prevent="realizarPedido">
                        <div class="modal-body">
                            <label class="mt-2" for="nombre">Nombre y Apellido</label>
                            <input type="text" id="nombre" class="form-control" placeholder="(obligatorio)"
                                v-model="pedido.nombre" required>
                            <label class="mt-2" for="medioPago">Medio de Pago</label>
                            <select class="form-control form-select" id="medioPago" v-model="pedido.medio" required>
                                <option value="Transferencia">Transferencia</option>
                                <option value="Efectivo">Efectivo</option>
                            </select>
                            <label class="mt-2" for="direccion">Dirección de entrega</label>
                            <input type="text" id="direccion" class="form-control" placeholder="(opcional)"
                                v-model="pedido.direccion">
                            <label class="mt-2" for="detalles">Detalles del pedido</label>
                            <input type="text" id="detalles" class="form-control" placeholder="(opcional)"
                                v-model="pedido.detalle">
                        </div>
                        <div class="modal-footer">
                            <button type="submit" class="ver-carrito-btn2" :disabled="!carrito.length > 0">Realizar
                                pedido</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import Swal from 'sweetalert2';
export default {
    data() {
        return {
            categoriaSeleccionada: null,
            mostrarModal: true,
            nombreNegocio: '', // Variable para almacenar el nombre de usuario del negocio
            productos: [],      // Array para almacenar los productos del negocio
            busqueda: '',
            negocio: {
                usuario: '',
                nombre: '',
                correo: '',
                telefono: '',
                direccion: '',
                descripcion: '',
                imagen: '',
                fechaVence: '',
            },
            cargando: true,
            carrito: [],
            total: 0,
            pedido: {
                nombre: '',
                medio: 'Transferencia',
                direccion: '',
                detalle: '',
            }
        };
    },
    mounted() {
        // Obtener el nombre de usuario de la URL
        this.nombreNegocio = this.$route.params.nombreNegocio;
        // Lógica para obtener los productos del negocio con el nombre de usuario dado
        this.obtenerInformacionNegocio();
        
    },
    computed: {
        categoriasOrdenadas() {
            // Obtiene las categorías únicas de los productos filtrados y las ordena alfabéticamente
            return [...new Set(this.productosFiltrados.map(producto => producto.producto_categoria))].sort();
        },
        productosFiltrados() {
            const quitarAcentos = (texto) => {
                return texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
            };

            // Filtra los productos basándose en el valor de búsqueda y producto_disponibilidad = 1
            return this.productos.filter(producto => {
                const nombre = producto.producto_nombre || '';
                const descripcion = producto.producto_descripcion || '';
                const categoria = producto.producto_categoria || '';
                const precio = producto.producto_precio || '';
                // Quita los acentos de las letras antes de realizar la comparación
                const busquedaSinAcentos = quitarAcentos(this.busqueda.toLowerCase());
                return (
                    quitarAcentos(nombre.toLowerCase()).includes(busquedaSinAcentos) ||
                    quitarAcentos(descripcion.toLowerCase()).includes(busquedaSinAcentos) ||
                    quitarAcentos(categoria.toLowerCase()).includes(busquedaSinAcentos) ||
                    quitarAcentos(precio.toString().toLowerCase()).includes(busquedaSinAcentos)
                );
            });
        },
        categoriasConProductosFiltrados() {
            // Obtiene las categorías únicas de los productos filtrados
            return [...new Set(this.productosFiltrados.map(producto => producto.producto_categoria))];
        }
    },
    methods: {
        toggleCategoria(categoria) {
            if (this.categoriaSeleccionada === categoria) {
                // Si la categoría seleccionada es la misma que se hizo clic, la contraemos
                this.categoriaSeleccionada = null;
            } else {
                // De lo contrario, establecemos la categoría seleccionada como la categoría en la que se hizo clic
                this.categoriaSeleccionada = categoria;
            }
        },
        async obtenerCarrito() {
            if (sessionStorage.getItem('carrito') !== null) {
                this.carrito = JSON.parse(sessionStorage.getItem('carrito'));
                this.total = parseFloat(sessionStorage.getItem('total')); // Asumiendo que 'total' es un número, no una cadena
                for (const producto of this.productos) {
                    const index = this.carrito.findIndex(item => item.producto_id === producto.producto_id);
                    if (index !== -1) {
                        // Agregar la propiedad cantidadSeleccionada al producto
                        producto.cantidadSeleccionada = this.carrito[index].cantidadSeleccionada;
                    }
                }
            }
            if (localStorage.getItem('pedido') !== null) {
                this.pedido = JSON.parse(localStorage.getItem('pedido'));
            }
        },
        // Método para realizar el pedido
        realizarPedido() {
            // Agrega aquí la lógica para enviar el mensaje por WhatsApp

            // Aquí debes obtener la información del carrito y formatearla como desees

            localStorage.setItem('pedido', JSON.stringify(this.pedido));

            const mensaje = `¡Hola *${this.negocio.nombre}*! \nQuiero realizar un pedido:\n`;
            const productos = this.carrito.map(producto => `- *${producto.producto_nombre}:* $${producto.producto_precio} (${producto.cantidadSeleccionada})\n\n`);
            const total = `*Total: $${this.total}*\n\n`;
            let datos = `*Nombre:* ${this.pedido.nombre}\n*Medio de pago:* ${this.pedido.medio}\n`;
            this.pedido.direccion ? datos += `*Dirección:* ${this.pedido.direccion}\n` : this.pedido.detalle ? datos += `*Detalle:* ${this.pedido.detalle}\n\n¡Muchas gracias!` : datos += `\n¡Muchas gracias!`;


            // Concatenamos el mensaje con la lista de productos y el total
            const mensajeCompleto = mensaje + productos.join('') + total + datos;

            // Aquí debes reemplazar 'tu_numero_de_whatsapp' por el número de teléfono de tu negocio
            // Obtener el agente del usuario para verificar si está en un dispositivo móvil
            const userAgent = navigator.userAgent || navigator.vendor || window.opera;

            // Verificar si el usuario está en un dispositivo móvil
            const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);

            // Definir el enlace base según si es móvil o no
            let baseLink = isMobile ? 'whatsapp://send' : 'https://web.whatsapp.com/send';

            // Construir el enlace completo
            const numeroWhatsapp = `${baseLink}?phone=${this.negocio.telefono}&text=${encodeURIComponent(mensajeCompleto)}`;
            sessionStorage.clear();
            // Finalmente, abrimos una nueva ventana del navegador con el enlace generado
            try{
                window.open(numeroWhatsapp);
                location.reload(1);
            } catch(error){
                Swal.fire({
                            icon: 'error',
                            text: 'Por favor habilita las ventanas emergentes para ir a WhatsApp.' + error.response.data.message,
                        });
            }
        },
        agregarAlCarrito(producto) {
            const index = this.carrito.findIndex(item => item.producto_id === producto.producto_id);
            if (index !== -1) {
                producto.cantidadSeleccionada++;
                this.carrito[index].cantidadSeleccionada = producto.cantidadSeleccionada;
                this.total += Number(producto.producto_precio);
            } else {
                // Agregamos la cantidadSeleccionada al producto
                producto.cantidadSeleccionada = 1;
                this.carrito.push(producto);
                this.total += Number(producto.producto_precio);
            }
            sessionStorage.setItem('carrito', JSON.stringify(this.carrito));
            sessionStorage.setItem('total', JSON.stringify(this.total));
        },
        quitarDelCarrito(producto) {
            const index = this.carrito.findIndex(item => item.producto_id === producto.producto_id);
            if (index !== -1) {
                producto.cantidadSeleccionada--;
                this.carrito[index].cantidadSeleccionada = producto.cantidadSeleccionada;
                this.total -= Number(producto.producto_precio);
                if (this.carrito[index].cantidadSeleccionada === 0) {
                    this.carrito.splice(index, 1);
                }
            }
            sessionStorage.setItem('carrito', JSON.stringify(this.carrito));
            sessionStorage.setItem('total', JSON.stringify(this.total));
        },
        async obtenerInformacionNegocio() {
            try {
                // Realiza una solicitud HTTP GET para obtener los informes desde el servidor
                const response = await axios.get(`/negocio?usuario=${this.nombreNegocio}`);
                // Actualiza la lista de informes con los datos recibidos
                this.negocio = response.data;
                await this.fetchProductos();
            } catch (error) {
                console.error("Error al cargar los productos:", error);
            } finally {
                this.cargando = false; // Indicar que la carga ha terminado, independientemente del resultado
            }

        },
        scrollToCategoria(categoria) {
            // Función para desplazarse a la categoría específica con un offset
            const categoriaElement = document.getElementById(categoria);
            if (categoriaElement) {
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const categoriaPosition = categoriaElement.getBoundingClientRect().top;
                window.scrollTo({
                    top: window.scrollY + categoriaPosition - navbarHeight,
                    behavior: 'smooth'
                });
            }
            this.toggleCategoria(categoria);
        },
        scrollToInicio() {
            // Función para desplazarse al inicio de la página
            window.scrollTo({ top: 0, behavior: "smooth" });
        },
        collapseNavbar() {
            // Función para contraer el navbar después de hacer clic en un enlace
            const navbarToggler = document.querySelector('.navbar-toggler');
            const navbarCollapse = document.querySelector('.navbar-collapse');
            if (navbarToggler && navbarCollapse.classList.contains('show')) {
                navbarToggler.click();
            }
        },
        async fetchProductos() {
            try {
                // Realiza una solicitud HTTP GET para obtener los productos desde el servidor
                const response = await axios.get(`/productos?usuario=${this.nombreNegocio}`);
                const productosFiltradosDisponibles = response.data.filter(producto => producto.producto_disponibilidad);
                // Ordena los productos alfabéticamente por el nombre
                const productosOrdenados = productosFiltradosDisponibles.sort((a, b) => {
                    const nombreA = a.producto_nombre.toUpperCase();
                    const nombreB = b.producto_nombre.toUpperCase();
                    if (nombreA < nombreB) {
                        return -1;
                    }
                    if (nombreA > nombreB) {
                        return 1;
                    }
                    return 0;
                });

                productosOrdenados.forEach(producto => {
                    producto.cantidadSeleccionada = 0;
                });

                // Actualiza la lista de productos con los datos recibidos y ordenados
                this.productos = productosOrdenados;
                this.obtenerCarrito();

            } catch (error) {
                console.error("Error al cargar los productos:", error);
            }
        },
        filteredProductos(categoria) {
            // Filtra los productos basándose en la categoría y en el valor de disponibilidad
            return this.productosFiltrados.filter(producto => producto.producto_categoria === categoria && producto.producto_disponibilidad === 1);
        }
    }
};
</script>

<style scoped>
.categoria-productos {
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.7s ease-in-out;
    /* Duración y función de la transición */
}

/* Clase para activar la categoría seleccionada */
.categoria-activa {
    max-height: 1000px;
    /* Altura máxima suficientemente grande para mostrar todos los productos */
}

.cantidad {
    vertical-align: middle;
    font-size: 20px;
}

.btn-mas {
    height: 40px;
    border-radius: 4px;
    width: 40px;
    font-weight: bold;
    border: none;
    box-shadow: 0.2px 0.2px 2px;
    border-radius: 1px;
    background-color: white;
}

.btn-mas:hover {
    cursor: pointer;
    background-color: rgb(238, 238, 238);
}

.btn-menos {
    height: 40px;
    border-radius: 4px;
    width: 40px;
    font-weight: bold;
    border: none;
    box-shadow: 0.2px 0.2px 2px;
    border-radius: 1px;
    background-color: white;
}

.btn-menos:hover {
    cursor: pointer;
}

.ver-carrito-btn button {
    position: fixed;
    bottom: 20px;
    right: 20px;
    z-index: 2;
    background: linear-gradient(rgb(148, 193, 252), rgb(0, 90, 207)) !important;
    color: white;
    padding: 10px 20px;
    border: none;
    box-shadow: 0.2px 0.2px 2px black !important;
    border-radius: 1px;
    cursor: pointer;
}

.ver-carrito-btn button:hover {
    background: linear-gradient(rgb(148, 193, 252), rgb(0, 87, 168)) !important;

}

.ver-carrito-btn2 {
    background: linear-gradient(rgb(148, 193, 252), rgb(0, 90, 207)) !important;
    color: white;
    padding: 10px 20px;
    border: none;
    box-shadow: 0.2px 0.2px 2px black !important;
    border-radius: 1px;
    cursor: pointer;
}

.ver-carrito-btn2:hover {
    background: linear-gradient(rgb(148, 193, 252), rgb(0, 87, 168)) !important;

}

.texto-carga {
    font-style: italic;
    margin: 20px;
    color: grey;
}

.logo-carga {
    margin-top: -10vh;
}

.logo-img {
    animation: l2 2s infinite;
}

.pantalla-carga {
    z-index: 2;
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: calc(100vh - 100px);
    background-color: white;
    align-content: center;
}

.pantalla-carga:hover {
    cursor: wait;
}

@keyframes l2 {
    to {
        transform: rotate(1turn)
    }
}

.navbar-brand {
    font-weight: bold;
}


.imagen-container {
    position: relative;
    height: 100%;
}

.presentacion {
    height: 90vh;
}

.img-negocio {
    width: 100%;
    height: 100%;
    object-fit: cover;
    filter: blur(6px);
    clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
}

.texto-superpuesto {
    position: absolute;
    top: 40%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 3rem;
    font-weight: bold;
    color: white;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
    text-align: center;
}

.redes {
    position: absolute;
    top: 45vh;
    width: 100%;
    text-align: center;
}

.texto-superpuesto2 {
    font-size: 20px;
    color: white;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
}

nav {
    z-index: 1;
    position: sticky;
    top: 0px;
}

.nav-link {
    cursor: pointer;
}

.error-container {
    height: 80vh;
    display: flex;
    justify-content: center;
    align-items: center;
}

.error-content {
    text-align: center;
}


.textoTarjeta {
    padding: 5px 15px;
}

.categoria-container {
    padding: 5px;
    border: 5px;
    background-color: white;
    border-radius: 20px;
}

.titulo {
    font-weight: bold;
    font-size: 40px;
    background-color: black;
    color: white;
}

.mauto {
    margin: 10px;
}

.titulo-categoria {
    font-size: 30px;
    background: linear-gradient(to right, rgb(254, 255, 174), #ffffff);
    width: 100%;
    margin: 0px;
    padding: 5px 10px;
    cursor: pointer;
}

.tarjetaProducto {
    border: 5px;
    background-color: white;
    border-radius: 10px;
    display: inline-block;
}

.descripcion {
    font-style: italic;
}

img {
    object-fit: contain;
}

.imagen {
    height: 100px;
    width: 100px;
    /* Ajustamos el tamaño de la imagen */
    margin-right: 20px;
}


.ancho {
    min-height: 60vh;
    overflow: auto;
}

.derecha {
    display: inline-flex;
    justify-content: center;
    gap: 15px;
    margin-right: 10px;
}


.ancho-busqueda {
    width: 100%;
    height: 50px;
    display: inline-flex;
    margin-top: 20px;
    padding: 1px;
}

ul {
    padding: 0;
}

.item-imagen {
    width: 100px;
    margin-right: 10px;
}

.item-container {
    display: flex;
    /* Utilizamos flexbox para posicionar los elementos */
    align-items: center;
    border-bottom: solid rgba(0, 0, 0, 0.2) 1px;
    padding-bottom: 5px;
}

.item-texto-block {
    width: 100%;
    /* Hacemos que este bloque ocupe el espacio disponible */
}

.item-texto-block-start {
    width: 80%;
    /* Hacemos que este bloque ocupe el espacio disponible */
}

.item-precio {
    font-size: 24px;
    font-weight: bold;
}

.item-nombre {
    font-size: 20px;
}

.item-descripcion {
    font-size: 16px;
    font-style: italic;
}

.item-texto-block-end {
    text-align: center;
    margin: auto;
}

.container2 {
    margin: 0px 30vw;
}

@media screen and (max-width: 992px) {
    .navbar {
        background: linear-gradient(to right, rgb(228, 190, 109), #ffffff);
    }

    .navbar-brand {
        font-size: 20px;
    }

    .img-negocio {
        object-fit: cover;
        height: 100%;
    }

    .presentacion {
        height: calc(100vh - 120px);
    }


    .container2 {
        min-height: calc(100vh - 200px);
        margin: 0px 10px;
    }

}
</style>
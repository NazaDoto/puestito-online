<template>
    <div>
        <div v-if="usuarioLogueado">
            <NavbarComponent></NavbarComponent>
        </div>
        <div v-if="cargando" class="pantalla-carga text-center">
            <div class="logo-carga">
                <img class="logo-img" src="/favicon.ico" width="50" alt="">
                <div class="texto-carga">
                    Cargando productos
                </div>
            </div>
        </div>
        <div v-else>
            <div class="absolute">
                <nav class="navbar navbar-dark bg-dark" :class="{ 'navbar-hidden': isHidden }">
                    <div class="container">
                        <div class="flex">
                            <a @click="scrollToInicio" href="#"><img class="nav-logo" :src="negocio.imagen" alt=""></a>
                            <div class="ancho-busqueda input-group mcenter">
                                <input class="form-control" v-model="busqueda" type="text" name="busqueda" id=""
                                    placeholder="Buscar producto" title="Ingrese una palabra clave...">
                                <button class="btn-close btn-limpiar-busqueda" @click="limpiarBusqueda"></button>
                            </div>
                            <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                                data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                                aria-expanded="false" aria-label="Toggle navigation">
                                <span class="navbar-toggler-icon"></span>
                            </button>
                        </div>
                        <div class="collapse navbar-collapse text-end bg-dark" id="navbarSupportedContent">
                            <ul class="navbar-nav m-2">
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
            </div>
            <div class="container2">
                <div v-if="productos.length">
                    <div class="presentacion">
                        <!-- Imagen del negocio con texto superpuesto -->
                        <div class="imagen-container">
                            <img v-if="negocio.portada" :src="negocio.portada" alt="" class="img-negocio">
                            <img v-else src="/recursos/missing.png" class="img-negocio" alt="">
                            <div class="texto-superpuesto">BIENVENIDOS
                                <div class="texto-superpuesto2">{{ negocio.descripcion }}

                                </div>
                                <div class="text-center redes">
                                    <h4 v-if="negocio.direccion">{{ negocio.direccion }}</h4>
                                    <a v-if="negocio.instagram" class="mauto"
                                        :href="'https://instagram.com/' + negocio.instagram" target="blank"><img
                                            width='40' src="/recursos/instagram.png"></a>
                                    <a v-if="negocio.facebook" class="mauto" :href="negocio.facebook"
                                        target="blank"><img width='36' src="/recursos/facebook.png"></a> <br>
                                    <div class="text-center">
                                        <img v-show="isHidden" src="/recursos/scroll-down.png" class="scroll-down"
                                            :class="{ 'fade-in-out': isHidden }" alt="">

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <hr>
                    <div v-if="publicaciones && publicaciones.length > 0" class="justify-content-center">
                        <div class="carrusel">
                            <div v-for="(publicacion, index) in publicaciones" :key="index"
                                :class="{ 'carrusel-item': true, 'active': index === 0 }">
                                <div class="publicacion-container">
                                    <img class="imagen-publicacion" :src="publicacion.publicacion" alt=" "
                                        @click="agrandarPublicacion(index)" />
                                </div>
                            </div>
                        </div>
                        <hr class="hr-mobile">
                        <div v-if="publicacionAgrandada !== null" class="publicacion-agrandada">
                            <button @click="cerrarAgrandarPublicacion" class="btn-close btn-close-agrandada"></button>

                            <!-- Botón para ir a la publicación anterior -->
                            <button v-if="indiceAgrandada > 0" @click="agrandarPublicacion(indiceAgrandada - 1)"
                                class="btn-anterior">
                                <img src="/recursos/previous.png" width="20" alt=""></button>

                            <!-- Botón para ir a la siguiente publicación -->
                            <button v-if="indiceAgrandada < publicaciones.length - 1"
                                @click="agrandarPublicacion(indiceAgrandada + 1)" class="btn-siguiente">
                                <img src="/recursos/next.png" width="20" alt=""></button>

                            <!-- Imagen agrandada -->
                            <img :src="publicaciones[publicacionAgrandada].publicacion" class="imagen-agrandada" alt="">
                        </div>
                    </div>
                    <div class="text-center mt-2 mensajeWpp p-2" @click="enviarMensaje">
                        Enviá tu consulta
                        <img class="ml" src="/recursos/whatsapp.png" width="30" alt="">
                    </div>
                    <hr>
                    <div class="body-container">
                        <div class="ancho">
                            <div class="mt-2" v-for="(categoria, index) in categoriasOrdenadas" :key="index"
                                :id="categoria">
                                <div v-if="filteredProductos(categoria)">
                                    <div class="titulo-categoria" @click="toggleCategoria(categoria)"
                                        :class="{ 'fondo-oscuro': categoriaSeleccionada === categoria }">{{ categoria }}
                                        <div class="inline" v-if="categoriaSeleccionada === categoria">↓</div>
                                        <div class="inline" v-else>→</div>
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
                                                            {{ producto.producto_precio > 0 ? '$' +
                                                                producto.producto_precio : producto.producto_precio < 0 ? 'Consultar precio' : 'Gratis' }}
                                                        </div>
                                                        <div class="item-descripcion"
                                                            v-if="producto.producto_descripcion">
                                                            "{{ producto.producto_descripcion }}"
                                                        </div>
                                                    </div>
                                                </div>
                                                <div v-if="negocio.tipo == 1" class="item-texto-block-end">
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
                            <div :class="usuarioLogueado ? 'ver-carrito-log' : 'ver-carrito'" v-if="carrito.length > 0">
                                <button class="ver-carrito-btn" data-bs-toggle="modal"
                                    data-bs-target="#modalCarrito">Ver Carrito ${{ total
                                    }}</button>
                            </div>
                            <div v-if="productosFiltrados.length === 0" class="text-center mt-3">
                                No se encontraron resultados para esa búsqueda.
                            </div>
                        </div>
                    </div>
                </div>
                <div v-else-if="nombreNegocio">
                    <div class="error-content">
                        <h1 class="display-1" v-if="negocio.imagen">
                            <img :src="negocio.imagen" width="100" alt="" style="border-radius:100%;">
                        </h1>
                        <h2 class="display-4">{{ nombreNegocio }}</h2>
                        <p class="lead">Estamos construyendo nuestro
                            puestito.<br></p>
                        <p v-if="negocio.instagram || negocio.facebook">¡Seguinos en nuestras redes!</p>
                        <p v-else>¡Volvé pronto!</p>
                        <a v-if="negocio.instagram" class="mauto" :href="'https://instagram.com/' + negocio.instagram"
                            target="blank"><img width='40' src="/recursos/instagram.png"></a>
                        <a v-if="negocio.facebook" class="mauto" :href="'https://facebook.com/' + negocio.facebook"
                            target="blank"><img width='36' src="/recursos/facebook.png"></a> <br>
                        <p class="mt-3" v-if="negocio.direccion">{{ negocio.direccion }}</p>
                        <router-link to="/">Volver a Puestito Online</router-link>
                    </div>
                </div>
                <div v-else>
                    <div class="error-content">
                        <h1 class="display-1 text-danger">404</h1>
                        <h2 class="display-4">Puestito no encontrado</h2>
                        <p class="lead">Lo sentimos, el puestito que buscas no se encuentra disponible o no tiene
                            productos disponibles.</p>
                        <router-link to="/">Volver a Puestito Online</router-link>
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
                        <button type="button" class="btn btn-limpiar" data-bs-dismiss="modal" aria-label="Close"
                            @click="limpiarCarrito">Limpiar carrito</button>
                        <button type="button" class="btn btn-menu" :disabled="!carrito.length > 0"
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
                            <button type="submit" class="btn btn-menu" :disabled="!carrito.length > 0">Realizar
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
import NavbarComponent from './NavbarComponent.vue';
export default {
    components: {
        NavbarComponent
    },
    data() {
        return {
            publicacionAgrandada: null,
            usuarioLogueado: false,
            isHidden: true,
            categoriaSeleccionada: null,
            mostrarModal: true,
            nombreUsuario: '', // Variable para almacenar el nombre de usuario del negocio
            nombreNegocio: '',
            productos: [],      // Array para almacenar los productos del negocio
            busqueda: '',
            publicaciones: [],
            negocio: '',
            cargando: true,
            carrito: [],
            total: 0,
            indiceAgrandada: null,
            pedido: {
                nombre: '',
                medio: 'Transferencia',
                direccion: '',
                detalle: '',
            }
        };
    },

    async mounted() {

        window.addEventListener('scroll', this.handleScroll);

        // Obtener el nombre de usuario de la URL
        this.nombreUsuario = this.$route.params.nombreNegocio;
        localStorage.getItem("usuario") == this.nombreUsuario ? this.usuarioLogueado = true : this.usuarioLogueado = false;
        // Lógica para obtener los productos del negocio con el nombre de usuario dado
        await this.obtenerInformacionNegocio();
        await this.fetchPublicaciones();
        await this.actualizarOG();


    },
    beforeUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
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
        async actualizarOG() {
            document.title = this.nombreNegocio;
            document
                .querySelector('meta[name="title"]')
                .setAttribute('content', this.nombreNegocio);
            document
                .querySelector('meta[property="og:title"]')
                .setAttribute('content', this.nombreNegocio);
            document
                .querySelector('meta[name="twitter:title"]')
                .setAttribute('content', this.nombreNegocio);
            document
                .querySelector('meta[itemprop="title"]')
                .setAttribute('content', this.nombreNegocio);
            document
                .querySelector('meta[name="description"]')
                .setAttribute('content', this.negocio.descripcion);
            document
                .querySelector('meta[name="DC.description"]')
                .setAttribute('content', this.negocio.descripcion);
            document
                .querySelector('meta[property="og:description"]')
                .setAttribute('content', this.negocio.descripcion);
            document
                .querySelector('meta[itemprop="description"]')
                .setAttribute('content', this.negocio.descripcion);
            document
                .querySelector('meta[property="og:image"]')
                .setAttribute('content', this.negocio.imagen);
            document
                .querySelector('meta[name="twitter:image"]')
                .setAttribute('content', this.negocio.imagen);
            document
                .querySelector('meta[itemprop="image"]')
                .setAttribute('content', this.negocio.imagen);
            document
                .querySelector('meta[property="og:url"]')
                .setAttribute('content', window.location.href);
        },
        handleScroll() {
            let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            if (scrollTop === 0) {
                this.isHidden = true;
            } else {
                this.isHidden = false;
            }
        },
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
        enviarMensaje() {
            const userAgent = navigator.userAgent || navigator.vendor || window.opera;

            // Verificar si el usuario está en un dispositivo móvil
            const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);

            // Definir el enlace base según si es móvil o no
            let baseLink = isMobile ? 'whatsapp://send' : 'https://web.whatsapp.com/send';

            // Construir el enlace completo
            const mensajeCompleto = `Hola ${this.negocio.nombre}!`;
            const numeroWhatsapp = `${baseLink}?phone=${this.negocio.telefono}&text=${encodeURIComponent(mensajeCompleto)}`;
            // Finalmente, abrimos una nueva ventana del navegador con el enlace generado
            try {
                window.open(numeroWhatsapp);
                location.reload(1);
            } catch (error) {
                Swal.fire({
                    icon: 'error',
                    text: 'Por favor habilita las ventanas emergentes para ir a WhatsApp.' + error.response.data.message,
                });
            }
        },
        // Método para realizar el pedido
        realizarPedido() {
            // Agrega aquí la lógica para enviar el mensaje por WhatsApp

            // Aquí debes obtener la información del carrito y formatearla como desees

            localStorage.setItem('pedido', JSON.stringify(this.pedido));

            const mensaje = `¡Hola *${this.negocio.nombre}*! \nQuiero realizar un pedido:\n\n`;

            // Agrupar productos por categoría
            const productosPorCategoria = this.carrito.reduce((acc, producto) => {
                const categoria = producto.producto_categoria;
                if (!acc[categoria]) {
                    acc[categoria] = [];
                }
                acc[categoria].push(producto);
                return acc;
            }, {});

            // Crear el mensaje de productos agrupados por categoría
            let productosMensaje = '';
            for (const categoria in productosPorCategoria) {
                productosMensaje += `*${categoria}:*\n`;
                productosPorCategoria[categoria].forEach(producto => {
                    productosMensaje += `- *${producto.producto_nombre}:* $${producto.producto_precio} (${producto.cantidadSeleccionada})\n`;
                });
                productosMensaje += '\n'; // Añadir un salto de línea entre categorías
            }

            const total = `*Total: $${this.total}*\n\n`;
            let datos = `*Nombre:* ${this.pedido.nombre}\n*Medio de pago:* ${this.pedido.medio}\n`;

            if (this.pedido.direccion) {
                datos += `*Dirección:* ${this.pedido.direccion}\n`;
            }
            if (this.pedido.detalle) {
                datos += `*Detalle:* ${this.pedido.detalle}\n`;
            }
            datos += `\n¡Muchas gracias!`;


            // Concatenamos el mensaje con la lista de productos y el total
            const mensajeCompleto = mensaje + productosMensaje + total + datos;

            console.log(mensajeCompleto);


            // Aquí debes reemplazar 'tu_numero_de_whatsapp' por el número de teléfono de tu negocio
            // Obtener el agente del usuario para verificar si está en un dispositivo móvil
            const userAgent = navigator.userAgent || navigator.vendor || window.opera;

            // Verificar si el usuario está en un dispositivo móvil
            const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);

            // Definir el enlace base según si es móvil o no
            let baseLink = isMobile ? 'whatsapp://send' : 'https://web.whatsapp.com/send';

            // Construir el enlace completo
            const numeroWhatsapp = `${baseLink}?phone=${this.negocio.telefono}&text=${encodeURIComponent(mensajeCompleto)}`;
            // Finalmente, abrimos una nueva ventana del navegador con el enlace generado
            try {
                window.open(numeroWhatsapp);
                location.reload(1);
            } catch (error) {
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
        limpiarCarrito() {
            sessionStorage.clear();
            this.carrito = [];
            this.total = 0;
            this.productos.forEach((producto) => {
                producto.cantidadSeleccionada = 0;
            });
        },
        async obtenerInformacionNegocio() {
            try {
                // Realiza una solicitud HTTP GET para obtener los informes desde el servidor
                const response = await axios.get(`/negocio?usuario=${this.nombreUsuario}`);
                // Actualiza la lista de informes con los datos recibidos
                this.negocio = response.data;
                this.nombreNegocio = response.data.nombre;
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
                const response = await axios.get(`/productos?usuario=${this.nombreUsuario}`);
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
        async fetchPublicaciones() {
            try {
                const response = await axios.get(`/publicaciones?usuario=${this.nombreUsuario}`);
                this.publicaciones = response.data.sort((a, b) => b.id - a.id);
            } catch (error) {
                console.error(error);
            }
        },
        filteredProductos(categoria) {
            // Filtra los productos basándose en la categoría y en el valor de disponibilidad
            return this.productosFiltrados.filter(producto => producto.producto_categoria === categoria && producto.producto_disponibilidad === 1);
        },
        limpiarBusqueda() {
            this.busqueda = '';
        },
        agrandarPublicacion(indice) {
            this.indiceAgrandada = indice;
            this.publicacionAgrandada = indice;  // Establece la publicación agrandada
        },
        cerrarAgrandarPublicacion() {
            this.indiceAgrandada = null;
            this.publicacionAgrandada = null;  // Cierra la vista agrandada
        },
    }
};
</script>

<style scoped>
.carrusel {
    overflow-x: auto;
    width: 100%;
    display: inline-flex;
    padding-bottom: 10px;
    margin: auto;
}

.carrusel::-webkit-scrollbar {
    height: 5px;
}

.carrusel::-webkit-scrollbar-thumb {
    border-radius: 5px;

}

.carrusel-item {
    text-align: center;
}




.mensajeWpp {
    cursor: pointer;
    font-size: 1.2rem;
    background: linear-gradient(to right, rgba(0, 255, 0, 0) 0%, rgba(90, 255, 90, 1) 10%, rgba(90, 255, 90, 1) 90%, rgba(0, 255, 0, 0) 100%);
}

.mensajeWpp:hover {
    background: linear-gradient(to right, rgba(0, 255, 0, 0) 0%, rgba(90, 230, 90, 1) 10%, rgba(90, 230, 90, 1) 90%, rgba(0, 255, 0, 0) 100%);

}

.error-content {
    height: 100%;
    padding-top: 20svh;
}

.flex {
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;
}

.absolute {
    position: absolute;
}

.navbar {
    position: fixed;
    opacity: 0;
    width: calc(100svw - 5px);
    top: 0;
    z-index: 10;
    animation: fadeIn 0.5s forwards;
}

.navbar-hidden {
    display: none;
}

@keyframes fadeIn {
    to {
        opacity: 1;
    }
}

.categoria-productos {
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.2s ease;
}

.categoria-activa {
    max-height: 1000px;
    overflow: auto;
}

.cantidad {
    vertical-align: middle;
    font-size: 20px;
}

.btn-mas {
    height: 40px;
    width: 40px;
    font-weight: bold;
    border: none;
    box-shadow: 0.2px 0.2px 2px;
    border-radius: 6px;
    background-color: white;
}

.btn-mas:hover {
    cursor: pointer;
    font-size: larger;
}

.btn-menos {
    height: 40px;
    width: 40px;
    font-weight: bold;
    border: none;
    box-shadow: 0.2px 0.2px 2px;
    border-radius: 6px;
    background-color: white;
}

.btn-menos:hover {
    font-size: larger;
    cursor: pointer;
}

.ver-carrito {
    position: fixed;
    bottom: 10px;
    right: 0;
    z-index: 2;
    text-align: end;
    width: 100%;
}
.ver-carrito-log {
    position: fixed;
    bottom: 80px;
    right: 0;
    z-index: 2;
    text-align: end;
    width: 100%;
}

.ver-carrito-btn {
    margin-right: 10px;
    background: black;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 20px;
}

.ver-carrito-btn:hover {
    cursor: pointer;

}

.link-dir {
    font-size: 1.2rem;
    text-decoration: none;
    color: white;
    display: block;
    font-weight: normal;
    text-shadow: none;
    background-color: rgba(0, 0, 0, 0.3);
    border-radius: 10svw;
    padding: 5px 10px;
}

.link-dir:hover {
    background-color: rgb(35, 35, 35);

}

.fondo-oscuro {
    background-color: rgb(122, 122, 122) !important;
    color: white;
}

.mr-2 {
    margin-right: 10px;
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


.btn-close:focus {
    box-shadow: none;
    opacity: var(--bs-btn-close-opacity);
}

.pantalla-carga:hover {
    cursor: wait;
}

@keyframes l2 {
    to {
        transform: rotate(1turn)
    }
}



.imagen-container {
    position: relative;
    height: 100%;
}

.presentacion {
    position: relative;
    height: 100svh;
}

.inline {
    margin-left: auto;
    font-weight: bold;
}

.img-negocio {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.texto-superpuesto {
    position: absolute;
    top: 20%;
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
    top: 55vh;
    text-align: center;
    width: 100%;
}

.texto-superpuesto2 {
    font-size: 20px;
    color: white;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
}

.ml {
    margin-left: 10%;
}

.scroll-down {
    width: 100%;
    height: 40px;
    object-fit: fill;
    border-radius: 15px;
}

.fade-in-out {
    animation: fade-in-out 2s infinite;
}

@keyframes fade-in-out {
    0% {
        opacity: 0;
    }

    50% {
        opacity: 1;
    }

    100% {
        opacity: 0;
    }
}

.body-container {
    margin: 0px 10px;
}

.nav-link {
    cursor: pointer;
    font-size: 1.1rem;
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

.input-group {
    position: relative;
}



.btn-limpiar-busqueda {
    position: absolute;
    top: 50%;
    right: 0.5rem;
    /* Ajusta según sea necesario */
    transform: translateY(-50%);
    z-index: 5;
    /* Asegura que el botón esté sobre el input */
}

.mauto {
    margin: 10px;
}

.mcenter {
    margin: auto;
}

.titulo-categoria {
    font-size: 1.3rem;
    background: white;
    /* background:  rgb(254, 255, 174); */
    width: 100%;
    margin: 0px;
    padding: 5px 15px;
    cursor: pointer;
    border-radius: 4px;
    display: flex;
}

.titulo-categoria:hover {
    background: rgb(232, 231, 231);
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

.imagen {
    height: 100px;
    width: 100px;
    /* Ajustamos el tamaño de la imagen */
    margin-right: 20px;
}


.ancho {
    margin-bottom: 10vh;
    overflow: auto;
}

.derecha {
    display: inline-flex;
    justify-content: center;
    gap: 15px;
    margin-right: 10px;
}


.ancho-busqueda {
    width: 60%;
    height: 40px;
    display: inline-flex;
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

.publicacion-agrandada {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgb(0, 0, 0);
    /* Fondo oscuro semi-transparente */
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
    overflow: hidden;
    /* Asegura que esté por encima de todo */
}

.imagen-agrandada {
    max-height: 60vh;
    max-width: 80vw;
    object-fit: contain;
    /* Ajusta la imagen sin distorsionarla */
}

.btn-close-agrandada {
    position: absolute;
    top: 20px;
    /* Ajusta según sea necesario */
    right: 20px;
    /* Ajusta según sea necesario */
    z-index: 10000;
    /* Asegura que el botón esté por encima de la imagen */
    background-color: rgba(255, 255, 255, 1) !important;
    opacity: 1;
    border-radius: 100%;
    font-size: 1rem;
    padding: 5px;
    cursor: pointer;
}

.btn-anterior {
    position: absolute;
    /* Ajusta según sea necesario */
    left: 10svw;
    /* Ajusta según sea necesario */
    z-index: 10000;
    /* Asegura que el botón esté por encima de la imagen */
    background-color: rgba(0, 0, 0, 0) !important;
    /* Fondo semi-transparente para el botón */
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
}

.btn-siguiente {
    position: absolute;
    /* Ajusta según sea necesario */
    right: 10svw;
    /* Ajusta según sea necesario */
    z-index: 10000;
    /* Asegura que el botón esté por encima de la imagen */
    background-color: rgba(0, 0, 0, 0) !important;
    /* Fondo semi-transparente para el botón */
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
}

.publicacion-container {
    overflow: hidden;
    /* Asegura que la imagen no desborde el contenedor */
    justify-content: center;
    align-items: center;
    border-radius: 5px;
    height: 100px;
    width: 100px;
    display: flex;
}

.imagen-publicacion {
    width: 90px;
    height: 90px;
    border-radius: 50%;
    background: linear-gradient(45deg, #33f043, #3ce6ad, #27d0dc, #237dcc, #2873ff);
    /* Gradiente de Instagram */
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 4px;
    /* Espacio entre la imagen y el borde */
    cursor: pointer;
    position: relative;
    object-fit: cover;
}

.imagen-publicacion img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: white;
    /* Fondo blanco para simular el borde interno de la historia */
}

/* Pseudo-elemento para el borde con gradiente */
.imagen-publicacion::before {
    position: absolute;
    top: -5px;
    /* Ajusta el tamaño del borde */
    left: -5px;
    /* Ajusta el tamaño del borde */
    width: calc(100% + 10px);
    /* Asegúrate de que el borde se extienda más allá de la imagen */
    height: calc(100% + 10px);
    /* Asegúrate de que el borde se extienda más allá de la imagen */
    border-radius: 50%;
    background-color: white;
    z-index: -1;
    /* Coloca el borde detrás de la imagen */
}


.imagen-publicacion:hover {
    cursor: pointer;
    border: rgb(112, 145, 255) 1px solid;
}

.error-content {
    text-align: center;
}

.container2 {
    margin: 0px 30vw;
    min-height: calc(100svh - 97.4px);
}

.hr-mobile {
    visibility: hidden;
}

@media screen and (max-width: 992px) {
    .btn-siguiente {
        right: 1svw;
    }

    .btn-anterior {
        left: 1svw;
    }

    .hr-mobile {
        visibility: visible;
    }

    .carrusel {
        padding-bottom: 0;
    }

    .carrusel::-webkit-scrollbar {
        display: none;
    }

    .ancho-busqueda {
        width: 100%;
    }

    .navbar {
        width: 100svw;
    }

    .img-negocio {
        object-fit: cover;
        height: 100%;
    }

    .presentacion {
        height: 100svh;
    }


    .container2 {
        margin: 0px;
    }

}
</style>
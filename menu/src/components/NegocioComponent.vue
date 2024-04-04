<template>
    <div>
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
                        <li class="nav-item" v-for="(categoria, index) in categoriasOrdenadas" :key="index">
                            <a class="nav-link" @click="scrollToCategoria(index); collapseNavbar()" href="#">{{
                    categoria }}</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>

        <div v-if="productos.length">
            <div class="presentacion">
                <!-- Imagen del negocio con texto superpuesto -->
                <div class="imagen-container">
                    <img :src="negocio.imagen" alt="" class="img-negocio">
                    <div class="texto-superpuesto">BIENVENIDOS</div>
                    <div class="texto-superpuesto2">"{{ negocio.descripcion }}"</div>
                </div>
            </div>
            <div class="tarjeta-container">
                <div class="ancho">
                    <div class="mt-2" v-for="(categoria, index) in categoriasOrdenadas" :key="index"
                        :id="`categoria-${index}`">
                        <div class="titulo-categoria">{{ categoria }}</div>
                        <div class="p-2">
                            <div class="item-container mt-2" v-for="(producto, index) in filteredProductos(categoria)"
                                :key="index">
                                <div class="item-imagen" v-if="producto.producto_imagen">
                                    <div >                                    
                                        <img class="imagen" :src="producto.producto_imagen" alt=" ">
                                    </div>
                                </div>
                                <!-- Nombre del producto -->
                                <div class="item-texto">
                                    <div class="item-texto-block">
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
                            </div>
                        </div>
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
                    <p class="lead">Lo sentimos, la página que buscas no se encuentra disponible.</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    data() {
        return {
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
                imagen: ''
            },
        };
    },
    mounted() {
        // Obtener el nombre de usuario de la URL
        this.nombreNegocio = this.$route.params.nombreNegocio;
        // Lógica para obtener los productos del negocio con el nombre de usuario dado
        this.fetchProductos();
        this.obtenerInformacionNegocio();
    },
    computed: {
        categoriasOrdenadas() {
            // Obtiene las categorías únicas de los productos filtrados y las ordena alfabéticamente
            return [...new Set(this.productosFiltrados.map(producto => producto.producto_categoria))].sort();
        },
        productosFiltrados() {
            // Filtra los productos basándose en el valor de busqueda y producto_disponibilidad = 1
            return this.productos.filter(producto => {
                const nombre = producto.producto_nombre || '';
                const descripcion = producto.producto_descripcion || '';
                const categoria = producto.producto_categoria || '';
                const precio = producto.producto_precio || '';
                return (
                    nombre.toLowerCase().includes(this.busqueda.toLowerCase()) ||
                    descripcion.toLowerCase().includes(this.busqueda.toLowerCase()) ||
                    categoria.toLowerCase().includes(this.busqueda.toLowerCase()) ||
                    precio.toLowerCase().includes(this.busqueda.toLowerCase())
                );
            });
        },
        categoriasConProductosFiltrados() {
            // Obtiene las categorías únicas de los productos filtrados
            return [...new Set(this.productosFiltrados.map(producto => producto.producto_categoria))];
        }
    },
    methods: {
        async obtenerInformacionNegocio() {
            try {
                // Realiza una solicitud HTTP GET para obtener los informes desde el servidor
                const response = await axios.get(`/miNegocio?usuario=${localStorage.getItem('usuario')}`);
                // Actualiza la lista de informes con los datos recibidos
                this.negocio = response.data;
            } catch (error) {
                console.error("Error al cargar los productos:", error);
            }

        },
        scrollToCategoria(categoria) {
            // Función para desplazarse a la categoría específica con un offset
            const categoriaElement = document.getElementById(`categoria-${categoria}`);
            if (categoriaElement) {
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const categoriaPosition = categoriaElement.getBoundingClientRect().top;
                window.scrollTo({
                    top: window.scrollY + categoriaPosition - navbarHeight,
                    behavior: 'smooth'
                });
            }
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

                // Ordena los productos alfabéticamente por el nombre
                const productosOrdenados = response.data.sort((a, b) => {
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

                // Actualiza la lista de productos con los datos recibidos y ordenados
                this.productos = productosOrdenados;
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
.navbar-brand {
    font-weight: bold;
}

.presentacion {
    height: calc(100vh - 56px);
    z-index: 0;
    position: relative;
}

.imagen-container {
    position: relative;
    height: 100%;
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
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 3rem;
    font-weight: bold;
    color: white;
    text-align: center;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
}

.texto-superpuesto2 {
    position: absolute;
    top: 57%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 20px;
    color: white;
    text-align: center;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
}

nav {
    z-index: 1;
    position: sticky;
    top: 0px;
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

.tarjeta-container {
    margin: 0 20vw;
    padding: 10px;
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

.titulo-categoria {
    font-weight: bold;
    font-size: 30px;
    font-style: italic;
    background-color: rgb(253, 255, 119);
    width: 100%;
    margin: 0px;
    padding: 5px 10px;
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
    /* Añadimos un margen a la derecha */
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
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
    width: 400px;
    height: 50px;
    display: inline-flex;
    margin-top: auto;
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
    border-bottom: solid rgba(0,0,0,0.2) 1px;
    padding-bottom: 5px;
}

.item-texto-block {
    flex-grow: 1;
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
    text-decoration: none;
    padding: 5px 10px;
    border: 1px solid transparent;
    border-radius: 5px;
    background-color: #28a745;
    color: white;
}

.item-texto-block-end:hover {
    background-color: #218838;
}

@media screen and (max-width: 992px) {
    .presentacion {
        height: calc(100vh - 100px);
    }

    .ancho-busqueda {
        width: 100vw;
    }



    .tarjeta-container {
        margin: auto;
    }
}
</style>
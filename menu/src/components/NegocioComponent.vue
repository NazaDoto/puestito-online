<template>
    <div>

        <div class="text-center mt-2 titulo">~ {{ nombreNegocio.toUpperCase() }} ~</div>
        <div class="tarjeta-container">
            <div class="flex">
                <div class="izquierda ancho-busqueda">
                    <input class="form-control" v-model="busqueda" type="text" name="busqueda" id=""
                        placeholder="Buscar" title="Ingrese una palabra clave...">
                </div>
            </div>
            <div class="ancho">
                <div class="mt-2" v-for="(categoria, index) in categoriasConProductosFiltrados" :key="index">
                    <div class="titulo-categoria">{{ categoria }}</div>
                    <div class="p-2">
                        <div class="tarjetaProducto" v-for="(producto, i) in filteredProductos(categoria)" :key="i">
                            <div v-if="producto.producto_imagen">
                                <img class="imagen" :src="producto.producto_imagen" alt=" ">
                            </div>
                            <div class="textoTarjeta">
                                <div class="flex mt-2 ">
                                    <h3 class="izquierda">{{ producto.producto_nombre }}</h3>
                                    <h3 class="derecha">${{ producto.producto_precio }}</h3>
                                </div>
                                <hr>
                                <div class="descripcion">
                                    {{ producto.producto_descripcion }}
    
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
</template>

<script>
import axios from 'axios';
export default {
    data() {
        return {
            nombreNegocio: '', // Variable para almacenar el nombre de usuario del negocio
            productos: [],      // Array para almacenar los productos del negocio
            busqueda: '',
        };
    },
    mounted() {
        // Obtener el nombre de usuario de la URL
        this.nombreNegocio = this.$route.params.nombreNegocio;

        // Lógica para obtener los productos del negocio con el nombre de usuario dado
        this.fetchProductos();
    },
    computed: {
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
        async fetchProductos() {
            try {
                // Realiza una solicitud HTTP GET para obtener los productos desde el servidor
                const response = await axios.get(`/productos?usuario=${this.nombreNegocio}`);

                // Actualiza la lista de productos con los datos recibidos
                this.productos = response.data;
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

<style>
hr{
    margin: 0px;
}
.tarjeta-container {
    padding: 10px;
}
.textoTarjeta{
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
}

.tarjetaProducto {
    box-shadow: 0.5px 1px 4px;
    margin:10px 10px;
    border: 5px;
    background-color: white;
    border-radius: 10px;
    display: inline-block;
}
.descripcion{
    font-style:italic;
}
img{
    object-fit:cover;
}
.imagen{
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    width:400px;
    height: 200px;
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

@media screen and (max-width: 992px) {
    .ancho-busqueda {
        width: 100vw;
    }
    .imagen{
        width: 100%;
    }
    .tarjetaProducto{
        display: block;
        margin: 10px 0px;
    }
}
</style>
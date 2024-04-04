<template>
    <div>
        <nav class="navbar navbar-light bg-light">
            <!-- Logo -->
            <a class="navbar-brand" href="#">
                <img src="/favicon.ico" width="30" height="30" class="d-inline-block align-top" alt="">
                Menute
            </a>
            <!-- Botón de login -->
            <a class="link-login" href="./login">Login</a>
        </nav>
        <div class="container2 mt-4">
            <div v-if="cargando" class="pantalla-carga text-center">
                <div class="logo-carga">
                    <img class="logo-img" src="/favicon.ico" width="50"  alt="">
                    <div class="texto-carga">
                        Buscando negocios
                    </div>
                </div>
            </div>
            <div v-else>
                <div class="mt-2">
                    <h1>¿A dónde vamos hoy? 😈</h1>
                    <div class="izquierda ancho-busqueda">
                        <input class="form-control" v-model="busqueda" type="text" name="busqueda" id=""
                            placeholder="Buscar" title="Ingrese una palabra clave...">
                    </div>
                    <button class="btn btn-success derecha" @click="mostrarMapa">{{ !mapaMostrado2 ? 'Ver Mapa' : `Ocultar
                        Mapa`}}</button>
                </div>
                <div class="negocios-body">
                    <div class="modalMapa" v-show="mapaMostrado2">
                        <div id="map"></div>
                    </div>
                    <ul>
                        <li class="item-container mt-2" v-for="(negocio, index) in negociosFiltrados" :key="index">
                            <div class="item-imagen">
                                <div v-if="negocio.imagen">
                                    <img class="imagen" :src="negocio.imagen" alt=" ">
                                </div>
                            </div>
                            <!-- Nombre del negocio -->
                            <div class="item-texto">
                                <div class="item-texto-block">
                                    <div class="item-nombre">
                                        {{ negocio.nombre }}
                                    </div>
                                    <div class="item-descripcion" v-if="negocio.descripcion">
                                        "{{ negocio.descripcion }}"
                                    </div>
                                </div>
                            </div>
                            <!-- Botón para dirigirse al menú -->
                            <div class="item-btn">
                                <a class="item-texto-block-end" :href="'http://192.168.1.235:8080/' + negocio.usuario"
                                    target="_blank"><img src="/favicon.ico" width="30" alt=""></a>
                            </div>
                        </li>
                    </ul>
                    <div v-if="negociosFiltrados.length === 0" class="text-center mt-3">
                        No se encontraron resultados para esa búsqueda.
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
import L from 'leaflet';
import axios from 'axios';

export default {
    name: 'MapaComponent',
    data() {
        return {
            negocios: [],
            busqueda: '',
            mapaMostrado: false,
            mapaMostrado2: false,
            cargando: true
        };
    },
    created() {
        this.fetchNegocios();
    },
    computed: {
        negociosFiltrados() {
            // Filtra los informes basándose en el valor de busqueda
            return this.negocios.filter(negocio => {
                const nombre = negocio.nombre || '';
                const direccion = negocio.direccion || '';
                return (
                    nombre.toLowerCase().includes(this.busqueda.toLowerCase()) ||
                    direccion.toLowerCase().includes(this.busqueda.toLowerCase())
                    // Agrega más condiciones de búsqueda según tus necesidades
                );
            });
        },
    },
    methods: {
        async fetchNegocios() {
            try {
                const response = await axios.get('/negocios');
                this.negocios = response.data;
            } catch (error) {
                console.error("Error al obtener los datos de los negocios:", error);
            } finally {
                this.cargando = false; // Indicar que la carga ha terminado, independientemente del resultado
            }
        },
        async inicializarMapa() {
            const map = L.map('map');

            // Añade un mapa base
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                enableRetina: true,
                maxZoom: 19,
                attribution: '&copy; <a href="https://linkedin.com/in/nazadoto">Nazareno Navarrete</a>'
            }).addTo(map);

            // Centra el mapa en las coordenadas proporcionadas
            map.setView([-27.7876, -64.2596], 14);

            const myIcon = L.icon({
                iconUrl: '/recursos/pin.png',
                iconSize: [38, 38], // Tamaño del icono
                iconAnchor: [19, 38], // Punto de anclaje del icono
                popupAnchor: [0, -38] // Punto de anclaje del popup
            });

            try {
                // Realiza la solicitud al backend para obtener la información de los negocios


                // Itera sobre los datos recibidos y agrega marcadores al mapa
                this.negocios.forEach(punto => {

                    L.marker([punto.latitud, punto.longitud], { icon: myIcon }).addTo(map)
                        .bindPopup(`<div style="max-width: 150px;">
                <b style="font-size:20px;">${punto.nombre}</b><br>
                <a style="text-decoration:none;color:white;font-size:12px;padding:4px 6px;" href="http://192.168.1.235:8080/${punto.usuario}" target="_blank"><img src="/favicon.ico" width="20" alt=""></a>
                <p style="margin:5px 0px"><b>Dirección:</b> ${punto.direccion}</p>
                <p style="margin:5px 0px"><b>Correo:</b> ${punto.correo}</p>
                <p style="margin:5px 0px"><b>Teléfono:</b> ${punto.telefono}</p>
                <p style="text-align:center;margin:7px 0px">"${punto.descripcion}"</p>
                <div style="text-align:center;">
                <a href="${punto.instagram}"><img style="margin:0px 10px" width='20' src="/recursos/instagram.png"></a>
                <a href="${punto.facebook}"><img style="margin:0px 10px" width='16' src="/recursos/facebook.png"></a> </div>
                </div>`, { className: 'custom-popup' }).bindTooltip(`<b>${punto.nombre}</b>`, { direction: 'bottom', offset: L.point(0, 10) });
                });
                document.getElementById('map').classList.add('show');

            } catch (error) {
                console.error("Error al obtener los datos de los negocios:", error);
            }
        },
        mostrarMapa() {
            if (!this.mapaMostrado2) {
                if (!this.mapaMostrado) {
                    this.mapaMostrado = true;
                    this.mapaMostrado2 = true;
                    this.$nextTick(() => {
                        this.inicializarMapa();
                    });
                } else {
                    this.mapaMostrado2 = true;
                }
            } else {
                this.mapaMostrado2 = false;
            }
        }
    },
};
</script>

<style scoped>
.texto-carga{
    font-style: italic;
    margin: 20px;
    color:grey;
}
.logo-carga{
    margin-top:-10vh;    
}
.logo-img{
    animation: l2 2s infinite;
}
.pantalla-carga{
    z-index: 2;
    position:absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: calc(100vh - 100px);
    background-color:white;
    align-content: center;
}
@keyframes l2 {to{transform: rotate(1turn)}}
.ancho-busqueda {
    width: 400px;
    height: 50px;
    display: block;
    margin-top: auto;
}

.container2 {
    margin: 0px 10px;
}

.navbar-brand {
    font-style: italic;
}

.navbar {
    padding-left: 20px;
    padding-right: 20px;
}

.link-login {
    text-decoration: none;
}

#map {
    box-shadow: 0.5px 1px 4px;
    height: 0;
    /* Establecemos la altura inicial en 0 */
    border-radius: 10px;
    margin-top: 10px;
    opacity: 0;
    /* Establecemos la opacidad inicial en 0 */
    overflow: hidden;
    /* Ocultamos el contenido que excede el contenedor */
    transition: height 0.5s ease, opacity 0.5s ease;
    height: 50vh;
    /* Altura deseada */
}

#map.show {
    opacity: 1;
    /* Opacidad deseada */
}

ul {
    padding: 0;
}

.item-container {
    box-shadow: 0.5px 1px 4px;
    margin: 10px 0px;
    border: 5px;
    background-color: white;
    border-radius: 10px;
    display: flex;
    /* Utilizamos flexbox para posicionar los elementos */
    align-items: center;
    /* Centramos verticalmente los elementos */
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

.item-texto-block {
    flex-grow: 1;
    /* Hacemos que este bloque ocupe el espacio disponible */
}

.item-nombre {
    font-size: 20px;
    font-weight: bold;
}

.item-descripcion {
    font-size: 18px;
}

.item-direccion {
    font-style: italic;
    font-size: 15px;
}

.item-btn {
    margin-left: auto;
    /* Empuja este elemento hacia la derecha */
    margin-right: 20px;
}

.item-texto-block-end {
    text-decoration: none;
    padding: 5px 10px;
}

.item-texto-block-end:hover {
    cursor:pointer;
}


@media screen and (max-width: 992px) {
    .ancho-busqueda {
        width: 200px;
    }
}
</style>

<template>
    <div>
        <NavbarPublicoComponent></NavbarPublicoComponent>
        <div class="container2 mt-4">
            <div v-if="cargando" class="pantalla-carga text-center">
                <div class="logo-carga">
                    <img class="logo-img" src="/favicon.ico" width="50" alt="">
                    <div class="texto-carga">
                        Buscando negocios
                    </div>
                </div>
            </div>
            <div v-else>
                <div class="mt-2">
                    <h1>¿Qué estás buscando?</h1>
                    <div class="izquierda ancho-busqueda">
                        <input class="form-control barra-busqueda" v-model="busqueda" type="text" name="busqueda" id=""
                            placeholder="Buscar" title="Ingrese una palabra clave...">
                    </div>
                    <button class="btn btn-menu derecha" @click="mostrarMapa">{{ !mapaMostrado2 ? 'Ver Mapa' :
                        `Ocultar
                        Mapa`}}</button>
                </div>

                <div class="negocios-body">
                    <div class="modalMapa mt-2" v-show="mapaMostrado2" style="height: 400px;">
                        <!-- Aquí iría todo lo relacionado con el mapa de Google Maps -->
                        <GMapMap style="height: 400px;" :center="mapCenter" :zoom="zoom" :options="options">
                            <GMapMarker v-if="posicionActual" :position="posicionActual" :options="{icon:'/recursos/pinself.png'}" :title="'Estás aquí.'">
                            </GMapMarker>
                            <GMapMarker v-for="(negocio, index) in negocios" :key="index" :position="negocio.location"
                                :title="negocio.nombre" @click="openInfoWindow(index)" :options="{icon:'/recursos/pin30.png'}" id="gmapm">
                                <GMapInfoWindow v-if="infoWindowOpened == index" :options="infoWindow[index].options"
                                    :closeclick="true" @closeclick="openInfoWindow(null)">
                                    <div style="max-width: 150px;">
                                        <b style="font-size:20px;">{{ negocio.nombre }}</b><br>
                                        <div style="text-align:center;">
                                            <a style="text-decoration:none;color:white;font-size:12px;padding:4px 6px;"
                                                :href="'https://puestito.online/' + negocio.usuario" target="_blank"><img
                                                    src="/favicon.ico" width="20" alt=""></a>
                                            <a v-if="negocio.instagram" :href="negocio.instagram" target="blank"><img
                                                    style="margin:0px 10px" width='20'
                                                    src="/recursos/instagram.png"></a>
                                            <a v-if="negocio.facebook" :href="negocio.facebook" target="blank"><img
                                                    style="margin:0px 10px" width='20' src="/recursos/facebook.png"></a>
                                        </div>
                                        <p style="margin:5px 0px"><b>Dirección:</b> {{ negocio.direccion }}</p>
                                        <p style="margin:5px 0px"><b>Correo:</b> {{ negocio.correo }}</p>
                                        <p style="margin:5px 0px"><b>Teléfono:</b> {{ negocio.telefono }}</p>
                                        <p style="text-align:center;margin:7px 0px">"{{ negocio.descripcion }}"</p>
                                    </div>
                                </GMapInfoWindow>
                            </GMapMarker>
                        </GMapMap>
                    </div>

                    <ul>
                        <li class="item-container mt-2" v-for="(negocio, index) in negociosFiltrados" :key="index">
                            <div class="item-imagen">
                                <div v-if="negocio.imagen">
                                    <img class="imagen" :src="negocio.imagen" alt=" ">
                                </div>
                            </div>
                            <!-- Nombre del negocio -->
                            <div class="item-texto-block">
                                <div class="item-nombre">
                                    {{ negocio.nombre }}
                                </div>
                                <div class="item-descripcion" v-if="negocio.descripcion">
                                    "{{ negocio.descripcion }}"
                                </div>
                            </div>
                            <!-- Botón para dirigirse al menú -->
                            <div class="item-btn">
                                <a v-if="negocio.location !== null" class="cursor-pointer mt-1" @click="localizar(negocio, index)"><img src="/recursos/pin.png" width="30" alt=""></a>
                                <router-link class="item-texto-block-end" :to="'/' + negocio.usuario" target="_blank">
                                    <img src="/favicon.ico" width="30" alt="">
                                </router-link>
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

import axios from 'axios';
import NavbarPublicoComponent from './NavbarPublicoComponent.vue';
import router from '@/router';

export default {
    components: {
        NavbarPublicoComponent,
    },
    name: 'MapaComponent',
    data() {
        return {
            posicionActual: '',
            options: {
                disableDefaultUI: true,
                styles: [{
                    featureType: 'poi.business',
                    stylers: [{ visibility: 'off' }],
                }, {
                    featureType: 'transit',
                    elementType: 'labels.icon',
                    stylers: [{ visibility: 'off' }],
                },],
            },
            infoWindowOpened: null,
            infoWindow: [],
            mapCenter: { lat: -27.7876, lng: -64.2596 },
            zoom: 14,
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
    mounted(){
        if (this.$route.params){
            router.push('/', this.$route.params);
        }
    },
    computed: {
        negociosFiltrados() {
            return this.negocios.filter(negocio => {
                const nombre = negocio.nombre || '';
                const descripcion = negocio.descripcion || '';
                return (
                    nombre.toLowerCase().includes(this.busqueda.toLowerCase()) ||
                    descripcion.toLowerCase().includes(this.busqueda.toLowerCase())
                );
            });
        },
    },
    methods: {
        localizar(negocio, index){
            this.mapaMostrado2 = true;
            this.mapCenter = negocio.location;
            this.infoWindowOpened = index;
        },
        openInfoWindow(index) {
            if (this.infoWindowOpened == index) {
                this.infoWindowOpened = null;
            } else {
                this.infoWindowOpened = index;
            }
        },
        async inicializarMapa() {
            try {
                if (!navigator.geolocation) {
                    console.log('No funciona geolocation. Centrando mapa en Plaza Libertad.');
                } else {
                    navigator.geolocation.getCurrentPosition((coords) => {
                        const position = {
                            lat: coords.coords.latitude,
                            lng: coords.coords.longitude
                        };
                        this.mapCenter = this.posicionActual = position;
                        
                    }, (error) => {
                        console.log('Error al geolocalizar. Inicializando en Plaza Libertad. ', error);
                    });
                }
            } catch (error) {
                console.error("Error al obtener la ubicación actual:", error);
            }
        },
        async fetchNegocios() {
            try {
                const response = await axios.get('/negocios');
                this.negocios = response.data;
                this.infoWindow = Array(this.negocios.length).fill({
                    open: false,
                    options: {
                        pixelOffset: { width: 0, height: -10 },
                        maxWidth: 320,
                        maxHeight: 320
                    }
                });
            } catch (error) {
                console.error("Error al obtener los datos de los negocios:", error);
            } finally {
                this.cargando = false;
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
.popup {
    position: absolute;
    top: 10px;
    background-color: rgba(255, 255, 255, 0.7);
    border-radius: 50px;
}

.modalMapa {
    height: 100px;
}

.texto-carga {
    font-style: italic;
    margin: 20px;
    color: grey;
}
.cursor-pointer{
    cursor:pointer;
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
    height: calc(100vh);
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

.ancho-busqueda {
    width: 400px;
    height: 50px;
    display: block;
    margin-top: auto;
}

.container2 {
    margin: 0px 30vw;
    min-height: calc(100vh - 200px);
}

.navbar-brand {
    font-style: italic;
}

.link-login {
    text-decoration: none;
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
    align-items: center;
}

.imagen {
    height: 100px;
    width: 100px;
    margin-right: 20px;
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
}

.item-texto-block {
    flex-grow: 1;
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
    display: inline-flex;
    margin-left: auto;
    margin-right: 20px;
}

.item-texto-block-end {
    text-decoration: none;
    padding: 5px 10px;
}

.item-texto-block-end:hover {
    cursor: pointer;
}

@media screen and (max-width: 992px) {
    .ancho-busqueda {
        width: 200px;
    }

    .container2 {
        min-height: calc(100vh - 200px);
        margin: 0px 10px;
    }
}
</style>

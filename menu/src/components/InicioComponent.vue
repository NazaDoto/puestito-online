<template>
    <div>
        <nav class="navbar navbar-dark bg-dark">
            <!-- Logo -->
            <a class="navbar-brand" href="#">
                <img src="/favicon.ico" width="30" height="30" class="d-inline-block align-top" alt="">
                Menute
            </a>
            <!-- Botón de login -->
            <a class="link-login" href="./login">Login</a>
        </nav>
        <div class="container mt-4">
            <div class="seccion mt-2">
                <h1>Lista de negocios</h1>
                <button class="btn btn-success derecha"  @click="mostrarMapa">{{!mapaMostrado2 ? 'Ver Mapa' : 'Ocultar Mapa'}}</button>
            </div>
            <div class="modalMapa" v-show="mapaMostrado2">
                <div id="map"></div>
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
            mapaMostrado: false,
            mapaMostrado2: false
        };
    },
    mounted() {

    },
    methods: {
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
                const response = await axios.get('/negocios');
                const data = response.data;

                // Itera sobre los datos recibidos y agrega marcadores al mapa
                data.forEach(punto => {
                    L.marker([punto.latitud, punto.longitud], { icon: myIcon }).addTo(map)
                        .bindPopup(`<div style="max-width: 150px;">
                <b style="font-size:20px;">${punto.nombre}</b><br>
                <p><b>Dirección:</b> ${punto.direccion}</p>
                <p><b>Correo:</b> ${punto.correo}</p>
                <p><b>Teléfono:</b> ${punto.telefono}</p>
                <a href="${punto.sitio}" target="_blank">Ver Menú</a></div>`, { className: 'custom-popup' });
                });
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
.modalMapa{
    position: absolute;
    margin:auto;
    width:70vw;
    height: 50vh;
    top: 21vh;
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
    height: 50vh;
}
</style>
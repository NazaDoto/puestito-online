<template>
    <div>
        <div class="body">
            <router-view></router-view>
        </div>
        <PieComponent />
        
    </div>
</template>

<script>
import PieComponent from './components/PieComponent.vue';
import '@popperjs/core';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
export default {
    name: 'App',
    components: {
        PieComponent,

    },
    methods: {
        // checkAuthentication() {
        //   const isAuthenticated = !!localStorage.getItem("token");/* Agrega aquí tu lógica para verificar si el usuario está autenticado */
        //   if (!isAuthenticated) {
        //     this.$router.push("/login");
        //   }
        // },
    },
    mounted() {
        //this.checkAuthentication();
    },
}
</script>

<style>
.body{
    min-height: calc(100svh  - 41.4px)!important;
}
.pl-2 {
    padding-left: 10px;
}

.modalCategoriaContainer {
    position: absolute;
    z-index: 1233;
    margin:0;
    padding:0;
    top:0;
    left:0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.8);
}

.modalCategoria {
    padding: 20px;
    margin: auto;
    width: 30vw;
    background-color: white;
    border-radius: 10px;
}


.btn-menu {
    color: white;
    border: none;
    box-shadow: 0.2px 0.2px 2px black !important;
    border-radius: 1px;
    background: linear-gradient(#94c1fc, #005acf) !important;
    min-width: 100px;
}

.btn-menu:hover {
    background: linear-gradient(rgb(148, 193, 252), rgb(0, 87, 168)) !important;
}

.btn-menu-danger {
    color: white;
    border: none;
    box-shadow: 0.2px 0.2px 2px black !important;
    border-radius: 1px;
    background: linear-gradient(#ffafaf, #cf0000) !important;
}

.btn-menu-danger:hover {
    background: linear-gradient(rgb(255, 175, 175), rgb(168, 0, 0)) !important;
}

.btn-agregar {
    background: linear-gradient(rgb(255, 251, 234), rgb(255, 240, 155)) !important;
    box-shadow: 0.2px 0.2px 2px white;
    border: none;
    border-radius: 1px;
}

.btn-agregar:hover {
    background: linear-gradient(rgb(253, 247, 217), rgb(255, 236, 128)) !important;
}

.barra-busqueda {
    border:none;
    box-shadow: 0.2px 0.2px 2px !important;
    border-radius: 1px !important;
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

@media screen and (max-width: 992px) {
    .modalCategoria {
    width: 90vw;
}
}
</style>

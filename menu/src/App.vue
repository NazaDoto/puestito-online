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
html{
    overflow-y: auto;
}
/* width */
::-webkit-scrollbar {
  width: 5px;
}

/* Track */
::-webkit-scrollbar-track {
    
    background: #f1f1f1;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #888;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #555;
}
body{
    background-color:#f0f0f0;
}
.body{
    width:calc(100svw - 5px);
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

.btn-limpiar {
  display: block;
  background: linear-gradient(rgb(255, 255, 255),
      rgb(214, 214, 214)) !important;
  border: none;
  border-radius: 2px;
}

.btn-limpiar:hover {
  background: linear-gradient(rgb(242, 242, 242),
      rgb(201, 201, 201)) !important;
  cursor: pointer;
}
.btn-menu {
    color: white;
    border: none;
    border-radius: 2px;
    background: linear-gradient(#94c1fc, #005acf) !important;
    min-width: 100px;
}

.btn-menu:hover {
    background: linear-gradient(rgb(148, 193, 252), rgb(0, 87, 168)) !important;
    color: white;
}
.btn-menu:focus{
    color:white !important;
}
.navbar-toggler {
    outline: 0 !important;
    border: none !important;
    color: transparent;
    margin-left: 10px;
    padding: 3px;
}

.navbar-toggler:focus {
    outline: 0 !important;
    background:lightgray !important;
}
.btn-menu-danger {
    color: white;
    border: none;
    border-radius: 2px;
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
    width: 100svw;
    height: 100svh;
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
.body{
    width:100svw;

}
}
</style>

<template>
  <div>
    <router-view></router-view>
    <PieComponent />

  </div>
</template>

<script>
import PieComponent from './components/PieComponent.vue';

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
@media screen and (max-width: 992px) {
    .container {
        width: 90vw !important;
    }
}

.btn-menu {
    color: white;
    border: none;
    box-shadow: 0.2px 0.2px 2px black !important;
    border-radius: 1px;
    background: linear-gradient( rgb(148, 193, 252), rgb(0, 90, 207)) !important;
    min-width: 100px;
}

.btn-menu:hover {
    background: linear-gradient( rgb(148, 193, 252), rgb(0, 87, 168)) !important;
}

.btn-menu-danger {
    color: white;
    border: none;
    box-shadow: 0.2px 0.2px 2px black !important;
    border-radius: 1px;
    background: linear-gradient( rgb(255, 175, 175), rgb(207, 0, 0)) !important;
}

.btn-menu-danger:hover {
    background: linear-gradient( rgb(255, 175, 175), rgb(168, 0, 0)) !important;
}

.barra-busqueda {
    box-shadow: 0.2px 0.2px 2px;
    border-radius: 1px;
}
</style>

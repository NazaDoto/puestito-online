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
</style>

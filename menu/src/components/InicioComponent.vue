<template>
  <div class="todo">
    <NavbarAdminComponent v-if="esAdmin()"/>
    <NavbarComponent v-else></NavbarComponent>
    <div class="container mt-4 mb-2">
      <h1 class="text-center">Bienvenid@, {{ leerUsuario() }}</h1>
      <div v-if="esAdmin()" class="container ">
        <div class="col-md-6">
          <router-link class="btn btn-success" to="/register">Nuevo Negocio</router-link>
        </div>
        <div class="col-md-6 mt-2">

          <router-link class="btn btn-success" to="/negocios">Listar Negocios</router-link>
        </div>

      </div>
      <div v-else class="container text-center">
        <div class="row g-3 div-forms border">

          <div class="col-md-6">
            <h2 class="titulo-div-forms mb-2">Productos</h2>
            <router-link class="btn btn-success" to="/nuevoProducto">Nuevo Producto</router-link><br>
            <router-link class="btn btn-success" to="/productos">Listar Productos</router-link>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>
  
<script>
import NavbarComponent from "./NavbarComponent.vue";
import NavbarAdminComponent from "./NavbarAdminComponent.vue";
import { RouterLink } from "vue-router";
export default {
  components: {
    NavbarComponent,
    NavbarAdminComponent,
    "router-link": RouterLink,
  },
  methods: {
    leerUsuario() {
      return localStorage.getItem("nombre");
    },
    esAdmin() {
      return (localStorage.getItem("usuario") == "admin");
    }
  },
};
</script>
  
<style scoped>
.col-md-6{
  margin: auto;
  display: block !important;

}
.titulo-div-forms {
    margin: auto;
}

.div-forms {
    margin: auto 15vw auto 15vw;
    padding: 20px;
    border-color: black !important;
    border-radius: 5px !important;
    justify-content: center !important;
}

.btn{
  display: block;
  
}
.todo{
  height: 80vh;
}

@media screen and (max-width: 992px) {
  .col-md-6{
    display: block !important;
  }
  .btn {
    margin: auto;
    display: block !important;
}
.div-forms{
  margin:20px;
}

}
</style>
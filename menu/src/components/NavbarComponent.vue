<template>
  <div class="">
    <div class="nav-mobile-bg">
        <div class="flex-mobile">
          <router-link to="/u/home" class="item-mobile">
            <img src="/recursos/home.png" width="50" height="50" alt="Home">
          </router-link>
          <router-link to="/u/productos" class="item-mobile">
            <img src="/recursos/add.png" width="50" alt="Add">
          </router-link>
          <router-link to="/u/modificar" class="item-mobile">
            <img src="/recursos/user.png" width="50" height="50" alt="User">
          </router-link>
          <router-link :to="'/'+ leerUsuario() " class="item-mobile">
            <img src="/recursos/mipuestito.png" width="50" height="50" alt="User">
          </router-link>
        </div>
    </div>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <div class="container-fluid">
        <router-link class="navbar-brand" to="/u/home"><img class="m-2" src="/recursos/home.png" width="25" alt=""> {{ leerNombre() }} </router-link>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDarkDropdown"
          aria-controls="navbarNavDarkDropdown" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNavDarkDropdown">
          <ul class="navbar-nav">
            <li class="test nav-item">
              <router-link class="nav-link" to="/u/home">Inicio </router-link>
            </li>
            <li class="test nav-item">
              <router-link class="nav-link" to="/u/productos">Productos</router-link>
            </li>
            <li class="test nav-item">
              <router-link class="nav-link" to="/u/publicaciones">Publicaciones</router-link>
            </li>
            <li class="test nav-item">
              <router-link class="nav-link" to="/u/crearqr">Crear QR</router-link>
            </li>
            <li class="test nav-item">
              <router-link class="nav-link" to='/u/modificar'>Pefil</router-link>
            </li>
            <li class="test nav-item"><router-link :to="'/'+ leerUsuario() " class="nav-link">Mi Puestito
          </router-link></li>
            <li class="test nav-item">
              <button class="nav-link" data-bs-toggle="modal" data-bs-target="#cerrarSesionModal">
                Salir
              </button>
              <div class="modal fade" id="cerrarSesionModal" tabindex="-1" aria-labelledby="cerrarSesionModalLabel"
                aria-hidden="true">
                <div class="modal-dialog">
                  <div class="modal-content">
                    <div class="modal-header text-center">
                      <h1 class="modal-title fs-5" id="cerrarSesionModalLabel">¿Cerrar sesión?</h1>
                      <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-footer text-center">
                      <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">No</button>
                      <button type="button" class="btn btn-menu-danger" data-bs-dismiss="modal" @click="cerrarSesion">Sí, cerrar sesión</button>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </div>
</template>
    
<script>
import { RouterLink } from "vue-router"; // Asegúrate de tener la importación correcta
import router from "@/router";
export default {
  mounted() {
  },
  methods: {
    isActiveProductos() {
      if (this.$route.path == '/u/nuevoProducto' || this.$route.path == '/u/productos') {
        return true;
      } else { return false; }
    },
    isActiveCategorias() {
      if (this.$route.path == '/u/nuevaCategoria' || this.$route.path == '/u/categorias') {
        return true;
      } else { return false; }
    },
    leerNombre() {
      return localStorage.getItem("nombre");
    },
    leerUsuario(){
      return localStorage.getItem("usuario");
    },
    cerrarSesion() {
      localStorage.clear(); // Elimina el token del almacenamiento local
      router.push('/');
    },
  },
  components: {
    "router-link": RouterLink, // Asigna 'router-link' al componente RouterLink
  },
};
</script>
    
<style scoped>
.nav-mobile-bg {
  display: none;
}
.navbar-brand{
  padding:0;
}
.navbar{
  padding:5px;
}
.navbar-text {
  font-style: italic;
}

.nav-link {
  color: white;
  border-radius: 5px;
}

.nav-link.active {
  font-weight: bold;
  background-color: #555;
}

.nav-link:hover {
  background-color: gray;
}
.nav-item{
  margin-left: 5px;
  margin-right: 5px;
}
@media screen and (max-width: 992px) {
  .navbar{
    display:none;
  }

  .nav-mobile-bg {
    display: block;
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 70px;
    /* Altura del fondo negro */
    background-color: black;
    align-content: center;
    z-index: 6;
  }

  .nav-mobile {
    position: relative;
    z-index: 7;
    width: 100%;
  }

  .flex-mobile {
    display: flex;
    justify-content: space-around;
    align-items: center;
  }

  .item-mobile {
    position: relative;
    text-align: center;
  }

  .middle-item {
    transform: translateY(-20px);
    /* Eleva el botón del medio sobre el fondo negro */
  }
  .nav-item {
    margin-top: 8px;
    font-size: larger;
  }

  .dropdown-item {
    margin-top: 5px;

    font-size: large;
  }

  ul {
    width: 100%;
    margin-left: auto !important;
    margin-right: auto !important;
  }

  .test {
    display: inline-block;
    margin-left: auto;
  }


  .nav-link {
    padding: 5px !important;
  }
}
</style>
    
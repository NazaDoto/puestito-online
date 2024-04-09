<template>
  <div class="">
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <div class="container-fluid">
        <router-link class="navbar-brand" to="/home">{{ leerUsuario() }} | </router-link>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDarkDropdown"
          aria-controls="navbarNavDarkDropdown" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNavDarkDropdown">
          <ul class="navbar-nav">
            <li class="test nav-item">
              <router-link class="nav-link" to="/home">Inicio </router-link>
            </li>
            <li class="test nav-item">
              <router-link class="nav-link" to="/modificar">Pefil</router-link>
            </li>
            <li class="test nav-item dropdown">
              <button :class="{ active: isActiveProductos() }" class="dropdown-toggle nav-link" data-bs-toggle="dropdown"
                aria-expanded="false">
                Productos
              </button>
              <ul class="dropdown-menu dropdown-menu-dark">
                <li><router-link class="dropdown-item" to="/nuevoProducto">Nuevo Producto</router-link></li>
                <li><router-link class="dropdown-item" to="/productos">Listar Productos</router-link></li>
              </ul>
            </li>
            <li class="test nav-item">
              <button class="nav-link" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Salir
              </button>
              <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel"
                aria-hidden="true">
                <div class="modal-dialog">
                  <div class="modal-content">
                    <div class="modal-header text-center">
                      <h1 class="modal-title fs-5" id="exampleModalLabel">¿Cerrar sesión?</h1>
                      <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-footer text-center">
                      <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">No</button>
                      <button type="button" class="btn btn-danger" data-bs-dismiss="modal" @click="cerrarSesion">Sí, cerrar sesión</button>
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
      if (this.$route.path == '/nuevoProducto' || this.$route.path == '/productos') {
        return true;
      } else { return false; }
    },
    isActiveCategorias() {
      if (this.$route.path == '/nuevaCategoria' || this.$route.path == '/categorias') {
        return true;
      } else { return false; }
    },
    leerUsuario() {
      return localStorage.getItem("nombre");
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

@media screen and (max-width: 992px) {
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
    margin-left: 5px;
    margin-right: 5px;
  }

  .navbar-text {}

  .nav-link {
    padding: 5px !important;
  }
}
</style>
    
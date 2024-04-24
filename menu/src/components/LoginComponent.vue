<template>
  <div>

    <div class="total">

      <div class="fondo text-center">
        <img src="/favicon.ico" width="100" alt="logo" class="mb-4">
        <h1 class="titulo">Puestito Online</h1>
        <form class="row g-3" @submit.prevent="login">
          <div class="width-size">
            <label for="usuario">Usuario</label>
            <input class="form-control mb-3" type="text" v-model="usuario" required />
          </div>
          <div class="width-size">
            <label for="contraseña">Contraseña</label>
            <input class="form-control mb-4" type="password" v-model="contraseña" required />
          </div>
          <div class="col-md-8">
            <button type="submit" class="btn btn-entrar">Entrar</button>
          </div>
          <router-link to="/u/planes">Registrar Negocio</router-link>
          <router-link to="/">Volver</router-link>
        </form>
      </div>
      <div class="derecha">
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";
export default {
  components: {
  },
  data() {
    return {
      usuario: "",
      contraseña: "",
    };
  },
  methods: {
    checkAuthentication() {
      const isAuthenticated = !!localStorage.getItem("token");/* Agrega aquí tu lógica para verificar si el usuario está autenticado */
      if (isAuthenticated) {
        this.$router.push("/u/home");
      }
    },
    async login() {
      try {
        // Realiza una solicitud HTTP para iniciar sesión en el backend
        const response = await axios.post("/login", {
          usuario: this.usuario,
          contraseña: this.contraseña,
        });

        // Maneja la respuesta del backend
        if (response.status === 200) {

          const fecha = await axios.post('/comprobar-vencimiento', { usuario: response.data.nomUsuario });
          const fechaVence = fecha.data;
          // Almacena el token en el almacenamiento local
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("nombre", response.data.nombre);
          localStorage.setItem("usuario", response.data.nomUsuario);

          localStorage.setItem("año", fechaVence);
          // Redirige al usuario a la página de inicio (por ejemplo, /u/home)
          this.$router.push("/u/home");
          const Toast = Swal.mixin({
            toast: true,
            position: 'bottom-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener('mouseenter', Swal.stopTimer)
              toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
          })

          Toast.fire({
            icon: 'success',
            title: 'Inicio de sesión exitoso.'
          })
        }
      } catch (error) {
        Swal.fire({
          icon: 'error',
          text: 'Usuario/contraseña incorrectos.'
        });
      }
    }
  },
  mounted() {
    this.checkAuthentication();
  },
};
</script>

<style scoped>
a {
  text-decoration: none;
}

.btn-entrar {
  color: white;
  width: 50%;
  height: 60px;
  background: linear-gradient(rgb(175, 210, 255), rgb(0, 90, 207)) !important;
  font-size: large;
  border: none;
  box-shadow: 0.5px 1px 4px black;
  border-radius: 1px;
}

.btn-entrar:hover {
  background: linear-gradient(rgb(175, 210, 255), rgb(0, 87, 168)) !important;
}

h1.titulo {
  display: block;
  color: black;
}

label {
  color: black;
}

.total {
  width: 100vw;
}

.fondo {
  position: absolute;
  z-index: 1;
  height: calc(100vh - 56px);
  width: 30vw;
  background-color: #8cfbff;
  display: block;
  justify-content: center;
  padding-top: 10vh;
}

form {
  justify-content: center;
  margin: auto !important;
}

.derecha {
  position: relative;
  z-index: 0;
  height: calc(100vh - 56px);
  width: 80vw;
  margin-left: 20vw;
  /*background-image: url(../assets/imagen-fondo.jpg);*/
  background-repeat: no-repeat;
  background-size: cover;
  background-position: right;
  background-color: rgb(22, 22, 41);
  display: block;
}

.titulo {
  display: block;
}

.width-size {
  width: 20vw;
}

@media screen and (max-width: 992px) {
  .width-size {
    width: 80vw !important;
  }

  .fondo {
    width: 100vw;
    height: calc(100vh - 115px);
  }

  .derecha {
    height: calc(100vh - 115px);
  }
}
</style>
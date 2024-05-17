<template>
  <div>
    <div v-if="ingresando" class="pantalla-carga text-center">
      <div class="logo-carga">
        <img class="logo-img" src="/favicon.ico" width="50" alt="" />
        <div class="texto-carga">Ingresando</div>
      </div>
    </div>
    <div class="total">
      <div class="fondo text-center">
        <img src="/favicon.ico" width="100" alt="logo" class="mb-4">
        <h1 class="titulo">Puestito Online</h1>
        <form class="row" @submit.prevent="login">
          <div class="width-size">
            <label for="usuario">Usuario</label>
            <input class="form-control mb-3" type="text" v-model="usuario" required @input="restrictInput" />
          </div>
          <div class="width-size">
            <label for="contraseña">Contraseña</label>
            <input class="form-control mb-4" type="password" v-model="contraseña" required />
          </div>
          <div class="col-md-8">
            <button type="submit" class="btn btn-entrar">Entrar</button>
          </div>
          <router-link class="mt-4" to="/u/planes">¿Registrar Negocio?</router-link>
          <router-link class="mt-4" to="/">Volver a Puestito Online</router-link>
        </form>
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
      ingresando: false,
      usuario: "",
      contraseña: "",
    };
  },
  methods: {
    restrictInput(event) {
      const input = event.target.value;
      // Expresión regular para buscar espacios y ciertos símbolos
      const restrictedChars = /[\s!@#$%^&*()_+=[\]{};':"\\|,<>?`´¨~¡/°¬¿]/g;
      if (restrictedChars.test(input)) {
        this.usuario = this.usuario.substring(0, this.usuario.length - 1);
      }
    }
    ,
    checkAuthentication() {
      const isAuthenticated = !!localStorage.getItem("token");/* Agrega aquí tu lógica para verificar si el usuario está autenticado */
      if (isAuthenticated) {
        this.$router.push("/u/home");
      }
    },
    async login() {
      try {
        this.ingresando = true;
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
      } finally {
        this.ingresando = false;
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
  border-radius: 2px;
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
  position: absolute;
    height: 100svh;
    width: 100svw;
    background-image: url('../../public/recursos/patron.png');
    background-color: #8cfbff !important;
    background-size: 100%;
    background-repeat: repeat;
    background-blend-mode: soft-light;
}

.fondo {
  display: block;
  justify-content: center;
  padding-top: 10vh;
}

form {
  justify-content: center;
  width: 40vw;
  margin: auto;
}

.titulo {
  display: block;
}

.width-size {
  width: 30vw;
}

@media screen and (max-width: 992px) {
  form {
    width: auto;
  }

  .width-size {
    width: 80vw !important;
  }

  .total {
    position: absolute;
    height: 100svh;
    background-image: url('../../public/recursos/patron2.png');
    background-color: #8cfbff !important;
    background-size: 100%;
    background-repeat: repeat;
    background-blend-mode: soft-light;
  }

  .fondo {
    width: 100vw;
  }
}
</style>
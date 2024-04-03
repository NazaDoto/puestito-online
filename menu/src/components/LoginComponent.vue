<template>
    <div>
  
      <div class="total">
  
        <div class="fondo">
          <h1 class="titulo text-center">Menute</h1>
          <form class="row g-3 text-center" @submit.prevent="login">
            <div class="width-size">
              <label for="usuario">Usuario</label>
              <input class="form-control mb-3" type="text" v-model="usuario" required />
            </div>
            <div class="width-size">
              <label for="contraseña">Contraseña</label>
              <input class="form-control mb-4" type="password" v-model="contraseña" required />
            </div>
            <div class="text-center col-md-8">
              <button type="submit" class="btn btn-entrar">Iniciar sesión</button>
            </div>
            <a href="/">Volver</a>
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
          this.$router.push("/home");
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
            // Almacena el token en el almacenamiento local
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("nombre", response.data.nombre);
            localStorage.setItem("usuario", response.data.nomUsuario);
            // Redirige al usuario a la página de inicio (por ejemplo, /home)
            this.$router.push("/home");
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
  .btn-entrar {
    color: white;
    width: 80%;
    height: 60px;
    background-color: #e5d599;
    font-size: large;
  }
  
  .btn-entrar:hover {
    background-color: #e4cb70;
  }
  
  h1.titulo {
    display: block;
    color: white;
  }
  
  label {
    color: white;
  }
  
  .total {
    width: 100vw;
  }
  
  .fondo {
    position: absolute;
    z-index: 1;
    height: 90vh;
    width: 30vw;
    background-color: #ea804c;
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
    height: 90vh;
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
    width: 25vw;
  }
  
  @media screen and (max-width: 992px) {
    .width-size {
      width: 80vw !important;
    }
  
    .fondo {
      width: 100vw;
      height: 85vh;
    }
  
    .derecha {
      height: 85vh;
    }
  }
  </style>
<template>
    <div>
      <NavbarAdminComponent></NavbarAdminComponent>
      <div class="container mt-4 mb-2">
  
        <div class="row g-3 mt-4 div-forms border">
          <h1 class="text-center">Registro de Negocio</h1>
          <form @submit.prevent="registrarNegocio">
            <div class="row g-3 div-forms border">
              <h4 class="titulo-div-forms mb-2">Datos</h4>
              <div class="col-md-6">
                <input class="form-control" type="text" id="username" v-model="negocio.usuario" placeholder="Nombre de Usuario" required>
              </div>
              <div class="col-md-6">
                <input class="form-control" type="password" id="password" v-model="negocio.contraseña" placeholder="Contraseña" required>
              </div>
              <div class="col-md-6">
                <input class="form-control" type="text" id="nombre" v-model="negocio.nombre" placeholder="Nombre del Negocio">
              </div>
              <div class="col-md-6">
                <label class="form-label fnac" for="fechaVence">Fecha de Vencimiento</label>
                <input class="form-control date" type="date" id="fechaVence" v-model="negocio.fechaVence" placeholder="Fecha de Vencimiento">
              </div>
              <div class="col-md-6">
                <input class="form-control" type="email" id="email" v-model="negocio.email" placeholder="Correo">
              </div>
              <div class="col-md-6">
                <input class="form-control" type="number" id="telefono" v-model="negocio.telefono" placeholder="Teléfono">
              </div>
            </div>
  
            <div>
              <button class="btn btn-success botones mt-3" type="submit">Registrar</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </template>
    
  <script>
  import axios from "axios";
  import NavbarAdminComponent from './NavbarAdminComponent.vue';
  import Swal from 'sweetalert2';
  export default {
    components: {
      NavbarAdminComponent,
    },
    data() {
      return {
        negocio: {
          usuario: '',
          contraseña: '',
          nombre: '',
          fechaVence: '',
          email: '',
          telefono: '',
        },
      };
    },
    methods: {
      resetForm() {
        this.negocio.usuario = '';
        this.negocio.contraseña = '';
        this.negocio.nombre = '';
        this.negocio.fechaVence = '';
        this.negocio.email = '';
        this.negocio.telefono = '';
      },
      registrarNegocio() {
        // Realizar una solicitud HTTP POST al servidor Express
        axios.post('/register', this.negocio)
          .then(response => {
            this.mensaje = response.data.message;
            Swal.fire({
              icon: 'success',
              text: 'Negocio agregado correctamente!'
            });
            this.resetForm();
          })
          .catch(error => {
            Swal.fire({
              icon: 'error',
              text: 'Error al registrar el negocio!'
            });
            console.error('Error al registrar usuario:', error);
            this.mensaje = 'Error al registrar usuario';
          });
      },
      esAdmin() {
        if (localStorage.getItem("usuario") != "admin") {
          this.$router.push("/");
        }
      }
    },
    mounted() {
      this.esAdmin();
    },
  };
  </script>
    
  <style>
  input.date {
    height: 45px;
}
.col-md-6 {
    margin-top: 5px;
    margin-bottom: 5px;
    display: inline-flex !important;
    justify-content: center !important;
    align-items: center !important;
}
  .div-forms {
    margin: auto;
    padding: 20px;
    border-color: black !important;
    border-radius: 5px !important;
    justify-content: center !important;
  }
  
  .botones {
    width: 40%;
  }
  .fnac {
    margin-left: 15px;
    margin-top: 5px;
}
  /* Estilos CSS si es necesario */
  </style>
    
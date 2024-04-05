<template>
  <div>
    <NavbarAdminComponent v-if="usuario == 'admin'"></NavbarAdminComponent>
    <NavbarPublicoComponent v-else></NavbarPublicoComponent>
    <div class="container mt-4 mb-2">

      <div class="row g-3 mt-4 border">
        <form @submit.prevent="registrarNegocio">
          <div class="row g-3  border">
            <h4 class="titulo- mb-2">Información de acceso</h4>
            <div class="col-md-6">
              <input class="form-control" type="text" id="username" v-model="negocio.usuario"
                placeholder="Nombre de Usuario" required>
            </div>
            <div class="col-md-6">
              <input class="form-control" type="password" id="password" v-model="negocio.contraseña"
                placeholder="Contraseña" required>
            </div>
            <h4 class="titulo- mb-2">Información del negocio</h4>
            <div class="col-md-6">
              <input class="form-control" type="text" id="nombre" v-model="negocio.nombre"
                placeholder="Nombre del Negocio" required>
            </div>

            <div class="col-md-6">
              <input class="form-control" type="email" id="email" v-model="negocio.email" placeholder="Correo" required>
            </div>
            <div class="col-md-6">
              <input class="form-control" type="text" id="direccion" v-model="negocio.direccion"
                placeholder="Dirección">
            </div>
            <div class="col-md-6">
              <input class="form-control" type="text" id="instagram" v-model="negocio.instagram"
                placeholder="Instagram">
            </div>
            <div class="col-md-6">
              <input class="form-control" type="text" id="facebook" v-model="negocio.facebook" placeholder="Facebook">
            </div>
            <div class="col-md-6">
              <label class="form-label text-center" for="imagen">Foto (JPG)</label>
              <input class="form-control" type="file" name="imagen" id="imagen" accept=".jpg"
                @change="imagenSeleccionada($event)" required />
            </div>
            <div class="col-md-6">
              <input class="form-control" type="number" id="telefono" v-model="negocio.telefono" placeholder="Teléfono">
            </div>
            <div class="col-md-6">
              <input class="form-control" type="text" id="descripcion" v-model="negocio.descripcion"
                placeholder="Descripción">
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
import NavbarPublicoComponent from "./NavbarPublicoComponent.vue";
import router from "@/router";
export default {
  components: {
    NavbarAdminComponent,
    NavbarPublicoComponent,
  },
  data() {
    return {
      plan: null,
      negocio: {
        usuario: '',
        contraseña: '',
        nombre: '',
        fechaVence: '',
        email: '',
        imagen: '',
        direccion: '',
        telefono: '',
        descripcion: '',
        instagram: '',
        facebook: '',
      },
    };
  },
  methods: {
    imagenSeleccionada(event) {
      const file = event.target.files[0];
      if (file) {
        // Utiliza FileReader para leer el contenido de la imagen como una URL de datos
        const reader = new FileReader();
        reader.onload = (e) => {
          // Al cargar la imagen, asigna la URL de datos a producto.imagen
          this.negocio.imagen = e.target.result;
        };
        reader.readAsDataURL(file);
      }
    },
    resetForm() {
      this.negocio.usuario = '';
      this.negocio.contraseña = '';
      this.negocio.nombre = '';
      this.negocio.fechaVence = '';
      this.negocio.email = '';
      this.negocio.imagen = '';
      this.negocio.direccion = '';
      this.negocio.telefono = '';
      this.negocio.direccion = '';
      this.negocio.instagram = '';
      this.negocio.facebook = '';
    },
    registrarNegocio() {
      // Realizar una solicitud HTTP POST al servidor Express
      let fechaActual = new Date();
    const plan = this.plan - 1
    fechaActual.setMonth(fechaActual.getMonth() + plan);
    this.negocio.fechaVence = fechaActual.toISOString().slice(0, 19).replace('T', ' ');
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
    verificarPlan() {
      if (localStorage.getItem('plan')) {
        this.plan = localStorage.getItem('plan');
      } else {
        router.push('/planes');

      }
    }
  },
  mounted() {
    this.verificarPlan();
  },
};
</script>

<style scoped>
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


.botones {
  width: 40%;
}

.fnac {
  margin-left: 15px;
  margin-top: 5px;
}

/* Estilos CSS si es necesario */
</style>
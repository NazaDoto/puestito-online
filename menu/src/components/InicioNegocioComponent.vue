<template>
  <div class="todo">
    <NavbarAdminComponent v-if="esAdmin()" />

    <div class="container pt-4 mb-2">
      <h1 class="text-center">Bienvenid@, {{ nombreNegocio }}</h1>
      <div v-if="esAdmin()" class="container ">
        <div class="col-md-6 mt-2">
          <router-link class="btn btn-menu" to="/u/negocios">Listar Negocios</router-link>
        </div>

      </div>
      <div v-else class="text-center">
        <img style="border-radius:100%;" v-if="negocio.imagen" :src="negocio.imagen" width="100" alt="">
        <hr>
        <div class="botones">
          <router-link class="btn-inicio" to='/u/modificar'>
            <img src="/recursos/user.png" width="50" height="50" alt="User">
            Perfil</router-link>
          <router-link class="btn-inicio" to='/u/productos'>
            <img src="/recursos/productos.png" width="50" height="50" alt="Productos">Productos</router-link>
        </div>
        <div class="botones mt-2">
          <router-link to="/u/crearqr" class="btn-inicio">
            <img src="/recursos/qr.png" width="50" height="50" alt="QR"> Crear QR
          </router-link>
          <router-link to="/u/publicaciones" class="btn-inicio">
            <img src="/recursos/image.png" width="50" height="50" alt="QR">Publicaciones
          </router-link>
        </div>
        <div class="botones mt-2">
          <router-link :to="'/' + nombreUsuario" class="btn-inicio">
            <img src="/recursos/mipuestito.png" width="50" height="50" alt="User"> Mi Puestito
          </router-link>
          <a class="btn-inicio" @click="enviarMensaje">
            <img src="/recursos/support.png" width="50" height="50" alt="User"> Soporte
          </a>
        </div>
        <hr>
        
      </div>
    </div>

  </div>
</template>

<script>
import NavbarAdminComponent from "./NavbarAdminComponent.vue";
import { RouterLink } from "vue-router";
import axios from 'axios';
import Swal from "sweetalert2";
export default {
  data() {
    return {
      nombreUsuario: '',
      nombreNegocio: '',
      negocio: '',
    }
  },
  components: {
    NavbarAdminComponent,
    "router-link": RouterLink,
  },
  mounted() {
    this.leerUsuario();
  },
  created() {
    // Realiza una solicitud HTTP para obtener los informes desde el servidor
    this.obtenerInformacionNegocio();
  },
  methods: {
    enviarMensaje() {
            const userAgent = navigator.userAgent || navigator.vendor || window.opera;

            // Verificar si el usuario está en un dispositivo móvil
            const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);

            // Definir el enlace base según si es móvil o no
            let baseLink = isMobile ? 'whatsapp://send' : 'https://web.whatsapp.com/send';

            // Construir el enlace completo
            const mensajeCompleto = `¡Hola Puestito Online! Tengo una consulta...`;
            const numeroWhatsapp = `${baseLink}?phone=3853005369&text=${encodeURIComponent(mensajeCompleto)}`;
            // Finalmente, abrimos una nueva ventana del navegador con el enlace generado
            try {
                window.open(numeroWhatsapp);
                location.reload(1);
            } catch (error) {
                Swal.fire({
                    icon: 'error',
                    text: 'Por favor habilita las ventanas emergentes para ir a WhatsApp.' + error.response.data.message,
                });
            }
        },
    async obtenerInformacionNegocio() {
      try {
        this.obteniendoInfo = true;
        // Realiza una solicitud HTTP GET para obtener los informes desde el servidor
        const response = await axios.get(`/miNegocio?usuario=${localStorage.getItem('usuario')}`);
        // Actualiza la lista de informes con los datos recibidos
        this.negocio = response.data;
      } catch (error) {
        console.error("Error al cargar los productos:", error);
      } finally {
        this.obteniendoInfo = false;
      }

    },
    leerUsuario() {
      this.nombreUsuario = localStorage.getItem("usuario");
      this.nombreNegocio = localStorage.getItem("nombre");
    },
    esAdmin() {
      return (localStorage.getItem("usuario") == "admin");
    },
  }
};
</script>

<style scoped>
.botones {
  display: flex;
  flex-wrap: wrap;
  gap:20px;
  justify-content: center;
}

.btn-inicio {
  display: flex;
  flex-direction: column; /* Organiza los elementos en una columna */
  align-items: center; /* Centra el contenido horizontalmente */
  text-align: center; /* Alinea el texto en el centro */
  justify-content: center;
  background-color: black; /* Fondo del botón */
  color:white;
  height: 20svh;
  width: 20svh;
  padding: 10px; /* Espacio interno del botón */
  border-radius: 5px; /* Bordes redondeados del botón */
  text-decoration: none; /* Quita el subrayado de los enlaces */
}
.btn-inicio:hover{
  background-color: rgb(31, 31, 31);
}

.btn-contactar {
  background-color: black;
  border-radius: 20px;
  color: white;
  text-decoration: none;
  padding: 7px;
}

.btn-contactar:hover {
  background-color: rgb(31, 31, 31);
}


.form-control-color {
  border: none;
  padding: 1px;
}

.flex {
  display: flex;
}

.qr-text {
  font-size: 3rem;
  font-weight: 750;
  margin-bottom: 0;
}

.position-relative {
  margin: 0 10% 0 10%;
}

.frente {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
}

.form-control-check {
  margin-left: 10px;
}

.fondoColor {
  margin: auto;
  height: 65svh;
  width: 60%;
  position: relative;
}

.portada {
  height: 65svh;
  width: 60%;
  position: relative;
}

.logo {
  border-radius: 100%;
}

.qr-text-consulta {
  width: 100%;
  color: white;
}

.margenbtn {
  margin: 20px auto;
}

.col-md-6 {
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

.btn {
  display: block;
  width: 100%;
}


@media screen and (max-width: 992px) {


  .col-md-6 {
    display: block !important;
  }

  .btn {
    display: block !important;
  }

  .div-forms {
    margin: 0px;
  }

  .position-relative {
    margin: 0;
  }

  .portada {
    width: 100%;
  }

  .fondoColor {
    width: 100%;
  }
}
</style>
<template>
  <div class="todo">
    <NavbarAdminComponent v-if="esAdmin()" />
    <NavbarComponent v-else></NavbarComponent>
    <div class="container mt-4 mb-2">
      <h1 class="text-center">Bienvenid@, {{ nombreNegocio }}</h1>
      <div v-if="esAdmin()" class="container ">
        <div class="col-md-6 mt-2">
          <router-link class="btn btn-menu" to="/u/negocios">Listar Negocios</router-link>
        </div>

      </div>
      <div v-else class="text-center">
        <div class="row g-3 div-forms border">
          <div class="col-md-6">
            <h2 class="titulo-div-forms mb-2">Perfil</h2>
            <router-link class="btn btn-menu" to='/u/modificar'>Ver Información</router-link>
          </div>
        </div>
        <div class="row g-3 div-forms border mt-2">
          <div class="col-md-6">
            <h2 class="titulo-div-forms mb-2">Productos</h2>
            <router-link class="btn btn-menu" to="/u/nuevoProducto">Nuevo Producto</router-link><br>
            <router-link class="btn btn-menu" to='/u/productos'>Listar Productos</router-link>
          </div>
        </div>
        <div class="row g-3 div-forms border mt-2">
          <div class="col-md-6">
            <h2 class="titulo-div-forms mb-2">
              Tu link
            </h2>
            <a :href="'https://puestito.online/' + nombreUsuario" target="_blank">https://puestito.online/{{ nombreUsuario }}</a><br>
          </div>
        </div>
        <div v-if="fechaVence !== '2100'" class="row g-3 div-forms border mt-2">
          <div class="col-md-6">
            <h2 class="titulo-div-forms mb-2">Tu código QR</h2>
            <a ref="qrcode" :href="'https://puestito.online/' + nombreUsuario" target="_blank"></a><br>            
            <button @click="descargarQR" class="btn btn-menu margenbtn">Descargar QR</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import QRCode from 'qrcode-generator';
import NavbarComponent from "./NavbarComponent.vue";
import NavbarAdminComponent from "./NavbarAdminComponent.vue";
import { RouterLink } from "vue-router";
import { saveAs } from 'file-saver'; // Importa la función saveAs de la biblioteca file-saver

export default {
  data() {
    return {
      nombreUsuario: '',
      nombreNegocio: '',
      fechaVence: '',
    }
  },
  components: {
    NavbarComponent,
    NavbarAdminComponent,
    "router-link": RouterLink,
  },
  mounted() {
    this.leerUsuario();
    if (this.nombreUsuario != 'admin') {
      this.generarQR();
    }
  },
  methods: {
    generarQR() {
      // Obtén el nombre de usuario desde el almacenamiento local
      const nombreUsuario = localStorage.getItem("nombre");

      // Verifica si el nombre de usuario existe antes de generar el código QR
      if (nombreUsuario) {
        // Crea una instancia de la clase QRCode
        const qr = QRCode(0, 'L');

        // Define el tamaño del módulo del código QR
        const tamaño = 9; // Ajusta el tamaño según tus necesidades
        qr.size = tamaño;

        // Define el contenido del código QR (puedes ajustar esto según tus necesidades)
        const url = 'https://puestito.online/' + nombreUsuario;
        qr.addData(url);
        qr.make();

        // Renderiza el código QR en el div con ref="qrcode"
        this.renderQRCode(qr.createImgTag(tamaño, 0));
      }
    },
    renderQRCode(qrCodeImageTag) {
      // Renderiza la imagen del código QR en el div con ref="qrcode"
      // Obtener el elemento al que deseas agregar la clase
      const qrcodeElement = this.$refs.qrcode;

      // Agregar la clase al elemento
      qrcodeElement.innerHTML = qrCodeImageTag;

    },
    leerUsuario() {
      this.nombreUsuario = localStorage.getItem("usuario");
      this.nombreNegocio = localStorage.getItem("nombre");
      this.fechaVence = localStorage.getItem("año");
    },
    esAdmin() {
      return (localStorage.getItem("usuario") == "admin");
    },
    descargarQR() {
      // Obtiene la referencia al elemento del código QR
      const qrElement = this.$refs.qrcode.firstChild;

      // Crea un elemento de lienzo para convertir el código QR en una imagen
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      canvas.width = qrElement.width;
      canvas.height = qrElement.height;
      context.drawImage(qrElement, 0, 0);

      // Convierte el lienzo en una imagen JPEG y la descarga
      canvas.toBlob(blob => {
        saveAs(blob, 'codigoQR-' + this.nombreUsuario + '.jpg');
      }, 'image/jpeg');
    },
  }
};
</script>

<style scoped>

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
    margin: 20px;
  }

}
</style>
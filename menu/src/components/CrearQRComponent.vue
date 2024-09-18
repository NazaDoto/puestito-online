<template>
    <div>
        <NavbarComponent></NavbarComponent>
        <div class="div-forms pt-4 text-center">
                <h2 class="titulo-div-forms mb-2">Tu código QR</h2>
                <div class="col-md-6">
                  <label class="form-label" for="qrText">Texto de arriba:</label>
                  <div class="flex">
                    <input class="form-control" name="qrText" type="text" v-model="qrText">
                    <input class="form-control-color" type="color" name="qrTextColor" v-model="qrTextColor">
                  </div>
                </div>
                <div class="col-md-6">
                  <label class="form-label mt-2" for="qrTitle">Texto de abajo:</label>
                  <div class="flex">
                    <input class="form-control" name="qrTitle" type="text" v-model="qrTitle">
                    <input class="form-control-color" type="color" name="qrTitleColor" v-model="qrTitleColor">
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="justify-content-center">
                    <label class="form-label mt-2" for="qrPortada">Utilizar portada como fondo</label>
                    <input class="form-control-check" type="checkbox" name="qrPortada" id="" v-model="mostrarPortada"> <br>
                    <router-link v-if="mostrarPortada" to="/u/modificar">Cambiar portada</router-link>
                  </div>
                </div>
                <div v-if="!mostrarPortada" class="col-md-">
                  <label for="qrFondoColor" class="form-label mt-2">Color de fondo</label> <br>
                  <input class="form-control-color" type="color" name="qrFondoColor" v-model="qrFondoColor">
                </div>
                <div ref="contenido" class="mt-4 position-relative">
                  <img v-if="mostrarPortada" class="portada" :src="negocio.portada" alt="">
                  <div v-else class="fondoColor" :style="{ backgroundColor: qrFondoColor }"></div>
                  <div class="p-4 frente">
                    <h5 class="mt-2 qr-text-consulta" :style="{ color: qrTextColor }">{{ qrText }}<p class="qr-text"
                        :style="{ color: qrTitleColor }">{{ qrTitle }}</p>
                    </h5>
                    <a style="color:black;text-decoration: none;" ref="qrcode"
                      :href="'https://puestito.online/' + nombreUsuario" target="_blank"></a><br>
                  </div>
                </div>
                <div class="col-md-6">
      
                  <button @click="descargarQR" class="btn btn-menu margenbtn">Descargar QR</button>
                </div>
              </div>
    </div>
</template>

<script>
import QRCode from 'qrcode-generator';
import NavbarComponent from "./NavbarComponent.vue";
import { RouterLink } from "vue-router";
import { saveAs } from 'file-saver'; // Importa la función saveAs de la biblioteca file-saver
import html2canvas from 'html2canvas';
import axios from 'axios';
export default {
  data() {
    return {
      nombreUsuario: '',
      nombreNegocio: '',
      negocio: '',
      qrText: '',
      qrTitle: '',
      qrTextColor: '',
      qrTitleColor: '',
      qrFondoColor: '#FFFFFF',
      mostrarPortada: true,
    }
  },
  components: {
    NavbarComponent,
    "router-link": RouterLink,
  },
  mounted() {
    this.leerUsuario();
    this.leerTextoQR();
    if (this.nombreUsuario != 'admin') {
      this.generarQR();
    }
  },
  created() {
    // Realiza una solicitud HTTP para obtener los informes desde el servidor
    this.obtenerInformacionNegocio();
  },
  methods: {
    leerTextoQR() {
      this.qrText = localStorage.getItem('qrText') || 'CONSULTÁ EL';
      this.qrTitle = localStorage.getItem('qrTitle') || 'MENÚ';
      this.qrTextColor = localStorage.getItem('qrTextColor') || '#000000';
      this.qrTitleColor = localStorage.getItem('qrTitleColor') || '#000000';
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
      qrcodeElement.innerHTML += `<div class="mt-2" style="color:white;background: black;border-radius: 10px;">puestito.online/` + this.nombreUsuario + '</div>';

    },
    leerUsuario() {
      this.nombreUsuario = localStorage.getItem("usuario");
      this.nombreNegocio = localStorage.getItem("nombre");
    },
    esAdmin() {
      return (localStorage.getItem("usuario") == "admin");
    },
    descargarQR() {
      const contenidoDiv = this.$refs.contenido;
      localStorage.setItem('qrText', this.qrText);
      localStorage.setItem('qrTitle', this.qrTitle);
      localStorage.setItem('qrTitleColor', this.qrTitleColor);
      localStorage.setItem('qrTextColor', this.qrTextColor);
      html2canvas(contenidoDiv, { backgroundColor: null }).then(canvas => {
        canvas.toBlob(blob => {
          saveAs(blob, 'contenido-' + this.nombreUsuario + '.png');
        });
      });
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
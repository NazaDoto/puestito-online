<template>
  <div>
    <NavbarAdminComponent v-if="usuario == 'admin'"></NavbarAdminComponent>
    <NavbarPublicoComponent v-else></NavbarPublicoComponent>
    <div class="container mt-4 mb-2">
      <div class="row g-3 mt-4 border">
        <form @submit.prevent="registrarNegocio" id="form-checkout">
          <div class="row g-3  border">
            <h4 class="titulo- mb-2">Información de acceso</h4>
            <h4 class="subtitulo">Cómo ingresarás a la plataforma.</h4>
            <div class="col-md-6">
              <input class="form-control" type="text" id="username" v-model="negocio.usuario"
                placeholder="Nombre de Usuario" required>
            </div>
            <div class="col-md-6">
              <input class="form-control" type="password" id="password" v-model="negocio.contraseña"
                placeholder="Contraseña" required>
            </div>
            <h4 class="titulo- mb-2">Información del negocio</h4>
            <h4 class="subtitulo">Más adelante podés modificar esta información.</h4>
            <div class="col-md-6">
              <input class="form-control" type="text" id="nombre" v-model="negocio.nombre"
                placeholder="Nombre (Así aparecerás en la página)" required>
            </div>
            <div class="col-md-6">
              <input class="form-control" type="text" id="descripcion" v-model="negocio.descripcion"
                placeholder="Descripción (Qué ofreces)">
            </div>
            <div class="col-md-6">
              <input class="form-control" type="email" id="email" v-model="negocio.email" placeholder="Email" required>
            </div>
            <div class="col-md-6">
              <input class="form-control" type="text" id="direccion" v-model="negocio.direccion"
                placeholder="Dirección (por ej. Libertad 20, Santiago del Estero, Argentina)">
            </div>
            <div class="col-md-6">
              <input class="form-control" type="number" id="telefono" v-model="negocio.telefono"
                placeholder="Teléfono (por ej. +5493855223287)">
            </div>
            <div class="col-md-6">
              <input class="form-control" type="text" id="instagram" v-model="negocio.instagram"
                placeholder="Link de Instagram">
            </div>
            <div class="col-md-6">
              <input class="form-control" type="text" id="facebook" v-model="negocio.facebook"
                placeholder="Link de Facebook">
            </div>
            <div class="col-md-6">
              <label class="form-label text-center" for="imagen">Logo (JPG)</label>
              <input class="form-control" type="file" name="imagen" id="imagen" accept=".jpg"
                @change="imagenSeleccionada($event)" required />
            </div>
            <h4 class="titulo- mb-2">Información de facturación</h4>
            <div class="col-md-6">
              <div id="form-checkout__cardNumber" class="form-control form-control-fact"></div>
            </div>
            <div class="col-md-6">
              <div id="form-checkout__expirationDate" class="form-control form-control-fact"></div>
            </div>
            <div class="col-md-6">
              <div id="form-checkout__securityCode" class="form-control form-control-fact"></div>
            </div>
            <div class="col-md-6">
              <input class="form-control" type="text" id="form-checkout__cardholderName" />
            </div>
            <div class="col-md-6">

              <select class="form-control form-select" id="form-checkout__issuer" disabled></select>
            </div>
            <div class="col-md-6">

              <select class="form-control form-select" id="form-checkout__installments"></select>
            </div>
            <div class="col-md-6">

              <select class="form-control form-select" id="form-checkout__identificationType"></select>
            </div>
            <div class="col-md-6">

              <input class="form-control" type="text" id="form-checkout__identificationNumber" />
            </div>
            <div class="col-md-6">

              <input class="form-control" type="email" id="form-checkout__cardholderEmail" />
            </div>
            <div>
              <button class="btn btn-success botones mt-3 mb-3" type="submit">Contratar</button>
            </div>
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
import { loadMercadoPago } from "@mercadopago/sdk-js";

export default {
  components: {
    NavbarAdminComponent,
    NavbarPublicoComponent,
  },
  data() {
    return {
      plan: null,
      negocio: {
        usuario: 'pepopa',
        contraseña: 'pepopa',
        nombre: 'Pepopa',
        fechaVence: '',
        email: 'pepopa@gmail.com',
        imagen: '',
        direccion: 'Tucumán 100, Santiago del Estero, Argentina',
        telefono: '3855223288',
        descripcion: 'Esposisima',
        instagram: 'igpepopa',
        facebook: 'facepepopa',
      },
      payment: {
        token: null,
        issuer_id: null,
        payment_method_id: null,
        amount: null,
        installments: null,
        email: null,
        identificationType: null,
        identificationNumber: null
      }
    };
  },
  created(){
    this.inicializarPago();
  },
  methods: {
    async inicializarPago() {
      await loadMercadoPago();
      const mp = new window.MercadoPago("TEST-6f32dbe3-4ecc-480b-8634-e9b529272327");
      const preciosPorCuotas = {
        1: 1500,
        6: 7500,
        12: 15000
      };

      const precio = preciosPorCuotas[this.plan] || 0;
      console.log(precio)
      const cardForm = mp.cardForm({
        amount: "20",
        iframe: true,
        form: {
          id: "form-checkout",
          cardNumber: {
            id: "form-checkout__cardNumber",
            placeholder: "Numero de tarjeta",
          },
          expirationDate: {
            id: "form-checkout__expirationDate",
            placeholder: "Vencimiento (MES/AÑO)",
          },
          securityCode: {
            id: "form-checkout__securityCode",
            placeholder: "Código de seguridad",
          },
          cardholderName: {
            id: "form-checkout__cardholderName",
            placeholder: "Titular de la tarjeta",
          },
          issuer: {
            id: "form-checkout__issuer",
            placeholder: "Banco emisor",
          },
          installments: {
            id: "form-checkout__installments",
            placeholder: "Cuotas",
          },
          identificationType: {
            id: "form-checkout__identificationType",
            placeholder: "Tipo de documento",
          },
          identificationNumber: {
            id: "form-checkout__identificationNumber",
            placeholder: "Número de documento",
          },
          cardholderEmail: {
            id: "form-checkout__cardholderEmail",
            placeholder: "Email",
          },
        },
        callbacks: {
          onFormMounted: error => {
            if (error) return console.warn("Form Mounted handling error: ", error);
            console.log("Form mounted");
          },
          onSubmit: event => {
            event.preventDefault();
            console.log(cardForm.getCardFormData());
            this.payment = {
              token: cardForm.getCardFormData().token,
              issuer_id: cardForm.getCardFormData().issuerId,
              payment_method_id: cardForm.getCardFormData().paymentMethodId,
              amount: cardForm.getCardFormData().amount,
              installments: cardForm.getCardFormData().installments,
              email: cardForm.getCardFormData().cardholderEmail,
              identificationType: cardForm.getCardFormData().identificationType,
              identificationNumber: cardForm.getCardFormData().identificationNumber
            };
          }
        },
      });

    },
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
      axios.post("/procesar_pago", this.payment
      )
        .then(response => {
          console.log("Pago procesado con éxito:", response.data);
          axios.post('/register', this.negocio)
            .then(() => {
              Swal.fire({
                icon: 'success',
                text: 'Te registraste exitosamente!'
              });
              router.push('/login');
            })
            .catch(error => {
              Swal.fire({
                icon: 'error',
                text: 'Error al registrar!'
              });
              console.error('Error al registrar usuario:', error);
            });
        })
        .catch(error => {
          console.error("Error al procesar el pago:", error);
          Swal.fire({
            icon: 'error',
            text: 'Error al facturar!'
          });
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
.form-control-fact {
  height: 40px;
}

.subtitulo {
  font-weight: normal;
  font-size: 14px;
  font-style: italic;
  margin: 0px;
}

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
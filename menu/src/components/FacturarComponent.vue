<template>
  <div>
    <div v-if="cargando" class="pantalla-carga text-center">
      <div class="logo-carga">
        <img class="logo-img" src="/favicon.ico" width="50" alt="">
        <div class="texto-carga">
          Cargando datos de facturación
        </div>
      </div>
    </div>

    <div v-else>
      <NavbarAdminComponent v-if="usuario == 'admin'"></NavbarAdminComponent>
      <NavbarPublicoComponent v-else></NavbarPublicoComponent>
      <div class="container mt-4 mb-2">
        <div class="row g-3 mt-4 border">
          <form @submit.prevent="registrarNegocio" id="form-checkout">
            <div class="row g-3  border">
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
      cargando: true,
      plan: null,
      usuario: '',
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
  created() {
    this.inicializarPago();
  },
  methods: {
    async inicializarPago() {

      this.plan = localStorage.getItem("plan");
      this.usuario = localStorage.getItem("usuario");
      console.log(this.plan, this.usuario)
      await loadMercadoPago();
      const mp = new window.MercadoPago("TEST-6f32dbe3-4ecc-480b-8634-e9b529272327");
      const preciosPorCuotas = {
        1: 1500,
        6: 7500,
        12: 15000
      };

      const precio = preciosPorCuotas[this.plan] || 0;
      const cardForm = mp.cardForm({
        amount: Number(precio),
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
    registrarNegocio() {
      // Realizar una solicitud HTTP POST al servidor Express
      let fechaActual = new Date();
      const plan = this.plan - 1
      fechaActual.setMonth(fechaActual.getMonth() + plan);
      const fechaVence = fechaActual.toISOString().slice(0, 19).replace('T', ' ');
      axios.post("/procesar_pago", this.payment
      )
        .then(response => {
          console.log("Pago procesado con éxito:", response.data);
          axios.put('/modificarVencimiento', { negocio_usuario: this.usuario, fechaVence: fechaVence }).then(() => {
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
              title: 'Registro exitoso.'
            })
          }).catch(error => {
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
.texto-carga {
  font-style: italic;
  margin: 20px;
  color: grey;
}

.logo-carga {
  margin-top: -10vh;
}

.logo-img {
  animation: l2 2s infinite;
}

.pantalla-carga {
  z-index: 2;
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: calc(100vh - 100px);
  background-color: white;
  align-content: center;
}

.pantalla-carga:hover {
  cursor: wait;
}

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
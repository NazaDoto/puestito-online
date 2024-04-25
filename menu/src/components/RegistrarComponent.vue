<template>
    <div>
        <NavbarAdminComponent v-if="usuario == 'admin'"></NavbarAdminComponent>
        <NavbarPublicoComponent v-else></NavbarPublicoComponent>
        <div v-if="cargandoPago" class="pantalla-carga text-center">
            <div class="logo-carga">
                <img class="logo-img" src="/favicon.ico" width="50" alt="" />
                <div class="texto-carga">Procesando pago...</div>
            </div>
        </div>
        <div v-else class="container mt-4 mb-2">
            <div v-if="!usuario" class="row g-3 mt-4 border">
                <form @submit.prevent="registrarNegocio" id="form-checkout">
                    <div class="row g-3 border">
                        <h4 class="titulo- mb-2">Información de acceso</h4>
                        <h4 class="subtitulo">Cómo ingresarás a la plataforma.</h4>
                        <div class="col-md-6">
                            <input :class="{ 'usuario-disponible': !usuarioDisponible }" class="form-control"
                                type="text" id="username" v-model="negocio.usuario" @change="verificarDisponibilidad"
                                placeholder="Nombre de Usuario" required />
                        </div>
                        <div class="col-md-6">
                            <input class="form-control" type="password" id="password" v-model="negocio.contraseña"
                                placeholder="Contraseña" required />
                        </div>
                        <h4 class="titulo- mb-2">Información del negocio</h4>
                        <h4 class="subtitulo">
                            Más adelante podés modificar esta información.
                        </h4>
                        <div class="col-md-6">
                            <input class="form-control" type="text" id="nombre" v-model="negocio.nombre"
                                placeholder="Nombre (Así aparecerás en la página)" required />
                        </div>
                        <div class="col-md-6">
                            <input class="form-control" type="text" id="descripcion" v-model="negocio.descripcion"
                                placeholder="Descripción (Qué ofreces)" />
                        </div>
                        <div class="col-md-6">
                            <input class="form-control" type="email" id="email" v-model="negocio.email"
                                placeholder="Email" required />
                        </div>
                        <div class="col-md-6">
                            <input class="form-control" type="text" id="direccion" v-model="negocio.direccion"
                                placeholder="Dirección (por ej. Libertad 20, Santiago del Estero, Argentina)" />
                        </div>
                        <div class="col-md-6">
                            <input class="form-control" type="number" id="telefono" v-model="negocio.telefono"
                                placeholder="Teléfono (por ej. +5493855223287)" />
                        </div>
                        <div class="col-md-6">
                            <input class="form-control" type="text" id="instagram" v-model="negocio.instagram"
                                placeholder="Link de Instagram" />
                        </div>
                        <div class="col-md-6">
                            <input class="form-control" type="text" id="facebook" v-model="negocio.facebook"
                                placeholder="Link de Facebook" />
                        </div>
                        <div class="col-md-6">
                            <label class="form-label text-center" for="imagen">Logo (JPG)</label>
                            <input class="form-control" type="file" name="imagen" id="imagen" accept=".jpg"
                                @change="imagenSeleccionada($event)" required />
                        </div>
                        <button :disabled="!usuarioDisponible" v-if="!plan" class="btn btn-menu botones m-auto mb-2"
                            type="submit">
                            Contratar
                        </button>
                        <button :disabled="!usuarioDisponible" v-else class="btn btn-menu botones m-auto mb-2"
                            type="submit">
                            Ir a Pagar
                        </button>
                    </div>
                </form>
            </div>
            <div v-else class="row g-3 mt-4 border">
                <button class="btn btn-menu botones m-auto mb-2" type="submit" @click="registrarNegocio">
                    Ir a Pagar
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";
import NavbarAdminComponent from "./NavbarAdminComponent.vue";
import Swal from "sweetalert2";
import NavbarPublicoComponent from "./NavbarPublicoComponent.vue";
import router from "@/router";

export default {
    components: {
        NavbarAdminComponent,
        NavbarPublicoComponent,
    },
    data() {
        return {
            usuarioDisponible: true,
            cargandoPago: false,
            esperandoPago: true,
            plan: null,
            ref: null,
            usuario: "",
            negocio: {
                usuario: "",
                contraseña: "",
                nombre: "",
                fechaVence: "",
                email: "",
                imagen: "",
                direccion: "",
                telefono: "",
                descripcion: "",
                instagram: "",
                facebook: "",
            },
        };
    },
    mounted() {
        this.obtenerPlan();
    },
    methods: {
        async verificarDisponibilidad() {
            try {
                // Realizar la petición a la base de datos para verificar la disponibilidad del nombre de usuario
                const response = await axios.post("/verificar-usuario", {
                    usuario: this.negocio.usuario,
                });
                // Actualizar el estado de usuarioDisponible según la respuesta de la base de datos
                this.usuarioDisponible = response.data;
                if (!this.usuarioDisponible) {
                    Swal.fire({
                        icon: "error",
                        text: "Ese usuario ya existe. Por favor elegí otro.",
                    });
                }
            } catch (error) {
                console.error(error);
            }
        },
        async obtenerPlan() {
            this.plan = localStorage.getItem("plan");
            this.usuario = localStorage.getItem("usuario");
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
        async registrarNegocio() {
            if (this.plan) {
                this.cargandoPago = true;
                if (this.usuario) {
                    this.mejorarPlan();
                } else {
                    this.verificarDisponibilidad();
                    if (this.usuarioDisponible) {
                        this.usuario = this.negocio.usuario;
                        this.contratarPlan();
                    }
                }
            } else {
                this.verificarDisponibilidad();
                if (this.usuarioDisponible) {
                    this.usuario = this.negocio.usuario;
                    this.registrarGratis();
                }
            }
        },
        async verificarPago() {
            let estadoPago;
            while (this.esperandoPago) {
                await new Promise((resolve) => setTimeout(resolve, 5000));
                const response = await axios.post("/facturar/verificarPago", {
                    ref: this.ref,
                });
                estadoPago = response.data;
                if (estadoPago === "approved") {
                    break;
                }
            }
            return estadoPago;
        },
        async mejorarPlan() {
            const datos = await axios.post("/facturar/crearOrden", {
                plan: this.plan,
                usuario: this.usuario,
            });
            try {
                window.open(await datos.data.response.init_point, "_blank");
                this.ref = JSON.parse(datos.data.response.external_reference);
                const verificado = await this.verificarPago();
                if (verificado === "approved") {
                    this.registrarMejora();
                    this.cargandoPago = false;
                } else {
                    this.cargandoPago = false;
                    Swal.fire({
                        icon: "error",
                        text: "No se pudo verificar el pago.",
                    });
                }
            } catch (error) {
                console.log(error);
            }
        },
        async contratarPlan() {
            try {
                const datos = await axios.post("/facturar/crearOrden", {
                    plan: this.plan,
                    usuario: this.usuario,
                });
                try {
                    let fechaActual = new Date();
                    const planMes = fechaActual.getMonth();
                    fechaActual.setMonth(Number(planMes) + Number(this.plan));
                    this.negocio.fechaVence = fechaActual
                        .toISOString()
                        .slice(0, 19)
                        .replace("T", " ");
                    window.open(await datos.data.response.init_point, "_blank");
                    this.ref = JSON.parse(datos.data.response.external_reference);
                    const verificado = await this.verificarPago();
                    if (verificado === "approved") {
                        this.registrar();
                        this.cargandoPago = false;
                    } else {
                        this.cargandoPago = false;
                        Swal.fire({
                            icon: "error",
                            text: "No se pudo verificar el pago.",
                        });
                    }
                } catch (error) {
                    console.log(error);
                }
            } catch (error) {
                console.log(error);
            }
        },
        async registrarMejora() {
            let fechaActual = new Date();
            const planMes = fechaActual.getMonth();
            fechaActual.setMonth(Number(planMes) + Number(this.plan));
            const añoNuevo = fechaActual.getFullYear();
            fechaActual = fechaActual.toISOString().slice(0, 19).replace("T", " ");
            try {
                axios.put("/facturar/acreditar", {
                    usuario: this.usuario,
                    fecha: fechaActual,
                });
                //aqui cortaria el while
                this.cargandoPago = false;
                localStorage.setItem("año", añoNuevo);
                router.push("/u/login");
                const Toast = Swal.mixin({
                    toast: true,
                    position: "bottom-end",
                    showConfirmButton: false,
                    timer: 5000,
                    timerProgressBar: true,
                    didOpen: (toast) => {
                        toast.addEventListener("mouseenter", Swal.stopTimer);
                        toast.addEventListener("mouseleave", Swal.resumeTimer);
                    },
                });
                Toast.fire({
                    icon: "success",
                    title: "Pago exitoso.",
                });
            } catch (error) {
                console.log(error);
            }
        },
        async registrarGratis() {
            let fechaActual = new Date();
            fechaActual.setFullYear(2100);
            this.negocio.fechaVence = fechaActual
                .toISOString()
                .slice(0, 19)
                .replace("T", " ");
            this.registrar();
        },
        async registrar() {
            await axios
                .post("/register", this.negocio)
                .then(() => {
                    router.push("/u/login");
                    const Toast = Swal.mixin({
                        toast: true,
                        position: "bottom-end",
                        showConfirmButton: false,
                        timer: 3000,
                        timerProgressBar: true,
                        didOpen: (toast) => {
                            toast.addEventListener("mouseenter", Swal.stopTimer);
                            toast.addEventListener("mouseleave", Swal.resumeTimer);
                        },
                    });

                    Toast.fire({
                        icon: "success",
                        title: "Registro exitoso.",
                    });
                })
                .catch((error) => {
                    Swal.fire({
                        icon: "error",
                        text: error.response.data.message,
                    });
                    console.error("Error al registrar usuario:", error);
                });
        },
    },
};
</script>

<style scoped>
.usuario-disponible {
    border-color: red;
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
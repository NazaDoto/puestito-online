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
        <div v-if="cargandoRegistro" class="pantalla-carga text-center">
            <div class="logo-carga">
                <img class="logo-img" src="/favicon.ico" width="50" alt="" />
                <div class="texto-carga">Registrando...</div>
            </div>
        </div>
        <div v-else class="container mt-4 mb-2">
            <div v-if="!usuario" class="row g-3 mt-4 border">
                <form @submit.prevent="registrarNegocio" id="form-checkout">
                    <div class="row g-3 border">
                        <h4 class="mb-2">Información de acceso</h4>
                        <h4 class="subtitulo">Cómo ingresarás a la plataforma.</h4>
                        <div class="col-md-6">
                            <input :class="{ 'usuario-disponible': !usuarioDisponible }" class="form-control"
                                type="text" id="username" v-model="negocio.usuario" maxlength="20"
                                @input="restrictInput" @change="verificarDisponibilidad" placeholder="Nombre de Usuario"
                                required />
                            <div class="subtitulo">Tu link será nazadoto.com/{{ negocio.usuario }}</div>
                        </div>
                        <div class="col-md-6">
                            <input class="form-control" type="password" id="password" maxlength="20"
                                v-model="negocio.contraseña" placeholder="Contraseña" required />
                            <div class="subtitulo" style="color:gray;">{{ negocio.contraseña }}</div>
                        </div>
                        <h4 class="mb-2">Información del negocio</h4>
                        <h4 class="subtitulo">
                            Más adelante podés modificar esta información.
                        </h4>
                        <div class="col-md-6">
                            <input class="form-control" type="text" id="nombre" v-model="negocio.nombre"
                                placeholder="Nombre del Negocio" required />
                        </div>
                        <div class="col-md-6">
                            <input class="form-control" type="text" id="descripcion" v-model="negocio.descripcion"
                                placeholder="Descripción (opcional)" maxlength="40" />
                        </div>
                        <div class="col-md-6">
                            <select class="form-select" name="rubro" id="rubro" v-model="negocio.rubro">
                                <option value="Elegí tu rubro" disabled>Elegí tu rubro</option>
                                <option value="Artesanías">Artesanías</option>
                                <option value="Bar/Restaurante">Bar/Restaurante</option>
                                <option value="Carnicería">Carnicería</option>
                                <option value="Consultorio">Consultorio</option>
                                <option value="Estética">Estética</option>
                                <option value="Farmacia">Farmacia</option>
                                <option value="Ferretería">Ferretería</option>
                                <option value="Fiambrería">Fiambrería</option>
                                <option value="Florería">Florería</option>
                                <option value="Heladería">Heladería</option>
                                <option value="Indumentaria">Indumentaria</option>
                                <option value="Inmobiliaria">Inmobiliaria</option>
                                <option value="Juguetería">Juguetería</option>
                                <option value="Librería">Librería</option>
                                <option value="Limpieza">Limpieza</option>
                                <option value="Panadería">Panadería</option>
                                <option value="Peluquería">Peluquería</option>
                                <option value="Polirubro">Polirubro</option>
                                <option value="Pollería">Pollería</option>
                                <option value="Repostería">Repostería</option>
                                <option value="Rotisería">Rotisería</option>
                                <option value="Reparación/mantenimiento">Reparación/mantenimiento</option>
                                <option value="Servicios">Servicios</option>
                                <option value="Supermercado">Supermercado</option>
                                <option value="Tecnología">Tecnología</option>
                                <option value="Verdulería">Verdulería</option>
                                <option value="Veterinaria/Forrajería">Veterinaria/Forrajería</option>
                            </select>
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
                                placeholder="Teléfono" />
                        </div>
                        <div class="col-md-6">
                            <input class="form-control" type="text" id="instagram" v-model="negocio.instagram"
                                placeholder="Usuario de Instagram (opcional)" />
                        </div>
                        <div class="col-md-6">
                            <input class="form-control" type="text" id="facebook" v-model="negocio.facebook"
                                placeholder="Usuario de Facebook (opcional)" />
                        </div>
                        <div class="col-md-6">
                            <label class="form-label text-center" for="imagen">Logo (JPG/PNG)</label>
                            <input class="form-control" type="file" name="imagen" id="imagen"
                                accept="image/jpeg, image/png" @change="imagenSeleccionada($event)" />
                        </div>
                        <div class="col-md-6">
                            <label class="form-label text-center" for="portada">Portada (JPG/PNG)</label>
                            <input class="form-control" type="file" name="portada" id="portada"
                                accept="image/jpeg, image/png" @change="portadaSeleccionada($event)" />
                        </div>
                        <div class="subtitulo">Puedes elegir las imágenes más tarde</div>
                        <button :disabled="!usuarioDisponible" v-if="!plan"
                            class="btn btn-menu botones m-auto mt-2 mb-2" type="submit">
                            Registrar
                        </button>
                        <button :disabled="!usuarioDisponible" v-else class="btn btn-menu botones m-auto mt-2 mb-2"
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
        <!--Modal Cropper-->
        <div v-show="modalCropImage" class="modalCategoriaContainer  text-center ">
            <div class="modalCategoria">
                <div class="modal-dialog modal-dialog-centered ">
                    <div class="modal-content ">
                        <div class="modal-header pl-2">
                            <h1 class="modal-title fs-5" id="agregarCategoriaLabel">Recortar Imagen</h1>
                            <button type="button" class="btn-close" @click="cerrarCrop" aria-label="Close"></button>
                        </div>
                        <div class="modal-body mt-2 ">
                            <div v-show="cargandoCropper" class="pantalla-cargas text-center">
                                <div class="logo-carga">
                                    <img class="logo-img" src="/favicon.ico" width="50" alt="">
                                    <div class="texto-carga">
                                        Cargando imagen
                                    </div>
                                </div>
                            </div>
                            <img ref="cropperImg" alt="Croppear">
                        </div>
                        <div class="modal-footer mt-2">
                            <button type="button" class="btn" @click="cerrarCrop">Cerrar</button>
                            <button class="btn btn-menu" @click="guardarImagenRecortada">Recortar</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div v-show="modalCropPortada" class="modalCategoriaContainer  text-center ">
            <div class="modalCategoria">
                <div class="modal-dialog modal-dialog-centered ">
                    <div class="modal-content ">
                        <div class="modal-header pl-2">
                            <h1 class="modal-title fs-5" id="agregarCategoriaLabel">Recortar Imagen</h1>
                            <button type="button" class="btn-close" @click="cerrarCropPortada"
                                aria-label="Close"></button>
                        </div>
                        <div class="modal-body mt-2 ">
                            <div v-show="cargandoCropperPortada" class="pantalla-cargas text-center">
                                <div class="logo-carga">
                                    <img class="logo-img" src="/favicon.ico" width="50" alt="">
                                    <div class="texto-carga">
                                        Cargando imagen
                                    </div>
                                </div>
                            </div>
                            <img ref="cropperPortada" alt="Croppear">
                        </div>
                        <div class="modal-footer mt-2">
                            <button type="button" class="btn" @click="cerrarCropPortada">Cerrar</button>
                            <button class="btn btn-menu" @click="guardarPortadaRecortada">Recortar</button>
                        </div>
                    </div>
                </div>
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
import Cropper from "cropperjs";

export default {
    components: {
        NavbarAdminComponent,
        NavbarPublicoComponent,
    },
    data() {
        return {
            cargandoRegistro: false,
            cargandoCropper: true,
            cargandoCropperPortada: true,
            modalCropImage: false,
            modalCropPortada: false,
            cropper: null,
            cropperPortada: null,
            imageToCrop: '',
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
                portada: "",
                direccion: "",
                telefono: "",
                descripcion: "",
                instagram: "",
                facebook: "",
                rubro: "Elegí tu rubro"
            },
        };
    },
    mounted() {
        this.obtenerPlan();
        window.scrollTo({ top: 0, behavior: 'smooth' });

    },
    methods: {
        restrictInput(event) {
            const input = event.target.value;
            // Expresión regular para buscar espacios y ciertos símbolos
            const restrictedChars = /[\s!@#$%^&*()_+=[\]{};':"\\|,<>?`´¨~¡/°¬¿]/g;
            if (restrictedChars.test(input)) {
                this.negocio.usuario = this.negocio.usuario.substring(0, this.negocio.usuario.length - 1);
            }
        }
        ,
        obtenerPlan() {
            const isAuthenticated = !!localStorage.getItem("token");/* Agrega aquí tu lógica para verificar si el usuario está autenticado */
            this.plan = localStorage.getItem("plan");
            console.log(this.plan)
            if (isAuthenticated) {
                if (this.plan) {
                    this.usuario = localStorage.getItem("usuario");
                    this.registrarNegocio();
                } else {
                    this.$router.push("/u/home");
                }
            }
        },
        portadaSeleccionada(event) {
            try {
                const file = event.target.files[0];
                if (file) {
                    const reader = new FileReader();
                    reader.onload = async (e) => {
                        this.imageToCrop = e.target.result;
                        this.modalCropPortada = true;
                        window.scrollTo({ top: 0, behavior: 'smooth' })
                        let cropperCanvas = this.$refs.cropperPortada;
                        cropperCanvas.src = this.imageToCrop;
                        this.$nextTick(() => {
                            const canvasExiste = document.querySelector('cropper-canvas');
                            if (canvasExiste) {
                                canvasExiste.parentNode.removeChild(canvasExiste);
                            }
                            this.cropperPortada = new Cropper(cropperCanvas, {
                                template: `<cropper-canvas background style='height:50vh;'>
                                    <cropper-image  initial-center-size='contain' alt='Crop' scalable=true translatable></cropper-image>
                                        <cropper-shade hidden></cropper-shade>
                                        <cropper-handle  action='move' plain></cropper-handle>
                                        <cropper-selection initial-coverage='0.5' aspect-ratio='0.75'  movable resizable>
                                            <cropper-grid role='grid' covered></cropper-grid>
                                            <cropper-crosshair centered></cropper-crosshair>
                                            <cropper-handle action='move'
                                                theme-color='rgba(255, 255, 255, 0.35)'></cropper-handle>
                                            <cropper-handle action='ne-resize'></cropper-handle>
                                            <cropper-handle action='nw-resize'></cropper-handle>
                                            <cropper-handle action='se-resize'></cropper-handle>
                                            <cropper-handle action='sw-resize'></cropper-handle>
                                        </cropper-selection>
                                    </cropper-canvas >` ,
                            });
                        });
                    };
                    reader.readAsDataURL(file);
                }
            } catch (error) {
                console.log(error)
            } finally {
                this.cargandoCropperPortada = false;
            }
        },
        async guardarPortadaRecortada() {
            try {
                const canvas = await this.cropperPortada.getCropperSelection().$toCanvas({
                    // Aumentar el tamaño del canvas para una mejor calidad
                    width: 1000, // Ajusta este valor según la calidad deseada
                    height: 1333, // Mantén el aspecto correcto de la imagen
                });

                // Convertir el canvas a una imagen de alta calidad
                this.negocio.portada = canvas.toDataURL('image/jpeg', 0.9); // Ajusta el segundo parámetro (0.9) para la calidad, donde 1.0 es la mejor calidad
            } catch (error) {
                console.error('Error al guardar la imagen recortada:', error);
            } finally {
                this.modalCropPortada = false;
            }
        },
        imagenSeleccionada(event) {
            try {
                const file = event.target.files[0];
                if (file) {
                    const reader = new FileReader();
                    reader.onload = async (e) => {
                        this.imageToCrop = e.target.result;
                        this.modalCropImage = true;
                        window.scrollTo({ top: 0, behavior: 'smooth' })
                        let cropperCanvas = this.$refs.cropperImg;
                        cropperCanvas.src = this.imageToCrop;
                        this.$nextTick(() => {

                            const canvasExiste = document.querySelector('cropper-canvas');
                            if (canvasExiste) {
                                canvasExiste.parentNode.removeChild(canvasExiste);
                            }
                            this.cropper = new Cropper(cropperCanvas, {
                                template: `<cropper-canvas background style='height:50vh;'>
                                    <cropper-image  initial-center-size='contain' alt='Crop' scalable=true translatable></cropper-image>
                                        <cropper-shade hidden></cropper-shade>
                                        <cropper-handle  action='move' plain></cropper-handle>
                                        <cropper-selection initial-coverage='0.5' aspect-ratio='1'  movable resizable>
                                            <cropper-grid role='grid' covered></cropper-grid>
                                            <cropper-crosshair centered></cropper-crosshair>
                                            <cropper-handle action='move'
                                                theme-color='rgba(255, 255, 255, 0.35)'></cropper-handle>
                                            <cropper-handle action='ne-resize'></cropper-handle>
                                            <cropper-handle action='nw-resize'></cropper-handle>
                                            <cropper-handle action='se-resize'></cropper-handle>
                                            <cropper-handle action='sw-resize'></cropper-handle>
                                        </cropper-selection>
                                    </cropper-canvas >` ,
                            });
                        });
                    };
                    reader.readAsDataURL(file);
                }
            } catch (error) {
                console.log(error)
            } finally {
                this.cargandoCropper = false;
            }
        },
        cerrarCrop() {
            this.modalCropImage = false;
        },
        cerrarCropPortada() {
            this.modalCropPortada = false;
        },
        async guardarImagenRecortada() {
            try {
                const canvas = await this.cropper.getCropperSelection().$toCanvas();
                this.negocio.imagen = canvas.toDataURL();
            } catch (error) {
                console.error('Error al guardar la imagen recortada:', error);
            } finally {
                this.modalCropImage = false;
            }
        },
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
        verificarRubro() {
            if (this.negocio.rubro == "Elegí tu rubro") {
                Swal.fire({
                    icon: "error",
                    text: "Por favor selecciona un rubro.",
                });
                return false;
            } else {
                return true;
            }
        },
        async registrarNegocio() {
            this.cargandoRegistro = true;
            if (this.plan) {
                this.cargandoPago = true;
                if (this.usuario) {
                    this.mejorarPlan();
                } else {
                    if (this.verificarRubro()) {

                        this.verificarDisponibilidad();
                        if (this.usuarioDisponible) {
                            this.usuario = this.negocio.usuario;
                            this.contratarPlan();
                        }
                    }
                }
            } else {
                if (this.verificarRubro()) {

                    this.verificarDisponibilidad();
                    if (this.usuarioDisponible) {
                        this.usuario = this.negocio.usuario;
                        this.registrarGratis();
                    }
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
                // Abrir la ventana emergente antes de la operación asíncrona
                const nuevaVentana = window.open('', '_blank');

                const urlPago = await datos.data.response.init_point;

                if (nuevaVentana) {
                    // Redirigir a la URL de MercadoPago en la ventana ya abierta
                    nuevaVentana.location.href = urlPago;
                } else {
                    throw new Error('No se pudo abrir la ventana emergente.');
                }

                // Procesar el external_reference
                this.ref = JSON.parse(datos.data.response.external_reference);

                // Verificar el pago
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
                this.cargandoPago = false;
                Swal.fire({
                    icon: 'error',
                    text: 'Por favor habilita las ventanas emergentes para ir a MercadoPago.' + (error.response?.data?.message || error.message),
                });
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
                    const nuevaVentana = window.open('', '_blank');

                    const urlPago = await datos.data.response.init_point;

                    if (nuevaVentana) {
                        // Redirigir a la URL de MercadoPago en la ventana ya abierta
                        nuevaVentana.location.href = urlPago;
                    } else {
                        throw new Error('No se pudo abrir la ventana emergente.');
                    }
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
                    Swal.fire({
                        icon: 'error',
                        text: 'Por favor habilita las ventanas emergentes para ir a MercadoPago.' + error.response.data.message,
                    });
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
                router.push("/");
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
            fechaActual.setMonth(fechaActual.getMonth() + 1);
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
                    router.push("/");
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
                }).finally(() => {
                    this.cargandoRegistro = false;
                });
        },
    },
};
</script>

<style scoped>
.modalCategoria {
    width: 60vw;
}

.usuario-disponible {
    border-color: red;
}



.pantalla-carga:hover {
    cursor: wait;
}

.form-control-fact {
    height: 40px;
}

.flex {
    display: flex;
}

.subtitulo {
    font-weight: normal;
    font-size: 14px;
    font-style: italic;
    margin: 0px;
    justify-content: start !important;
}

input.date {
    height: 45px;
}

.col-md-6 {
    margin-top: 5px;
    margin-bottom: 5px;
    justify-content: center;
    align-items: center !important;
}

.botones {
    width: 40%;
}

.fnac {
    margin-left: 15px;
    margin-top: 5px;
}

@media screen and (max-width: 992px) {
    .modalCategoria {
        width: 90vw;
    }
}
</style>
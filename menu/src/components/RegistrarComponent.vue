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
                            <input class="form-control" type="email" id="email" v-model="negocio.email"
                                placeholder="Email" required>
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
                        <button v-if="!plan" class="btn btn-menu botones m-auto mb-2" type="submit">Contratar</button>
                        <button v-else class="btn btn-menu botones m-auto mb-2" type="submit">Ir a Pagar</button>
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
                usuario: 'pepopa',
                contraseña: 'pepopa',
                nombre: 'Pepopa',
                fechaVence: '',
                email: 'pepopa@gmail.com',
                imagen: '1',
                direccion: 'Tucumán 100, Santiago del Estero, Argentina',
                telefono: '3855223288',
                descripcion: 'Esposisima',
                instagram: 'igpepopa',
                facebook: 'facepepopa',
            },
        };
    },
    mounted() {
        this.obtenerPlan();
    },
    methods: {
        async obtenerPlan() {
            this.plan = localStorage.getItem("plan");
            console.log("RegistrarComponent: ", this.plan);
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
        async registrarNegocio() {
            // Realizar una solicitud HTTP POST al servidor Express

            await axios.post('/register', this.negocio)
                .then(async () => {
                    if (this.plan) {
                        console.log("Entro a la parte de facturar")
                        localStorage.setItem("usuario", this.negocio.usuario);
                        const response = await axios.post('/facturar/crearOrden', { plan: this.plan }).then(async () => {
                            let fechaActual = new Date();
                            const planMes = fechaActual.getMonth() - 1;
                            fechaActual.setMonth(planMes + this.plan);
                            this.negocio.fechaVence = fechaActual.toISOString().slice(0, 19).replace('T', ' ');
                            window.open(await response.data.init_point, '_blank');
                            await axios.post('/register', this.negocio).then(()=>{
                                
                            })
                        })
                            .catch(error => {
                                console.log(error);
                            });
                    } else {
                        router.push('/u/login');
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
                    }
                })
                .catch(error => {
                    Swal.fire({
                        icon: 'error',
                        text: error.response.data.message
                    });
                    console.error('Error al registrar usuario:', error);
                });

        },
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
<template>
    <div>
        <NavbarComponent></NavbarComponent>
        <div class="container mt-2 mb-2 text-center">
            <!-- Mostrar información del negocio -->
            <div v-if="negocio">
                <div class="tarjeta-container">
                    <div class="row">
                        <h1 class="text-center">Mi Perfil</h1>
                        <div class="p-2 text-center">
                            <div class="tarjetaProducto">
                                <div v-if="añoVence == '2100'" class="textoTarjeta">
                                    <h4 class="titulo-div-forms mb-2">Esta es una cuenta gratis.</h4>
                                    <button @click="mejorarPlan" class="btn btn-agregar mb-2">Mejorar
                                        Plan</button>
                                </div>
                                <div v-else class="textoTarjeta">
                                    <h4 class="titulo-div-forms mb-2">Esta es una cuenta Premium.</h4>
                                    <h4 class="titulo-div-forms mb-2">Vence: {{ fechaVence }}</h4>
                                </div>
                                <div v-if="negocio.imagen">
                                    <img class="imagen" :src="negocio.imagen" alt=" ">
                                </div>
                                <div class="textoTarjeta">
                                    <div class="flex mt-2 ">
                                        <h3 class="izquierda">{{ negocio.nombre }}</h3>

                                    </div>
                                    <table class="table table-light table-striped">
                                        <thead>
                                            <th></th>
                                            <th></th>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>
                                                    <strong>Correo:</strong>
                                                </td>
                                                <td>{{ negocio.correo }}</td>
                                            </tr>
                                            <tr>
                                                <td><strong>Teléfono:</strong></td>
                                                <td>{{ negocio.telefono }}</td>
                                            </tr>
                                            <tr>
                                                <td><strong>Dirección:</strong></td>
                                                <td>{{ negocio.direccion }}</td>
                                            </tr>
                                            <tr>
                                                <td><strong>Descripción:</strong></td>
                                                <td>{{ negocio.descripcion }}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <div class="descripcion text-start">
                                        <div class="text-center">
                                            <a v-if="negocio.instagram" class="mauto" :href="negocio.instagram"
                                                target="blank"><img width='40' src="/recursos/instagram.png"></a>
                                            <div v-else>Sin Instagram</div>
                                            <a v-if="negocio.facebook" class="mauto" :href="negocio.facebook"
                                                target="blank"><img width='36' src="/recursos/facebook.png"></a>
                                            <div v-else>Sin Facebook</div>
                                        </div>
                                    </div>
                                    <button class="btn btn-menu col-md-12 mt-2 mb-2" title="Modificar"
                                        data-bs-toggle="modal" data-bs-target="#modificarProducto">Modificar
                                        Datos</button>

                                </div>
                            </div>
                            <br>

                        </div>

                    </div>
                </div>


                <!-- MODAL MODIFICAR-->
                <div class="modal fade" id="modificarProducto" tabindex="-1" aria-labelledby="modificarProductoLabel"
                    aria-hidden="true" ref="modalModificar">
                    <div class="modal-dialog modal-dialog-centered">
                        <div class="modal-content ">
                            <div class="modal-header">
                                <h1 class="modal-title fs-5" id="modificarProductoLabel">Modificar Datos</h1>
                                <button type="button" class="btn-close" data-bs-dismiss="modal"
                                    aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                <form @submit.prevent="modificarPerfil">
                                    <div class="row g-3 div-forms border">
                                        <h4 class="titulo-div-forms mb-2">Información del Negocio</h4>
                                        <div>
                                            <input class="form-control" type="text" id="nombre"
                                                v-model="negocioModificar.nombre" placeholder="Nombre del Negocio"
                                                required>
                                        </div>
                                        <div>
                                            <input class="form-control" type="email" id="correo"
                                                v-model="negocioModificar.correo" placeholder="Correo">
                                        </div>
                                        <div>
                                            <input class="form-control" type="number" id="telefono"
                                                v-model="negocioModificar.telefono" placeholder="Teléfono">
                                        </div>
                                        <div>
                                            <input class="form-control" type="text" id="direccion"
                                                v-model="negocioModificar.direccion" placeholder="Dirección">
                                        </div>
                                        <div>
                                            <input class="form-control" type="text" id="descripcion"
                                                v-model="negocioModificar.descripcion" placeholder="Descripción">
                                        </div>
                                        <div>
                                            <input class="form-control" type="text" id="instagram"
                                                v-model="negocioModificar.instagram" placeholder="Instagram">
                                        </div>
                                        <div>
                                            <input class="form-control" type="text" id="facebook"
                                                v-model="negocioModificar.facebook" placeholder="Facebook">
                                        </div>
                                        <div>
                                            <label class="form-label mr-2" for="imagen">Imagen (JPG)</label>
                                            <input class="form-control" type="file" name="imagen" id="imagen"
                                                accept=".jpg" @change="imagenSeleccionada">
                                        </div>
                                    </div>
                                    <div class="text-end">
                                        <button type="button" class="btn mt-3" data-bs-dismiss="modal">Cerrar</button>
                                        <button class="btn btn-menu mt-3" type="submit"
                                            data-bs-dismiss="modal">Modificar</button>
                                    </div>
                                </form>
                            </div>


                        </div>
                    </div>
                </div>
                <!--Modal Cropper-->
                <div v-show="modalCropImage" class="modalCategoriaContainer  text-center ">
                    <div class="modalCategoria">
                        <div class="modal-dialog modal-dialog-centered ">
                            <div class="modal-content ">
                                <div class="modal-header pl-2">
                                    <h1 class="modal-title fs-5" id="agregarCategoriaLabel">Recortar Imagen</h1>
                                    <button type="button" class="btn-close" @click="cerrarCrop"
                                        aria-label="Close"></button>
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
            </div>
        </div>
    </div>
</template>

<script>
import router from '@/router';
import NavbarComponent from './NavbarComponent.vue';
import axios from 'axios';
import Swal from 'sweetalert2';
import Cropper from 'cropperjs';
export default {
    components: {
        NavbarComponent,
    },
    data() {
        return {
            cargandoCropper: true,
            modalCropImage: false,
            cropper: null,
            imageToCrop: '',
            fechaVence: '',
            añoVence: '',
            negocio: {
                usuario: '',
                nombre: '',
                fechaVence: '',
                correo: '',
                telefono: '',
                direccion: '',
                descripcion: '',
                imagen: '',
                instagram: '',
                facebook: ''
            },
            negocioModificar: '',
        };
    },
    mounted() {
    },
    created() {
        // Realiza una solicitud HTTP para obtener los informes desde el servidor
        this.obtenerInformacionNegocio();
    },
    methods: {
        mejorarPlan() {
            router.push('/u/planes');
        },
        modificarPerfil() {
            axios.put('/modificarPerfil', { negocio: this.negocioModificar }).then(() => {
                localStorage.setItem('nombre', this.negocioModificar.nombre);
                const Toast = Swal.mixin({
                    toast: true,
                    position: 'bottom-end',
                    showConfirmButton: false,
                    timer: 2000,
                    timerProgressBar: true,
                    didOpen: (toast) => {
                        toast.addEventListener('mouseenter', Swal.stopTimer)
                        toast.addEventListener('mouseleave', Swal.resumeTimer)
                    }
                })

                Toast.fire({
                    icon: 'success',
                    title: 'Datos modificados.'
                });
                setTimeout(function () {
                    location.reload();
                }, 2000);
            })
                .catch((error) => {
                    console.error('Error al actualizar la información en la base de datos:', error);
                });
        },
        async obtenerInformacionNegocio() {
            try {
                // Realiza una solicitud HTTP GET para obtener los informes desde el servidor
                const response = await axios.get(`/miNegocio?usuario=${localStorage.getItem('usuario')}`);
                // Actualiza la lista de informes con los datos recibidos
                this.negocio = response.data;
                this.negocioModificar = response.data;
                const fechaVence = new Date(response.data.fechaVence);
                this.añoVence = fechaVence.getFullYear();
                this.fechaVence = fechaVence.getDate() + '/' + (Number(fechaVence.getMonth()) + 1) + '/' + fechaVence.getFullYear();
            } catch (error) {
                console.error("Error al cargar los productos:", error);
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
                        let cropperCanvas = this.$refs.cropperImg;
                        cropperCanvas.src = this.imageToCrop;
                        this.$nextTick(() => {

                            const canvasExiste = document.querySelector('cropper-canvas');
                            if (canvasExiste) {
                                canvasExiste.parentNode.removeChild(canvasExiste);
                            }
                            this.cropper = new Cropper(cropperCanvas, {
                                template: `<cropper-canvas background style='height:50vh;'>
                                    <cropper-image alt='Lol' rotatable=false>asd</cropper-image>
                                        <cropper-shade hidden></cropper-shade>
                                        <cropper-handle  action='move' plain></cropper-handle>
                                        <cropper-selection initial-coverage='0.5' aspect-ratio='1' movable resizable zoomable>
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
        async guardarImagenRecortada() {
            try {
                const canvas = await this.cropper.getCropperSelection().$toCanvas();
                this.negocioModificar.imagen = canvas.toDataURL();
            } catch (error) {
                console.error('Error al guardar la imagen recortada:', error);
            } finally {
                this.modalCropImage = false;
            }
        },
    }
};
</script>

<style scoped>
.modal-dialog .modal-dialog-center {
    z-index: 1 !important;
}

.block {
    display: block !important;
    width: 400px;
}

.mauto {
    margin: 10px;
}

.socials-ico {
    margin: 30px;
}

hr {
    margin: 0px;
}

.tarjeta-container {
    padding: 10px;
}

.textoTarjeta {
    padding: 5px 15px;
}

.categoria-container {
    padding: 5px;
    border: 5px;
    background-color: white;
    border-radius: 20px;
}


.titulo-categoria {
    font-weight: bold;
    font-size: 30px;
}

.tarjetaProducto {
    box-shadow: 0.5px 1px 4px;
    margin: 10px 10px;
    border: 5px;
    background-color: white;
    border-radius: 10px;
    display: inline-block;
}

.descripcion {
    font-style: italic;
}

img {
    object-fit: contain;
}

.imagen {
    margin-top: 10px;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    width: 400px;
    height: 200px;
}

.izquierda {
    margin: auto;
}

.derecha {
    display: inline-flex;
    justify-content: center;
    gap: 15px;
    margin: auto;
}

.modalCategoria {
    width: 60vw;
}

@media screen and (max-width: 992px) {
    .modalCategoria {
        width: 90vw;
    }

    .imagen {
        width: 100%;
    }

    .tarjetaProducto {
        display: block;
        margin: 10px 0px;
    }

    .tarjeta-container {
        margin: auto;
    }
}
</style>
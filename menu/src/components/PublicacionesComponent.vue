<template>
    <div>
        <NavbarComponent></NavbarComponent>
        <div class="container pt-4 text-center">
            <div v-show="cargandoPublicaciones" class="pantalla-carga text-center">
                <div class="logo-carga">
                    <img class="logo-img" src="/favicon.ico" width="50" alt="">
                    <div class="texto-carga">
                        Cargando Publicaciones
                    </div>
                </div>
            </div>
            <h1>Publicaciones</h1>
            <p v-if="publicaciones.length == 0">No hay publicaciones aún.</p>
            <router-link class="m-auto" to="/u/nuevapublicacion">
                <img src="/recursos/plus.png" width="40" alt="">
            </router-link>
            <hr>
            <div class="div-publicaciones">
                <div v-for="(publicacion, index) in publicaciones" :key="index">
                    <div class="item-publicacion">
                        <div class="btn-borrar">
                            <button @click="publicacionPorBorrarMethod(publicacion.id)" class="btn-close"
                                data-bs-toggle="modal" data-bs-target="#borrarPublicacion"></button>
                        </div>
                        <img class="publicacion" :src="publicacion.publicacion" alt="">
                    </div>
                </div>
            </div>
            <div class="modal fade" id="borrarPublicacion" tabindex="-1" aria-labelledby="borrarPublicacionLabel"
                aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header text-center">
                            <h1 class="modal-title fs-5" id="borrarPublicacionLabel">¿Borrar?</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-footer text-center">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">No</button>
                            <button type="button" class="btn btn-menu-danger" data-bs-dismiss="modal"
                                @click="borrarPublicacion">Sí, borrar</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import NavbarComponent from './NavbarComponent.vue';
import axios from 'axios';
import Swal from 'sweetalert2';
export default {
    components: {
        NavbarComponent
    },
    data() {
        return {
            nombreUsuario: '',
            publicaciones: [],
            cargandoPublicaciones: true,
            publicacionPorBorrar: '',
        }
    },
    mounted() {
        this.nombreUsuario = localStorage.getItem("usuario");
        this.fetchPublicaciones();
    },
    methods: {
        publicacionPorBorrarMethod(id){
            this.publicacionPorBorrar = id;
            console.log(this.publicacionPorBorrar);
        },
        async borrarPublicacion() {
            try {
                await axios.delete(`/borrarPublicacion?id=${this.publicacionPorBorrar}`).then(() => {
                    const Toast = Swal.mixin({
                        toast: true,
                        position: 'bottom-end',
                        showConfirmButton: false,
                        timer: 1000,
                        timerProgressBar: true,
                        didOpen: (toast) => {
                            toast.addEventListener('mouseenter', Swal.stopTimer);
                            toast.addEventListener('mouseleave', Swal.resumeTimer);
                        },
                    });

                    Toast.fire({
                        icon: 'success',
                        title: 'Publicación borrada.',
                    });
                    setTimeout(function () {
                        location.reload();
                    }, 1000);
                })
                    .catch(() => {
                        Swal.fire({
                            icon: 'error',
                            text: 'No se pudo borrar.',
                        });
                    });

            } catch (error) {
                console.error(error);
            }
        },
        setImageWidth(event) {
            this.widthImg = event.target.width;
        },
        async fetchPublicaciones() {
            try {
                const response = await axios.get(`/publicaciones?usuario=${this.nombreUsuario}`);
                this.publicaciones = response.data.sort((a, b) => b.id - a.id);
            } catch (error) {
                console.error(error);
            } finally {
                this.cargandoPublicaciones = false;
            }
        },

    },
}
</script>

<style scoped>
.btn-menu {
    margin-top: 20svh;
}

.preview-publicacion {
    height: 40svh;
}

.texto-publicacion {
    margin: auto;
    position: relative;
    top: 90%;
    color: white;
    background-color: rgba(0, 0, 0, 0.6);
    font-size: 1.3rem;
}


.div-publicaciones {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 20px;
}

.item-publicacion {
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    /* Necesario para que el botón de borrar esté en relación con este contenedor */
    width: 20svw;
    height: 20svw;
    overflow: hidden;
}

.btn-borrar {
    position: absolute;
    top: 5px;
    /* Ajusta según sea necesario */
    right: 5px;
    /* Ajusta según sea necesario */
    z-index: 2;
    /* Asegura que el botón esté por encima de la imagen */
}

.publicacion {
    width: 100%;
    height: 100%;
    object-fit: contain;
    /* La imagen se ajusta al contenedor sin recortar, pero puede dejar espacio vacío */
    display: block;
    background-color: white;
}



@media screen and (max-width: 992px) {
    .item-publicacion {
        width: 35svw;
        height: 35svw;
    }
}
</style>
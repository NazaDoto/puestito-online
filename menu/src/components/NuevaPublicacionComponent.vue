<template>
    <div>
        <NavbarComponent></NavbarComponent>
        <div v-show="subiendoPublicacion" class="pantalla-carga text-center">
            <div class="logo-carga">
                <img class="logo-img" src="/favicon.ico" width="50" alt="">
                <div class="texto-carga">
                    Subiendo Publicación
                </div>
            </div>
        </div>
        <div class="container pt-4 text-center">
            <h1>Subir Publicación</h1>
            <router-link class="m-auto" to="/u/publicaciones">
                <img src="/recursos/back.png" width="40" alt="">
            </router-link>
            <div class="col-md-6 m-auto text-start">
                <form @submit.prevent="subir">
                    <label class="form-label" for="subirImagen">Cargar</label>
                    <input class="form-control mb-3" type="file" name="imagen" id="imagen"
                        accept="image/jpeg, image/png" @change="imagenSeleccionada($event)" />
                    <label for="textoPublicacion">Escribe un texto (opcional)</label>
                    <input type="text" class="form-control" v-model="textoPublicacion" maxlength="50">
                    <div v-if="imgCargada" class="col-md-6 m-auto mt-2 mb-2">
                        <div class="preview-publicacion" id="canvasPublicacion">
                            <div class="contenedor-imagen">
                                <img class="img-publicacion" :src="imgCargada" alt="Imagen cargada">
                                <p v-if="textoPublicacion" class="texto-publicacion">{{ textoPublicacion }}</p>
                            </div>
                        </div>
                    </div>
                    <div class="text-center">

                        <button type="submit" class="btn btn-menu" v-if="imgCargada">Subir</button>
                    </div>
                </form>
            </div>
            <div v-show="cargandoImagen" class="pantalla-cargas text-center">
                <div class="logo-carga">
                    <img class="logo-img" src="/favicon.ico" width="50" alt="">
                    <div class="texto-carga">Cargando imagen</div>
                </div>
            </div>
            <div class="publicaciones"></div>
        </div>
    </div>
</template>

<script>
import router from '@/router';
import NavbarComponent from './NavbarComponent.vue';
import axios from 'axios';
import html2canvas from "html2canvas";
import Swal from 'sweetalert2';

export default {
    components: {
        NavbarComponent
    },
    data() {
        return {
            nombreUsuario: '',
            cargandoImagen: false,
            imgCargada: '',
            publicacion: '',
            textoPublicacion: '',
            widthImg: 0,
            subiendoPublicacion: false,
        }
    },
    mounted() {
        this.nombreUsuario = localStorage.getItem("usuario");
    },
    methods: {
        setImageWidth(event) {
            this.widthImg = event.target.width;
        },
        async subir() {
            try {
                this.subiendoPublicacion = true;
                const canvasElement = document.getElementById("canvasPublicacion");
                const canvas = await html2canvas(canvasElement);
                const imgData = canvas.toDataURL("image/png");

                await axios.post('/nuevaPublicacion', { usuario: this.nombreUsuario, publicacion: imgData }).then(() => {
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
                        title: 'Publicación exitosa.',
                    });
                    setTimeout(function () {
                        router.push('/u/publicaciones');
                    }, 1000);
                })
                    .catch((er) => {
                        Swal.fire({
                            icon: 'error',
                            text: 'No se pudo publicar.' + er,
                        });
                    });

            } catch (error) {
                console.error("Error al subir la publicación:", error);
            } finally {
                this.subiendoPublicacion = true;
            }
        },
        imagenSeleccionada(event) {
            try {
                this.cargandoImagen = true;
                const file = event.target.files[0];
                if (file) {
                    const reader = new FileReader();
                    reader.onload = async (e) => {
                        this.imgCargada = e.target.result;
                        this.$nextTick(() => {
                            const imgElement = document.querySelector(".img-publicacion");
                            if (imgElement) {
                                this.widthImg = imgElement.offsetWidth;
                            }
                        });
                    };
                    reader.readAsDataURL(file);
                }
            } catch (error) {
                console.log(error);
            } finally {
                this.cargandoImagen = false;
            }
        }
    },
};
</script>

<style scoped>
.preview-publicacion {
    height: auto;
    padding: 0 !important;
    display: flex;
    justify-items: center;
}

.contenedor-imagen {
    position: relative;
    /* Permite que los elementos hijos con posición absoluta se posicionen dentro de este contenedor */
    display: inline-block;
}

.img-publicacion {
    background-color: white;
    align-content: center;
    max-width: 100%;
    display: block;
}

.texto-publicacion {
    word-wrap: break-word;
    position: absolute;
    bottom: 10%;
    /* Posiciona el texto desde el fondo de la imagen */
    left: 50%;
    /* Centra horizontalmente */
    transform: translateX(-50%);
    /* Ajusta la posición horizontal */
    color: white;
    background-color: rgba(0, 0, 0, 0.6);
    font-size: 1.3rem;
    padding: 5px 10px;
    width: 100%;
    /* Para que el texto no ocupe todo el ancho de la imagen */
    text-align: center;
    z-index: 2;
    /* Asegura que el texto esté por encima de la imagen */
}


.publicaciones {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    justify-content: center;
}
</style>

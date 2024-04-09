<template>
    <div>
        <NavbarComponent></NavbarComponent>
        <div class="container mt-4 mb-2">
            <h1 class="text-center">Nuevo Producto</h1>
            <form @submit.prevent="nuevoProducto(this.producto)" enctype="multipart/form-data">
                <div class="row g-3 div-forms border mt-2">
                    <h4 class="titulo-div-forms mb-2">Información del Producto</h4>
                    <div class="col-md-6">
                        <input class="form-control" type="text" id="nombre" v-model="producto.nombre"
                            placeholder="Nombre del Producto" required />
                    </div>
                    <div class="col-md-12 mt-3">
                        <textarea class="form-control" type="text" id="descripcion" v-model="producto.descripcion"
                            placeholder="Descripción"></textarea>
                    </div>
                    <div class="col-md-6">
                        <select class="form-select" v-model="producto.categoria" id="" required>
                            <option selected disabled>Categoría</option>
                            <option v-for="categoria in categorias" :key="categoria.id"
                                :value="categoria.categoria_nombre">
                                {{ categoria.categoria_nombre }}
                            </option>
                        </select>
                    </div>
                    <div class="col-md-6 izq">
                        <button type="button" class="btn btn-agregar" data-bs-toggle="modal"
                            data-bs-target="#agregarCategoria">
                            Agregar Categoría
                        </button>
                    </div>
                    <div class="col-md-6">
                        <input class="form-control" type="number" id="precio" v-model="producto.precio"
                            placeholder="Precio (sin $)" />
                    </div>
                    <div class="col-md-6">
                        <label class="form-label mr-2" for="imagen">Imagen (JPG)</label>
                        <input class="form-control" type="file" name="imagen" id="imagen" accept=".jpg"
                            @change="imagenSeleccionada($event)" />
                    </div>
                </div>

                <div>
                    <button class="btn btn-success botones mt-3" type="submit">Registrar</button>
                </div>
            </form>
            <!-- Modal -->
            <div class="modal fade" id="agregarCategoria" tabindex="-1" aria-labelledby="agregarCategoriaLabel"
                aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content ">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="agregarCategoriaLabel">Nueva Categoría</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <form @submit.prevent="agregarCategoria">
                                <input class="form-control" type="text" id="nombre" v-model="categoria_nombre"
                                    placeholder="Nombre de la Categoría" required />
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary"
                                        data-bs-dismiss="modal">Cerrar</button>
                                    <button class="btn btn-primary" type="submit"
                                        data-bs-dismiss="modal">Agregar</button>
                                </div>
                            </form>
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

export default {
    components: {
        NavbarComponent,
    },
    data() {
        return {
            producto: {
                nombre: '',
                descripcion: '',
                categoria: 'Categoría',
                precio: '',
                imagen: '',
                usuario: '',
            },
            categoria_nombre: '',
            categorias: [],
            modalAbierto: false,
        };
    },
    created() {
        // Obtener las categorías al cargar el componente
        this.obtenerCategorias();
        this.obtenerUsuario();
    },
    methods: {
        obtenerUsuario() {
            this.producto.usuario = localStorage.getItem('usuario');
        },
        obtenerCategorias() {
            // Realizar una solicitud para obtener las categorías desde el servidor
            axios.get(`/categorias?usuario=${localStorage.getItem('usuario')}`)
                .then((response) => {
                    this.categorias = response.data; // Asigna las categorías a la variable
                })
                .catch((error) => {
                    console.error('Error al obtener las categorías:', error);
                });
        },
        imagenSeleccionada(event) {
            const file = event.target.files[0];
            if (file) {
                // Utiliza FileReader para leer el contenido de la imagen como una URL de datos
                const reader = new FileReader();
                reader.onload = (e) => {
                    // Al cargar la imagen, asigna la URL de datos a producto.imagen
                    this.producto.imagen = e.target.result;
                };
                reader.readAsDataURL(file);
            }
        },
        nuevoProducto(producto) {
            axios.post('/nuevoProducto', { producto: producto })
                .then(() => {
                    const Toast = Swal.mixin({
                        toast: true,
                        position: 'bottom-end',
                        showConfirmButton: false,
                        timer: 2000,
                        timerProgressBar: true,
                        didOpen: (toast) => {
                            toast.addEventListener('mouseenter', Swal.stopTimer);
                            toast.addEventListener('mouseleave', Swal.resumeTimer);
                        },
                    });

                    Toast.fire({
                        icon: 'success',
                        title: 'Producto agregado.',
                    });
                    this.modalAbierto = true;
                    setTimeout(function () {
                        router.push('/nuevoProducto');
                    }, 2000);
                })
                .catch(() => {
                    Swal.fire({
                        icon: 'error',
                        text: 'No se pudo agregar el producto.',
                    });
                });

        },

        agregarCategoria() {
            axios.post('nuevaCategoria', { categoria_nombre: this.categoria_nombre, usuario_nombre: localStorage.getItem('usuario') })
                .then(() => {
                    // Agregar la nueva categoría a la lista de categorías
                    this.obtenerCategorias();
                    // Limpiar el campo de nombre de categoría
                    this.producto.categoria = this.categoria_nombre;
                    this.categoria_nombre = '';

                    // Opcional: Puedes seleccionar automáticamente la nueva categoría
                    const Toast = Swal.mixin({
                        toast: true,
                        position: 'bottom-end',
                        showConfirmButton: false,
                        timer: 3000,
                        timerProgressBar: true,
                        didOpen: (toast) => {
                            toast.addEventListener('mouseenter', Swal.stopTimer);
                            toast.addEventListener('mouseleave', Swal.resumeTimer);
                        },
                    });

                    Toast.fire({
                        icon: 'success',
                        title: 'Categoría agregada.',
                    });
                    this.modalAbierto = true;
                })
                .catch(() => {
                    Swal.fire({
                        icon: 'error',
                        text: 'No se pudo agregar la categoría.',
                    });
                });
        },
    },
};
</script>


<style scoped>
textarea {
    margin: auto !important;
}

.izq {
    justify-content: left !important;
}

.col-md-12 {
    margin: auto;
}

.btn-agregar {
    background: linear-gradient( rgb(255, 251, 234), rgb(255, 240, 155)) !important;
    box-shadow:0.2px 0.2px 2px white;
    border:none;
    border-radius: 1px;
}

.modal-footer {
    border-top: none;
}

.btn-agregar:hover {
    background: linear-gradient( rgb(253, 247, 217), rgb(255, 236, 128)) !important;
}

.mr-2 {
    margin-right: 15px;
}
</style>
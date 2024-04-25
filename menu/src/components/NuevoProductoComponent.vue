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
                        <button type="button" class="btn btn-agregar" @click="agregarCategoriaModal">
                            Agregar Categoría
                        </button>
                    </div>
                    <div class="col-md-6">
                        <input class="form-control" type="number" id="precio" v-model="producto.precio"
                            placeholder="Precio (sin $)" />
                    </div>
                    <div class="col-md-6">
                        <label class="form-label mr-2" for="imagen">Imagen (JPG)</label>
                        <input class="form-control mb-3" type="file" name="imagen" id="imagen" accept=".jpg"
                            @change="imagenSeleccionada($event)" />
                    </div>
                </div>

                <div>
                    <button class="btn btn-menu botones mt-3" type="submit">Agregar</button>
                </div>
            </form>
            <!-- Modal -->
            <div v-if="agregarCategoriaModalAbierto" class="modalCategoriaContainer">
                <div class="modalCategoria">
                    <div class="modal-dialog modal-dialog-centered">
                        <div class="modal-content ">
                            <div class="modal-header pl-2">
                                <h1 class="modal-title fs-5" id="agregarCategoriaLabel">Nueva Categoría</h1>
                                <button type="button" class="btn-close" @click="cerrarCategoriaModal"
                                    aria-label="Close"></button>
                            </div>
                            <div class="modal-body mt-2">
                                <form @submit.prevent="agregarCategoria">
                                    <input class="form-control" type="text" id="nombre" v-model="categoria_nombre"
                                        placeholder="Nombre de la Categoría" required />
                                    <div class="modal-footer mt-2">
                                        <button type="button" class="btn" @click="cerrarCategoriaModal">Cerrar</button>
                                        <button class="btn btn-agregar" type="submit">Agregar</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- Modal IMPORTAR -->
            <div class="modal fade" id="importar" tabindex="-1" aria-labelledby="importarLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content ">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="importarLabel">Importar desde Excel</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <form @submit.prevent="importar">
                            <div class="modal-body text-center">
                                <p class="text-center">Asegurate de que en tu planilla de Excel existan las columnas con
                                    encabezados <strong>"Producto"</strong>, en donde se encontrará
                                    el nombre del producto, y <strong>"P. Venta"</strong>, en donde se encontrará el
                                    precio del producto. <u>(Se ignorará el resto de columnas)</u>.
                                    Más adelante podrás modificar la información de los mismos en la pestaña
                                    <strong>"Listar Productos"</strong>.
                                </p>
                                <img class="m-auto" src="/recursos/ejemplo-xlsx.png" width="100%" alt="">
                                <input class="form-control mt-4" accept=".xlsx, .xls" type="file" name="importar"
                                    id="importar" @change="cargarImportacion" required>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn" data-bs-dismiss="modal">Cerrar</button>
                                <button class="btn btn-menu" type="submit">Importar</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        <div class="text-end">
            <i> o importar listado desde Excel -></i>
                <button type="button" class="btn btn-importar" data-bs-toggle="modal" data-bs-target="#importar">
                   <img src="/recursos/xlsx.png" width="50" alt="" title="Importar desde Excel">
                </button>
            </div>
    </div>
</template>

<script>
import NavbarComponent from './NavbarComponent.vue';
import axios from 'axios';
import Swal from 'sweetalert2';
import * as XLSX from 'xlsx';
export default {
    components: {
        NavbarComponent,
    },
    data() {
        return {
            agregarCategoriaModalAbierto: false,
            archivo: null,
            usuario: '',
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
        cerrarCategoriaModal() {
            this.agregarCategoriaModalAbierto = false;
        },
        agregarCategoriaModal() {
            this.agregarCategoriaModalAbierto = true;
        },
        cargarImportacion(evento) {
            this.archivo = evento.target.files[0];
        },
        async importar() {
            if (!this.archivo) {
                console.error('No se ha seleccionado ningún archivo');
                return;
            }

            // Leer el archivo Excel
            const reader = new FileReader();

            reader.onload = async (e) => {
                try {
                    const data = new Uint8Array(e.target.result);
                    const workbook = XLSX.read(data, { type: 'array' });
                    // Obtener la primera hoja del libro de trabajo
                    const sheetName = workbook.SheetNames[0];
                    const sheet = workbook.Sheets[sheetName];

                    // Convertir la hoja de cálculo a un objeto JSON
                    const jsonData = XLSX.utils.sheet_to_json(sheet);

                    // Procesar los datos y guardarlos en la base de datos
                    await this.guardarProductos(jsonData);
                } catch (error) {
                    console.error('Error al leer el archivo:', error);
                }
            };

            reader.readAsArrayBuffer(this.archivo);
        },

        async guardarProductos(data) {
            // Iterar sobre los datos y guardarlos en la base de datos
            try {

                for (const item of data) {
                    let precio = item['P. Venta'];

                    // Verificar si el precio comienza con $ o € y eliminar el símbolo
                    try {
                        if (precio.startsWith('$') || precio.startsWith('€')) {
                            precio = precio.replace('$', '').replace('€', '');
                        }

                        // Convertir una coma en punto si está presente en el precio
                        if (precio.includes(',')) {
                            precio = precio.replace(',', '.');
                        }
                    } catch { null }

                    // Crear el objeto producto con el precio modificado
                    const producto = {
                        nombre: item['Producto'],
                        precio: parseFloat(precio), // Convertir el precio a número flotante
                        categoria: 'Varios',
                        disponibilidad: 1,
                        imagen: '',
                        usuario: this.usuario
                    };

                    // Aquí deberías hacer una petición HTTP a tu servidor para guardar el producto en la base de datos
                    // Por ejemplo, utilizando axios
                    try {
                        this.nuevoProducto(producto);
                    } catch (error) {
                        Swal.fire({
                            icon: 'error',
                            text: 'No se pudo agregar el producto.',
                        });
                    }
                }
            } catch (error) {
                Swal.fire({
                    icon: 'error',
                    text: 'No se pudo agregar el producto. Verifica la información del Excel.' + error,
                });
            }
        },
        obtenerUsuario() {
            this.producto.usuario = this.usuario = localStorage.getItem('usuario');
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
                        location.reload();
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
                    this.agregarCategoriaModalAbierto = false;
                })
                .catch((error) => {
                    Swal.fire({
                        icon: 'error',
                        text: 'No se pudo agregar la categoría. ' + error.response.data.message,
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



.modal-footer {
    border-top: none;
}



.mr-2 {
    margin-right: 15px;
}

</style>
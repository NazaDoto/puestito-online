<template>
  <div>
    <NavbarComponent></NavbarComponent>
    <div class="container mt-4 mb-2">
      <h1 class="text-center">Listado de Productos</h1>
      <div class="flex">

        <div class="izquierda ancho-busqueda">
          <input class="form-control barra-busqueda" v-model="busqueda" type="text" name="busqueda" id="" placeholder="Buscar"
            title="Ingrese una palabra clave...">
        </div>
      </div>
      <div class="ancho border border-2 mt-2">
        <table class="table table-light table-striped text-center" id="informe-table">
          <thead>
            <tr>
              <th>Nombre del Producto</th>
              <th>Descripción</th>
              <th>Categoría</th>
              <th>Precio</th>
              <th>¿Disponible?</th>
              <th>Imagen</th>
              <th> </th>
              <th> </th>

            </tr>
          </thead>
          <tbody>
            <!-- Itera sobre los datos de la lista de informes y muestra cada fila en la tabla -->
            <tr class="mauto" v-for="(producto, index) in productosFiltrados" :key="index">
              <td>{{ producto.producto_nombre }}</td>
              <td>{{ producto.producto_descripcion }}</td>
              <td>{{ producto.producto_categoria }}</td>
              <td>{{ producto.producto_precio }}</td>
              <td>
                <div class="form-check form-switch"><input type="checkbox" @change="actualizarEstadoProducto(producto)"
                    class="form-check-input" name="" id="productoDisponible"
                    :checked="producto.producto_disponibilidad === 1"></div>
              </td>
              <td ><img class="imagen" v-if="producto.producto_imagen" :src="producto.producto_imagen" alt="">
              <div v-else>
                <img class="imagen" src="/recursos/missing-img.png" alt="">
              </div></td>
              <td>
                <button class="btn btn-success" title="Modificar" data-bs-toggle="modal"
                  data-bs-target="#modificarProducto" @click="modificar(producto)">Modificar</button>
              </td>
              <td>
                <button class="btn btn-danger" title="Eliminar" @click="eliminar(producto.producto_id)">Eliminar</button>
              </td>
            </tr>
          </tbody>
        </table>
        <div v-if="productosFiltrados.length === 0" class="text-center mt-3">
          No se encontraron resultados para esa búsqueda.
        </div>
      </div>

      <!-- MODAL MODIFICAR-->
      <div class="modal fade" id="modificarProducto" tabindex="-1" aria-labelledby="modificarProductoLabel"
        aria-hidden="true" ref="modalModificar">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content ">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="modificarProductoLabel">Modificar Producto</h1>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <form @submit.prevent="modificarProducto(this.productoModificar)">
                <div class="row g-3 div-forms border">
                  <h4 class="titulo-div-forms mb-2">Información del Producto</h4>
                  <div>
                    <input class="form-control" type="text" id="nombre" v-model="productoModificar.producto_nombre"
                      required>
                  </div>
                  <div>
                    <textarea class="form-control" type="text" id="descripcion"
                      v-model="productoModificar.producto_descripcion" placeholder="Descripción"></textarea>
                  </div>
                  <div>
                    <select class="form-select" v-model="productoModificar.producto_categoria" id="" required>
                      <option selected disabled>Categoría</option>
                      <option v-for="categoria in categorias" :key="categoria.id" :value="categoria.categoria_nombre">{{
                        categoria.categoria_nombre }}</option>
                    </select>
                  </div>
                  <div>
                    <button type="button" class="btn btn-agregar" data-bs-toggle="modal"
                      data-bs-target="#agregarCategoria">
                      Agregar Categoría
                    </button>

                  </div>
                  <div>
                    <input class="form-control" type="number" id="precio" v-model="productoModificar.producto_precio"
                      placeholder="Precio (sin $)">
                  </div>
                  <div>
                    <label class="form-label mr-2" for="imagen">Imagen (JPG)</label>
                    <input class="form-control" type="file" name="imagen" id="imagen" accept=".jpg"
                      @change="imagenSeleccionada">
                  </div>
                </div>
                <div class="text-end">
                  <button class="btn btn-success botones mt-3" type="submit" data-bs-dismiss="modal" aria-label="Close">Modificar</button>
                </div>
              </form>
            </div>


          </div>
        </div>
      </div>

      <!-- MODAL CATEGORIA -->
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
                  placeholder="Nombre de la Categoría" required>
                <div class="modal-footer">
                  <button type="button" class="btn btn-secondary" data-bs-target="#modificarProducto"
                    data-bs-toggle="modal" data-bs-dismiss="modal">Cerrar</button>
                  <button class="btn btn-primary" type="submit" data-bs-target="#modificarProducto" data-bs-toggle="modal"
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
import axios from 'axios';
import NavbarComponent from './NavbarComponent.vue';
import Swal from 'sweetalert2';

export default {
  components: {
    NavbarComponent,
  },
  data() {
    return {
      productos: [], // Almacena los informes cargados desde el servidor
      productoModificar: '',
      busqueda: '',
      usuario: localStorage.getItem('usuario'),
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
    // Realiza una solicitud HTTP para obtener los informes desde el servidor
    this.fetchProductos();
  },
  computed: {
    productosFiltrados() {
      // Filtra los informes basándose en el valor de busqueda
      return this.productos.filter(producto => {
        const nombre = producto.producto_nombre || '';
        const descripcion = producto.producto_descripcion || '';
        const categoria = producto.producto_categoria || '';
        const precio = producto.producto_precio || '';
        return (
          nombre.toLowerCase().includes(this.busqueda.toLowerCase()) ||
          descripcion.toLowerCase().includes(this.busqueda.toLowerCase()) ||
          categoria.toLowerCase().includes(this.busqueda.toLowerCase()) ||
          precio.toLowerCase().includes(this.busqueda.toLowerCase())
          // Agrega más condiciones de búsqueda según tus necesidades
        );
      });
    },
  },
  methods: {
    async fetchCategorias(){

      axios.get(`/categorias?usuario=${localStorage.getItem('usuario')}`)
        .then((response) => {
          this.categorias = response.data; // Asigna las categorías a la variable
        })
        .catch((error) => {
          console.error('Error al obtener las categorías:', error);
        });
    },
    modificar(producto) {
      this.fetchCategorias();
      this.productoModificar = producto;
    },
    actualizarEstadoProducto(producto) {
      if (producto.producto_disponibilidad) {
        producto.producto_disponibilidad = 0;
      } else {
        producto.producto_disponibilidad = 1;
      }
      // Realiza una solicitud para actualizar el estado en la base de datos
      axios.put('/actualizarDisponibilidad', { productoId: producto.producto_id, nuevoEstado: producto.producto_disponibilidad })
        .then(() => {
          // Maneja la respuesta si es necesario
        })
        .catch((error) => {
          console.error('Error al actualizar el estado en la base de datos:', error);

          // Si hay un error, puedes revertir el estado del checkbox
          producto.producto_disponibilidad = !producto.producto_disponibilidad;
        });
    },
    async fetchProductos() {
      try {
        // Realiza una solicitud HTTP GET para obtener los informes desde el servidor
        const response = await axios.get(`/productos?usuario=${this.usuario}`);

        // Actualiza la lista de informes con los datos recibidos
        this.productos = response.data;
      } catch (error) {
        console.error("Error al cargar los productos:", error);
      }
    },
    modificarProducto(producto) {
      axios.put('/modificarProducto', { producto: producto }).then(() => {
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
                title: 'Producto modificado.'
              })
            })
        .catch((error) => {
          console.error('Error al actualizar el estado en la base de datos:', error);
        });
    },
    eliminar(productoId) {
      Swal.fire({
        icon: 'info',
        title: `<strong>¿Estas segur@?</strong>`,
        html: ``,
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonText: 'No, cancelar',
        confirmButtonText: 'Sí, eliminar!'
      }).then((result) => {
        if (result.isConfirmed) {
          axios.delete('/eliminarProducto', {
            data: { productoId: productoId }
          })
            .then(() => {
              const index = this.productos.findIndex(producto => producto.producto_id === productoId);
              if (index !== -1) {
                this.productos.splice(index, 1);
              }
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
                title: 'Producto eliminado.'
              })
            })
            .catch((error) => {
              console.error('Error al eliminar el producto:', error);
              Swal.fire({
                icon: 'error',
                title: 'Error al eliminar',
                text: error.message // Usamos error.message para obtener el mensaje de error.
              });
            });

        }
      })
    },
    agregarCategoria() {

      axios.post('nuevaCategoria', { categoria_nombre: this.categoria_nombre, usuario_nombre: localStorage.getItem('usuario') }).then(() => {
        // Agregar la nueva categoría a la lista de categorías
        // Limpiar el campo de nombre de categoría
        this.productoModificar.producto_categoria = this.categoria_nombre;
        this.categoria_nombre = '';

        // Opcional: Puedes seleccionar automáticamente la nueva categoría
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
          title: 'Categoría agregada.'
        })
        this.modalAbierto = true;
      }).catch(() => {
        Swal.fire({
          icon: 'error',
          text: 'No se pudo agregar la categoría.'
        });
      });
    },
    imagenSeleccionada(event) {
      const file = event.target.files[0];
      if (file) {
        // Utiliza FileReader para leer el contenido de la imagen como una URL de datos
        const reader = new FileReader();
        reader.onload = (e) => {
          // Al cargar la imagen, asigna la URL de datos a producto.imagen
          this.productoModificar.producto_imagen = e.target.result;
        };
        reader.readAsDataURL(file);
      }
    },

  },


};
</script>

<style scoped>
.mauto {
  margin: auto !important;
  vertical-align: middle;
}

.flex {
  display: flex;
  justify-content: space-between;
}
img{
    object-fit:contain;
}
.imagen{
    height: 100px;
}
.ancho {
  min-height: 60vh;
  overflow: auto;
}

.derecha {
  display: inline-flex;
  justify-content: center;
  gap: 15px;
  margin-right: 10px;
}

th {
  white-space: nowrap;
}

.obs-head {
  text-overflow: ellipsis;
  white-space: nowrap !important;
  width: 200px !important;
  overflow: hidden;
  max-width: 60ch;
}

.ancho-busqueda {
  width: 400px;
  height: 50px;
  display: inline-flex;
  margin-top: auto;
}
.form-switch {
    padding-left: 4em;
}
@media screen and (max-width: 992px) {
  .ancho-busqueda {
    width: 180px;
  }
}

/* Agrega estilos CSS según tus preferencias */
</style>

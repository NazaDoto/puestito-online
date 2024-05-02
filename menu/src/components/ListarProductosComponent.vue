<template>
  <div>
    <NavbarComponent></NavbarComponent>
    <div v-if="cargando" class="pantalla-carga text-center">
      <div class="logo-carga">
        <img class="logo-img" src="/favicon.ico" width="50" alt="" />
        <div class="texto-carga">Cargando productos</div>
      </div>
    </div>
    <div class="container mt-4 mb-2">
      <h1 class="text-center">Listado de Productos</h1>
      <div class="flex">
        <div class="izquierda ancho-busqueda">
          <input class="form-control barra-busqueda" v-model="busqueda" type="text" name="busqueda" id=""
            placeholder="Buscar" title="Ingrese una palabra clave..." />
        </div>
      </div>
      <div class="ancho mt-2">
        <div class="mt-2" v-for="(categoria, index) in categoriasOrdenadas" :key="index" :id="categoria">
          <div v-if="filteredProductos(categoria)">
            <div class="flex">
              <div class="titulo-categoria" @click="toggleCategoria(categoria)">{{ categoria }}</div>
              <div class="flex-end">
                <button class="btn-edit p-2" title="Modificar" @click="abrirModificarCategoriaModal(categoria)"><img
                    width="20" src="/recursos/edit.png" alt=""></button>
              </div>
            </div>
            <div :class="{ 'categoria-productos': true, 'categoria-activa': categoriaSeleccionada === categoria }">
              <div class="p-2">
                <div class="item-container mt-2" v-for="(producto, index) in filteredProductos(categoria)" :key="index">
                  <div class="item-imagen" v-if="producto.producto_imagen">
                    <div>
                      <img class="imagen" :src="producto.producto_imagen" alt=" ">
                    </div>
                  </div>
                  <!-- Nombre del producto -->
                  <div class="item-texto-block">
                    <div class="item-texto-block-start">
                      <div class="item-nombre">
                        {{ producto.producto_nombre }}
                      </div>
                      <div class="item-precio">
                        ${{ producto.producto_precio }}
                      </div>
                      <div class="item-descripcion" v-if="producto.producto_descripcion">
                        "{{ producto.producto_descripcion }}"
                      </div>
                    </div>
                  </div>
                  <div class="item-texto-block-end">
                    <div class="justify-content-center">
                      <div class="form-check form-switch"><input type="checkbox"
                          @change="actualizarEstadoProducto(producto)" class="form-check-input" name=""
                          id="productoDisponible" :checked="producto.producto_disponibilidad === 1"></div>
                    </div>
                    <button class="btn-edit p-2" title="Modificar" @click="modificar(producto)"><img width="20"
                        src="/recursos/edit.png" alt=""></button>
                    <button class="btn-delete mt-2 p-2" title="Eliminar" @click="eliminar(producto.producto_id)"><img
                        width="20" src="/recursos/delete.png" alt=""></button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div v-if="productosFiltrados.length === 0" class="text-center mt-3">
          No se encontraron resultados.
        </div>
      </div>

      <!-- MODAL MODIFICAR-->
      <div v-if="modificarModalAbierto" class="modalCategoriaContainer" :style="{ height: modalHeight + 'px' }">
        <div class="modalCategoria">
          <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
              <div class="modal-header pl-2">
                <h1 class="modal-title fs-5" id="modificarProductoLabel">
                  Modificar Producto
                </h1>
                <button type="button" class="btn-close" @click="cerrarModificarModal" aria-label="Close"></button>
              </div>
              <form @submit.prevent="modificarProducto(this.productoModificar)">
                <div class="modal-body">
                  <div class="row g-3 div-forms">
                    <div>
                      <input class="form-control" type="text" id="nombre" v-model="productoModificar.producto_nombre"
                        required />
                    </div>
                    <div>
                      <textarea class="form-control" type="text" id="descripcion"
                        v-model="productoModificar.producto_descripcion" placeholder="Descripción"></textarea>
                    </div>
                    <div>
                      <select class="form-select" v-model="productoModificar.producto_categoria" id="" required>
                        <option selected disabled>Categoría</option>
                        <option v-for="categoria in categorias" :key="categoria.id" :value="categoria.categoria_nombre">
                          {{ categoria.categoria_nombre }}
                        </option>
                      </select>
                    </div>
                    <div>
                      <button type="button" class="btn btn-agregar" @click="agregarCategoriaModal">
                        Agregar Categoría
                      </button>
                    </div>
                    <div>
                      <input class="form-control" type="number" id="precio" v-model="productoModificar.producto_precio"
                        placeholder="Precio (sin $)" />
                    </div>
                    <div>
                      <label class="form-label mr-2" for="imagen">Imagen (JPG/PNG)</label>
                      <input class="form-control" type="file" name="imagen" id="imagen" accept="image/jpeg, image/png"
                        @change="imagenSeleccionada" />
                    </div>
                  </div>
                  <div class="modal-footer mt-2">
                    <button type="button" class="btn" @click="cerrarModificarModal">Cerrar</button>
                    <button class="btn btn-menu" type="submit">Modificar</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <!-- MODAL AGREGAR CATEGORIA -->
      <div v-if="agregarCategoriaModalAbierto" class="modalCategoriaContainer">
        <div class="modalCategoria">
          <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content ">
              <div class="modal-header pl-2">
                <h1 class="modal-title fs-5" id="agregarCategoriaLabel">Nueva Categoría</h1>
                <button type="button" class="btn-close" @click="cerrarCategoriaModal" aria-label="Close"></button>
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
      <!-- MODAL MODIFICAR CATEGORIA -->
      <div v-if="modificarCategoriaModalAbierto" class="modalCategoriaContainer">
        <div class="modalCategoria">
          <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content ">
              <div class="modal-header pl-2">
                <h1 class="modal-title fs-5" id="agregarCategoriaLabel">Modificar Categoría</h1>
                <button type="button" class="btn-close" @click="cerrarModificarCategoriaModal"
                  aria-label="Close"></button>
              </div>
              <div class="modal-body mt-2">
                <form @submit.prevent="modificarCategoria">
                  <input class="form-control" type="text" id="nombre" v-model="categoriaNueva"
                    placeholder="Nombre de la Categoría" required />
                  <div class="modal-footer mt-2">
                    <button type="button" class="btn" @click="cerrarModificarCategoriaModal">Cerrar</button>
                    <button class="btn btn-agregar" type="submit">Modificar</button>
                  </div>
                </form>
              </div>
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
    </div>
  </div>
</template>

<script>
import axios from "axios";
import NavbarComponent from "./NavbarComponent.vue";
import Swal from "sweetalert2";
import Cropper from "cropperjs";
export default {
  components: {
    NavbarComponent,
  },
  data() {
    return {
      cargandoCropper: true,
      cropper: null,
      imageToCrop: '',
      modalCropImage: false,
      categoriaSeleccionada: null,
      cargando: true,
      productos: [], // Almacena los informes cargados desde el servidor
      productoModificar: "",
      busqueda: "",
      usuario: localStorage.getItem("usuario"),
      producto: {
        nombre: "",
        descripcion: "",
        categoria: "Categoría",
        precio: "",
        imagen: "",
        usuario: "",
      },
      categoria_nombre: "",
      categoriaVieja: "",
      categoriaNueva: "",
      categorias: [],
      agregarCategoriaModalAbierto: false,
      modificarModalAbierto: false,
      modificarCategoriaModalAbierto: false,
      modalHeight: '',
    };
  },
  created() {
    // Realiza una solicitud HTTP para obtener los informes desde el servidor
    this.fetchProductos();
  },
  computed: {
    categoriasOrdenadas() {
      // Obtiene las categorías únicas de los productos filtrados y las ordena alfabéticamente
      return [...new Set(this.productosFiltrados.map(producto => producto.producto_categoria))].sort();
    },
    productosFiltrados() {
      const quitarAcentos = (texto) => {
        return texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
      };

      // Filtra los productos basándose en el valor de búsqueda y producto_disponibilidad = 1
      return this.productos.filter(producto => {
        const nombre = producto.producto_nombre || '';
        const descripcion = producto.producto_descripcion || '';
        const categoria = producto.producto_categoria || '';
        const precio = producto.producto_precio || '';
        // Quita los acentos de las letras antes de realizar la comparación
        const busquedaSinAcentos = quitarAcentos(this.busqueda.toLowerCase());
        return (
          quitarAcentos(nombre.toLowerCase()).includes(busquedaSinAcentos) ||
          quitarAcentos(descripcion.toLowerCase()).includes(busquedaSinAcentos) ||
          quitarAcentos(categoria.toLowerCase()).includes(busquedaSinAcentos) ||
          quitarAcentos(precio.toString().toLowerCase()).includes(busquedaSinAcentos)
        );
      });
    },
    categoriasConProductosFiltrados() {
      // Obtiene las categorías únicas de los productos filtrados
      return [...new Set(this.productosFiltrados.map(producto => producto.producto_categoria))];
    }
  },
  methods: {
    modificarCategoria() {
        axios.put('/modificarCategoria', { usuario: this.usuario, categoriaVieja: this.categoriaVieja, categoriaNueva: this.categoriaNueva }).then(() => {

          const Toast = Swal.mixin({
            toast: true,
            position: "bottom-end",
            showConfirmButton: false,
            timer: 1000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener("mouseenter", Swal.stopTimer);
              toast.addEventListener("mouseleave", Swal.resumeTimer);
            },
          });
          Toast.fire({
            icon: "success",
            title: "Categoría modificada.",
          });
          this.modificarCategoriaModalAbierto = false;
          location.reload();
        }).catch((error) => {
          Swal.fire({
            icon: 'error',
            text: 'No se pudo modificar la categoría. ' + error.response.data.message,
          });
        })
       
      
    },
    cerrarModificarModal() {
      this.modificarModalAbierto = false;
    },
    cerrarCategoriaModal() {
      this.agregarCategoriaModalAbierto = false;
    },
    agregarCategoriaModal() {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      this.agregarCategoriaModalAbierto = true;
    },
    cerrarModificarCategoriaModal() {
      this.modificarCategoriaModalAbierto = false;
    },
    abrirModificarCategoriaModal(categoria) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      this.modificarCategoriaModalAbierto = true;
      this.categoriaVieja = this.categoriaNueva = categoria;
    },
    toggleCategoria(categoria) {
      if (this.categoriaSeleccionada === categoria) {
        // Si la categoría seleccionada es la misma que se hizo clic, la contraemos
        this.categoriaSeleccionada = null;
      } else {
        // De lo contrario, establecemos la categoría seleccionada como la categoría en la que se hizo clic
        this.categoriaSeleccionada = categoria;
      }
    },
    filteredProductos(categoria) {
      // Filtra los productos basándose en la categoría y en el valor de disponibilidad
      return this.productosFiltrados.filter(producto => producto.producto_categoria === categoria);
    },
    async fetchCategorias() {
      axios
        .get(`/categorias?usuario=${localStorage.getItem("usuario")}`)
        .then((response) => {
          this.categorias = response.data; // Asigna las categorías a la variable
        })
        .catch((error) => {
          console.error("Error al obtener las categorías:", error);
        });
    },
    modificar(producto) {
      this.fetchCategorias();
      this.productoModificar = producto;
      // Obtener la altura del body
      const bodyHeight = document.body.clientHeight;

      // Establecer la altura del contenedor modal
      this.modalHeight = bodyHeight;
      window.scrollTo({ top: 0, behavior: 'smooth' });
      this.modificarModalAbierto = true;
    },
    actualizarEstadoProducto(producto) {
      if (producto.producto_disponibilidad) {
        producto.producto_disponibilidad = 0;
      } else {
        producto.producto_disponibilidad = 1;
      }
      // Realiza una solicitud para actualizar el estado en la base de datos
      axios
        .put("/actualizarDisponibilidad", {
          productoId: producto.producto_id,
          nuevoEstado: producto.producto_disponibilidad,
        })
        .then(() => {
          // Maneja la respuesta si es necesario
        })
        .catch((error) => {
          console.error(
            "Error al actualizar el estado en la base de datos:",
            error
          );

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
      } finally {
        this.cargando = false;
      }
    },
    modificarProducto(producto) {
      axios.put("/modificarProducto", { producto: producto })
        .then(() => {
          this.modificarModalAbierto = false;
          const Toast = Swal.mixin({
            toast: true,
            position: "bottom-end",
            showConfirmButton: false,
            timer: 2000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener("mouseenter", Swal.stopTimer);
              toast.addEventListener("mouseleave", Swal.resumeTimer);
            },
          });

          Toast.fire({
            icon: "success",
            title: "Producto modificado.",
          });
        })
        .catch((error) => {
          console.error(
            "Error al actualizar el estado en la base de datos:",
            error
          );
        });
    },
    eliminar(productoId) {
      Swal.fire({
        icon: "info",
        title: `<strong>¿Estas segur@?</strong>`,
        html: ``,
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonText: "No, cancelar",
        confirmButtonText: "Sí, eliminar!",
      }).then((result) => {
        if (result.isConfirmed) {
          axios
            .delete("/eliminarProducto", {
              data: { productoId: productoId },
            })
            .then(() => {
              const index = this.productos.findIndex(
                (producto) => producto.producto_id === productoId
              );
              if (index !== -1) {
                this.productos.splice(index, 1);
              }
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
                title: "Producto eliminado.",
              });
            })
            .catch((error) => {
              console.error("Error al eliminar el producto:", error);
              Swal.fire({
                icon: "error",
                title: "Error al eliminar",
                text: error.message, // Usamos error.message para obtener el mensaje de error.
              });
            });
        }
      });
    },
    agregarCategoria() {
      axios
        .post("nuevaCategoria", {
          categoria_nombre: this.categoria_nombre,
          usuario_nombre: localStorage.getItem("usuario"),
        })
        .then(() => {
          // Agregar la nueva categoría a la lista de categorías
          // Limpiar el campo de nombre de categoría
          this.productoModificar.producto_categoria = this.categoria_nombre;
          this.categoria_nombre = "";

          // Opcional: Puedes seleccionar automáticamente la nueva categoría
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
            title: "Categoría agregada.",
          });
          this.agregarCategoriaModalAbierto = false;
        })
        .catch((error) => {
          Swal.fire({
            icon: "error",
            text: 'No se pudo agregar la categoría. ' + error.response.data.message,
          });
        });
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
        this.productoModificar.producto_imagen = canvas.toDataURL();
      } catch (error) {
        console.error('Error al guardar la imagen recortada:', error);
      } finally {
        this.modalCropImage = false;
      }
    },
  },
};
</script>

<style scoped>
.btn-edit {
  display: inline-block;
  text-align: center;
  color: white;
  border: none;
  box-shadow: 0.2px 0.2px 2px black !important;
  border-radius: 1px;
  background: linear-gradient(rgb(148, 193, 252), rgb(0, 90, 207)) !important;

}

.btn-edit:hover {
  background: linear-gradient(rgb(148, 193, 252), rgb(0, 87, 168)) !important;
}

.btn-delete {
  display: inline-block;
  text-align: center;
  color: white;
  border: none;
  box-shadow: 0.2px 0.2px 2px black !important;
  border-radius: 1px;
  background: linear-gradient(rgb(255, 175, 175), rgb(207, 0, 0)) !important;

}

.btn-delete:hover {
  background: linear-gradient(rgb(255, 175, 175), rgb(168, 0, 0)) !important;
}

.categoria-productos {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.7s ease-in-out;
  /* Duración y función de la transición */
}

/* Clase para activar la categoría seleccionada */
.categoria-activa {
  max-height: 1000px;
  /* Altura máxima suficientemente grande para mostrar todos los productos */
}

.categoria-container {
  padding: 5px;
  border: 5px;
  background-color: white;
  border-radius: 20px;
}

.titulo-categoria {
  font-size: 30px;
  background: linear-gradient(to right, rgb(254, 255, 174), #ffffff);
  width: 100%;
  margin: 0px;
  padding: 5px 10px;
  cursor: pointer;

}

.tarjetaProducto {
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
  height: 100px;
  width: 100px;
  /* Ajustamos el tamaño de la imagen */
  margin-right: 20px;
  /* Añadimos un margen a la derecha */
}

.item-imagen {
  width: 100px;
  margin-right: 10px;
}

.item-container {
  display: flex;
  /* Utilizamos flexbox para posicionar los elementos */
  align-items: center;
  border-bottom: solid rgba(0, 0, 0, 0.2) 1px;
  padding-bottom: 5px;
}

.item-texto-block {
  width: 100%;
  /* Hacemos que este bloque ocupe el espacio disponible */
}

.item-texto-block-start {
  width: 80%;
  /* Hacemos que este bloque ocupe el espacio disponible */
}

.item-precio {
  font-size: 24px;
  font-weight: bold;
}

.item-nombre {
  font-size: 20px;
}

.item-descripcion {
  font-size: 16px;
  font-style: italic;
}

.item-texto-block-end {
  text-align: center;
  margin: auto;
}

.mauto {
  margin: auto !important;
  vertical-align: middle;
}

.flex {
  display: flex;
  justify-content: space-between;
}

img {
  object-fit: contain;
}

.imagen {
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
  height: 2em !important;
  margin-left: 16%;
}

.form-check-input {
  height: 1.5em !important;
  width: 2.5em !important;
}

.modalCategoria {
  width: 60vw;
}

@media screen and (max-width: 992px) {
  .ancho-busqueda {
    width: 180px;
  }

  .modalCategoria {
    width: 90vw;
  }
}

/* Agrega estilos CSS según tus preferencias */
</style>

<template>
  <div>
    <NavbarAdminComponent></NavbarAdminComponent>
    <div v-if="cargando" class="pantalla-carga text-center">
            <div class="logo-carga">
                <img class="logo-img" src="/favicon.ico" width="50" alt="">
                <div class="texto-carga">
                    Cargando negocios
                </div>
            </div>
        </div>
    <div class="container mt-4 mb-2">
      <h1>Negocios</h1>
      <div class="izquierda ancho-busqueda">
        <input class="form-control barra-busqueda" v-model="busqueda" type="text" name="busqueda" id=""
          placeholder="Buscar" title="Ingrese una palabra clave...">
      </div>
      <ul>
        <li class="item-container mt-2" v-for="(negocio, index) in negociosFiltrados" :key="index">
          <div v-if="negocio.imagen">
            <img class="imagen" :src="negocio.imagen" alt=" ">
          </div>
          <!-- Nombre del negocio -->
          <div class="item-texto-block m-2">
            <div class="item-descripcion" v-if="negocio.usuario">
              <b>Nombre de usuario:</b> "{{ negocio.usuario }}"
            </div>
            <div class="item-descripcion">
              <b>Nombre del negocio:</b> {{ negocio.nombre }}
            </div>
            <div class="item-descripcion" v-if="negocio.descripcion">
              <b>Descripción:</b> "{{ negocio.descripcion }}"
            </div>
            <div class="item-descripcion" v-if="negocio.fechaVence">
              <b>Fecha de Vencimiento:</b> "{{ formatear(negocio.fechaVence) }}"
            </div>
            <button class="btn btn-menu derecha mt-2 mb-2" title="Modificar" data-bs-toggle="modal"
              data-bs-target="#modificarProducto" @click="modificarNegocio(negocio)">Modificar</button>
            <button class="btn btn-menu-danger derecha m-2" @click="eliminarNegocio(negocio.usuario)">Eliminar</button>

          </div>
          <div class="item-texto-block-end">
            <a v-if="negocio.instagram" class="m-2" :href="negocio.instagram" target="blank"><img width='40'
                src="/recursos/instagram.png"></a>
            <div v-else>Sin Instagram</div>
            <a v-if="negocio.facebook" class="m-2" :href="negocio.facebook" target="blank"><img width='36'
                src="/recursos/facebook.png"></a>
            <div v-else>Sin Facebook</div>
          </div>
          <!-- Botón para dirigirse al menú -->
          <div class="item-btn">
            <router-link class="item-texto-block-end" :to="'/' + negocio.usuario">
              <img src="/favicon.ico" width="30" alt="">
            </router-link>
          </div>

        </li>
      </ul>
    </div>


    <div class="modal fade" id="modificarProducto" tabindex="-1" aria-labelledby="modificarProductoLabel"
      aria-hidden="true" ref="modalModificar">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content ">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="modificarProductoLabel">Modificar Datos</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="modificarPerfil(negocioModificar)">
              <div class="row g-3 div-forms border">
                <h4 class="titulo-div-forms mb-2">Información del Usuario</h4>
                <div>
                  <input class="form-control" type="text" id="nombre" v-model="negocioModificar.usuario"
                    placeholder="Nombre de Usuario" disabled>
                </div>
                <div>
                  <input class="form-control" type="password" id="nombre" v-model="negocioModificar.contraseña"
                    placeholder="Contraseña">
                </div>
                <h4 class="titulo-div-forms mb-2">Información del Negocio</h4>
                <div>
                  <input class="form-control" type="text" id="nombre" v-model="negocioModificar.nombre"
                    placeholder="Nombre del Negocio" required>
                </div>
                <div>
                  <input class="form-control" type="email" id="correo" v-model="negocioModificar.correo"
                    placeholder="Correo">
                </div>
                <div>
                  <input class="form-control" type="number" id="telefono" v-model="negocioModificar.telefono"
                    placeholder="Teléfono">
                </div>
                <div>
                  <input class="form-control" type="text" id="direccion" v-model="negocioModificar.direccion"
                    placeholder="Dirección" required>
                </div>
                <div>
                  <input class="form-control" type="text" id="descripcion" v-model="negocioModificar.descripcion"
                    placeholder="Descripción">
                </div>
                <div>
                  <input class="form-control" type="date" id="fechaVence" v-model="negocioModificar.fechaVence"
                    placeholder="Fecha de Vencimiento">
                </div>
                <div>
                  <input class="form-control" type="text" id="instagram" v-model="negocioModificar.instagram"
                    placeholder="Instagram">
                </div>
                <div>
                  <input class="form-control" type="text" id="facebook" v-model="negocioModificar.facebook"
                    placeholder="Facebook">
                </div>
                <div>
                  <label class="form-label mr-2" for="imagen">Imagen (JPG)</label>
                  <input class="form-control" type="file" name="imagen" id="imagen" accept=".jpg"
                    @change="imagenSeleccionada">
                </div>
              </div>
              <div class="text-end">
                <button class="btn btn-menu botones mt-3" type="submit" aria-label="Close">Modificar</button>
              </div>
            </form>
          </div>


        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NavbarAdminComponent from './NavbarAdminComponent.vue';
import axios from 'axios';
import { format } from 'date-fns';
import Swal from 'sweetalert2';
export default {
  components: {
    NavbarAdminComponent,
  },
  data() {
    return {
      cargando: true,
      negocios: [],
      busqueda: '',
      negocioModificar: {
        usuario: '',
        contraseña: '',
        nombre: '',
        descripcion: '',
        correo: '',
        direccion: '',
        telefono: '',
        instagram: '',
        facebook: '',
        imagen: '',
        fechaVence: '',
      },
    }
  },
  mounted() {
    this.fetchNegocios();

  },
  methods: {
    eliminarNegocio(usuario) {
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
          axios.delete('/eliminarNegocio', {data: {usuario: usuario}}).then(() => {
            const Toast = Swal.mixin({
              toast: true,
              position: 'bottom-end',
              showConfirmButton: false,
              timer: 1000,
              timerProgressBar: true,
              didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
              }
            })

            Toast.fire({
              icon: 'success',
              title: 'Negocio eliminado.'
            });
            setTimeout(function () {
              location.reload()
            }, 1000);
          })
            .catch((error) => {
              console.log('error')
              console.error('Error al eliminar:', error);
            });
        }
      });
    },
    modificarPerfil(negocio) {
      negocio.fechaVence  = new Date (negocio.fechaVence).toISOString().slice(0, 19).replace("T", " ");
      axios.put('/modificarPerfilAdmin', { negocio: negocio }).then(() => {
        const Toast = Swal.mixin({
          toast: true,
          position: 'bottom-end',
          showConfirmButton: false,
          timer: 1000,
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
        }, 1000);
      })
        .catch((error) => {
          console.log('error')
          console.error('Error al actualizar la información en la base de datos:', error);
        });
    },
    modificarNegocio(negocio) {
      this.negocioModificar.usuario = negocio.usuario;
      this.negocioModificar.contraseña = negocio.contraseña;
      this.negocioModificar.nombre = negocio.nombre;
      this.negocioModificar.descripcion = negocio.descripcion;
      this.negocioModificar.correo = negocio.correo;
      this.negocioModificar.direccion = negocio.direccion;
      this.negocioModificar.telefono = negocio.telefono;
      this.negocioModificar.instagram = negocio.instagram;
      this.negocioModificar.facebook = negocio.facebook;
      this.negocioModificar.imagen = negocio.imagen;
      this.negocioModificar.fechaVence = format(new Date(negocio.fechaVence), 'yyyy-MM-dd');
      console.log(this.negocioModificar)
    },
    formatear(fecha) {
      return format(new Date(fecha), 'dd/MM/yyyy');
    },
    async fetchNegocios() {
      try {
        const response = await axios.get('/listarNegocios');
        this.negocios = response.data;
      } catch (error) {
        console.error("Error al obtener los datos de los negocios:", error);
      } finally {
        this.cargando = false; // Indicar que la carga ha terminado, independientemente del resultado
      }
    },
  },
  computed: {
    negociosFiltrados() {
      // Filtra los informes basándose en el valor de busqueda
      return this.negocios.filter(negocio => {
        const nombre = negocio.nombre || '';
        const descripcion = negocio.descripcion || '';
        return (
          nombre.toLowerCase().includes(this.busqueda.toLowerCase()) ||
          descripcion.toLowerCase().includes(this.busqueda.toLowerCase())
          // Agrega más condiciones de búsqueda según tus necesidades
        );
      });
    },
  }
}
</script>

<style scoped>
ul {
  padding: 0;
}

.item-container {
  box-shadow: 0.5px 1px 4px;
  margin: 10px 0px;
  border: 5px;
  background-color: white;
  border-radius: 10px;
  display: flex;
  /* Utilizamos flexbox para posicionar los elementos */
  align-items: center;
  /* Centramos verticalmente los elementos */
}

.item-container {
  box-shadow: 0.5px 1px 4px;
  margin: 10px 0px;
  border: 5px;
  background-color: white;
  border-radius: 10px;
  display: flex;
  /* Utilizamos flexbox para posicionar los elementos */
  align-items: center;
  /* Centramos verticalmente los elementos */
}

.imagen {
  height: 100px;
  width: 100px;
  /* Ajustamos el tamaño de la imagen */
  margin-right: 20px;
  /* Añadimos un margen a la derecha */
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
}

.item-texto-block {
  flex-grow: 1;
  /* Hacemos que este bloque ocupe el espacio disponible */
}

.item-nombre {
  font-size: 20px;
  font-weight: bold;
}

.item-descripcion {
  font-size: 18px;
}

.item-direccion {
  font-style: italic;
  font-size: 15px;
}

.item-btn {
  margin-left: auto;
  /* Empuja este elemento hacia la derecha */
  margin-right: 20px;
}

.item-texto-block-end {
  text-decoration: none;
  padding: 5px 10px;
}

.item-texto-block-end:hover {
  cursor: pointer;
}


@media screen and (max-width: 992px) {
  .ancho-busqueda {
    width: 200px;
  }

  .container2 {
    min-height: calc(100vh - 200px);
    margin: 0px 10px;
  }
}
</style>
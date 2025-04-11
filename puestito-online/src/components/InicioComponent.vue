<template>
  <div>
    <nav class="navbar navbar-dark bg-black">
      <div class="container">
        <div class="flex space-around">
          <router-link to="/"><img src="/favicon.ico" alt="" class="nav-logo"></router-link>
          <div class="inline">
            <router-link class="btn-login inline-end c-white" to="/u/planes">Registrar <svg
                  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="28" fill="currentColor"
                  class="bi bi-box-arrow-in-right">
                  <path d="M12 20h9"></path>
                  <path d="M16.5 3.5a2.121 2.121 0 0 1 3 0l1 1a2.121 2.121 0 0 1 0 3L7 21H3v-4L16.5 3.5z"></path>
                </svg></router-link>
              <router-link v-if="usuario" class=" btn-login inline-end c-white" to="/u/home">Mi Puestito <svg
                  xmlns="http://www.w3.org/2000/svg" width="28" fill="currentColor" class="bi bi-box-arrow-in-right"
                  viewBox="0 0 16 16">
                  <path fill-rule="evenodd"
                    d="M6 3.5a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-2a.5.5 0 0 0-1 0v2A1.5 1.5 0 0 0 6.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-8A1.5 1.5 0 0 0 5 3.5v2a.5.5 0 0 0 1 0z" />
                  <path fill-rule="evenodd"
                    d="M11.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H1.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708z" />
                </svg></router-link>
              <router-link v-else class="btn-login inline-end c-white" to="/u/login">Ingresar <svg
                  xmlns="http://www.w3.org/2000/svg" width="28" fill="currentColor" class="bi bi-box-arrow-in-right"
                  viewBox="0 0 16 16">
                  <path fill-rule="evenodd"
                    d="M6 3.5a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-2a.5.5 0 0 0-1 0v2A1.5 1.5 0 0 0 6.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-8A1.5 1.5 0 0 0 5 3.5v2a.5.5 0 0 0 1 0z" />
                  <path fill-rule="evenodd"
                    d="M11.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H1.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708z" />
                </svg></router-link>
  
          </div>
        </div>
      </div>
      <!-- Logo -->

    </nav>
    <nav class="navbar fondo-difu c-white mtb-0">
      <div class="ancho-busqueda input-group mauto">
        <input class="form-control" v-model="busqueda" type="text" name="busqueda" id=""
          placeholder="Buscar puestitos o rubros..." title="Ingrese una palabra clave..." />
        <button v-if="busqueda" class="btn-close btn-limpiar-busqueda" @click="limpiarBusqueda"></button>
      </div>
      <div class="container space-around">
        <select class="navbar-filter" name="rubro" id="rubro" v-model="rubro">
          <option value="Todos" selected>Todos</option>
          <option v-for="(rubro, index) in rubrosUnicos" :key="index" :value="rubro">
            {{ rubro }}
          </option>
        </select>

        <button class="navbar-filter" @click="mostrarMapa">
          {{
            !mapaMostrado2
              ? "Abrir Mapa"
              : `Cerrar
          Mapa`
          }}
        </button>
      </div>

    </nav>
    <div class="container2">
      <div v-if="cargando" class="pantalla-carga text-center">
        <div class="logo-carga">
          <img class="logo-img" src="/favicon.ico" width="50" alt="" />
          <div class="texto-carga">Buscando Puestitos</div>
        </div>
      </div>
      <div v-else>
        <div class="mt-2">
          <div class="modalMapa" v-show="mapaMostrado2" style="height: 400px">
            <!-- Aquí iría todo lo relacionado con el mapa de Google Maps -->
            <GMapMap style="height: 400px" :center="mapCenter" :zoom="zoom" :options="options">
              <GMapMarker v-if="posicionActual" :position="posicionActual" :options="{ icon: '/recursos/pinself.png' }"
                :title="'Estás aquí.'">
              </GMapMarker>
              <GMapMarker v-for="(negocio, index) in negociosFiltrados" :key="index" :position="negocio.location"
                :title="negocio.nombre" @click="openInfoWindow(index)" :options="{ icon: '/recursos/pin30.png' }"
                id="gmapm">
                <GMapInfoWindow v-if="infoWindowOpened == index" :options="infoWindow[index].options" :closeclick="true"
                  @closeclick="openInfoWindow(null)">
                  <div style="max-width: 150px">
                    <b style="font-size: 20px">{{ negocio.nombre }}</b><br />
                    <div style="text-align: center">
                      <a style="
                          text-decoration: none;
                          color: white;
                          font-size: 12px;
                          padding: 4px 6px;
                        " :href="'https://nazadoto.com/' + negocio.usuario" target="_blank"><img src="/favicon.ico"
                          width="20" alt="" /></a>
                      <a v-if="negocio.instagram" :href="'https://instagram.com/' + negocio.instagram"
                        target="blank"><img style="margin: 0px 10px" width="20" src="/recursos/instagram.png" /></a>
                      <a v-if="negocio.facebook" :href="'https://facebook.com/' + negocio.facebook" target="blank"><img
                          style="margin: 0px 10px" width="20" src="/recursos/facebook.png" /></a>
                    </div>
                    <p style="margin: 5px 0px">
                      <b>Dirección:</b> {{ negocio.direccion }}
                    </p>
                    <p style="margin: 5px 0px">
                      <b>Correo:</b> {{ negocio.correo }}
                    </p>
                    <p style="margin: 5px 0px">
                      <b>Teléfono:</b> {{ negocio.telefono }}
                    </p>
                    <p style="text-align: center; margin: 7px 0px">
                      "{{ negocio.descripcion }}"
                    </p>
                  </div>
                </GMapInfoWindow>
              </GMapMarker>
            </GMapMap>
          </div>
          <div v-for="(grupo, rubro) in negociosAgrupados" :key="rubro">
            <div class="titulo-rubro">{{ rubro }}</div>
            <div class="categoria-container">
              <div class="carrusel">
                <div v-for="(negocio, negocioIndex) in grupo" :key="negocioIndex"
                  :class="{ 'carrusel-item': true, 'active': negocioIndex === 0 }">
                  <div :class="negocio.location ? 'item-container' : 'item-container-flex'">
                    <router-link :class="negocio.location ? 'item-texto-block-end' : 'item-texto-block-end-flex'" :to="'/' + negocio.usuario">
                      <div class="imagen" v-if="negocio.imagen">
                        <img class="imagen-negocio" :src="negocio.imagen" @error="imagenError" alt=" " />
                      </div>
                      <div v-else>
                        <img src="/recursos/missing.png" alt="" class="imagen-negocio">
                      </div>
                      <div class="item-nombre">
                        {{ negocio.nombre }}
                      </div>
                    </router-link>
                    <div class="item-btn" v-if="negocio.location !== null">
                      <a  class="cursor-pointer mt-1" @click="localizar(negocio)"><img
                          src="/recursos/pin.png" width="30" alt="" /></a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>



          <div v-if="negociosFiltrados.length === 0" class="text-center mt-3">
            No se encontraron resultados para esa búsqueda.
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import router from "@/router";
export default {
  components: {
  },
  name: "MapaComponent",
  data() {
    return {
      usuario: '',
      buscarMenu: false,
      posicionActual: "",
      options: {
        disableDefaultUI: true,
        styles: [
          {
            featureType: "poi.business",
            stylers: [{ visibility: "off" }],
          },
          {
            featureType: "transit",
            elementType: "labels.icon",
            stylers: [{ visibility: "off" }],
          },
        ],
      },
      infoWindowOpened: null,
      infoWindow: [],
      mapCenter: { lat: -27.7876, lng: -64.2596 },
      zoom: 14,
      negocios: [],
      busqueda: "",
      rubro: "Todos",
      mapaMostrado: false,
      mapaMostrado2: false,
      cargando: true,
    };
  },
  created() {
    this.fetchNegocios();
  },
  mounted() {
    window.scrollTo({ top: 0, behavior: 'smooth' });

    if (this.$route.params) {
      router.push("/", this.$route.params);
    }
    this.obtenerUsuario()
  },
  computed: {
    negociosFiltrados() {
      let negociosFiltrados = this.negocios;

      // Filtrar por rubro si no se seleccionó "Todos"
      if (this.rubro !== "Todos") {
        negociosFiltrados = negociosFiltrados.filter(
          (negocio) => negocio.rubro === this.rubro
        );
      }

      // Filtrar por búsqueda si se ingresó algo en el cuadro de búsqueda
      if (this.busqueda !== "") {
        const busquedaMinuscula = this.busqueda.toLowerCase();
        negociosFiltrados = negociosFiltrados.filter((negocio) => {
          const nombre = negocio.nombre ? negocio.nombre.toLowerCase() : "";
          const descripcion = negocio.descripcion
            ? negocio.descripcion.toLowerCase()
            : "";
          const rubro = negocio.rubro ? negocio.rubro.toLowerCase() : "";
          return (
            nombre.includes(busquedaMinuscula) ||
            descripcion.includes(busquedaMinuscula) ||
            rubro.includes(busquedaMinuscula)
          );
        });
      }
      return negociosFiltrados;
    },
    negociosAgrupados() {
      const grupos = {};
      this.negociosFiltrados.forEach((negocio) => {
        if (!grupos[negocio.rubro]) {
          grupos[negocio.rubro] = [];
        }
        grupos[negocio.rubro].push(negocio);
      });

      // Ordenar los grupos alfabéticamente por rubro
      const rubrosOrdenados = Object.keys(grupos).sort();
      const gruposOrdenados = {};
      rubrosOrdenados.forEach((rubro) => {
        gruposOrdenados[rubro] = grupos[rubro];
      });

      return gruposOrdenados;
    },

    rubrosUnicos() {
      const rubros = new Set();
      this.negocios.forEach((negocio) => {
        rubros.add(negocio.rubro);
      });
      return Array.from(rubros);
    },
  },
  methods: {
    imagenError(event) {
    event.target.src = '/recursos/missing.png'; // Ruta de la imagen alternativa
  },
    obtenerUsuario() {
      this.usuario = localStorage.getItem('usuario');
    },
    limpiarBusqueda() {
      this.busqueda = "";
      this.rubro = "Todos";
    },
    async localizar(negocio) {
      if (!this.mapaMostrado) {
        this.mapaMostrado = true;
        this.mapaMostrado2 = true;
        try {
          await this.inicializarMapa();
        } catch (error) {
          console.error('Error al inicializar el mapa:', error);
        }
      }
      this.buscarMenu = true;
      this.mapaMostrado2 = true;
      this.mapCenter = negocio.location;
      this.openInfoWindow(negocio.index);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },
    openInfoWindow(index) {
      if (this.infoWindowOpened == index) {
        this.infoWindowOpened = null;
      } else {
        this.infoWindowOpened = index;
      }
    },
    inicializarMapa() {
      return new Promise((resolve, reject) => {
        try {
          if (!navigator.geolocation) {
            console.log(
              "No funciona geolocation. Centrando mapa en Plaza Libertad."
            );
            resolve(); // Resolve sin posición
          } else {
            navigator.geolocation.getCurrentPosition(
              (coords) => {
                const position = {
                  lat: coords.coords.latitude,
                  lng: coords.coords.longitude,
                };
                this.posicionActual = position;
                resolve(); // Resuelve después de establecer la posición
              },
              (error) => {
                console.log(
                  "Error al geolocalizar. Inicializando en Plaza Libertad. ",
                  error
                );
                reject(error); // Rechaza en caso de error
              }
            );
          }
        } catch (error) {
          console.error("Error al obtener la ubicación actual:", error);
          reject(error); // Rechaza en caso de error
        }
      });
    },
    mostrarBusqueda() {
      if (this.buscarMenu) {
        this.buscarMenu = false;
      } else {
        this.buscarMenu = true;
      }
    },
    async mostrarMapa() {
      if (!this.mapaMostrado2) {
        if (!this.mapaMostrado) {
          this.mapaMostrado = true;
          this.mapaMostrado2 = true;
          try {
            await this.inicializarMapa();
            this.mapCenter = this.posicionActual;
          } catch (error) {
            console.error('Error al inicializar el mapa:', error);
          }
        } else {
          this.mapaMostrado2 = true;
        }
      } else {
        this.mapaMostrado2 = false;
      }
    },

    async fetchNegocios() {
      try {
        const response = await axios.get("/negocios");
        this.negocios = response.data.filter((negocio, index) => {
          // Agregar el atributo "index" a cada objeto negocio
          negocio.index = index;
          return negocio;
        });
        this.infoWindow = Array(this.negocios.length).fill({
          open: false,
          options: {
            pixelOffset: { width: 0, height: -10 },
            maxWidth: 320,
            maxHeight: 320,
          },
        });
      } catch (error) {
        console.error("Error al obtener los datos de los negocios:", error);
      } finally {
        this.cargando = false;
      }
    },

  },
};
</script>

<style scoped>
.flotante {
  border-radius: 20px;
  font-size: 1rem;
  background-color: black;
  color: white;
  padding: 4px;
}

.space-around {
  justify-content: space-around;
  margin-top: 5px;
}

.btn-limpiar-busqueda {
  position: absolute;
  top: 50%;
  right: 0.5rem;
  /* Ajusta según sea necesario */
  transform: translateY(-50%);
  z-index: 5;
  /* Asegura que el botón esté sobre el input */
}

.form-control {
  border-radius: 20px !important;
}

.btn-filtrar {
  background: none;
  border: none;
}

.btn-filtrar-busqueda {
  position: absolute;
  top: 50%;
  right: 1.5rem;
  /* Ajusta según sea necesario */
  transform: translateY(-50%);
  z-index: 5;
  /* Asegura que el botón esté sobre el input */
}

.btn-mapa {
  background: rgba(255, 255, 255, 1);
}

.barra {
  background: rgb(167, 211, 255);
  position: sticky;
  top: 0;
  padding: 10px 20px;
  z-index: 50;
}

.btn-close:focus {
  box-shadow: none;
  opacity: var(--bs-btn-close-opacity);
}

.navbar-filter {
  background: none;
  border: none;
  color: white;
  border-radius: 5px;
}

.navbar-filter:hover {
  background: rgb(95, 95, 95);
  cursor: pointer;
}

.navbar-filter:focus {
  background: rgb(95, 95, 95);
  outline: none;
}

.fondo-difu {
  background-color: black;

}

.flex {
  display: flex;
  width: 100%;
  justify-content: space-between;
}

.inline {
  display: inline-flex;
}

.inline-start {
  justify-self: flex-start;
}

.mauto {
  margin: auto;
}

.inline-end {
  margin-left: auto;
}

.popup {
  position: absolute;
  top: 10px;
  background-color: rgba(255, 255, 255, 0.7);
  border-radius: 50px;
}

.input-group {
  position: relative;
}

.modalMapa {
  height: 100px;
}

.texto-carga {
  font-style: italic;
  margin: 20px;
  color: grey;
}

.c-white {
  color: white !important;
}

.cursor-pointer {
  cursor: pointer;
  margin: 10px;
}

.ancho-busqueda {
  width: 60%;
  height: 40px;
}

.ancho-busqueda2 {
  width: 35%;
}
.btn-login {
  padding: 7px;
  border-radius: 20px;
  color:white;
}

.btn-login:hover {
  background: rgb(95, 95, 95);
  cursor: pointer;
}
.btn-login:visited{
  color:white;
}
.container2 {
  margin: 0px 20vw;
  align-items: center;
  min-height: calc(100svh - 150px);
  background-image: url('../../public/recursos/patron.png');
  background-size: contain;
  background-repeat: repeat;
  background-attachment: fixed;
}

a {
  text-decoration: none;
}

.w-60 {
  width: 60%;
  justify-content: center !important;
}

.navbar {
  z-index: 10;
  padding: 8px 0px;
}

.navbar-brand {
  font-style: italic;
}

.link-login {
  text-decoration: none;
}

ul {
  padding: 0;
}

.categoria-container {
  border-radius: 5px;
  margin: 10px 0px 20px 0px;
  padding: 10px;
  background-color: white;
  box-shadow: 0 6px 10px 0 rgba(0, 0, 0, .2);
  max-width: max-content;
}


.titulo-rubro {
  font-size: 1.15rem;
  width: 100%;
  margin: 0px;
  color: black;
}

.carrusel {
  overflow-x: auto;
  width: 100%;
  display: inline-flex;
}

.block {
  display: block !important;
}

.carrusel-item {
  margin: 0px 5px;
  text-align: center;
  padding-bottom: 5px;
  border-bottom-right-radius: 5px;
  border-bottom-left-radius: 5px;
}

.item-container {
  height: 215px;
  width: 150px;
  overflow: hidden;
  /* Asegura que la imagen no desborde el contenedor */
  border-radius: 5px;
}
.item-container-flex {
  height: 215px;
  width: 150px;
  overflow: hidden;
  /* Asegura que la imagen no desborde el contenedor */
  border-radius: 5px;
  display:flex;
}
.item-texto-block-end {
  text-decoration: none;
  padding: 5px 0px;
}
.item-texto-block-end-flex {
  text-decoration: none;
  padding: 5px 0px;
  margin: auto;
}
.imagen-negocio {
  width: 150px;
  height: 150px;
  transition: transform 0.2s ease;
  border-radius: 100%;
}


.imagen-negocio:hover {
  transform: scale(1.1);
  /* Escala la imagen a 160px de ancho y alto */
}

.item-texto-block {
  flex-grow: 1;
}

.item-nombre {
  margin-top: 5px;
  font-size: 1rem;
  overflow: hidden;
  color: black;
}

.item-descripcion {
  font-size: 14px;
}

.item-direccion {
  font-style: italic;
  font-size: 15px;
}

.item-btn {
  display: inline-flex;
  padding: 0px;
}



.mtb-0 {
  margin-top: 0px;
  margin-bottom: 0px;
  padding-top: 0;
  padding-bottom: 5px;
}

.item-texto-block-end:hover {
  cursor: pointer;
}
.item-texto-block-end-flex:hover {
  cursor: pointer;
}

@media screen and (max-width: 992px) {
  .space-around {
    justify-content: space-between;
  }

  ::-webkit-scrollbar {
    display: none;
  }

  .carrusel {
    justify-content: unset;
  }

  .ancho-busqueda {
    width: 90%;
  }

  .ancho-busqueda2 {
    width: 40vw;
  }

  .container2 {
    margin: 0px 10px;
    background-image: none;
  }
}
</style>

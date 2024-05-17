<template>
  <div>
    <NavbarPublicoComponent></NavbarPublicoComponent>
    <div class="container2 mt-4">
      <div v-if="cargando" class="pantalla-carga text-center">
        <div class="logo-carga">
          <img class="logo-img" src="/favicon.ico" width="50" alt="" />
          <div class="texto-carga">Buscando Puestitos</div>
        </div>
      </div>
      <div v-else>
        <div class="flex">

          <button class="btn btn-menu inline" @click="mostrarBusqueda">
            {{ buscarMenu ? 'Ocultar Búsqueda' : 'Buscar Puestitos' }}</button>
          <button class="btn btn-menu inline2" @click="mostrarMapa">
            {{
              !mapaMostrado2
                ? "Ver Mapa"
                : `Ocultar
            Mapa`
            }}
          </button>
        </div>
        <div v-if="buscarMenu" class="mt-2">
          <label for="rubro">Buscar por rubro</label>
          <select class="ancho-busqueda form-select" name="rubro" id="rubro" v-model="rubro">
            <option value="Todos" selected>Todos</option>
            <option v-for="(rubro, index) in rubrosUnicos" :key="index" :value="rubro">
              {{ rubro }}
            </option>
          </select>
          <div class="mt-2">
            <input class="form-control" v-model="busqueda" type="text" name="busqueda" id=""
              placeholder="Buscar por nombre" title="Ingrese una palabra clave..." />
          </div>
          <div class="flex">
            <button type="button" class="btn btn-limpiar mt-2" @click="limpiarBusqueda" aria-label="Close">
              Limpiar búsqueda
            </button>
          </div>
        </div>

        <div class="negocios-body mt-3">
          <div class="modalMapa mt-2" v-show="mapaMostrado2" style="height: 400px">
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
                        " :href="'https://puestito.online/' + negocio.usuario" target="_blank"><img src="/favicon.ico"
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
          <hr>
          <div v-for="(grupo, rubro) in negociosAgrupados" :key="rubro">
            <div class="titulo-rubro">{{ rubro }}</div>
            <div class="categoria-container">

              <div class="carrusel">
                <div v-for="(negocio, negocioIndex) in grupo" :key="negocioIndex"
                  :class="{ 'carrusel-item': true, 'active': negocioIndex === 0 }">
                  <div class="item-container">
                    <router-link class="item-texto-block-end" :to="'/' + negocio.usuario" target="_blank">
                      <div class="imagen" v-if="negocio.imagen">
                        <img class="imagen-negocio" :src="negocio.imagen" alt=" " />
                      </div>
                      <div v-else>
                        <img src="/recursos/missing.png" alt="" class="imagen-negocio">
                      </div>
                      <div class="item-nombre">
                        {{ negocio.nombre }}
                      </div>
                    </router-link>
                      <div class="item-btn">
                      <a v-if="negocio.location !== null" class="cursor-pointer mt-1" @click="localizar(negocio)"><img
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
import NavbarPublicoComponent from "./NavbarPublicoComponent.vue";
import router from "@/router";
export default {
  components: {
    NavbarPublicoComponent,
  },
  name: "MapaComponent",
  data() {
    return {
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
    if (this.$route.params) {
      router.push("/", this.$route.params);
    }
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
      this.mapaMostrado2 = true;
      this.mapCenter = negocio.location;
      this.openInfoWindow(negocio.index);
      window.scrollTo({top:0, behavior:'smooth'});
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
          const fechaVencimiento = new Date(negocio.fechaVence);
          return fechaVencimiento.getFullYear() !== 2100;
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


.flex {
  display: flex;
  justify-content: flex-start;
}

.inline {
  display: inline-flex;
}


.mauto {
  margin: auto;
}

.inline2 {
  margin-left: auto;
}

.popup {
  position: absolute;
  top: 10px;
  background-color: rgba(255, 255, 255, 0.7);
  border-radius: 50px;
}

.modalMapa {
  height: 100px;
}

.texto-carga {
  font-style: italic;
  margin: 20px;
  color: grey;
}

.cursor-pointer {
  cursor: pointer;
}

.ancho-busqueda {
  width: 60%;
}

.ancho-busqueda2 {
  width: 35%;
}

.container2 {
  margin: 0px 30vw;
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

.carrusel-item {
  margin: 0px 5px;
  text-align: center;
  padding-bottom: 5px;
  border-bottom-right-radius: 5px;
  border-bottom-left-radius: 5px;
}

.item-container {
  padding: 0px;
  width: 150px;
  overflow: hidden;
  /* Asegura que la imagen no desborde el contenedor */
  justify-content: center;
  align-items: center;
}

.imagen-negocio {
  width: 150px;
  height: 150px;
  transition: transform 0.2s ease;
  border-top-right-radius: 5px;
  border-top-left-radius: 5px;
}


.imagen-negocio:hover {
  transform: scale(1.1);
  /* Escala la imagen a 160px de ancho y alto */
}

.item-texto-block {
  flex-grow: 1;
}

.item-nombre {
  font-size: 1rem;
  overflow: hidden;
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

.item-texto-block-end {
  text-decoration: none;
  padding: 5px 0px;
}

.item-texto-block-end:hover {
  cursor: pointer;
}

@media screen and (max-width: 992px) {
  ::-webkit-scrollbar {
    display: none;
  }

  .carrusel {
    justify-content: unset;
  }

  .ancho-busqueda {
    width: 40vw;
  }

  .ancho-busqueda2 {
    width: 40vw;
  }

  .container2 {
    margin: 0px 10px;
  }
}
</style>

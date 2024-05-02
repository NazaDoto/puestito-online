<template>
  <div>
    <NavbarPublicoComponent></NavbarPublicoComponent>
    <div class="container2 mt-4">
      <div v-if="cargando" class="pantalla-carga text-center">
        <div class="logo-carga">
          <img class="logo-img" src="/favicon.ico" width="50" alt="" />
          <div class="texto-carga">Buscando negocios</div>
        </div>
      </div>
      <div v-else>
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
          <button type="button" class="btn btn-limpiar" @click="limpiarBusqueda" aria-label="Close">
            Limpiar búsqueda
          </button>
          <button class="btn btn-menu inline2 mt-2" @click="mostrarMapa">
            {{
              !mapaMostrado2
                ? "Ver Mapa"
                : `Ocultar
            Mapa`
            }}
          </button>
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
                      <a v-if="negocio.instagram" :href="negocio.instagram" target="blank"><img style="margin: 0px 10px"
                          width="20" src="/recursos/instagram.png" /></a>
                      <a v-if="negocio.facebook" :href="negocio.facebook" target="blank"><img style="margin: 0px 10px"
                          width="20" src="/recursos/facebook.png" /></a>
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
            <ul>
              <li class="item-container mt-2" v-for="(negocio) in grupo" :key="negocio.index">
                <div class="item-imagen">
                  <div v-if="negocio.imagen">
                    <img class="imagen" :src="negocio.imagen" alt=" " />
                  </div>
                </div>
                <!-- Nombre del negocio -->
                <div class="item-texto-block">
                  <div class="item-nombre">
                    {{ negocio.nombre }}
                  </div>
                  <div class="item-descripcion" v-if="negocio.descripcion">
                    "{{ negocio.descripcion }}"
                  </div>
                </div>
                <!-- Botón para dirigirse al menú -->
                <div class="item-btn">
                  <a v-if="negocio.location !== null" class="cursor-pointer mt-1"
                    @click="localizar(negocio)"><img src="/recursos/pin.png" width="30" alt="" /></a>
                  <router-link class="item-texto-block-end" :to="'/' + negocio.usuario" target="_blank">
                    <img src="/favicon.ico" width="30" alt="" />
                  </router-link>
                </div>
              </li>
            </ul>
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
.titulo-rubro {
  font-size: 22px;
  background: linear-gradient(to right, rgb(133, 184, 248), #ffffff);
  width: 100%;
  margin: 0px;
  padding: 5px 15px;
}

.btn-limpiar {
  display: block;
  margin-top: 10px;
  background: linear-gradient(rgb(255, 255, 255),
      rgb(214, 214, 214)) !important;
  border: none;
  border-radius: 1px;
}

.btn-limpiar:hover {
  background: linear-gradient(rgb(242, 242, 242),
      rgb(201, 201, 201)) !important;
  cursor: pointer;
}

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

.item-container {
  box-shadow: 0.2px 0.2px 2px;
  margin: 10px 0px;
  border-radius: 1px;
  background-color: white;
  display: flex;
  align-items: center;
}

.imagen {
  height: 100px;
  width: 100px;
  margin-right: 20px;
}

.item-texto-block {
  flex-grow: 1;
}

.item-nombre {
  font-size: 20px;
  font-weight: bold;
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
  margin-left: auto;
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
    width: 50vw;
  }

  .ancho-busqueda2 {
    width: 40vw;
  }

  .container2 {
    margin: 0px 10px;
  }
}
</style>

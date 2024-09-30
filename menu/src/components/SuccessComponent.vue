<template>
    <div>
        <NavbarPublicoComponent></NavbarPublicoComponent>
        <div v-if="cargando" class="pantalla-carga text-center">
            <div class="logo-carga">
                <img class="logo-img" src="/favicon.ico" width="50" alt="" />
                <div class="texto-carga">Cargando...</div>
            </div>
        </div>
        <div v-if="estado == 'approved'">
            <div class="contenedor text-center">
                <div class="caja">
                <img src="/recursos/approve.png" width="100">
                    <h1>Pago Aprobado.</h1>
                    <p>
                        Ya puedes cerrar esta ventana.
                    </p>
                    <button class="btn btn-menu mt-2" @click="cerrarVentana">Cerrar</button>
                </div>
            </div>
        </div>
        <div v-if="estado == 'failure' || estado == 'null'">
            <div class="contenedor text-center">
                <div class="caja">
                    <img src="/recursos/decline.png" width="100">                    
                    <h1>No se pudo realizar el pago.</h1>
                    <router-link class="btn btn-menu mt-3" to="/">Volver</router-link>
                </div>
            </div>
        </div>
        <div v-if="estado == 'pending'">
            <div class="contenedor text-center">
                <div class="caja">
                    <img src="/recursos/pending.png" width="100">
                    <h1>Pago Pendiente.</h1>
                    <router-link class="btn btn-menu mt-3" to="/">Volver</router-link>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
import NavbarPublicoComponent from './NavbarPublicoComponent.vue';
import axios from 'axios';
export default {
    components: { NavbarPublicoComponent },
    data() {
        return {
            estado: '',
            ref: '',
            cargando: true,
        }
    },
    mounted() {
        this.guardarPago();
    },
    methods: {
        cerrarVentana(){
            window.close()
        },
        async guardarPago() {
            const id = this.$route.query;
            try {
                const response = await axios.post("/facturar/webhook", id);
                this.estado = response.data;
            } catch (error) {
                console.log(error);
            } finally{
                this.cargando = false;
            }

        },
    }
}
</script>

<style scoped>
.btn-menu {
    border: none;
    box-shadow: 0.2px 0.2px 2px black !important;
    border-radius: 1px;
    min-width: 100px;
}
.contenedor {
    width: 60vw;
    margin: 20px auto;
    min-height: calc(100vh - 200px);
}

.caja-success{
    background-color: rgb(3, 213, 3);
    border-radius: 20px;
    height: 300px;
    width: 30vw;
    align-content: center;
}

@media screen and (max-width: 992px) {
    .contenedor {
        width: 90vw;
    }

    .col-md-3 {
        display: block;
        width: 80vw;
        padding: 10px;
    }

    .ancho-plan-gratis {
        width: 80vw;
        margin: auto;
        padding: 10px !important;
    }

    .ancho-descripcion {
        width: 70%;
        margin: auto;
    }

    .planes {
        display: block;
    }
}
</style>
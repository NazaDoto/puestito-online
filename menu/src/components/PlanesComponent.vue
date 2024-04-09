<template>
    <div>
        <NavbarPublicoComponent></NavbarPublicoComponent>
        <div class="contenedor">
            <div class="mt-4 mb-4">
                <h1 class="text-center">¡Potenciá tu negocio!</h1>
                <hr>
                <div class="row justify-content-center text-center mb-4">
                    <div class="col-md-6">
                        <div class="titulo-plan">
                            <h3>Plan Básico</h3>
                        </div>
                        <div class="border mt-2 p-2 text-center">
                            <div class="titulo-plan">
                                Gratis
                            </div>
                            <ul class="text-start">
                                <li>✅Menú online autoadministrable.</li>
                                <li>❌Visualización en nuestra plataforma.</li>
                                <li>❌Carrito y pedidos por WhatsApp.</li>
                                <li>❌Código QR para el menú.</li>
                            </ul>
                            <router-link class="btn btn-success" to="/registrar">
                                REGISTRAR
                            </router-link>
                        </div>
                    </div>
                </div>
                <hr>
                <div class="row justify-content-center text-center">
                    <div class="col-md-6">
                        <div class="titulo-plan">
                            <h3>Plan Completo</h3>
                        </div>
                        <div class="mt-2 p-2 text-center">
                            <ul class="text-start">
                                <li>✅Menú online autoadministrable.</li>
                                <li>✅Visualización en nuestra plataforma.</li>
                                <li>✅Carrito y pedidos por WhatsApp.</li>
                                <li>✅Código QR para el menú.</li>
                            </ul>
                        </div>
                    </div>
                    <div class="col-md-12">
                        <div class="mt-2 text-center">
                            <div class="border p-2 m-2 col-md-3">
                                <div class="titulo-plan">
                                    1 Mes
                                </div>
                                <div class="precio-plan">
                                    $1500
                                </div>
                                <button class="btn btn-success" @click="elegirPlan(1)">CONTRATAR</button>
                            </div>
                            <div class="border p-2 m-2 col-md-3">
                                <div class="titulo-plan">
                                    6 Meses
                                </div>
                                <div class="precio-plan">
                                    $7500
                                </div>
                                <button class="btn btn-success" @click="elegirPlan(6)">CONTRATAR</button>
                            </div>
                            <div class="border p-2 m-2 col-md-3">
                                <div class="titulo-plan">
                                    12 Meses
                                </div>
                                <div class="precio-plan">
                                    $15000
                                </div>
                                <button class="btn btn-success" @click="elegirPlan(12)">CONTRATAR</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import router from '@/router';
import NavbarPublicoComponent from './NavbarPublicoComponent.vue'
export default {
    components: {
        NavbarPublicoComponent,
    },
    methods: {
        elegirPlan(id) {
            localStorage.setItem("plan", id);
            console.log("PlanesComponent: ",localStorage.getItem("plan"))
            router.push('/registrar');
        },
    }
}
</script>

<style scoped>
li {
    list-style-type: none;
}

.contenedor {
    width: 60vw;
    margin: 20px auto;
    align-content: center;
}

.titulo-plan {
    font-size: large;
}

.precio-plan {
    font-size: 40px;
}

.ancho-descripcion {
    margin: 10px 10vw;
}

.ancho-plan {
    text-align: center;
    margin: 0px 0.4vw;
    width: 17vw;
    height: 30vh;
    align-content: center;
}

.ancho-plan:hover {
    box-shadow: 1px 1px 10px 1px;
}

.ancho-plan-gratis {
    text-align: center;
    width: calc(17vw * 3 + 0.5vw * 3);
}

.col-md-3 {
    display: inline-block;
}

.border:hover {
    box-shadow: 1px 1px 10px 1px;
}

.planes {
    display: inline-flex;
}

.plan-gratis {
    display: block;
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
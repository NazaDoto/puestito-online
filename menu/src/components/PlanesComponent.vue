<template>
    <div>
        <NavbarPublicoComponent></NavbarPublicoComponent>
        <div class="contenedor">
            <div class="mt-4 mb-4">
                <h1 class="text-center">¡Potenciá tu negocio!</h1>
                <hr>
                <div v-if="!usuario">
                    <div class="row justify-content-center text-center mb-4">
                        <div class="col-md-6">
                            <div class="titulo-plan">
                                <h3>Menú Online</h3>
                            </div>
                            <div class="border mt-2 p-2 text-center">
                                <div class="titulo-plan">
                                    Gratis
                                </div>
                                <ul class="text-start">
                                    <li>✅ Página + Menú online.</li>
                                    <li>✅ Visualización en nuestra plataforma.</li>
                                    <li>✅ Código QR para el menú.</li>
                                    <li>⚠️ Carrito y pedidos por WhatsApp.</li>
                                </ul>

                                <div class="gris mt-2">⚠️ = 1 mes gratis <br>
                                <button class="btn btn-menu mt-2" @click="elegirPlan('')">REGISTRAR</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <hr>
                </div>
                <div class="row justify-content-center text-center">
                    <div class="col-md-6">
                        <div class="titulo-plan">
                            <h3>Carrito Online</h3>
                        </div>
                        <div class="mt-2 p-2 text-center">
                            <ul class="text-start">
                                <li>✅ Página + Menú online.</li>
                                <li>✅ Visualización en nuestra plataforma.</li>
                                <li>✅ Código QR para el menú.</li>
                                <li>✅ Carrito y pedidos por WhatsApp.</li>
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
                                    $2500
                                </div>
                                <button class="btn btn-menu" @click="elegirPlan(1)">CONTRATAR</button>
                            </div>
                            <div class="border p-2 m-2 col-md-3">
                                <div class="titulo-plan">
                                    6 Meses
                                </div>
                                <div class="precio-plan">
                                    $12500
                                </div>
                                <button class="btn btn-menu" @click="elegirPlan(6)">CONTRATAR</button>
                            </div>
                            <div class="border p-2 m-2 col-md-3">
                                <div class="titulo-plan">
                                    12 Meses
                                </div>
                                <div class="precio-plan">
                                    $20000
                                </div>
                                <button class="btn btn-menu" @click="elegirPlan(12)">CONTRATAR</button>
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
    data() {
        return {
            usuario: '',
        }
    },
    components: {
        NavbarPublicoComponent,
    },
    mounted() {
        this.usuario = localStorage.getItem("usuario");
    },
    methods: {
        elegirPlan(plan) {
            if (plan) {
                localStorage.setItem("plan", plan);
                router.push('/u/registrar');
            } else {
                console.log('plan nulo')
                localStorage.clear();
                router.push('/u/registrar');
            }
        },
    }
}
</script>

<style scoped>
.gris {
    color: grey;
}

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
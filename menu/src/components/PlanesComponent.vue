<template>
    <div>
        <NavbarPublicoComponent></NavbarPublicoComponent>
        <div class="contenedor border text-center">
            <div class="mt-4 mb-4">
                <h1 class="text-center">¡Potenciá tu negocio!</h1>
                <div class="ancho-descripcion">
                    <p class="text-center">Ofrecemos
                        visualización en nuestra
                        plataforma, menú online autoadministrable, pedidos por WhatsApp y códigos QR. Simplificá la
                        experiencia
                        de tus clientes y destacá en el mundo digital con nuestra ayuda. <br>¡Unite ahora y hacé que tu
                        negocio
                        brille!</p>
                </div>
                <div class="planes">
                    <div class="ancho-plan g-3 border mt-2">
                        <div class="titulo-plan">
                            1 Mes
                        </div>
                        <div class="precio-plan">
                            $1500
                        </div>
                        <button class="btn btn-success" @click="elegirPlan(1)">CONTRATAR</button>
                    </div>
                    <div class="ancho-plan g-3 border mt-2">
                        <div class="titulo-plan">
                            6 Meses
                        </div>
                        <div class="precio-plan">
                            $7500
                        </div>
                        <button class="btn btn-success" @click="elegirPlan(6)">CONTRATAR</button>
                    </div>
                    <div class="ancho-plan g-3 border mt-2">
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
</template>

<script>
import router from '@/router';
import NavbarPublicoComponent from './NavbarPublicoComponent.vue'
export default {
components:{
    NavbarPublicoComponent,
},
methods:{
    elegirPlan(id){
        localStorage.setItem('plan', id);
        router.push('/register');
    },
}
}
</script>

<style scoped>
.contenedor {
    width: 60vw;
    margin: 20px auto;
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
    margin: 0px 0.4vw;
    width: 17vw;
    height: 30vh;
    align-content: center;
}

.ancho-plan:hover {
    box-shadow: 1px 1px 10px 1px;
}

.planes {
    display: inline-flex;
}



@media screen and (max-width: 992px) {
    .contenedor{
        width: 90vw;
    }
    .ancho-plan {
        width: 80vw;
        margin: auto;
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
<template>
    <div class="container mt-2 col-md-6">
        <h3>Calcular el % entre 2 números:</h3>
        <hr>
        <h5>Número Mayor</h5>
        <input class="form-control" type="number" v-model="primerValor">
        <h5>Número Menor</h5>
        <input class="form-control" type="number" v-model="segundoValor">
        <div>
            <button class="btn btn-success mt-2" @click="calcular">Calcular</button>
        </div>
        <div>
            <h4 class="text-center mt-2" v-if="resultado">El porcentaje que existe entre los números es el {{ resultado }}%</h4>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            primerValor: "",
            segundoValor: "",
            resultado: "",
        }
    },
    methods: {
        calcular(){
            this.resultado = (this.primerValor - this.segundoValor) * 100 / this.segundoValor;
        }
    },
}
</script>

<style></style>
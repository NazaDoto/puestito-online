<template>
    <nav class="navbar navbar-dark bg-dark">
        <!-- Logo -->
        <router-link class="navbar-brand" to="/">
            <img src="/favicon.ico" width="30" height="30" class="d-inline-block align-top" alt="">
            Puestito Online
        </router-link>
        <!-- Botón de login -->
        <router-link v-if="usuario" to="/u/home">Mi Negocio</router-link>
        <router-link v-else class="inline-end c-white" to="/u/login">Ingresar <svg xmlns="http://www.w3.org/2000/svg"
                width="28" fill="currentColor" class="bi bi-box-arrow-in-right" viewBox="0 0 16 16">
                <path fill-rule="evenodd"
                    d="M6 3.5a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-2a.5.5 0 0 0-1 0v2A1.5 1.5 0 0 0 6.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-8A1.5 1.5 0 0 0 5 3.5v2a.5.5 0 0 0 1 0z" />
                <path fill-rule="evenodd"
                    d="M11.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H1.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708z" />
            </svg></router-link>
    </nav>
</template>

<script>
export default {
    data() {
        return {
            usuario: '',
        }
    },
    mounted() {
        this.obtenerUsuario();
    },
    methods: {
        obtenerUsuario() {
            this.usuario = localStorage.getItem('usuario');
        }
    },
}
</script>

<style scoped>
.c-white{
    color:white;
}
.navbar {
    padding-left: 20px;
    padding-right: 20px;
    background-color: none !important;
}

a {
    text-decoration: none;
}
</style>
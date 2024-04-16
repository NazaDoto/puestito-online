<template>
    <nav class="navbar navbar-light bg-light">
        <!-- Logo -->
        <router-link class="navbar-brand" to="/">
            <img src="/favicon.ico" width="30" height="30" class="d-inline-block align-top" alt="">
            Puestito Online
        </router-link>
        <!-- Botón de login -->
        <router-link v-if="usuario" to="/u/home">Mi Negocio</router-link>
        <router-link v-else to="/u/login">Login</router-link>
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
.navbar {
    padding-left: 20px;
    padding-right: 20px;
}

a {
    text-decoration: none;
}
</style>
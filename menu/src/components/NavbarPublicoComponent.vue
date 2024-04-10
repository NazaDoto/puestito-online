<template>
    <nav class="navbar navbar-light bg-light">
        <!-- Logo -->
        <router-link class="navbar-brand" to="/">
            <img src="/favicon.ico" width="30" height="30" class="d-inline-block align-top" alt="">
            Puestito Online
        </router-link>
        <!-- Botón de login -->
        <router-link v-if="usuario != ''" :to="'/' + usuario">Mi Negocio</router-link>
        <router-link v-else to="/login">Login</router-link>
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
            console.log(this.usuario);
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
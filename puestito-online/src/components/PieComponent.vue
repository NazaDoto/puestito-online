<template>
    <footer class="text-center" :class="{'margen-logueado' : logueado}">
  <!-- Copyright -->
  <div class="text-center p-2">
    <router-link to="/"><img src="/favicon.ico" width="22" alt=""></router-link>
    <div style="margin-left:10px; display: inline;">
      Puestito Online
    </div>
    <a style="margin-left:10px;" href="http://instagram.com/nazadoto.com" target="_blank"><img src="/recursos/instagram.png" width="20" alt=""></a>
  </div>
  <!-- Copyright -->
</footer>
</template>

<script>
export default {
data(){
  return{
    logueado: false
  }
},
mounted(){
  localStorage.getItem("usuario") ? this.logueado = true: this.logueado = false;
}
}
</script>

<style scoped>

footer{
    position: relative;
    width: 100%;
}

@media screen and (max-width: 992px) {

  .margen-logueado{
    margin-bottom: 70px;
}
}
</style>
<template>
  <div id="app">
    <div class="app-container">
      
      <h1> Billetera de Criptomoneda</h1>
      <nav>
        <router-link to="/">Inicio</router-link> |
        <router-link to="/clientes">Clientes</router-link> |
        <router-link to="/transacciones">Transacciones</router-link> |
        <router-link to="/analisis">Análisis</router-link>
      </nav>
      <router-view />
    </div>
  </div>
</template>
<script>

</script>
<style>


html, body {
  height: 100%;
  margin: 0;
  padding: 0;
  background-color: #f9fafb; 
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: #1e293b;
}


#app {
  min-height: 100vh;
  width: 100%;
  background-color: #f9fafb;
  padding: 2rem 1rem;
  box-sizing: border-box;
  display: flex;
  justify-content: center; 
}


.app-container {
  width: 100%;
  max-width: 1000px;
  background: white;
  padding: 2rem 2.5rem;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgb(0 0 0 / 0.1);
  box-sizing: border-box;
}

</style>

  <template>
    <div class="home">
      <h1>Bienvenido a la App de Criptomonedas</h1>
      <p>Desde aquí podés:</p>

      <div class="btn-container">
        <RouterLink to="/clientes/" class="nav-btn">Clientes</RouterLink>
        <RouterLink to="/transacciones" class="nav-btn">Transacciones</RouterLink>
        <RouterLink to="/analisis" class="nav-btn">Análisis Financiero</RouterLink>

    

      </div>
    </div>
  </template>

  <script setup>
 
  </script>

  <style scoped>
  /* src/assets/Styles/Home.css */

.home {
  max-width: 600px;
  margin: 3rem auto;
  padding: 0 1rem;
  text-align: center;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: #2c3e50;
  user-select: none;
}

.home h1 {
  font-size: 2rem;
  margin-bottom: 1rem;
  font-weight: 700;
}

.home p {
  font-size: 1.125rem;
  margin-bottom: 2rem;
  color: #4b5563; /* gris medio */
}

.btn-container {
  display: flex;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;
}

.nav-btn {
  background-color: #2563eb;
  color: white;
  padding: 0.75rem 1.5rem;
  text-decoration: none;
  border-radius: 0.5rem;
  font-weight: 600;
  box-shadow: 0 4px 6px rgb(37 99 235 / 0.4);
  transition: background-color 0.3s ease, box-shadow 0.3s ease;
  user-select: none;
}

.nav-btn:hover {
  background-color: #1e40af;
  box-shadow: 0 6px 10px rgb(30 64 175 / 0.6);
}

.nav-btn:focus-visible {
  outline: 3px solid #60a5fa;
  outline-offset: 3px;
}

</style>



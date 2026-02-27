<template>
  <div class="analisis-container">
    <h1>Análisis Financiero Actual</h1>

    <div class="selector-cliente">
      <label for="clienteSelect">Seleccionar Cliente:</label>
      <select id="clienteSelect" v-model="clienteSeleccionado">
        <option disabled value="">-- Seleccione un cliente --</option>
        <option v-for="cliente in clientes" :key="cliente.id" :value="cliente.id">
          {{ cliente.nombre }}
        </option>
      </select>
    </div>

    <div v-if="cargando">Cargando clientes...</div>

    <div v-if="!clienteSeleccionado && !cargando" class="mensaje-seleccion">
      Por favor selecciona un cliente para ver su estado financiero.
    </div>

    <AnalisisFinancieroDetalle v-if="clienteSeleccionado" :clienteId="clienteSeleccionado" />
  </div>
</template>

<script>

import { ref, onMounted } from 'vue'
import axios from 'axios'
import AnalisisFinancieroDetalle from '/src/components/AnalisisFinancieroDetalle.vue'

export default {
  name: 'AnalisisFinancieroView',
  components: { AnalisisFinancieroDetalle },
  setup() {
    const clientes = ref([])
    const clienteSeleccionado = ref('')
    const cargando = ref(false)

    const cargarClientes = async () => {
      cargando.value = true
      try {
        const res = await axios.get('https://localhost:7119/api/Clientes')
        clientes.value = res.data.map(c => ({
          id: c.Id ?? c.id,
          nombre: c.Nombre ?? c.nombre ?? (c.Nombre && c.Apellido ? `${c.Nombre} ${c.Apellido}` : 'Sin nombre'),
        }))
      } catch (e) {
        console.error('Error cargando clientes:', e)
      } finally {
        cargando.value = false
      }
    }

    onMounted(cargarClientes)

    return {
      clientes,
      clienteSeleccionado,
      cargando,
    }
  },
}
</script>
<style scoped>


.analisis-container {
  max-width: 600px;
  margin: 2rem auto;
  padding: 1.5rem 2rem;
  background: #f9fafb;
  border-radius: 12px;
  box-shadow: 0 8px 24px rgb(0 0 0 / 0.1);
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: #1e293b;
}

h1 {
  font-weight: 700;
  font-size: 2rem;
  margin-bottom: 1.5rem;
  user-select: none;
  text-align: center;
  color: #2563eb; 
}

.selector-cliente {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}

.selector-cliente label {
  font-weight: 600;
  font-size: 1rem;
  color: #334155;
  user-select: none;
}

.selector-cliente select {
  padding: 0.5rem 0.75rem;
  font-size: 1rem;
  border: 1.5px solid #cbd5e1;
  border-radius: 8px;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;
}

.selector-cliente select:focus {
  outline: none;
  border-color: #2563eb;
  box-shadow: 0 0 6px rgba(37, 99, 235, 0.5);
}

.mensaje-seleccion,
.cargando {
  font-size: 1rem;
  color: #64748b;
  text-align: center;
  font-style: italic;
  margin-top: 1rem;
  user-select: none;
}

</style>

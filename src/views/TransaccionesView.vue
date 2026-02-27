<template>
  <div class="transacciones-container">
    <h1>Gestión de Transacciones</h1>

    <button @click="abrirAlta" class="btn btn-primary mb-4">Nueva Transacción</button>

    <TransaccionListado
      ref="listado"
      @verDetalle="mostrarDetalle"
      @editarTransaccion="abrirEdicion"
      @borrarTransaccion="borrarTransaccion"
    />

    <TransaccionForm
      v-if="mostrarFormulario"
      :transaccionParaEditar="transaccionEditar"
      @cerrarFormulario="cerrarFormulario"
      @transaccionGuardada="recargarListado"
    />

    <TransaccionDetalle
      v-if="transaccionDetalle"
      :transaccion="transaccionDetalle"
      @cerrarDetalle="transaccionDetalle = null"
    />
  </div>
</template>

<script>

import { ref } from 'vue'
import TransaccionListado from '/src/components/TransaccionListado.vue'
import TransaccionForm from '/src/components/TransaccionForm.vue'
import TransaccionDetalle from '/src/components/TransaccionDetalle.vue'

export default {
  components: { TransaccionListado, TransaccionForm, TransaccionDetalle },
  setup() {
    const mostrarFormulario = ref(false)
    const transaccionEditar = ref(null)
    const transaccionDetalle = ref(null)
    const listado = ref(null)

    const abrirAlta = () => {
      transaccionEditar.value = null
      mostrarFormulario.value = true
    }

    const abrirEdicion = (transaccion) => {
      transaccionEditar.value = transaccion
      mostrarFormulario.value = true
    }

    const cerrarFormulario = () => {
      mostrarFormulario.value = false
      transaccionEditar.value = null
    }

    const mostrarDetalle = (transaccion) => {
      transaccionDetalle.value = transaccion
    }

    const recargarListado = () => {
      listado.value?.cargarDatos()
      cerrarFormulario()
    }

    const borrarTransaccion = async (id) => {
      if (!confirm('¿Borrar esta transacción?')) return
      try {
        await fetch(`https://localhost:7119/api/Transaccion/${id}`, { method: 'DELETE' })
        recargarListado()
      } catch (e) {
        alert('Error al borrar')
        console.error(e)
      }
    }

    return {
      mostrarFormulario,
      transaccionEditar,
      transaccionDetalle,
      listado,
      abrirAlta,
      abrirEdicion,
      cerrarFormulario,
      mostrarDetalle,
      recargarListado,
      borrarTransaccion,
    }
  },
}
</script> 

<style scoped>


.transacciones-container {
  max-width: 800px;
  margin: 2rem auto;
  padding: 0 1rem;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: #1e293b; 
}

.transacciones-container h1 {
  font-size: 2rem;
  margin-bottom: 1.5rem;
  font-weight: 700;
  text-align: center;
}

.btn {
  cursor: pointer;
  font-weight: 600;
  border: none;
  border-radius: 0.4rem;
  padding: 0.6rem 1.2rem;
  transition: background-color 0.3s ease;
  user-select: none;
}

.btn-primary {
  background-color: #2563eb;
  color: white;
  box-shadow: 0 4px 6px rgba(37, 99, 235, 0.4);
}

.btn-primary:hover {
  background-color: #1d4ed8;
  box-shadow: 0 6px 10px rgba(29, 78, 216, 0.6);
}

.mb-4 {
  margin-bottom: 1rem;
}



table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;
  font-size: 0.95rem;
}

th, td {
  border: 1px solid #cbd5e1; 
  padding: 0.6rem 0.8rem;
  text-align: left;
}

th {
  background-color: #f1f5f9; 
  font-weight: 600;
  color: #334155;
}

tr:nth-child(even) {
  background-color: #f8fafc;
}

tr:hover {
  background-color: #e0e7ff;
}

button {
  font-family: inherit;
}

</style>

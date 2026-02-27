<template>
  <div class="form-container">
    <h2>{{ transaccionParaEditar ? 'Editar Transacción' : 'Nueva Transacción' }}</h2>

    <form @submit.prevent="guardar" novalidate>
     
      <label for="cliente">Cliente</label>
      <select id="cliente" v-model="form.clienteId" required>
        <option value="" disabled>Seleccione un cliente</option>
        <option v-for="c in clientes" :key="c.id" :value="c.id">{{ c.nombre }}</option>
      </select>

      <label for="accion">Acción</label>
      <select id="accion" v-model="form.action" required>
        <option value="purchase">Compra</option>
        <option value="sale">Venta</option>
      </select>

      <label for="cripto">Criptomoneda</label>
      <select id="cripto" v-model="form.cryptoCode" required>
        <option value="btc">Bitcoin</option>
        <option value="eth">Ethereum</option>
        <option value="usdt">USDT</option>
      </select>

      <label for="cantidad">Cantidad</label>
      <input
        id="cantidad"
        type="number"
        step="0.000001"
        v-model.number="form.cryptoAmount"
        placeholder="Ej: 0.005"
        required
      />

      <label for="fecha">Fecha y Hora</label>
      <input
        id="fecha"
        type="datetime-local"
        v-model="form.fechaHora"
        required
      />

      <p v-if="error" class="error">{{ error }}</p>

      <div class="botones">
        <button type="submit" class="btn-primary">
          Guardar
        </button>
        <button type="button" @click="$emit('cerrarFormulario')" class="btn-secundary">
          Cancelar
        </button>
      </div>
    </form>
  </div>
</template>

<script>

import { ref, onMounted, watch } from 'vue'
import axios from 'axios'

export default {
  props: { transaccionParaEditar: Object },
  setup(props, { emit }) {
    const clientes = ref([])
    const error = ref(null)
    const form = ref({
      clienteId: '',
      action: 'purchase',
      cryptoCode: 'btc',
      cryptoAmount: null,
      fechaHora: ''
    })

    const cargarClientes = async () => {
      try {
        const res = await axios.get('https://localhost:7119/api/Clientes')
        clientes.value = res.data
      } catch (e) {
        console.error(e)
        error.value = 'Error cargando clientes'
      }
    }

    watch(() => props.transaccionParaEditar, (nueva) => {
      if (nueva) {
        form.value = {
          clienteId: nueva.clienteId,
          action: nueva.action,
          cryptoCode: nueva.cryptoCode,
          cryptoAmount: nueva.cryptoAmount,
          fechaHora: new Date(nueva.fechaHora).toISOString().slice(0, 16)
        }
      } else {
        form.value = {
          clienteId: '',
          action: 'purchase',
          cryptoCode: 'btc',
          cryptoAmount: null,
          fechaHora: ''
        }
      }
      error.value = null
    }, { immediate: true })

    const guardar = async () => {
      try {
        error.value = null
        const dto = {
          clienteId: form.value.clienteId,
          action: form.value.action,
          cryptoCode: form.value.cryptoCode,
          cryptoAmount: form.value.cryptoAmount,
          fechaHora: new Date(form.value.fechaHora).toISOString()
        }

        if (props.transaccionParaEditar) {
          await axios.patch(`https://localhost:7119/api/Transaccion/${props.transaccionParaEditar.id}`, dto)
        } else {
          await axios.post('https://localhost:7119/api/Transaccion', dto)
        }

        emit('transaccionGuardada')
      } catch (e) {
        console.error(e)
        error.value = 'Error guardando transacción'
      }
    }

    onMounted(cargarClientes)

    return { form, clientes, error, guardar }
  }
}
</script>

<style scoped>
.form-container {
  max-width: 480px;
  margin: 1rem auto 2rem;
  background: white;
  padding: 1.5rem 2rem;
  border-radius: 12px;
  box-shadow: 0 6px 15px rgba(100, 116, 139, 0.1);
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: #334155;
}

h2 {
  font-weight: 700;
  font-size: 1.5rem;
  margin-bottom: 1.2rem;
  text-align: center;
  color: #1e40af;
  user-select: none;
}

label {
  display: block;
  font-weight: 600;
  margin-top: 1rem;
  margin-bottom: 0.3rem;
  color: #334155;
}

input,
select {
  width: 100%;
  padding: 0.5rem 0.75rem;
  border: 1px solid #cbd5e1;
  border-radius: 8px;
  font-size: 1rem;
  outline-offset: 2px;
  outline-color: transparent;
  transition: outline-color 0.2s ease;
}

input:focus,
select:focus {
  outline-color: #2563eb;
}

.error {
  color: #dc2626;
  margin-top: 1rem;
  font-weight: 700;
  font-size: 0.95rem;
  text-align: center;
  user-select: text;
}

.botones {
  margin-top: 1.5rem;
  display: flex;
  justify-content: space-between;
  gap: 0.75rem;
}

.btn-primary {
  flex: 1;
  background-color: #2563eb;
  color: white;
  padding: 10px 0;
  border-radius: 8px;
  border: none;
  font-weight: 700;
  font-size: 1rem;
  cursor: pointer;
  user-select: none;
  transition: background-color 0.3s ease;
}

.btn-primary:hover {
  background-color: #1e40af;
}

.btn-secundary {
  flex: 1;
  background-color: #e2e8f0;
  color: #334155;
  padding: 10px 0;
  border-radius: 8px;
  border: none;
  font-weight: 700;
  font-size: 1rem;
  cursor: pointer;
  user-select: none;
  transition: background-color 0.3s ease;
}

.btn-secundary:hover {
  background-color: #cbd5e1;
}
</style>

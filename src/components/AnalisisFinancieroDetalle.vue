<template>
  <div>
    <p v-if="loading">Cargando datos...</p>
    <p v-if="error" class="error">{{ error }}</p>

    <div v-if="!loading && !error && Object.keys(saldos).length">
      <table>
        <thead>
          <tr>
            <th>Criptomoneda</th>
            <th>Cantidad</th>
            <th>Valor ARS</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(saldo, cripto) in saldos" :key="cripto">
            <td>{{ cripto.toUpperCase() }}</td>
            <td>{{ saldo.cantidad.toFixed(6) }}</td>
            <td>{{ saldo.valorARS.toLocaleString('es-AR', { style: 'currency', currency: 'ARS' }) }}</td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <th>Total</th>
            <th></th>
            <th>{{ totalARS.toLocaleString('es-AR', { style: 'currency', currency: 'ARS' }) }}</th>
          </tr>
        </tfoot>
      </table>


    </div>

    <p v-if="!loading && !error && !Object.keys(saldos).length">No se encontraron criptomonedas con saldo positivo.</p>
          <canvas ref="chartCanvas" style="max-width: 500px; margin-top: 2rem;"></canvas>
  </div>
</template>

<script>

import { ref, reactive, watch, nextTick } from 'vue'
import axios from 'axios'
import { Chart, registerables } from 'chart.js'

Chart.register(...registerables)

export default {
  name: 'AnalisisFinancieroDetalle',
  props: {
    clienteId: {
      type: [String, Number],
      required: true,
    },
  },
  setup(props) {
    const loading = ref(false)
    const error = ref('')
    const transacciones = ref([])
    const saldos = reactive({})
    const totalARS = ref(0)
    const chartCanvas = ref(null)
    let chartInstance = null

    const obtenerPrecio = async (cripto) => {
      try {
        const url = `https://criptoya.com/api/satoshitango/${cripto}/ars`
        const res = await axios.get(url)
        return res.data.totalBid || 0
      } catch (e) {
        console.error(`Error obteniendo precio para ${cripto}:`, e)
        return 0
      }
    }

    const actualizarGrafico = async () => {
      await nextTick()
      if (!chartCanvas.value) {
        console.warn('No existe canvas aún')
        return
      }

      const labels = Object.keys(saldos).map(c => c.toUpperCase())
      const data = Object.values(saldos).map(s => s.valorARS)

      if (chartInstance) {
        chartInstance.destroy()
      }

      chartInstance = new Chart(chartCanvas.value, {
        type: 'doughnut',
        data: {
          labels,
          datasets: [
            {
              data,
              backgroundColor: ['#36a2eb', '#ff6384', '#ffce56', '#4caf50', '#9c27b0'],
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: 'bottom',
            },
          },
        },
      })
    }

    const calcularSaldos = async () => {
      Object.keys(saldos).forEach(k => delete saldos[k])
      totalARS.value = 0

      const resumen = {}

      transacciones.value.forEach(t => {
        const c = t.cryptoCode.toLowerCase()
        const cantidad = Number(t.cryptoAmount)
        if (!resumen[c]) resumen[c] = 0
        resumen[c] += (t.action === 'purchase' ? cantidad : -cantidad)
      })

      for (const cripto in resumen) {
        if (resumen[cripto] <= 0) continue
        const precio = await obtenerPrecio(cripto)
        const valor = resumen[cripto] * precio
        saldos[cripto] = {
          cantidad: resumen[cripto],
          valorARS: valor,
        }
        totalARS.value += valor
      }

      actualizarGrafico()
    }

    const cargarTransacciones = async () => {
      loading.value = true
      error.value = ''
      try {
        const res = await axios.get(`https://localhost:7119/api/Transaccion`)
        transacciones.value = res.data.filter(t => t.clienteId == props.clienteId)
        await calcularSaldos()
      } catch (e) {
        error.value = 'Error cargando transacciones: ' + (e.message || '')
      } finally {
        loading.value = false
      }
    }

    watch(() => props.clienteId, () => {
      if (props.clienteId) cargarTransacciones()
    }, { immediate: true })

    return {
      loading,
      error,
      saldos,
      totalARS,
      chartCanvas,
    }
  },
}
</script>

<style scoped>
.error {
  color: #dc2626;
  font-weight: 700;
  margin: 1rem 0;
  text-align: center;
  user-select: none;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background: #fff;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0,0,0,0.1);
}

thead th {
  background-color: #1e40af;
  color: white;
  padding: 12px 16px;
  font-weight: 700;
  text-align: left;
  user-select: none;
}

tbody td {
  border-bottom: 1px solid #e2e8f0;
  padding: 12px 16px;
  color: #334155;
  font-size: 0.95rem;
}

tfoot th {
  padding: 12px 16px;
  text-align: left;
  font-weight: 700;
  background-color: #f3f4f6;
  color: #1e40af;
  user-select: none;
}

tfoot th:first-child {
  font-size: 1.1rem;
}

tfoot th:last-child {
  font-size: 1.1rem;
}

p {
  text-align: center;
  font-style: italic;
  color: #64748b;
  user-select: none;
}

canvas {
  display: block;
  max-width: 500px;
  margin: 2rem auto 0 auto;
  border-radius: 12px;
  box-shadow: 0 4px 14px rgba(30, 64, 175, 0.2);
}
</style>




<template>
  <div>
    <h3>Composición de la cartera</h3>
    <DoughnutChart :chart-data="data" :chart-options="options" />
  </div>
</template>

<script>

import { Doughnut } from 'vue-chartjs'
import { reactive, watch } from 'vue'
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js'

ChartJS.register(ArcElement, Tooltip, Legend)

export default {
  name: 'GraficoComposicion',
  components: {
    DoughnutChart: Doughnut
  },
  props: {
    saldos: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    // Creamos reactive data para el gráfico
    const data = reactive({
      labels: [],
      datasets: [
        {
          label: 'Valor en ARS',
          backgroundColor: [],
          data: []
        }
      ]
    })

    const options = reactive({
      responsive: true,
      plugins: {
        legend: {
          position: 'bottom'
        },
        tooltip: {
          callbacks: {
            label(context) {
              let label = context.label || ''
              let value = context.parsed || 0
              return `${label}: $${value.toLocaleString('es-AR', {minimumFractionDigits:2})}`
            }
          }
        }
      }
    })

    // Colores para las criptos (reusá o extendé)
    const colores = [
      '#f7931a', // BTC naranja
      '#3c3c3d', // ETH gris oscuro
      '#26a17b', // USDT verde
      '#ff6384', // otro color
      '#36a2eb',
      '#ffce56'
    ]

    const actualizarDatos = () => {
      data.labels = []
      data.datasets[0].data = []
      data.datasets[0].backgroundColor = []

      const claves = Object.keys(props.saldos)
      claves.forEach((cripto, i) => {
        data.labels.push(cripto.toUpperCase())
        data.datasets[0].data.push(props.saldos[cripto].valorARS.toFixed(2))
        data.datasets[0].backgroundColor.push(colores[i % colores.length])
      })
    }

    // Reactivo al cambio en props.saldos
    watch(() => props.saldos, actualizarDatos, { deep: true, immediate: true })

    return { data, options }
  }
}
</script>

<template>
  <div class="grafico-container">
    <h3>Composición de la cartera</h3>
    <DoughnutChart :chart-data="data" :chart-options="options" />
  </div>
</template>

<script>
import { Doughnut } from 'vue-chartjs'
import { reactive, watch } from 'vue'
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js'

ChartJS.register(ArcElement, Tooltip, Legend)

export default {
  name: 'GraficoComposicion',
  components: {
    DoughnutChart: Doughnut
  },
  props: {
    saldos: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const data = reactive({
      labels: [],
      datasets: [
        {
          label: 'Valor en ARS',
          backgroundColor: [],
          data: []
        }
      ]
    })

    const options = reactive({
      responsive: true,
      plugins: {
        legend: {
          position: 'bottom',
          labels: {
            font: {
              size: 14,
              weight: '600'
            },
            color: '#1e40af' // azul intenso para leyenda
          }
        },
        tooltip: {
          callbacks: {
            label(context) {
              const label = context.label || ''
              const value = context.parsed || 0
              return `${label}: $${value.toLocaleString('es-AR', { minimumFractionDigits: 2 })}`
            }
          },
          bodyFont: {
            size: 13,
            weight: '600'
          },
          titleFont: {
            size: 14,
            weight: '700'
          }
        }
      }
    })

    const colores = [
      '#f7931a', // BTC naranja
      '#3c3c3d', // ETH gris oscuro
      '#26a17b', // USDT verde
      '#ff6384', // rosa
      '#36a2eb', // celeste
      '#ffce56'  // amarillo
    ]

    const actualizarDatos = () => {
      data.labels = []
      data.datasets[0].data = []
      data.datasets[0].backgroundColor = []

      const claves = Object.keys(props.saldos)
      claves.forEach((cripto, i) => {
        data.labels.push(cripto.toUpperCase())
        data.datasets[0].data.push(Number(props.saldos[cripto].valorARS.toFixed(2)))
        data.datasets[0].backgroundColor.push(colores[i % colores.length])
      })
    }

    watch(() => props.saldos, actualizarDatos, { deep: true, immediate: true })

    return { data, options }
  }
}
</script>

<style scoped>
.grafico-container {
  max-width: 520px;
  margin: 1rem auto;
  padding: 1.5rem 2rem 2rem;
  background-color: #f9fafb;
  border-radius: 12px;
  box-shadow: 0 2px 12px rgba(30, 64, 175, 0.15);
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: #334155;
  user-select: none;
}

h3 {
  text-align: center;
  margin-bottom: 1.2rem;
  font-weight: 700;
  font-size: 1.3rem;
  color: #1e40af;
}
</style>




<template>
  <div class="p-4 max-w-2xl mx-auto">
    <h1 class="text-2xl font-bold mb-4">Gestión de Clientes</h1>

    <ClienteForm
      :modoEdicion="modoEdicion"
      :clienteInicial="clienteSeleccionado"
      @registrar="registrarCliente"
      @actualizar="actualizarCliente"
      @cancelar="cancelarEdicion"
    />

    <ClienteTabla
      :clientes="clientes"
      @editar="seleccionarCliente"
      @eliminar="eliminarCliente"
    />
  </div>
</template>

<script setup>

import { ref, onMounted } from 'vue'
import axios from 'axios'
import ClienteForm from '/src/components/ClienteForm.vue'
import ClienteTabla from '/src/components/ClienteTabla.vue'

const clientes = ref([])
const modoEdicion = ref(false)
const clienteSeleccionado = ref(null)

const obtenerClientes = async () => {
  try {
    const response = await axios.get('/api/Clientes')
    clientes.value = response.data
  } catch (error) {
    console.error('Error al obtener clientes', error)
  }
}

const registrarCliente = async (nuevoCliente) => {
  try {
    await axios.post('/api/Clientes', {
      nombre: nuevoCliente.nombre,
      email: nuevoCliente.email
    })
    await obtenerClientes()
  } catch (error) {
    console.error('Error al registrar cliente', error)
  }
}

const seleccionarCliente = (cliente) => {
  clienteSeleccionado.value = { ...cliente }
  modoEdicion.value = true
}

const actualizarCliente = async (clienteActualizado) => {
  try {
    await axios.put(`/api/Clientes/${clienteSeleccionado.value.id}`, clienteActualizado)
    modoEdicion.value = false
    clienteSeleccionado.value = null
    await obtenerClientes()
  } catch (error) {
    console.error('Error al actualizar cliente', error)
  }
}

const eliminarCliente = async (id) => {
  if (!confirm('¿Estás seguro que querés eliminar este cliente?')) return
  try {
    await axios.delete(`/api/Clientes/${id}`)
    await obtenerClientes()
  } catch (error) {
    console.error('Error al eliminar cliente', error)
  }
}

const cancelarEdicion = () => {
  modoEdicion.value = false
  clienteSeleccionado.value = null
}

onMounted(() => {
  obtenerClientes()
})
</script>

<style scoped>
/* src/assets/Styles/GestionClientes.css */

.p-4 {
  padding: 1rem;
}

.max-w-2xl {
  max-width: 42rem;
  margin-left: auto;
  margin-right: auto;
}

.mx-auto {
  margin-left: auto;
  margin-right: auto;
}

h1 {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: #1e293b; /* gris oscuro azulado */
  text-align: center;
  user-select: none;
}

form, table {
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 8px 20px rgb(0 0 0 / 0.05);
  padding: 1rem 1.5rem;
  margin-bottom: 2rem;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: #334155;
}

/* Botones */
button {
  cursor: pointer;
  border-radius: 6px;
  padding: 0.5rem 1rem;
  border: none;
  font-weight: 600;
  transition: background-color 0.25s ease;
}

button:hover {
  opacity: 0.85;
}

button:focus {
  outline: 3px solid #2563eb;
  outline-offset: 2px;
}

button.bg-blue-600 {
  background-color: #2563eb;
  color: white;
}

button.text-gray-500 {
  background: transparent;
  color: #64748b;
}

button.text-blue-600 {
  background: transparent;
  color: #2563eb;
  border: 1.5px solid #2563eb;
}

button.text-red-600 {
  background: transparent;
  color: #dc2626;
  border: 1.5px solid #dc2626;
}

/* Tabla */
table {
  width: 100%;
  border-collapse: collapse;
}

thead {
  background-color: #f1f5f9;
}

th, td {
  padding: 0.75rem 1rem;
  border-bottom: 1px solid #e2e8f0;
  text-align: left;
  user-select: none;
}

tbody tr:hover {
  background-color: #f0f9ff;
}

/* Espaciado en acciones */
td.space-x-2 > button {
  margin-right: 0.5rem;
}

td.space-x-2 > button:last-child {
  margin-right: 0;
}

</style>

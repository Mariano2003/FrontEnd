<template>
  <div class="mb-6">
    <h2 class="text-xl font-bold mb-2">{{ modoEdicion ? 'Editar Cliente' : 'Nuevo Cliente' }}</h2>
    <form @submit.prevent="submitCliente" class="space-y-4">
      <input
        type="text"
        v-model="cliente.nombre"
        placeholder="Nombre completo"
        class="w-full p-2 border rounded"
        required
      />
      <input
        type="email"
        v-model="cliente.email"
        placeholder="Email"
        class="w-full p-2 border rounded"
        required
      />
      <div class="flex gap-2">
        <button type="submit" class="bg-blue-600 text-white px-4 py-2 rounded">
          {{ modoEdicion ? 'Actualizar' : 'Registrar' }}
        </button>
        <button v-if="modoEdicion" type="button" @click="cancelarEdicion" class="text-gray-500">
          Cancelar
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>

import { reactive, watch } from 'vue'

const props = defineProps({
  clienteInicial: Object,
  modoEdicion: Boolean
})

const emit = defineEmits(['registrar', 'actualizar', 'cancelar'])

const cliente = reactive({ nombre: '', email: '' })

watch(
  () => props.clienteInicial,
  (nuevo) => {
    if (props.modoEdicion && nuevo) {
      cliente.nombre = nuevo.nombre
      cliente.email = nuevo.email
    }
  },
  { immediate: true }
)

const submitCliente = () => {
  const datos = { ...cliente }
  props.modoEdicion ? emit('actualizar', datos) : emit('registrar', datos)
  cliente.nombre = ''
  cliente.email = ''
}

const cancelarEdicion = () => {
  cliente.nombre = ''
  cliente.email = ''
  emit('cancelar')
}
</script>

<style scoped>
.mb-6 {
  margin-bottom: 1.5rem;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: #334155;
}

h2 {
  font-weight: 700;
  font-size: 1.25rem;
  margin-bottom: 0.5rem;
  user-select: none;
}

form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

input[type="text"],
input[type="email"] {
  padding: 0.6rem 0.8rem;
  border: 1.5px solid #cbd5e1;
  border-radius: 8px;
  font-size: 1rem;
  outline-offset: 2px;
  outline-color: transparent;
  transition: outline-color 0.3s ease;
  font-family: inherit;
  color: #1e293b;
}

input[type="text"]:focus,
input[type="email"]:focus {
  outline-color: #2563eb;
  border-color: #2563eb;
}

.flex {
  display: flex;
  gap: 0.5rem;
}

button[type="submit"] {
  background-color: #2563eb;
  color: white;
  padding: 0.6rem 1.2rem;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  user-select: none;
  transition: background-color 0.3s ease;
  flex: 1;
}

button[type="submit"]:hover {
  background-color: #1e40af;
}

button[type="button"] {
  background: transparent;
  color: #64748b;
  padding: 0.6rem 1rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  user-select: none;
  transition: color 0.3s ease;
  flex: 1;
}

button[type="button"]:hover {
  color: #1e40af;
}
</style>



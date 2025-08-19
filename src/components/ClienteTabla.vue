<template>
  <table class="w-full table-auto border mt-6">
    <thead class="bg-gray-100">
      <tr>
        <th class="border px-4 py-2">Nombre</th>
        <th class="border px-4 py-2">Email</th>
        <th class="border px-4 py-2">Acciones</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="cliente in clientes" :key="cliente.id">
        <td class="border px-4 py-2">{{ cliente.nombre }}</td>
        <td class="border px-4 py-2">{{ cliente.email }}</td>
        <td class="border px-4 py-2 space-x-2">
          <button @click="$emit('editar', cliente)" class="text-blue-600">Editar</button>
          <button @click="$emit('eliminar', cliente.id)" class="text-red-600">Eliminar</button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>

defineProps({
  clientes: Array
})

defineEmits(['editar', 'eliminar'])
</script>


<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 1.5rem;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: #334155;
}

thead {
  background-color: #f3f4f6; /* gris claro */
  user-select: none;
}

th,
td {
  border: 1px solid #cbd5e1;
  padding: 0.5rem 1rem;
  text-align: left;
  font-size: 0.95rem;
  vertical-align: middle;
}

tbody tr:hover {
  background-color: #e0e7ff; /* azul muy claro */
  transition: background-color 0.3s ease;
}

button {
  background: transparent;
  border: none;
  cursor: pointer;
  font-weight: 600;
  font-size: 0.9rem;
  padding: 0.2rem 0.5rem;
  border-radius: 6px;
  user-select: none;
  transition: background-color 0.3s ease, color 0.3s ease;
}

button.text-blue-600 {
  color: #2563eb;
}

button.text-blue-600:hover {
  background-color: #dbeafe;
  color: #1e40af;
}

button.text-red-600 {
  color: #dc2626;
}

button.text-red-600:hover {
  background-color: #fee2e2;
  color: #991b1b;
}
</style>


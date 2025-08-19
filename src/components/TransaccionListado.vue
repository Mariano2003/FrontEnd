

<template>

  <div class="listado-container">

    <h2>Listado de Transacciones</h2>


    <div class="filtro">
  
      <label for="cliente">Filtrar por cliente:</label>

      <select id="cliente" v-model="clienteSeleccionado" @change="guardarFiltroCliente">
     
        <option value="">Todos</option>
    
        <option v-for="c in clientes" :key="c.id" :value="c.id">
          {{ c.nombre }}
        </option>
      </select>
    </div>

   
    <table>

      <thead>
        <tr>
          <th>Cliente</th>
          <th>Acción</th>
          <th>Criptomoneda</th>
          <th>Cantidad</th>
          <th>Monto (ARS)</th>
          <th>Fecha y Hora</th>
          <th>Acciones</th>
        </tr>
      </thead>

      <tbody>
        
        <tr v-for="t in transaccionesFiltradas" :key="t.id" tabindex="0">
  
          <td>{{ nombreCliente(t.clienteId) }}</td>
       
          <td>{{ t.action === 'purchase' ? 'Compra' : 'Venta' }}</td>
        
          <td>{{ t.cryptoCode.toUpperCase() }}</td>
      
          <td>{{ t.cryptoAmount.toFixed(6) }}</td>
        
          <td>{{ t.money.toFixed(2) }}</td>
       
          <td>{{ formatearFecha(t.fechaHora) }}</td>
     
          <td class="acciones">
      
            <button @click="$emit('verDetalle', t)" class="btn-ver">Ver</button>
       
            <button @click="$emit('editarTransaccion', t)" class="btn-editar">Editar</button>
            
            <button @click="$emit('borrarTransaccion', t.id)" class="btn-borrar">Borrar</button>
          </td>
        </tr>
      </tbody>
    </table>

    
    <p v-if="error" class="error">{{ error }}</p>
  </div>
</template>

<script>

import { ref, computed, onMounted } from 'vue'

import axios from 'axios'

export default {

  name: 'TransaccionListado',
  

  setup(_, { expose }) {

    
  
    const transacciones = ref([])
  
    const clientes = ref([])
   
    const error = ref(null)

    const clienteSeleccionado = ref(localStorage.getItem('filtroClienteId') || '')

    
    const cargarDatos = async () => {
    
      error.value = null
      try {
      
        const [resTrans, resClientes] = await Promise.all([
      
          axios.get('https://localhost:7119/api/Transaccion'),
      
          axios.get('https://localhost:7119/api/Clientes'),
        ])

        transacciones.value = resTrans.data
        clientes.value = resClientes.data
      } catch (e) {

        error.value = 'Error al cargar datos'
        console.error(e)
      }
    }


    const guardarFiltroCliente = () => {
      localStorage.setItem('filtroClienteId', clienteSeleccionado.value)
    }

 
    const nombreCliente = (id) => {
  
      const cliente = clientes.value.find(c => c.id === id)
    
      return cliente ? cliente.nombre : 'Desconocido'
    }


    const formatearFecha = (f) => {

      const d = new Date(f)

      return isNaN(d) ? 'Inválida' : d.toLocaleString()
    }

  
    const transaccionesFiltradas = computed(() => {
  
      if (!clienteSeleccionado.value) return transacciones.value
   
      return transacciones.value.filter(t => String(t.clienteId) === String(clienteSeleccionado.value))
    })

   
    expose({ cargarDatos })
    
    
    onMounted(cargarDatos)

   
    return {
      transacciones,
      clientes,
      error,
      clienteSeleccionado,
      transaccionesFiltradas,
      nombreCliente,
      formatearFecha,
      guardarFiltroCliente,
    }
  },
}
</script>

<style >

.listado-container {
  max-width: 900px;                    
  margin: 1.5rem auto;                 
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; 
  color: #334155;                      
  background: #f9fafb;                 
  border-radius: 12px;                
  padding: 1.5rem 2rem;               
  box-shadow: 0 6px 18px rgba(100, 116, 139, 0.15); 
}


h2 {
  font-weight: 700;                   
  font-size: 1.5rem;                 
  margin-bottom: 1.2rem;              
  color: #1e40af;                     
  user-select: none;                  
  text-align: center;                 
}


.filtro {
  margin-bottom: 1.2rem;             
  font-weight: 600;                     
  font-size: 1rem;                   
  display: flex;                        
  align-items: center;                  
  gap: 0.75rem;                     
  color: #1e293b;                      
  justify-content: center;              
}


.filtro select {
  padding: 0.4rem 0.6rem;             
  border: 1.5px solid #cbd5e1;      
  border-radius: 8px;               
  font-size: 1rem;                      
  transition: border-color 0.3s ease, box-shadow 0.3s ease; 
}

.filtro select:focus {
  outline: none;                        
  border-color: #2563eb;                 
  box-shadow: 0 0 6px rgba(37, 99, 235, 0.5); 
}


table {
  width: 100%;                           
  border-collapse: collapse;            
  border-radius: 12px;                  
  overflow: hidden;                      
  box-shadow: 0 2px 8px rgb(0 0 0 / 0.08); 
  background: white;                    
  user-select: none;                    
}


thead th {
  background-color: #1e40af;            
  color: white;                        
  font-weight: 700;                     
  user-select: none;                  
  padding: 0.75rem 1rem;                 
  text-align: left;                      
}


tbody td {
  padding: 0.75rem 1rem;              
  border-bottom: 1px solid #e2e8f0;     
  font-size: 0.95rem;                  
  color: #334155;                         
}


tbody tr:hover,
tbody tr:focus-visible {
  background-color: #f1f5f9;           
  outline: none;                          
  cursor: pointer;                      
  transition: background-color 0.3s ease; 
}


.acciones button {
  margin-right: 0.5rem;                  
  padding: 0.25rem 0.6rem;               
  font-size: 0.85rem;                    
  border: none;                          
  border-radius: 6px;                   
  cursor: pointer;                       
  user-select: none;                    
  transition: background-color 0.3s ease, color 0.3s ease; 
}


.btn-ver {
  background-color: #3b82f6;            
  color: white;                          
}


.btn-ver:hover {
  background-color: #2563eb;
}


.btn-editar {
  background-color: #fbbf24;        
  color: #1e293b;    
}


.btn-editar:hover {
  background-color: #d97706;     
  color: white;              
}


.btn-borrar {
  background-color: #ef4444;       
  color: white;      
}


.btn-borrar:hover {
  background-color: #b91c1c;     
}


.error {
  color: #dc2626;                      
  margin-top: 1rem;                     
  font-weight: 700;                     
  font-size: 1rem;                      
  text-align: center;                   
}
</style>

<template>
  <div class="modal-overlay" @click.self="$emit('cerrarDetalle')">
    <div class="modal-content">
      <h2>Detalle de Transacción</h2>
      <p><strong>ID:</strong> {{ transaccion.id }}</p>
      <p><strong>Cliente:</strong> {{ transaccion.clienteId }}</p>
      <p><strong>Acción:</strong> {{ transaccion.action }}</p>
      <p><strong>Criptomoneda:</strong> {{ transaccion.cryptoCode }}</p>
      <p><strong>Cantidad:</strong> {{ transaccion.cryptoAmount }}</p>
      <p><strong>Monto:</strong> {{ transaccion.money }}</p>
      <p><strong>Fecha:</strong> {{ new Date(transaccion.fechaHora).toLocaleString() }}</p>
      <button @click="$emit('cerrarDetalle')">Cerrar</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TransaccionDetalle',
  props: {
    transaccion: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  backdrop-filter: blur(4px);
  animation: fadeInOverlay 0.3s ease forwards;
}

@keyframes fadeInOverlay {
  from { opacity: 0; }
  to { opacity: 1; }
}

.modal-content {
  background: #fff;
  padding: 2rem 2.5rem;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
  max-width: 420px;
  width: 90%;
  animation: slideInModal 0.35s cubic-bezier(0.4, 0, 0.2, 1) forwards;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: #1e293b;
  user-select: none;
}

@keyframes slideInModal {
  from {
    opacity: 0;
    transform: translateY(-30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.modal-content h2 {
  margin-bottom: 1rem;
  font-weight: 700;
  font-size: 1.5rem;
  color: #1e40af;
  user-select: none;
}

.modal-content p {
  margin: 0.4rem 0;
  font-size: 1rem;
  line-height: 1.4;
}

.modal-content strong {
  color: #334155;
}

.modal-content button {
  margin-top: 1.5rem;
  padding: 0.5rem 1.2rem;
  background-color: #2563eb;
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.modal-content button:hover {
  background-color: #1d4ed8;
}
</style>
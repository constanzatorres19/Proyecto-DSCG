// --- Datos de Simulación (Mock Data) ---

const mockRequests = [
    { id: 1, solicitante: 'Carlos Soto (Crew)', tipo: 'Turno', original: '10/12 Tarde', solicitado: '10/12 Mañana', estado: 'Pendiente' },
    { id: 2, solicitante: 'Ana Gómez (Entrenador)', tipo: 'Posición', original: 'Caja', solicitado: 'Cocina', estado: 'Pendiente' },
    { id: 3, solicitante: 'Felipe Díaz (Crew)', tipo: 'Turno', original: '12/12 Mañana', solicitado: '12/12 Libre', estado: 'Aprobado' }
];

// --- Funciones de Simulación ---

// Función para cargar las solicitudes en el Panel RR.HH.
function loadRequestsMock() {
    const tbody = document.getElementById('requests-body');
    if (!tbody) return;

    tbody.innerHTML = '';
    mockRequests.forEach(req => {
        let actions = '';
        if (req.estado === 'Pendiente' && req.tipo === 'Turno') {
            // RF07: Botones de Aprobación/Rechazo
            actions = `<button class="btn-approve" onclick="handleRequest(${req.id}, 'Aprobado')">Aprobar</button>
                       <button class="btn-reject" onclick="handleRequest(${req.id}, 'Rechazado')">Rechazar</button>`;
        } else if (req.estado !== 'Pendiente') {
             actions = req.estado;
        }

        const row = `<tr>
                        <td>${req.solicitante}</td>
                        <td>${req.original}</td>
                        <td>${req.solicitado}</td>
                        <td><span class="${req.estado.toLowerCase()}">${req.estado}</span></td>
                        <td>${actions}</td>
                     </tr>`;
        tbody.innerHTML += row;
    });
}

// Simulación de la acción de Aprobación/Rechazo (RF07)
function handleRequest(id, newStatus) {
    const req = mockRequests.find(r => r.id === id);
    if (req) {
        req.estado = newStatus;
        alert(`Solicitud #${id} ${newStatus}. ¡Notificación enviada al Crew! (RF25, RF21)`);
        loadRequestsMock(); // Recargar la tabla
    }
}﻿

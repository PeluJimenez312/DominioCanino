document.addEventListener("DOMContentLoaded", function () {
    let select = document.getElementById("jugadorSeleccionado");
    let saldo = document.getElementById("saldoJugador");

    let jugadoresGuardados = JSON.parse(localStorage.getItem("jugadores")) || [];
    let turnosGuardados = JSON.parse(localStorage.getItem("turnos")) || {};

    // Verificar si hay jugadores registrados en `localStorage`
    if (jugadoresGuardados.length === 0 || Object.keys(turnosGuardados).length === 0) {
        alert("No hay jugadores registrados. Regresa al juego principal para agregarlos.");
        window.location.href = "index.html";
        return;
    }

    // Agregar jugadores al selector
    jugadoresGuardados.forEach(jugador => {
        let option = document.createElement("option");
        option.value = jugador;
        option.innerText = jugador;
        select.appendChild(option);
    });

    // Mostrar saldo inicial del primer jugador
    select.addEventListener("change", () => actualizarSaldo(turnosGuardados));
    actualizarSaldo(turnosGuardados);
});

function actualizarSaldo(turnosGuardados) {
    let jugador = document.getElementById("jugadorSeleccionado").value;
    document.getElementById("saldoJugador").innerText = turnosGuardados[jugador] ? `$${turnosGuardados[jugador]}` : "$0";
}

// Función para modificar dinero
function modificarDinero(accion) {
    let jugador = document.getElementById("jugadorSeleccionado").value;
    let monto = parseInt(document.getElementById("monto").value);
    let turnosGuardados = JSON.parse(localStorage.getItem("turnos")) || {};

    if (!isNaN(monto) && monto > 0) {
        if (!turnosGuardados[jugador]) turnosGuardados[jugador] = 1500;

        if (accion === "aumentar") {
            turnosGuardados[jugador] += monto;
        } else if (accion === "disminuir" && turnosGuardados[jugador] >= monto) {
            turnosGuardados[jugador] -= monto;
        } else {
            alert("No puedes reducir más dinero del disponible.");
        }

        localStorage.setItem("turnos", JSON.stringify(turnosGuardados));
        actualizarSaldo(turnosGuardados);
    } else {
        alert("Ingresa un monto válido.");
    }
}

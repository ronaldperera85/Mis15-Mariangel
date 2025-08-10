document.addEventListener('DOMContentLoaded', () => {
    // --- ELEMENTOS DEL DOM ---
    
    // Obtenemos las referencias a cada bloque de tiempo una sola vez para ser más eficientes.
    const daysEl = document.getElementById('days');
    const hoursEl = document.getElementById('hours');
    const minutesEl = document.getElementById('minutes');
    const secondsEl = document.getElementById('seconds');
    const countdownContainer = document.getElementById('countdown');

    // --- FUNCIÓN PRINCIPAL DEL CONTADOR ---
    const updateCountdown = () => {
        // Fecha objetivo con la zona horaria de Venezuela (UTC-4) para que sea precisa.
        // Apunta a las 8:00 PM del 1 de Septiembre de 2025.
        const targetDate = new Date("2025-09-01T21:00:00-04:00").getTime();
        
        // Hora actual
        const now = new Date().getTime();
        
        // Distancia de tiempo entre ahora y la fecha objetivo
        const distance = targetDate - now;

        // Si la cuenta regresiva ha terminado
        if (distance < 0) {
            // Reemplazamos el contador con el mensaje final
            countdownContainer.innerHTML = "<div style='font-size: 1.5em; font-weight: bold; color: #0d3d6e; text-align: center; width: 100%;'>¡El gran día ha llegado!</div>";
            // Detenemos la actualización del contador para ahorrar recursos
            clearInterval(countdownInterval);
            return;
        }

        // --- CÁLCULOS DE TIEMPO ---
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // Función para añadir un cero a la izquierda (ej: 7 -> "07")
        const formatTime = (time) => time < 10 ? `0${time}` : time;

        // --- ACTUALIZAMOS LA PÁGINA ---
        // Asignamos cada valor a su respectivo bloque en el HTML
        daysEl.innerText = formatTime(days);
        hoursEl.innerText = formatTime(hours);
        minutesEl.innerText = formatTime(minutes);
        secondsEl.innerText = formatTime(seconds);
    };

    // --- INICIAMOS EL CONTADOR ---
    // Ejecutamos la función una vez de inmediato para que no haya un segundo de espera al cargar la página.
    updateCountdown();
    
    // Guardamos el ID del intervalo para poder detenerlo cuando la cuenta llegue a cero.
    const countdownInterval = setInterval(updateCountdown, 1000);
});
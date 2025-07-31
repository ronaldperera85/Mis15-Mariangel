// Archivo: music-player.js (Versión robusta para celulares)

document.addEventListener('DOMContentLoaded', () => {
    // --- ELEMENTOS DEL REPRODUCTOR ---
    const audio = document.getElementById('background-music');
    const playPauseBtn = document.getElementById('play-pause-btn');
    const playPauseIcon = document.getElementById('play-pause-icon');
    const progressBar = document.querySelector('.progress-bar');
    const progressContainer = document.querySelector('.progress-container');
    
    // Verificación para evitar errores
    if (!audio || !playPauseBtn || !playPauseIcon || !progressBar || !progressContainer) {
        console.error("Error: No se encontraron los elementos del reproductor de música en el HTML.");
        return;
    }

    const playIconSrc = 'images/play.png';
    const pauseIconSrc = 'images/pause.png';
    let isPlaying = false;

    // --- FUNCIÓN PRINCIPAL PARA CONTROLAR LA MÚSICA ---
    function togglePlayPause() {
        if (isPlaying) {
            audio.pause();
        } else {
            audio.play();
        }
    }
    
    // Cuando el audio empieza a sonar (por audio.play())
    audio.onplay = () => {
        isPlaying = true;
        playPauseIcon.src = pauseIconSrc;
    };
    
    // Cuando el audio se pausa (por audio.pause())
    audio.onpause = () => {
        isPlaying = false;
        playPauseIcon.src = playIconSrc;
    };

    // --- FUNCIONES PARA LA BARRA DE PROGRESO ---
    function updateProgress() {
        if (audio.duration) {
            const progressPercent = (audio.currentTime / audio.duration) * 100;
            progressBar.style.width = `${progressPercent}%`;
        }
    }

    function setProgress(e) {
        // Obtenemos el ancho del contenedor de la barra
        const width = this.clientWidth;
        // Obtenemos la posición X donde se hizo clic (o se tocó)
        const clickX = e.offsetX;
        
        if (audio.duration) {
            audio.currentTime = (clickX / width) * audio.duration;
        }
    }

    // --- ASIGNACIÓN DE EVENTOS ---
    // El único evento que controla play/pause es el clic en el botón
    playPauseBtn.addEventListener('click', togglePlayPause);
    
    // Eventos para la barra de progreso
    audio.addEventListener('timeupdate', updateProgress);
    progressContainer.addEventListener('click', setProgress);
});
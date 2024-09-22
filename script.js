document.getElementById('fileInput').addEventListener('change', function(event) {
    const file = event.target.files[0];  
    const fileInfo = document.getElementById('fileInfo');
    const videoPreview = document.getElementById('videoPreview');
    const controls = document.getElementById('controls');
    const validTypes = ['video/mp4', 'video/quicktime', 'video/x-msvideo', 'video/H264'];

    if (file && validTypes.includes(file.type)) {
        fileInfo.textContent = `Video seleccionado: ${file.name} (${file.type}), tamaño: ${file.size} bytes`;
        
        const videoURL = URL.createObjectURL(file);
        videoPreview.src = videoURL;
        videoPreview.style.display = 'block';
        controls.style.display = 'block';

        videoPreview.addEventListener('loadedmetadata', () => {
            const videoDetails = document.getElementById('videoDetails');
            videoDetails.textContent = `Duración: ${Math.round(videoPreview.duration)} segundos`;
        });
    } else {
        fileInfo.textContent = "Formato de archivo no permitido. Seleccione un archivo de video válido (MP4, MOV, AVI, H264).";
        videoPreview.style.display = 'none';
        controls.style.display = 'none';
    }
});

// Funcionalidades de los controles
const videoPreview = document.getElementById('videoPreview');

// Pausar o reproducir
document.getElementById('playPause').addEventListener('click', () => {
    if (videoPreview.paused) {
        videoPreview.play();
        document.getElementById('playPause').textContent = 'Pausar';
    } else {
        videoPreview.pause();
        document.getElementById('playPause').textContent = 'Reproducir';
    }
});

// Saltar hacia atrás
document.getElementById('skipBack').addEventListener('click', () => {
    videoPreview.currentTime = Math.max(0, videoPreview.currentTime - 10);
});

// Saltar hacia adelante
document.getElementById('skipForward').addEventListener('click', () => {
    videoPreview.currentTime = Math.min(videoPreview.duration, videoPreview.currentTime + 10);
});

// Cambiar velocidad de reproducción
document.getElementById('playbackRate').addEventListener('change', (event) => {
    videoPreview.playbackRate = event.target.value;
});

// Capturar miniatura del video
document.getElementById('captureThumbnail').addEventListener('click', () => {
    const canvas = document.getElementById('thumbnailCanvas');
    const context = canvas.getContext('2d');
    canvas.width = videoPreview.videoWidth;
    canvas.height = videoPreview.videoHeight;
    context.drawImage(videoPreview, 0, 0, canvas.width, canvas.height);
    canvas.style.display = 'block';
});

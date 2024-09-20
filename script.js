document.getElementById('fileInput').addEventListener('change', function(event) {
    const file = event.target.files[0];  // Obtenemos el primer archivo seleccionado
    const fileInfo = document.getElementById('fileInfo');
    const videoPreview = document.getElementById('videoPreview');

    if (file) {
        // Verificamos si el archivo es uno de los formatos permitidos
        const validTypes = ['video/mp4', 'video/quicktime', 'video/x-msvideo', 'video/H264'];
        if (validTypes.includes(file.type)) {
            fileInfo.textContent = `Video seleccionado: ${file.name} (${file.type}), tamaño: ${file.size} bytes`;

            // Mostramos el video seleccionado
            const videoURL = URL.createObjectURL(file);
            videoPreview.src = videoURL;
            videoPreview.style.display = 'block';
        } else {
            fileInfo.textContent = "Formato de archivo no permitido. Seleccione un archivo de video válido (MP4, MOV, AVI, H264).";
            videoPreview.style.display = 'none';
        }
    } else {
        fileInfo.textContent = "No se ha seleccionado ningún archivo.";
        videoPreview.style.display = 'none';
    }
});

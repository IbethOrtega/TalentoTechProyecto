let index = 0;

function cambiarImagen(n) {
    const imagenes = document.querySelectorAll('.carrusel-imagenes img');
    index += n;
    if (index >= imagenes.length) {
        index = 0;
    }
    if (index < 0) {
        index = imagenes.length - 1;
    }
    const desplazamiento = -index * 100; // Cambiar a porcentaje
    document.querySelector('.carrusel-imagenes').style.transform = `translateX(${desplazamiento}vw)`; // Usar vw para el desplazamiento
}

// Cambiar imagen automáticamente cada 3 segundos
setInterval(() => cambiarImagen(1), 5000);
// Guardar los datos ingresados en LocalStorage y mostrarlos en una alerta
document.getElementById('enviar').addEventListener('click', (e) => {
    e.preventDefault(); // Evita que se recargue la página

    const nombre = document.getElementById('nombre').value;
    const email = document.getElementById('email').value;
    const mensaje = document.getElementById('mensaje').value;

    if (!nombre || !email || !mensaje) {
        alert('Por favor, complete todos los campos.');
        return;
    }

    const datosFormulario = {
        nombre: nombre,
        email: email,
        mensaje: mensaje
    };

    // Guardar los datos en LocalStorage
    localStorage.setItem('datosFormulario', JSON.stringify(datosFormulario));
    alert('Datos guardados correctamente.');
});

// Evento para descargar los datos como archivo .txt
document.getElementById('descargarBtn').addEventListener('click', () => {
    const datosGuardados = localStorage.getItem('datosFormulario');
    if (!datosGuardados) {
        alert('No hay datos para descargar.');
        return;
    }

    const blob = new Blob([datosGuardados], { type: 'text/plain' });
    const enlaceDescarga = document.createElement('a');
    enlaceDescarga.href = URL.createObjectURL(blob);
    enlaceDescarga.download = 'datos_formulario.txt';
    enlaceDescarga.click();
});

const form = document.getElementById('registerForm');
form.addEventListener('submit', e => {
    e.preventDefault();
    const submitButton = document.querySelector('button[type="submit"]');
    submitButton.disabled = true;  // Deshabilitar el botón de envío
    const loadingIndicator = document.createElement('div'); // Crea un indicador de carga
    loadingIndicator.textContent = 'Cargando...';
    document.body.appendChild(loadingIndicator);

    const formData = new FormData(form);

    fetch('http://localhost:8080/api/products/register', {
        method: 'POST',
        body: formData,
    }).then(result => {
        submitButton.disabled = false;  // Habilitar nuevamente el botón
        loadingIndicator.remove(); // Remover indicador de carga
        if (result.ok) {
            result.json().then(json => {
                console.log("Producto Agregado!");
                //window.location.replace('http://127.0.0.1:5500/frontend/index.html');
            });
        } else {
            result.text().then(text => {
                console.log("No se pudo agregar el producto: " + text);
            });
        }
    }).catch(error => {
        console.error("Error de red:", error);
        submitButton.disabled = false;  // Re-habilitar el botón si hay un error
        loadingIndicator.remove(); // Remover indicador de carga
        alert("Error al cargar el producto, por favor intente de nuevo.");
    });
});

const form = document.getElementById('registerForm');

form.addEventListener('submit', e => {
    e.preventDefault();
    const data = new FormData(form);
    const images = document.getElementById('img').files;
    console.log(images)
    const obj = {};
    Array.from(images).forEach((image, index) => {
        data.img = image;
    });
    data.forEach((value, key) => obj[key] = value);
    console.log("Objeto formado:");
    console.log(obj);
    fetch('http://localhost:8080/api/products/register', {
        method: 'POST',
        body: JSON.stringify(obj),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(result => {
        if (result.status === 200) {
            result.json();
            alert("Producto Agregado!");
            window.location.replace('http://127.0.0.1:5500/frontend/index.html');
        } else {
            alert("No se pudo agregar el producto!");
        }
    }).then(
        json => console.log(json));
})
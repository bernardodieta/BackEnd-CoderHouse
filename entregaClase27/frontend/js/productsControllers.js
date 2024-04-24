document.addEventListener('DOMContentLoaded', () => {
    const divProducts = document.getElementsByClassName('products-container')[0];
    const pagination = document.getElementById('pagination');

    // Recuperar datos del usuario desde localStorage y parsearlos
    const userData = JSON.parse(localStorage.getItem('datos'));
    const userId = userData ? userData._id : null;
    console.log(response)
    const getProductList = async () => {
        try {
            const response = await fetch(`http://localhost:8080/api/products/`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include'
            });
           
            if (response.ok) {
                const data = await response.json();
                
                const products = data.payload.data;
                divProducts.innerHTML = '';
                products.forEach(product => {
                    const productElement = document.createElement('div');
                    productElement.className = 'product';
                    let imagesHTML = product.img.map(image => 
                        `<img src="http://localhost:8080/${image.path}" alt="Imagen de ${product.title}" style="width: 100px; height: auto;">`
                    ).join('');

                    productElement.innerHTML = `
                        <h2>${product.title}</h2>
                        <p>${product.shortdescription}</p>
                        <p>Descripción: ${product.description}</p>
                        <p>Stock: ${product.stock}</p>
                        ${imagesHTML}
                        <button data-id="${product._id}">Agregar al Carrito</button>
                    `;
                    divProducts.appendChild(productElement);
                });

                pagination.innerHTML = '';
                if (data.payload.hasPrevPage) {
                    pagination.innerHTML += `<a href="#" data-page="${data.payload.prevPage}">Página anterior</a>`;
                }
                if (data.payload.hasNextPage) {
                    pagination.innerHTML += `<a href="#" data-page="${data.payload.nextPage}">Página siguiente</a>`;
                }

            } else {
                divProducts.innerHTML = '<p>Error al obtener los productos.</p>';
            }
        } catch (error) {
            console.error('Error:', error);
            divProducts.innerHTML = `<p>Error al procesar la solicitud: ${error.message}</p>`;
        }
    };

    pagination.addEventListener('click', (e) => {
        if (e.target.tagName === 'A') {
            e.preventDefault();
            const page = e.target.getAttribute('data-page');
            getProductList(page);
        }
    });

    divProducts.addEventListener('click', (e) => {
        if (e.target.tagName === 'BUTTON') {
            const productId = e.target.getAttribute('data-id');
            addToCart(userId, productId, 1);  // Asumimos que la cantidad es siempre 1 por simplicidad
        }
    });

    const addToCart = async (userId, productId, quantity) => {
        if (!userId) {
            alert('No se ha identificado el usuario. Por favor, inicie sesión.');
            return;
        }

        try {
            const response = await fetch(`http://localhost:8080/api/cart/${userId}/add`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ productId, quantity }),
                credentials: 'include'
            });

            if (response.ok) {
                alert('Producto agregado al carrito exitosamente!');
            } else {
                const errMessage = await response.json();
                alert('No se pudo agregar el producto al carrito: ' + errMessage.message);
            }
        } catch (error) {
            alert('Error al agregar el producto al carrito.');
            console.error('Error:', error);
        }
    };

    getProductList();
});

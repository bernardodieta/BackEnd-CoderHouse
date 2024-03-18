document.addEventListener('DOMContentLoaded', () => {
    // Obtener todos los formularios de agregar al carrito
    const forms = document.querySelectorAll('[id^="addToCartForm_"]'); 

    // Iterar sobre cada formulario
    forms.forEach(form => {
        form.addEventListener('submit', async (event) => {
            event.preventDefault(); // Evitar el envío del formulario

            const formData = new FormData(form);
            const productId = formData.get('productId');       

            try {
                console.log(productId)
                const response = await fetch(`/api/cart/65f876cd9f4c7511685b10fd/products/${productId}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                if (!response.ok) {
                    throw new Error('Error al agregar al carrito');
                }          

            } catch (error) {
                console.error('Error:', error);
            }
        });
    });
});
Primera entrega de proyecto final CoderHouse Backend.

###EndPoints para PRODUCTOS

        GET /api/products
        Lista todos los productos

        GET /api/products/:pid
        Lista solo el producto con el pid indicado

        POST  /api/product
        Agrega un producto se debe usar la siguiente estructura:

            {
                "title": "Nuevo Producto Actualizado 2",
                "description": "Laptop gamer, de 16 pulgadas, integra un intel I7, pantalla tactil, SSD: 1TB",
                "code": "L54",
                "price": 3340,
                "status": false,
                "stock": 22380,
                "category": "lasdops",
                "thumbnail": "img123"       
            }

        PUT  /api/product (Este lo busca por medio del code del producto)
        Edita un producto,, se debe usar la siguiente estructura:

            {
                "title": "Nuevo Producto Actualizado 2",
                "description": "Laptop gamer, de 16 pulgadas, integra un intel I7, pantalla tactil, SSD: 1TB",
                "code": "L54",
                "price": 3340,
                "status": false,
                "stock": 22380,
                "category": "lasdops",
                "thumbnail": "img123"       
            }

        DELETE  /api/product/:pid
        Elimina el producto encontrado con el pid proporcionado.


###EndPoints para CARTS

GET  /api/carts
Lista todo los carritos

GET  /api/cart/:cid
Muestra solo el carrito con el cid proporcionado

POST  /api/carts/
Crea un carrito vacio, no hace falta pasarle ningun valor como params o body

POST  /api/carts/:cid/product/:pid
Agrega un producto al cid del carrito correspondiente, no se debe pasar ningun dato en el body solo el cid y el pid por params


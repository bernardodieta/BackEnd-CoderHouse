

ENDPOINTS PROBADOS:
### PARA USUARIOS
###### Register (te dejo un usuario por si no tenes ganas de escribir los datos)

http://localhost:8080/api/users/register

POR DEFECTO TODOS TIENEN EL ROL USER PERO SI EN EL OBJETO QUE ENVIAS INCLUYES "role":'admin' le asigna admin, si asignas uno distinto es bajo tu responsabilidad jajaja, no mentira esta pensado tambien si asignas uno diferente a admin o user te asigna un rol user por defecto
{
    "first_name": "Bernardo",
    "last_name": "Dieta",
    "age": 37,
    "email": "bdieta@gmail.com",
    "password": "123123"
}

###### Login
http://localhost:8080/api/users/login

Usando el mismo ususario que registraste en el endpoint anterior podes hacer login, se genera el token correctamente comprueba password hashada.
En este caso estoy devolviendo el valor del token en la respuesta junto con un el user porque los estoy ocupando provisoriamente en React.

###### GetUserById 
http://localhost:8080/api/users/

Agregando el id en la ruta te devuelve el usuario.

### GetProfile
http://localhost:8080/api/users/profile/
El id lo toma directo del req.user una vez estando logeado

### UserUpdate
http://localhost:8080/api/users/profile/edit/662c27e92845f4e43b13b3ec
El id lo toma directo del req.user una vez estando logeado y en el body le enviamos un objeto userUpdate que contiene los datos a actualizar, ejemplo:
{
    "userUpdate": {
        "first_name": "Bernardos",
        "last_name": "Dieta",        
        "email": "bernardodieta@gmail.com",
        "age": 39
    }
}

### PARA PRODUCTOS

###### Obtener todos los productos
http://localhost:8080/api/products
Aqui tengo configurado para que tenga paginacion incluida, asique si en la ruta le envias por ejemplo:

http://localhost:8080/api/products/?page=2 (para buscar una pagina)
http://localhost:8080/api/products/?category=electronic (para buscar por categoria)
http://localhost:8080/api/products/?stock = 123124  (para buscar por stock)


###### Obtener un producto por ID

http://localhost:8080/api/products/(id a buscar)


###### Registrar Producto

http://localhost:8080/api/products/register

objeto de ejemplo:
Esto esta armado para poder recibir hasta 4 imagenes desde el front de todas formas si no le envias las imagenes te permite guardar el producto
nada mas para fines de pruebas en postman, pero en mi front se las envio y funciona perfecto las mueve a la ruta que le digo y guarda la ruta 
con el nuevo nombre en la base de datos.

{
    "title": "Razer Teclado Tartarus Pro",    
    "description": "Domina cualquier juego con el Razer Teclado Tartarus Pro y su diseño ergonómico y teclas programables.",
    "stock": "51",
    "price": "5000", 
    "pcode": "TR1",(no puden haber dos iguales)
    "category": "electronic"    
}

### GetUserByCategory
http://localhost:8080/api/products?category=Laptops Gamers
le enviamos por query la categoria a filtrar

### AddToFavorite
http://localhost:8080/api/products/favoritos/662c27e92845f4e43b13b3ec/6629e6b66ab8a367293436cb
http://localhost:8080/api/products/favoritos/userId/ProductId

Le enviamos el userId y el productId por params, la utilizo para que el usuario pueda agregar a una seccion favoritos un producto.

### UpdateProduct
http://localhost:8080/api/products/edit/6629dfec6ab8a3672934369e
http://localhost:8080/api/products/edit/productId

Le envio el productId por params y por body lo que quiero actualizar
{
    "product": {
        "price": "2580"
    }
}



### PARA CART

###### PARA AGERGAR PRODCUCTOS AL CARRITO



http://localhost:8080/api/cart/add
El id lo toma directo del req.user una vez estando logeado
{
    "productId": "6622b07676d7173d20a2635a",
    "quantity": 4
}

y eso agrega ese producto y esa cantidad al carrito de ese ususario que pase en la url

###### PARA TRAER UN CARRITO DE UN USUARIO CON TODOS SUS PRODUCTOS LISTADOS

http://localhost:8080/api/cart/
El id lo toma directo del req.user una vez estando logeado

###### PARA BORRAR UN PRODUCTO O UNA CANTIDAD DE ESE PRODUCTO DEL CARRITO

http://localhost:8080/api/cart/USERID/PRODUCTID/QUANTITY
http://localhost:8080/api/cart/6622b07676d7173d20a2635a/2
El id lo toma directo del req.user una vez estando logeado

### PARA REALIZAR LA COMPRA

http://localhost:8080/api/cart/662c27e92845f4e43b13b3ec/purchase/
http://localhost:8080/api/cart/userId/purchase/

Al realizar la compra se envia un mail con los datos de la compra al correo de la cuenta registrada.

### BORRAR PRODUCTO COMPLETO
http://localhost:8080/api/cart/remove/662c27e92845f4e43b13b3ec/6629e24e6ab8a367293436b5
http://localhost:8080/api/cart/remove/userId/productId




###### ENDPOINTS PARA ORDERS

### GetAllOrderByUserId
http://localhost:8080/api/orders/662c27e92845f4e43b13b3ec
http://localhost:8080/api/orders/orderId

### ConfirmOrderDelivered
http://localhost:8080/api/orders/confirm/663195c2f990f0f473eda293
http://localhost:8080/api/orders/confirm/orderId
esta la uso para cambiar el estado de la compra, ejemplo si ya fue entregado o esta en proceso de envio.


### CancelOrderPurchase
http://localhost:8080/api/orders/cancel/663195c2f990f0f473eda293
http://localhost:8080/api/orders/cancel/orderId
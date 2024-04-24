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


### PARA CART

###### PARA AGERGAR PRODCUCTOS AL CARRITO

http://localhost:8080/api/cart/66213dc25b15cdaf1e8aae0e/add
aca lo que hago es a http://localhost:8080/api/cart/ le paso el id del usuario porque lo tengo para que cada usuario tenga su propio carrito, y luego la ruta /add para llamar a esa ruta.
ejemplo de uso 

http://localhost:8080/api/cart/66213dc25b15cdaf1e8aae0e/add

{
    "productId": "6622b07676d7173d20a2635a",
    "quantity": 4
}

y eso agrega ese producto y esa cantidad al carrito de ese ususario que pase en la url

###### PARA TRAER UN CARRITO DE UN USUARIO CON TODOS SUS PRODUCTOS LISTADOS

http://localhost:8080/api/cart/:id


###### PARA BORRAR UN PRODUCTO O UNA CANTIDAD DE ESE PRODUCTO DEL CARRITO

http://localhost:8080/api/cart/USERID/PRODUCTID/QUANTITY
http://localhost:8080/api/cart/66213dc25b15cdaf1e8aae0e/6622b07676d7173d20a2635a/2




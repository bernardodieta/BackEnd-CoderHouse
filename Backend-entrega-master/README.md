Tercera entrega de desafio CoderHouse

Endpoint disponibles:

//ENDPOINT
/addproduct
(recibe un objeto por post y lo guarda en el archivo json)
formato de objeto para agregar.(no es necesario agregar un id este se genera solo), de debe enviar el objeto como parte del body)

 ##{
    "title": "Product  post2",
    "description": "Descripcion modificada",
    "price": 100,
    "thumbnail": "http://website.com/product1.jpg",
    "code": "P354",
    "stock": 330,    
}

//ENDPOINT
/productslimit/
(recibe un numero por params y lo utiliza para mostrar esa determinada canidad de productos, si no recibe un parametro devuelve todos los productos por defecto.)

//ENDPOINT
/products/id
(recibe un id por parametro y muestra el producto que contenga el id buscado)

//ENDPOINT
/delproduct/id
(Recibe un id y borra el objeto que sea igual al id enviado)

//ENDPOINT
/updateproduct
(se le envia un objeto por post y lo guarda en el archivo json)
mediante la propiedad code del producto se identifica cual es y se actualiza con el nuevo objeto enviado.

Formado de objeto para actualizar
 {
    "title": "Product Update",
    "description": "Descripcion modificada",
    "price": 100,
    "thumbnail": "http://website.com/product1.jpg",
    "code": "P354",
    "stock": 330,    
}

export const generateProductErrorInfoESP = (products) => {
    return `Una o más propiedades fueron enviadas incompletas o no son válidas.
    Lista de propiedades requeridas:
        -> Title: type String, recibido: ${products.title}
        -> Price: type String, recibido: ${products.price}
        -> Stock: type String, recibido: ${products.stock}
        -> Image: type String, recibido: ${products.image}
`;
}
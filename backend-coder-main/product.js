class ProductManager {
    constructor() {
        this.products = [];
        this.currentId = 1;
    }

    addProduct(product) {
        const requiredFields = ['title', 'description', 'price', 'thumbnail', 'code', 'stock'];
        // Check if all required fields are present
        for (let field of requiredFields) {
            if (!(field in product)) {
                throw new Error(`Field ${field} is required`);
            }
        }

        const productExists = this.products.some(p => p.code === product.code);
        // Check if product with same code already exists
        if (productExists) {
            console.log('Product code already exits');
            return;
        }

        product.id = this.currentId++;
        this.products.push(product);
        console.log('Product added');
    }

    getProducts() {

        return console.log(this.products);
    }

    getProductById(id) {
        // Find product with given id
        const product = this.products.find(p => p.id === id);
        if (!product) {
            console.log('Product not found');
        }
        return console.log(`The requested id matches with: ${JSON.stringify(product)}`);
    }

}


let productManager = new ProductManager();

let product1 = {
    title: 'Product 1',
    description: 'This is product 1',
    price: 100,
    thumbnail: 'http://website.com/product1.jpg',
    code: 'P1',
    stock: 10
};


let product2 = {
    title: 'Product 2',
    description: 'This is product 2',
    price: 200,
    thumbnail: 'http://website.com/product2.jpg',
    code: 'P2',
    stock: 20
};


// In this product I am repating the code to show that it does not add it if one already exists with that code
let product3 = {
    title: 'Product 3',
    description: 'This is product 2',
    price: 200,
    thumbnail: 'http://website.com/product3.jpg',
    code: 'P2',
    stock: 20
};

productManager.addProduct(product1);
productManager.addProduct(product2);
productManager.addProduct(product3);

let products = productManager.getProducts();
let product = productManager.getProductById(2); 
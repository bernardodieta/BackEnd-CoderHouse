import { error } from 'console';
import fs from 'fs'

class CartManager {
    carts;
    cartsFilename;
    cartsDirName;
    filesystem;
    constructor() {
        this.carts = new Array()
        this.filesystem = fs;
        this.cartsDirName = './src/data/';
        this.cartsFilename = this.cartsDirName + '/cartData.json'
    }
    getCartsList = async () => {
        const result = await this.filesystem.promises.readFile(this.cartsFilename, 'utf-8')
        const parseList = JSON.parse(result)
        return { success: true, message: 'Lista' },parseList
    }

    createNewCart = async () => {
        function generateId() {
            return Math.random().toString(36).substring(2, 11);
        }
        const cart = { id: generateId(), products: [] };
        const parseList = await this.getCartsList()
        this.carts.push(...parseList, cart);
        try {
            const result = await this.filesystem.promises.writeFile(this.cartsFilename, JSON.stringify(this.carts, null, 2, '\t'))
            return { success: true, message: 'Carrito creado con exito', carts: this.carts }
        } catch (error) {
            return { success: false, message: 'Hubo un error al crear el carrito de compras' }
        }
    }

    addProductToCart = async (cid, pid) => {
        const parseList = await this.getCartsList();
        //console.log(cid)
        //console.log(parseList)
        const cart = parseList.find((c) => c.id === cid);

        if (!cart) {
            return { success: false, message: 'No se encuentra un carrito de compras para agregar productos' };
        }
        const productInCart = cart.products.find((p) => p.productId === pid);
        if (productInCart) {
            productInCart.quantity += 1;
        } else {
            cart.products.push({ productId: pid, quantity: 1 });
        }
        await this.filesystem.promises.writeFile(this.cartsFilename, JSON.stringify(parseList, null, 2, '\t'));
        return { success: true, message: 'Producto agregado al carrito', cart };
    }
    getCartById = async (cid) => {
        const parseList = await this.getCartsList()
        const result = parseList.find((p) => p.id === cid)
        return { success: true, message: 'Datos del producto solicitado:', result }
    }
}

export default CartManager
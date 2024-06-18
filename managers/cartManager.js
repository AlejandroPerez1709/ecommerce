import fs from 'fs';
import {v4 as uuid} from 'uuid';

let carts = [];
const path = './data/carts.json';


const getCarts = async () => {
    try {
        const cartsJson = await fs.promises.readFile(path, 'utf-8');
        carts = JSON.parse(cartsJson) || [];
        return carts;
    } catch (error) {
        console.log(error)
    }
}

const getCartsById = async (id) => {
    try {
        await getCarts();
        const cart = carts.find(item => item.id === id);
        return cart;

    } catch (error) {
        console.log(error)
    }
}

const createCart = async () => {
    try {
        await getCarts();

        const newCart = {
            id:uuid(),
            products: []
        };

        carts.push(newCart);
        await fs.promises.writeFile(path, JSON.stringify(carts));
        return newCart;
    } catch (error) {
        console.log(error)
    }
}

const addProductToCart = async (cid, pid) => {
    try {
        await getCarts();
        const cart = await getCartsById(cid);
        const existProduct = cart.products.find(el => el.product === pid);

        if(existProduct){
            existProduct.quantity += 1;
        }else{
            const product = {
                product: pid,
                quantity: 1
            }
            cart.products.push(product);
        }
        
        await fs.promises.writeFile(path, JSON.stringify(carts));
        return cart;

    } catch (error) {
        console.log(error)
    }
} 

export default {
    getCarts,
    createCart,
    getCartsById,
    addProductToCart
}

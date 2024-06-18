
import fs from 'fs';
import {v4 as uuid} from 'uuid'

const path = "./data/products.json"
let products = [];

// **** Get Products ****
const getProducts = async (limit) => {
    try {
        const fileJson = await fs.promises.readFile(path, 'utf-8');
        const parseFile = JSON.parse(fileJson);
        products = parseFile || [];

        if(limit && typeof limit === 'number') return products.slice(0, limit);

        return products

    } catch (error) {
        console.log(`${error}`)
    }
}

const getProductById = async (id) => {
    try {
        await getProducts();
        const product = products.find(product => product.id === id)
        return product;

    } catch (error) {
        console.log(`${error}`);
    }

}

const addProduct = async (product) => {
    try {
        await getProducts();
        const {title, description, price, thumbnail, code, stock, category} = product;
        const newProduct = {
            id: uuid(),
            title,
            description,
            price,
            thumbnail,
            code,
            stock,
            category,
            status:true
        }

        products.push(newProduct);
        await fs.promises.writeFile(path, JSON.stringify(products));
        return newProduct;

    } catch (error) {
        console.log(`${error}`);
    }
}

const updateProduct = async (id, productData) => {
    try {
        await getProducts();
        const index = products.findIndex(product => product.id === id);
        if(index === -1) return false
        products[index] = {
            ...products[index],
            ...productData
        }
        await fs.promises.writeFile(path, JSON.stringify(products));
        return products[index];
    } catch (error) {
        console.log(`${error}`)
    }
}

const deleteProduct = async (id) => {
    try {
        await getProducts();
        products = products.filter(product => product.id !== id);
        await fs.promises.writeFile(path, JSON.stringify(products));
        return products;
    } catch (error) {
        console.log(`${error}`)
    }
} 



export default {
    getProducts,
    addProduct,
    getProductById,
    updateProduct,
    deleteProduct
}













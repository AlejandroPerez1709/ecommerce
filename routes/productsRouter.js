import {Router} from 'express';
import productsManager from '../managers/productsManager.js';

const router = Router();

router.get('/products', async (req, res) => {
    const limit = parseInt(req.query.limit, 10);
    const products = await productsManager.getProducts(limit);
    res.send({message: 'success', payload: products});
})

router.get('/products/:pid', async (req, res) => {
    try {
        const {pid} = req.params;
        const product = await productsManager.getProductById(pid);
        if(!product) return res.status(404).json({status: 'error',message: 'Not Found'});
        res.status(202).json({status:'Success', payload: product});

    } catch (error) {
        console.log(`${error}`);
    }
})

router.post('/products', async (req, res) => {
    try {
        const body = req.body;
        const product = await productsManager.addProduct(body);
        res.status(201).json({message:"Success", payload: product})
        
    } catch (error) {
        console.log(`${error}`);
        res.status(500).json({status: 'error', message: 'Error del servidor'})
    }
})

router.put('/products/:pid', async (req, res) => {
    try {
        const {pid} = req.params;
        const body = req.body;
        const product = await productsManager.updateProduct(pid, body);

        if(!product) return res.status(404).json({status: 'Error', message:'Not Found' });

        res.status(200).json({message:'Success', payload: product});
    } catch (error) {
        res.status(500).json({status: 'error', message: 'Error del servidor'})
    }
})

router.delete('/products/:pid', async (req, res) => {
    try {
        const {pid} = req.params;
        const product = await productsManager.getProducts(pid);
        if(!product) return res.status(404).json({status:'error', message: 'Not Found'});
        await productsManager.deleteProduct(pid);
        res.status(200).json({status:'Success', message:'Producto eliminado con exito'});
        
    } catch (error) {
        res.status(500).json({status: 'error', message: 'Error del servidor'})
        
    }
})



export default router;
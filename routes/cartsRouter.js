import {Router} from 'express'
import cartManager from '../managers/cartManager.js';


const router = Router();

router.get('/carts/:cid', async (req, res) => {
    try {
        const {cid} = req.params;
        const cart = await cartManager.getCartsById(cid)
        if(!cart) return res.status(404).json({status:'Error', message: 'Cart Not Found'});
        res.status(201).json({status:'Success', payload: cart});

    } catch (error) {
        console.log(error)
        res.status(500).json({status:'error', message: 'Error interno de Servidor'});
    }
})

router.post('/carts', async (req, res) => {
    try {
        const cart = await cartManager.createCart();
        res.status(200).json({status:'Success', payload: cart})

    } catch (error) {
        console.log(error)
        res.status(500).json({status:'error', message:'Error del Servidor'})
    }
})

router.post('/carts/:cid/product/:pid', async (req, res) => {
    try {
        const {cid, pid} = req.params;
        const cart = await cartManager.addProductToCart(cid, pid)
        res.status(201).json({status:'Success', payload: cart});
        
    } catch (error) {
        console.log(error)
        res.status(500).json({status:'error', message:'Error del Servidor'})
    }   
})


export default router;




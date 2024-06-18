import express from 'express';
import productsRouter from './routes/productsRouter.js';
import cartsRouter from './routes/cartsRouter.js';

const app = express();
const PORT = 8080;

app.use(express.json());


app.use("/api", productsRouter)
app.use("/api", cartsRouter)


app.listen(PORT, () => {
    console.log(`Listen on Port ${PORT}`);
})


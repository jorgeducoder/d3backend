import express from "express";
import {ProductManager} from "./ProductManager.js";

const PM = new ProductManager("Productos.json");
const app = express();

app.use(express.urlencoded({extended: true}));




app.get("/", async (req, res) => {
    const {limit} = req.query;
    // Debe ir adentro del get porque utilizo products para el params, si carga uno solo es el que queda para el slice
    let products = await PM.getProduct();
    
    if (limit) {
       products = products.slice(0, limit);
       
    }
   
    res.send(products);
});  

app.get('/:id', async (req, res) => {
    
    let productId = req.params.id;
    // Convierto el tipo para que no haya problemas en ProductManager con el ===
    const products = await PM.getProductbyId(parseInt(productId));
    res.send({products});
});


const PORT = 8080;

app.listen(PORT, () => {
console.log(`Servidor activo en http://localhost:${PORT}`);
});



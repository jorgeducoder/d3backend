import express from "express";
import {ProductManager} from "./ProductManager.js";

const PM = new ProductManager("Productos.json");
const app = express();

app.use(express.urlencoded({extended: true}));

app.get("/", async (req, res) => {
    const {limit} = req.query;
    //const {idproduct} = req.params;

    let products = await PM.getProduct();
   
    if (limit) {
       products = products.slice(0, limit);
    }
    /*if (idproduct) {
        
        let products = products.find(products => products.id === idproduct);

         if (!products) {
            return res.send({
                error: "Usuario no encontrado"
                });
            }
    };*/
    
    res.send(products);
});  
const PORT = 8080;

app.listen(PORT, () => {
console.log(`Servidor activo en http://localhost:${PORT}`);
});



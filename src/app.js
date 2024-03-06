import express from "express";
import {ProductManager} from "./ProductManager.js";

const PM = new ProductManager("Productos.json");
const app = express();

app.use(express.urlencoded({extended: true}));

app.get("/", async (req, res) => {
    const {limit} = req.query;
    
    let users = await PM.getProduct();
   
    if (limit) {
       users = users.slice(0, limit);
    }
        
    res.send(users);
});  
const PORT = 8080;

app.listen(PORT, () => {
console.log(`Servidor activo en http://localhost:${PORT}`);
});



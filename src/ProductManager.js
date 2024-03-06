//const { error } = require("console");
//const fs = require("fs");
import error from "console";
import fs from "fs";


// lo exporto para usar import
export class ProductManager {
    #nextId
    constructor(archivo) {
        this.archivo = archivo;
        this.#nextId = 1
    }

    async addProduct(producto) {
        
        // variante a controlar que existan todos los campos

        const nuevoProducto = {
            
            id: this.#nextId++, 
            title: producto.title ?? "Sin titulo",
            description: producto.description ?? "Sin description",
            price: producto.price ?? "Sin price",
            thumbnail: producto.thumbnail ?? "Sin thumbnail",
            code: producto.code ?? "Sin code",
            stock: producto.stock ?? "Sin stock",
        };
        // Guardo en productos todos los existentes

        const productos = await this.getProduct();
        
        // Busco si el nuevo objeto tiene codigo ya existente

        if (productos.some(product => product.code === producto.code)) {
            console.error(`Error: code ${producto.code} ya existe.`);
            
        }else{
            productos.push(nuevoProducto);
            try {
                await fs.promises.writeFile(this.archivo, JSON.stringify(productos, null, "\t"));
    
                console.log("Producto agregdo correctamente!");
            } catch(e) {
                console.error("Error al agregar el producto\n", e);
            }
        }
    
    }

    async getProduct() {
        try {
            const productos = await fs.promises.readFile(this.archivo, "utf-8");
            
            return JSON.parse(productos);
        } catch (error) {
            console.error(error);
            
            return [];
        }
    }

    

    async updateProduct (id, producto){
        
        // En productos tengo el conjunto de objetos existentes

        const productos = await this.getProduct();
        
        // Busco la ID si existe.
        
        const buscoId = productos.findIndex(product => product.id === id);
        if (buscoId === -1) return console.error("ID no encontrado");

        // Hago un split del ID y el objeto con datos actualizados
        
        const productoActualizado = { ...productos[buscoId], ...producto,  };        
      // const productoActualizado = { id, ...producto,  };  
        // Lo sustituyo por el existente en formato objeto junto al resto de productos

        productos[buscoId] = productoActualizado;

      // Se genera un nuevo JSON con el objeto actualizado.
        
        await fs.promises.writeFile(this.archivo , JSON.stringify(productos , null , "\t"));
        console.log("Producto actualizado : " , productoActualizado);
    }
    async getProductbyId(id) {
         
         try{
         // Obtengo todos los productos
         const productos = await this.getProduct();
         // Busco en los productos el de igual ID con find para que me devuelva el array
        
        const producto = productos.find(product => product.id === id);
       
         console.log("Estoy con este find: ", producto)

        return producto ?  producto : console.error ("No se encontro el producto con ID: ", id)   

        } catch (error) {
            console.error ("Error al obtener producto por ID", error);
        }
      }
    
    async deleteProduct(id) {
        try{
            // Obtengo el producto a eliminar

            const producto = await this.getProductbyId(id);
            console.log("Estoy en delete y producto encontrado ", producto, id)
            if (producto) {
                //Obtengo todos los productos para eliminar el encontrado
                this.productos = await this.getProduct();
                // Con el filter lo elimino del objeto

                const productos = this.productos.filter(product => product.id != id)

                await fs.promises.writeFile(this.archivo, JSON.stringify(productos, null, "\t"));
                console.log("Producto eliminado")
            }else{
                 console.error("No se encontro el ID en Delete")
            }

          } catch (error) {
                console.error("Error al intentar borrar el ID: ", id)
          }
  
    }  
   
}
//Exporto la clase
//module.exports = ProductManager;
// Lo cambio por type module en json
export default ProductManager;
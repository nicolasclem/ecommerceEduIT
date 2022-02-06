
import ProductoModelMongo from './productosMongoDB.js';
import ProductoModelFile from './productosFILE.js';
import ProductosModelMEN from './productosMEM.js';



class ProductoModel {

    static get(tipo){
        switch(tipo){

            case "MEN" :
                console.log("--------PERSISTENCIA EN MEMORIA *****PRODUCTO-------");
                return new ProductosModelMEN()

            case "FILE" :
                console.log("--------PERSISTENCIA EN FILE- *****PRODUCTO------");
                return new ProductoModelFile()
            case "MONGO" :
                console.log("--------PERSISTENCIA EN MONGO-- *****PRODUCTO------");
                return new ProductoModelMongo()
            default :
                console.log("--------PERSISTENCIA DEFAULT--------");

                return {}


        }
            
    }
}

export default ProductoModel
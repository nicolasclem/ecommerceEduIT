
import CarritoModelMongo from './carritoMongoDB.js';
// import ProductoModelFile from './productosFILE.js';
// import ProductosModelMEN from './productosMEM.js';



class CarritoModel {

    static get(tipo){
        switch(tipo){

            // case "MEN" :
            //     console.log("--------PERSISTENCIA EN MEMORIA--------");
            //     return new ProductosModelMEN()

            // case "FILE" :
            //     console.log("--------PERSISTENCIA EN FILE-------");
            //     return new ProductoModelFile()
            case "MONGO" :
                console.log("--------PERSISTENCIA EN MONGO-**CARRITO-----");
                return new  CarritoModelMongo()
           default :
                console.log("--------PERSISTENCIA DEFAULT--**CARRITO------");

                return new  CarritoModelMongo()


        }
            
    }
}

export default CarritoModel
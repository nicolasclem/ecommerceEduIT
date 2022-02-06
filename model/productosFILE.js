import fs from 'fs'

class ProductoModelFile{

archivoDB = 'productos.dat'


getId = productos => {
    return productos.length? (productos[productos.length - 1].id + 1) : 1
}


async leerArchivoDB(){
    try{
    let productos=  JSON.parse(await fs.promises.readFile(this.archivoDB,'utf-8'))
    return productos
    }
    catch(error){
        console.log(error.message)
        let productos=[]
        return productos
    }
    
}

async guardarArichvoDB (productos){
    await fs.promises.writeFile(this.archivoDB,JSON.stringify(productos,null,'\t'))
}

/************ABM */
/*****Crear */
async createProducto (producto){

    let productos = await this.leerArchivoDB()

    producto.id= this.getId(productos)
    productos.push(producto)

    await this.fsguardarArichvoDB(productos)
    return producto
}
/****** leer todos */
async readProductos(){
    let productos= await this.leerArchivoDB()
    return productos
}
/*** leer uno */


async readProducto (id){
    let productos= await this.leerArchivoDB()
    let producto =productos.find(producto => producto.id ==id) || {}
    return producto

}

/******************actualizar */


async updateProducto (id, producto){
    let productos= await thisleerArchivoDB()
    producto.id=id
    let index = productos.findIndex(producto=>producto.id == id)
    productos.splice(index,1,producto)

    await this.guardarArichvoDB(productos)

    return producto
}


/*******Borrar */

async deleteProducto (id){
    let productos= await this.leerArchivoDB()
    let index =productos.findIndex(producto => producto.id == id)
    let producto =productos.splice(index,1)
    
    await this.guardarArichvoDB(productos)
    return producto
}
}

export default ProductoModelFile



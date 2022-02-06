

class ProductosModelMEN {

 productos =[]
 idProducto= 0


/************ABM */
/*****Crear */
async createProducto(producto) {
    producto.id= ++this.idProducto
    this.productos.push(producto)
    return producto
}
/****** leer todos */
async readProductos() {

    return  this.productos
}
/*** leer uno */


async readProducto (id) {
    let producto =this.productos.find(producto => producto.id ==id) || {}
    return producto
}

/******************actualizar */


async updateProducto (id, producto) {
    producto.id=id

    let index = this.productos.findIndex(producto=>producto.id == id)
    this.productos.splice(index,1,producto)

    return producto
}


/*******Borrar */

async deleteProducto(id){
    let index =this.productos.findIndex(producto => producto.id == id)
    let producto =this.productos.splice(index,1)

    return producto
}

}
export default ProductosModelMEN


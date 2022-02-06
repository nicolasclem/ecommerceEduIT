import express  from 'express'
import controller from '../controllers/productos.js'


const router = express.Router()






/*******GET ALL  y GET ONE*/



router.get('/:id?', controller. obtenerProductos)


/********POST */



router.post('/', controller.guardarProducto)

/*************PUT */


router.put('/:id', controller.actualizarProducto)

/***********DEL  */



router.delete('/:id', controller.borrarProducto)


export default router
import express  from 'express'
import controller from '../controllers/carrito.js'
//import controller from '../controllers/productos.js'


const router = express.Router()







/********POST */

router.post('/', controller.guardarCarrito)





export default router
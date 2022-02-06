import express from 'express'

import routerProductos from './router/productos.js'
import routerCarrito from './router/carrito.js'
import routerUpload from './router/upload.js'

import DB_Mongo from './model/DB_Mongo.js'


import config from './config.js'


DB_Mongo.conectarDB()


const app = express()


app.use(express.static('public'))
app.use(express.urlencoded({extended:true}))
app.use(express.json())




app.use('/api/productos', routerProductos)
app.use('/api/carrito', routerCarrito)
app.use('/upload',routerUpload)




const PORT = process.env.PORT ||config.PORT
const server = app.listen(PORT,()=>{ console.log(` Servidor corrriendo en ${PORT}`)})
server.on('error',error=>console.log(`error al conrrer app  ${error.message}`))
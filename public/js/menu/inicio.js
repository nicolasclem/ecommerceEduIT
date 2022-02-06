// /****************************************************
//  * 
//  * 
//  * constructor  article
//  * 
//  * 
//  * 
//  *********************************************************/


// function initInicio() {


//     const cardsProducts=[
//         new Card("../img/imgProductos/portada-91-aquaman.jpg","Aquaman","DC","1000"),
//         new Card("../img/imgProductos/portada-92-juez-dredd.jpg","Judge","DC","1001"),
//         new Card("../img/imgProductos/wolverine-1-honor.jpg","Wolverine","MARVEL","1002"),
//         new Card("../img/imgProductos/portada-93-hulk.jpg","Hulk","MARVEL","1002"),
//         new Card("../img/imgProductos/portada-94-machine-man.jpg","Machine Man","MARVEL","1002"),
//         new Card("../img/imgProductos/portada-95-x-men.jpg","X-men","MARVEL","1002"),
//         new Card("../img/imgProductos/portada-96-thor.jpg","Thor","DC","1002"),
//         new Card("../img/imgProductos/portada-97-daredevil.jpg","Daredevil","DC","1002"),
//         new Card("../img/imgProductos/portada-98-x-men.jpg","X-men","MARVEL","1002"),
//         new Card("../img/imgProductos/portada-99-los-vengadores.jpg","Vengadores","MARVEL","1002"),
//         new Card("../img/imgProductos/portada-100-los-cuatro-fantasticos.jpg","Fantastic Four","DC","1002"),
//         new Card("../img/imgProductos/portada-alan-moore-universo-dc-brian-bolland.jpg","Dc Universo","DC","1002"),
//         new Card("../img/imgProductos/spiderman50.jpg","Spider-Man","MARVEL","1002"),
//         new Card("../img/imgProductos/superman-75.jpg","Superman","DC","1002"),
//         new Card("../img/imgProductos/the-sandman-51.jpg","The Sandman","Independiente","1002"),
//         new Card("../img/imgProductos/Batman.jpg","Batman","DC","1002"),
//         new Card("../img/imgProductos/Persepolis.jpg","Persepolis","Independiente","1002"),
//         new Card("../img/imgProductos/300.jpg","300","Independiente","1002"),
//         new Card("../img/imgProductos/Akira.jpg","Akira","Independiente","1002"),
//         new Card("../img/imgProductos/Mortadelo.jpg","Mortadelo","Independiente","1002"),
//         new Card("../img/imgProductos/Snoopy.jpg","Snoopy","Independiente","1002"),
//         new Card("../img/imgProductos/superman01.jpg","Superman-01","DC","1002"),
//         new Card("../img/imgProductos/Transmetropolitan.jpg","Transmetropolitan","Independiente","1002"),
//         new Card("../img/imgProductos/Watchmen.jpg","Watchmen","Independiente","1002"),
//         new Card("../img/imgProductos/Maus.jpg","Maus","Independiente","1002"),
//         new Card("../img/imgProductos/ScottPilgrim.jpg","Scott-Pilgrim","Independiente","1002"),
//         new Card("../img/imgProductos/SupermanAllStar.jpg","Superman-AllStar","DC","1002"),
//         new Card("../img/imgProductos/Lamuerte-en-los-Ojos.jpg","Muerte en los Ojos","Independiente","1002"),
//         new Card("../img/imgProductos/HellBoy.jpg","HellBoy","DC","1002"),
//         new Card("../img/imgProductos/DylanDog.jpg","Dylan Dog","Independiente","1002")
//     ]
    

//     function Card(image,heading,category,price){
//     this.image = image
//     this.heading = heading
//     this.category = category
//     this.price = price

//     this.appendTo= (destino)=>{

//         function cardRender  () {
//             const xhr = new XMLHttpRequest
//             xhr.open('get', 'plantillas/card.hbs')
//             xhr.addEventListener('load', ()=>{
//                 if(xhr.status == 200){
//                     let plantillaHbs = xhr.response
        
                    
//                     var template = Handlebars.compile(plantillaHbs);
                
//                     let html = template({ cardsProducts})
//                     destino.innerHTML = html
                    
                    

//                 }
//             })
            
//             xhr.send()
//         }
//         cardRender()
//         }
//     }
    
    
//     const elemCardsContainer = document.querySelector('.cards-container')
    
//     for (card of cardsProducts){
//         card.appendTo(elemCardsContainer)
//     }

/***********************************************************************************------------- */

async function renderPlantillaListado(listado) {

    let plantillaHbs = await fetch('plantillas/card.hbs').then(r => r.text())
    var template = Handlebars.compile(plantillaHbs);
 
      //Helpers
      Handlebars.registerHelper('ifeq', function (a, b, options) {
        if (a == b) return options.fn(this)
    
    });
    let html = template({ listado })
    document.getElementsByClassName('cards-container')[0].innerHTML = html  
}

function agregarCarrito(e,id,ref) {
    e.preventDefault()
    
    let producto = productoController.productos.find( producto => producto.id == id )
    carritoController.agregarAlCarrito(producto)    
}

async function initInicio() {
    console.warn('initInicio()')
    
    var productos = await productoController.obtenerProductos()
    await renderPlantillaListado(productos)

    document.querySelector('.section-cards__header p').innerHTML = `Se encontraron ${productos.length} productos`
}

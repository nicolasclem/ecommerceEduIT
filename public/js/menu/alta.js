class FormularioAlta {
    inputsAlta = null
    textAreaAlta = null
    selectAlta = null
    btnAlta=null
    form=null
    camposValidos=[false,false,false,false]


        imgSubida = '' //drag & drop
        dropArea=null//drag & drop
        progressBar=null//drag & Drop

    constructor(renderTablaAlta, guardarProducto) {

        this.inputsAlta = document.querySelectorAll( 'form div  input')

        this.textAreaAlta = document.querySelector('form textarea')

        this.selectAlta = document.querySelector('form select')

        this.btnAlta = document.querySelector('.btn-alta__products')

        this.form = document.querySelector('.form-alta');

        //this.btnAlta.visibility  ="hidden";

        this.inputsAlta.forEach((input,index) => {
            if(input.type != 'checkbox') {
                input.addEventListener('input', () => {
                    this.validar(input.value, /^.+$/,index)
                    if(renderTablaAlta) renderTablaAlta( !this.algunCampoNoValido(), productoController.productos )
                })
            }
        })

        this.form.addEventListener('submit', e => {
            e.preventDefault()
    
            let producto = this.leerProductoIngresado()
            this.limpiarFormulario()

            if(guardarProducto) guardarProducto(producto)
        })

        /******************
         * 
         * DRAG  & DROP
         * *************
         */
        this.dropArea= document.getElementById('drop-area')
        this.progressBar= document.getElementById('progress-bar')
        /****cancelo el evento  automatico de drag & drop */
        ;['dragenter','dragover','dragleave','drop'].forEach(eventName =>{

            this.dropArea.addEventListener(eventName, e => e.preventDefault())
            document.body.addEventListener(eventName, e => e.preventDefault())
        })

        /**** remarco zona drag & drop imagen dentro de area*/
        ;['dragenter','dragover'].forEach(eventName =>{

            this.dropArea.addEventListener(eventName,()=> {
                this.dropArea.classList.add('destacar')
            })
        })

        /****desmarcar  zona drag  & drop cuando  saco la imagen */
        ;['dragleave','drop'].forEach(eventName =>{

            this.dropArea.addEventListener(eventName,()=>{
                this.dropArea.classList.remove('destacar')
            })
        })

        this.dropArea.addEventListener('drop', e => {
            var dt = e.dataTransfer
            var files = dt.files

            this.handleFiles(files)
        })
    }

    setCustomValidityJS=(msj ,index)=>{

        const divErr=document.querySelectorAll('.form-alta__msjerror')
        divErr[index].innerHTML = msj
        divErr[index].style.display = msj? 'block' : 'none'
        
    }
    algunCampoNoValido(){
        let valido=
            this.camposValidos[0] &&
            this.camposValidos[1] &&
            this.camposValidos[2] &&
            this.camposValidos[3]
        return !valido
    }

    validar(valor, validador, index) {
    
        if(!validador.test(valor)){
            this.setCustomValidityJS('campo no valido',index)
            this.camposValidos[index]= false
            //this.btnAlta.disabled=true
            return null
        }
    
        this.camposValidos[index]=true
        
        if(!this.algunCampoNoValido()){
            this.btnAlta.style.visibility="visible"
        }
    
        this.setCustomValidityJS('',index)
        return valor
    }

    leerProductoIngresado() {
        return {
            name_products:this.inputsAlta[0].value,
            brand_products:this.inputsAlta[1].value,
            precio_products:this.inputsAlta[2].value,
            stock_products:this.inputsAlta[3].value,
            description_products:this.textAreaAlta.value,
            //category:this.selectAlta.value,
            foto:this.imgSubida ? `/uploads/${this.imgSubida}`:`/uploads/Imagen-no-disponible.png`,
            envio:this.inputsAlta[5].checked
        }
    }

    limpiarFormulario() {
        this.inputsAlta.forEach(e =>e.value='')
        this.inputsAlta[5].checked=false
        this.textAreaAlta.value=''
        //this.selectAlta.value=''

        
        this.btnAlta.style.visibility="hidden"
        //this.btnAlta.disabled  =true
        this.camposValidos=[false,false,false,false]

        let img = document.querySelector('#gallery img')
        img.src = ""
    
        this.initProgress()

        this.imgSubida=''
        
    }
    
    /***************DRAG & DROP */

    initProgress(){
        this.progressBar.value = 0
    }


    updateProgress(progreso){

        this.progressBar.value =progreso

    }



    previewFile(file){
        let reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onloadend = function (){
            let img = document.querySelector('#gallery img')
            img.src = reader.result
        }
    }
    handleFiles = files =>{

        let file  =files[0]
        this.initProgress()
        this.uploadFile(file)
        this.previewFile(file)

    }




    uploadFile = file =>{
        var url = '/upload'

        var xhr = new XMLHttpRequest()
        var formdata = new FormData()

        xhr.open('POST',url)

        xhr.upload.addEventListener('progress', e=>{
            let porcentaje = (((e.loaded * 100) / e.total) || 100)
            this.updateProgress(porcentaje)

        })

        xhr.addEventListener('load',()=>{
            if(xhr.status == 200){
                this.imgSubida = JSON.parse(xhr.response).nombre
            }
        })

        formdata.append('foto', file)
        xhr.send(formdata)

    }
}
async function renderDetalle(producto){
    var  elemDetalle= document.querySelector('.producto-detalle__container') 
    var  elmePadreDetalle = document.querySelector('.producto-detalle')
    
    let plantillaHbs =await fetch('plantillas/detalle.hbs').then(r=>r.text())
    var template =Handlebars.compile(plantillaHbs);

    let html = template({producto})
    elemDetalle.innerHTML= html
    elmePadreDetalle.classList.add('producto-detalle--visible')
}


    async function renderTablaAlta(validos, productos) {
        let plantillaHbs = await fetch('plantillas/productos.hbs').then(r => r.text())
        // const xhr = new XMLHttpRequest
        // xhr.open('get','plantillas/productos.hbs')
        // xhr.addEventListener('load', () => {
        //     if(xhr.status == 200) {
        //         let plantillaHbs = xhr.response
        var template = Handlebars.compile(plantillaHbs);

                 //Helpers
                Handlebars.registerHelper('ifeq', function (a, b, options) {
                    if (a == b) return options.fn(this)
                
                });
    
                let html = template({ productos, validos })
                document.querySelector('#productos-creados-tres').innerHTML = html            
            }
    //     })
    //     xhr.send()
    // }


/* ------------------------------------------------------------ */
/*      Inicializaciones para el funcionamiento del módulo      */
/* ------------------------------------------------------------ */
let formularioAlta = null
let mostrarDetalle= false

async function detalle(id){
  
    console.log( await productoController.prueba(id))
    var  elmePadreDetalle = document.querySelector('.producto-detalle') 
    mostrarDetalle = !mostrarDetalle
        if(mostrarDetalle) {
            let producto=await  productoController.prueba(id)
           renderDetalle( producto)
        }
        else {
            elmePadreDetalle.classList.remove('producto-detalle--visible')
        }
}

async function initAlta() {
    console.warn('initAlta()')

    formularioAlta = new FormularioAlta(renderTablaAlta, productoController.guardarProducto)

    let productos = await productoController.obtenerProductos()
    renderTablaAlta(null, productos)
    
}









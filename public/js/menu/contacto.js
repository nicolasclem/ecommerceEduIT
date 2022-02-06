/********************************************

            Validar  formularios 

********************************************/
function initContacto() {

const nameContacto =document.querySelector(".form-contacto__name") 
const emailContacto=document.querySelector('.form-contacto__email') 
const descriptionContacto=document.querySelector('.form-contacto__descripcion') 





const validadorEmail =/^\w+@\w+\.\w{2,3}(\.(ar|uy))?$/
const validadorName =/^[a-zA-Z]{2,20}(\s[a-zA-z]{2,20})?(\s[a-zA-z]{2,20})?$/
const validadorDescription =/^[A-Za-z0-9.\s("!@#$()=áéíóúñ)?]{5,1000}$/


const setCustomValidityJS =  mensaje => { 

    document.querySelector('.msjValidadorEmail').innerText = mensaje
    document.querySelector('.msjValidadorEmail').style.visibility = mensaje ? 'visible' : 'hidden'

}

const setCustomValidityJSName =  mensaje => { 

    document.querySelector('.msjValidadorName').innerText = mensaje
    document.querySelector('.msjValidadorName').style.visibility = mensaje ? 'visible' : 'hidden'

}
const setCustomValidityJSDescrip =  mensaje => { 

    document.querySelector('.msjValidadorDescrip').innerText = mensaje
    document.querySelector('.msjValidadorDescrip').style.visibility = mensaje ? 'visible' : 'hidden'

}

const validarEmailRegex =(valor)=>{
    
    if(!validadorEmail.test(valor)){

        // console.log("estoy mal");
        document.querySelector('.barra-email').style.backgroundColor='red'
        let msj="*Campo No valido tunombre@example.com/.com.ar"
        setCustomValidityJS(msj)
        return null
    } 
    // console.log("estoy bien");
        setCustomValidityJS('')
        document.querySelector('.barra-email').style.backgroundColor='limegreen'
        return valor
}

const validarNameRegex =(valor)=>{
    
    if(!validadorName.test(valor)){

        // console.log("estoy mal");
        document.querySelector('.barra-name').style.backgroundColor='red'
        let msj="*Campo No valido Solo letras y hasta 3 palabras"
        setCustomValidityJSName(msj)
        return null
    } 
    // console.log("estoy bien");
        setCustomValidityJSName('')
        document.querySelector('.barra-name').style.backgroundColor='limegreen'
        return valor
}

const validarDescripRegex =(valor)=>{
    
    if(!validadorDescription.test(valor)){

        // console.log("estoy mal");
        document.querySelector('.barra-description').style.backgroundColor='red'
        let msj="*Campo No valido "
        setCustomValidityJSDescrip(msj)
        return null
    } 
    // console.log("estoy bien");
        setCustomValidityJSDescrip('')
        document.querySelector('.barra-description').style.backgroundColor='limegreen'
        return valor
}


nameContacto.addEventListener('input', () => {
    
    validarNameRegex(nameContacto.value)
})

emailContacto.addEventListener('input', () => {
    validarEmailRegex(emailContacto.value)
})

descriptionContacto.addEventListener('input',()=>{
    
    validarDescripRegex(descriptionContacto.value)
})

document.querySelector('form').addEventListener('submit', e => {
    e.preventDefault()

    let valorDescrip=validarDescripRegex(descriptionContacto.value)
    let valorName = validarNameRegex(nameContacto.value)
    let valorEmail = validarEmailRegex(emailContacto.value)
    if(valorEmail && valorName && valorDescrip) {
        console.log(`Submit!estos datos se enviaran : [${valorEmail}], [${valorName}], [${valorDescrip}]`)
    }
})


$( "#faqs" ).tabs();


}
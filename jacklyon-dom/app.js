const formulario = document.getElementById('form');
const checkbox = document.getElementById('activador')

checkbox.addEventListener('change', e =>{
    let status = e.target.checked
    if (status) {
        console.log("Su solicitud aceptada")
    } else {
        console.log("Active la Solicitud")
    }
})
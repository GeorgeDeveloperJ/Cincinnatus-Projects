const entrada = document.getElementById('input')
function evento(e) {
    console.log("Presionaste la tecla " + e.key)
}
const evento_anonimo = (e) => {console.log(e)} //Anonymous function for getting events

entrada.addEventListener('keydown', evento)
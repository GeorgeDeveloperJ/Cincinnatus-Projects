const button = document.getElementById('box')
function evento() {
    if (button.onclick) {alert("Enviado!!")}
    if (button.oncontextmenu) {alert("Info Descriptiva")}
    if (button.ondblclick) {alert("Doble Click")}
    if (button.onmousedown) {alert("Button del mouse")}
    if (button.onmouseenter) {alert("Estas en el button")}
    if (button.onmouseleave) {alert("Saliste del button")}
    if (button.onmousemove) {alert("Mouse en movimiento")}
    if (button.onmouseup) {alert("Dejaste de arrastrar el mouse")}
}
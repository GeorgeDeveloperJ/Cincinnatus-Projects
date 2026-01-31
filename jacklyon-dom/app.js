const formulario = document.getElementById('form');

formulario.addEventListener('submit', function(e){
    e.preventDefault();
    let mail = document.getElementById('email-form').value;
    console.log(mail);
});
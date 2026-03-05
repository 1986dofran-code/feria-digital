// MOSTRAR U OCULTAR INFORMACIÓN
function verMas(id){

const elemento = document.getElementById(id);

if(elemento.style.display === "block"){
elemento.style.display = "none";
console.log("Información oculta");
}else{
elemento.style.display = "block";
console.log("Información mostrada");
}

}


// VALIDACIÓN FORMULARIO
document.getElementById("formulario")
.addEventListener("submit", function(e){

e.preventDefault();

let nombre = document.getElementById("nombre").value.trim();
let celular = document.getElementById("celular").value.trim();
let mensaje = document.getElementById("mensaje").value.trim();
let respuesta = document.getElementById("respuesta");

console.log("Evento enviar ejecutado");

if(nombre === ""){
respuesta.textContent="El nombre es obligatorio";
console.log("Error: nombre vacío");
return;
}

if(!/^\d{10}$/.test(celular)){
respuesta.textContent="El celular debe tener 10 dígitos";
console.log("Error: celular incorrecto");
return;
}

if(mensaje.length < 10){
respuesta.textContent="Mensaje mínimo 10 caracteres";
console.log("Error: mensaje corto");
return;
}

respuesta.textContent="Mensaje enviado correctamente ✅";
console.log("Validación exitosa");

});
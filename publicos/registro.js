const enviar_registro= async(e)=>{
    e.preventDefault()
    let usuario = document.querySelector("#usuario").value
    let correo = document.querySelector("#correo").value
    let contra = document.querySelector("#contra").value
    let rep_contra = document.querySelector("#rep_contra").value
    let datos ={
        usuario,
        correo,
        contra,
        rep_contra
    }
    await fetch('/registro', {
        method: 'POST', // El método de la solicitud (puede ser 'POST', 'PUT', etc.)
        headers: {
            'Content-Type': 'application/json' // Asegúrate de que el servidor esté esperando JSON
        },
        body: JSON.stringify(datos) // Convierte los datos en un string JSON
    })
    .then(respuesta => respuesta.json())
    .then(data =>  window.location.href= data.redirect)
}
document.getElementById('formRegistro').addEventListener('submit', enviar_registro);
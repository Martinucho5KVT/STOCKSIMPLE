const enviar_login= async(e)=>{
    e.preventDefault()
    let usuario = document.querySelector("#usuario").value
    let contra = document.querySelector("#contra").value
  
    let datos ={
        usuario,
        contra,
    }
    await fetch('/login', {
        method: 'POST', // El método de la solicitud (puede ser 'POST', 'PUT', etc.)
        headers: {
            'Content-Type': 'application/json' // Asegúrate de que el servidor esté esperando JSON
        },
        body: JSON.stringify(datos) // Convierte los datos en un string JSON
    })
    .then(respuesta => respuesta.json())
    .then(data =>  window.location.href= data.redirect)
}
document.getElementById('formLogin').addEventListener('submit', enviar_login);
const enviar_registro = async (e) => {
    e.preventDefault();
    let usuario = document.querySelector("#usuario").value;
    let correo = document.querySelector("#correo").value;
    let contra = document.querySelector("#contra").value;
    let rep_contra = document.querySelector("#rep_contra").value;

    const respuesta = await fetch('/registro', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ usuario, correo, contra, rep_contra })
    });

    const data = await respuesta.json();
    if (data.status === "ok") {
        window.location.href = data.redirect;
    } else {
        alert(data.error);
    }
};
document.getElementById('formRegistro').addEventListener('submit', enviar_registro);
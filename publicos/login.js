const enviar_login = async (e) => {
    e.preventDefault();
    let usuario = document.querySelector("#usuario").value;
    let contra = document.querySelector("#contra").value;

    const respuesta = await fetch('/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ usuario, contra })
    });

    const data = await respuesta.json();
    if (data.status === "ok") {
        window.location.href = data.redirect;
    } else {
        alert(data.error);
    }
};
document.getElementById('formLogin').addEventListener('submit', enviar_login);
const inicio= document.getElementById("start");

inicio.addEventListener("click", function() {
    const usuario = document.querySelector("#usuario").value.trim();
    const contrasena = document.querySelector("#contrasena").value.trim();

    if (usuario.length < 1 || contrasena.length < 1) {
        alert("Debe ingresar al menos un carácter en Usuario y Contraseña.");
        return;
    }

    // Si pasa la validación, redirige al dashboard
    window.location.href = "dashboard.html";
});



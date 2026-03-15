// datos iniciales
const clientesIniciales = [
    { nombre: "Juan",  apellido: "Perez", direccion: "calle 123 #45-67", email: "juanperez@gmail.com", telefono: "3108538117" },
    { nombre: "Maria", apellido: "Gomez", direccion: "centro casa1",      email: "marigo@gmail.com",    telefono: "3526846798" }
];

if (!localStorage.getItem("listaClientes")) {
    localStorage.setItem("listaClientes", JSON.stringify(clientesIniciales));
}

let indiceEditando = null;

// ─── TABLA ────────────────────────────────────────────────────────────────────

function cargarTabla() {
    const tbody = document.getElementById("cuerpoTabla");
    const clientes = JSON.parse(localStorage.getItem("listaClientes")) || [];

    tbody.innerHTML = "";

    clientes.forEach(function(c, i) {
        const tr = document.createElement("tr");
        tr.innerHTML =
            "<td>" + c.nombre    + "</td>" +
            "<td>" + c.apellido  + "</td>" +
            "<td>" + c.direccion + "</td>" +
            "<td>" + c.email     + "</td>" +
            "<td>" + c.telefono  + "</td>" +
            '<td><div class="acciones">' +
                '<button class="editar"   onclick="abrirEditar('    + i + ')">Editar</button>'   +
                '<button class="eliminar" onclick="eliminarCliente(' + i + ')">Eliminar</button>' +
                '<button class="ver"      onclick="verCliente('      + i + ')">Ver</button>'      +
            "</div></td>";
        tbody.appendChild(tr);
    });
}

// ─── MODAL ────────────────────────────────────────────────────────────────────

function abrirModal() {
    document.getElementById("myModal").style.display = "block";
}

function cerrarModal() {
    document.getElementById("myModal").style.display = "none";
}

// evitar que el click dentro del modal-content se propague al openModal
document.querySelector(".modal-content").addEventListener("click", function(event) {
    event.stopPropagation();
});

// ─── MODAL AGREGAR ────────────────────────────────────────────────────────────

document.getElementById("openModal").onclick = function() {
    indiceEditando = null;

    document.getElementById("nombre").value    = "";
    document.getElementById("apellido").value  = "";
    document.getElementById("direccion").value = "";
    document.getElementById("email").value     = "";
    document.getElementById("telefono").value  = "";

    document.getElementById("modalTitulo").textContent = "Agregar Cliente";
    document.getElementById("btnSubmit").textContent   = "Guardar Cliente";

    abrirModal();
};

document.getElementById("closeModal").onclick = function() {
    cerrarModal();
};

window.onclick = function(event) {
    if (event.target == document.getElementById("myModal")) {
        cerrarModal();
    }
};

// ─── MODAL EDITAR ─────────────────────────────────────────────────────────────

function abrirEditar(i) {
    const clientes = JSON.parse(localStorage.getItem("listaClientes")) || [];
    const c = clientes[i];

    document.getElementById("nombre").value    = c.nombre;
    document.getElementById("apellido").value  = c.apellido;
    document.getElementById("direccion").value = c.direccion;
    document.getElementById("email").value     = c.email;
    document.getElementById("telefono").value  = c.telefono;

    document.getElementById("modalTitulo").textContent = "Editar Cliente";
    document.getElementById("btnSubmit").textContent   = "Actualizar Cliente";

    indiceEditando = i;

    abrirModal();
}

// ─── SUBMIT ───────────────────────────────────────────────────────────────────

document.getElementById("clienteForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const clientes = JSON.parse(localStorage.getItem("listaClientes")) || [];

    const cliente = {
        nombre:    document.getElementById("nombre").value.trim(),
        apellido:  document.getElementById("apellido").value.trim(),
        direccion: document.getElementById("direccion").value.trim(),
        email:     document.getElementById("email").value.trim(),
        telefono:  document.getElementById("telefono").value.trim()
    };

    if (indiceEditando !== null) {
        clientes[indiceEditando] = cliente;
    } else {
        clientes.push(cliente);
    }

    localStorage.setItem("listaClientes", JSON.stringify(clientes));
    cerrarModal();
    cargarTabla();
});

// ─── ELIMINAR ─────────────────────────────────────────────────────────────────

function eliminarCliente(i) {
    const confirmDelete = confirm("¿Está seguro de eliminar este cliente?");

    if (confirmDelete) {
        const clientes = JSON.parse(localStorage.getItem("listaClientes")) || [];
        clientes.splice(i, 1);
        localStorage.setItem("listaClientes", JSON.stringify(clientes));
        cargarTabla();
    }
}

// ─── VER ──────────────────────────────────────────────────────────────────────

function verCliente(i) {
    const clientes = JSON.parse(localStorage.getItem("listaClientes")) || [];
    const c = clientes[i];

    alert(
        "Cliente:\n\n" +
        "Nombre: "    + c.nombre    + " " + c.apellido + "\n" +
        "Direccion: " + c.direccion + "\n" +
        "Email: "     + c.email     + "\n" +
        "Telefono: "  + c.telefono
    );
}

// ─── BUSCAR ───────────────────────────────────────────────────────────────────

document.querySelector(".to-search input").addEventListener("input", function() {
    const q = this.value.toLowerCase();
    const rows = document.getElementById("cuerpoTabla").querySelectorAll("tr");

    rows.forEach(function(row) {
        row.style.display = row.textContent.toLowerCase().includes(q) ? "" : "none";
    });
});

// ─── INICIO ───────────────────────────────────────────────────────────────────

cargarTabla();
// datos iniciales
const proveedoresIniciales = [
    { nombre: "Alberto",  apellido: "Muñoz", direccion: "Calle 5ta-Cra 9na", email: "albermu@gmail.com", telefono: "310427095"  },
    { nombre: "Cristian", apellido: "Salas", direccion: "Calla 30-Cra 10",   email: "crisa@gmail.com",   telefono: "1057157521" }
];

if (!localStorage.getItem("listaProveedores")) {
    localStorage.setItem("listaProveedores", JSON.stringify(proveedoresIniciales));
}

let indiceEditando = null;

// ─── TABLA ────────────────────────────────────────────────────────────────────

function cargarTabla() {
    const tbody = document.getElementById("cuerpoTabla");
    const proveedores = JSON.parse(localStorage.getItem("listaProveedores")) || [];

    tbody.innerHTML = "";

    proveedores.forEach(function(p, i) {
        const tr = document.createElement("tr");
        tr.innerHTML =
            "<td>" + p.nombre    + "</td>" +
            "<td>" + p.apellido  + "</td>" +
            "<td>" + p.direccion + "</td>" +
            "<td>" + p.email     + "</td>" +
            "<td>" + p.telefono  + "</td>" +
            '<td><div class="acciones">' +
                '<button class="editar"   onclick="abrirEditar('     + i + ')">Editar</button>'    +
                '<button class="eliminar" onclick="eliminarProveedor(' + i + ')">Eliminar</button>' +
                '<button class="ver"      onclick="verProveedor('      + i + ')">Ver</button>'      +
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

    document.getElementById("modalTitulo").textContent = "Agregar Proveedor";
    document.getElementById("btnSubmit").textContent   = "Guardar Proveedor";

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
    const proveedores = JSON.parse(localStorage.getItem("listaProveedores")) || [];
    const p = proveedores[i];

    document.getElementById("nombre").value    = p.nombre;
    document.getElementById("apellido").value  = p.apellido;
    document.getElementById("direccion").value = p.direccion;
    document.getElementById("email").value     = p.email;
    document.getElementById("telefono").value  = p.telefono;

    document.getElementById("modalTitulo").textContent = "Editar Proveedor";
    document.getElementById("btnSubmit").textContent   = "Actualizar Proveedor";

    indiceEditando = i;

    abrirModal();
}

// ─── SUBMIT ───────────────────────────────────────────────────────────────────

document.getElementById("proveedorForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const proveedores = JSON.parse(localStorage.getItem("listaProveedores")) || [];

    const proveedor = {
        nombre:    document.getElementById("nombre").value.trim(),
        apellido:  document.getElementById("apellido").value.trim(),
        direccion: document.getElementById("direccion").value.trim(),
        email:     document.getElementById("email").value.trim(),
        telefono:  document.getElementById("telefono").value.trim()
    };

    if (indiceEditando !== null) {
        proveedores[indiceEditando] = proveedor;
    } else {
        proveedores.push(proveedor);
    }

    localStorage.setItem("listaProveedores", JSON.stringify(proveedores));
    cerrarModal();
    cargarTabla();
});

// ─── ELIMINAR ─────────────────────────────────────────────────────────────────

function eliminarProveedor(i) {
    const confirmDelete = confirm("¿Está seguro de eliminar este proveedor?");

    if (confirmDelete) {
        const proveedores = JSON.parse(localStorage.getItem("listaProveedores")) || [];
        proveedores.splice(i, 1);
        localStorage.setItem("listaProveedores", JSON.stringify(proveedores));
        cargarTabla();
    }
}

// ─── VER ──────────────────────────────────────────────────────────────────────

function verProveedor(i) {
    const proveedores = JSON.parse(localStorage.getItem("listaProveedores")) || [];
    const p = proveedores[i];

    alert(
        "Proveedor:\n\n" +
        "Nombre: "    + p.nombre    + " " + p.apellido + "\n" +
        "Direccion: " + p.direccion + "\n" +
        "Email: "     + p.email     + "\n" +
        "Telefono: "  + p.telefono
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
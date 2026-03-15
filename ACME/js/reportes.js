// datos iniciales
const reportesIniciales = [
    { producto: "Producto A", cantidad: "1", operacion: "Entrada", fecha: "mm/dd/yyyy" },
    { producto: "Producto B", cantidad: "1", operacion: "salida",  fecha: "mm/dd/yyyy" },
    { producto: "Producto C", cantidad: "1", operacion: "Entrada", fecha: "mm/dd/yyyy" }
];

if (!localStorage.getItem("listaReportes")) {
    localStorage.setItem("listaReportes", JSON.stringify(reportesIniciales));
}

let indiceEditando = null;

// ─── TABLA ────────────────────────────────────────────────────────────────────

function cargarTabla() {
    const tbody = document.getElementById("cuerpoTabla");
    const reportes = JSON.parse(localStorage.getItem("listaReportes")) || [];

    tbody.innerHTML = "";

    reportes.forEach(function(r, i) {
        const tr = document.createElement("tr");
        tr.innerHTML =
            "<td>" + r.producto  + "</td>" +
            "<td>" + r.cantidad  + "</td>" +
            "<td>" + r.operacion + "</td>" +
            "<td>" + r.fecha     + "</td>" +
            '<td><div class="acciones">' +
                '<button class="ver"      onclick="verReporte('      + i + ')">Ver</button>'      +
                '<button class="editar"   onclick="abrirEditar('     + i + ')">Editar</button>'   +
                '<button class="eliminar" onclick="eliminarReporte('  + i + ')">Eliminar</button>' +
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

    document.getElementById("producto").value  = "";
    document.getElementById("cantidad").value  = "";
    document.getElementById("operacion").value = "";
    document.getElementById("fecha").value     = "";

    document.getElementById("modalTitulo").textContent = "Agregar Reporte";
    document.getElementById("btnSubmit").textContent   = "Guardar Reporte";

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
    const reportes = JSON.parse(localStorage.getItem("listaReportes")) || [];
    const r = reportes[i];

    document.getElementById("producto").value  = r.producto;
    document.getElementById("cantidad").value  = r.cantidad;
    document.getElementById("operacion").value = r.operacion;
    document.getElementById("fecha").value     = r.fecha;

    document.getElementById("modalTitulo").textContent = "Editar Reporte";
    document.getElementById("btnSubmit").textContent   = "Actualizar Reporte";

    indiceEditando = i;

    abrirModal();
}

// ─── SUBMIT ───────────────────────────────────────────────────────────────────

document.getElementById("reporteForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const reportes = JSON.parse(localStorage.getItem("listaReportes")) || [];

    const reporte = {
        producto:  document.getElementById("producto").value.trim(),
        cantidad:  document.getElementById("cantidad").value.trim(),
        operacion: document.getElementById("operacion").value.trim(),
        fecha:     document.getElementById("fecha").value.trim()
    };

    if (indiceEditando !== null) {
        reportes[indiceEditando] = reporte;
    } else {
        reportes.push(reporte);
    }

    localStorage.setItem("listaReportes", JSON.stringify(reportes));
    cerrarModal();
    cargarTabla();
});

// ─── ELIMINAR ─────────────────────────────────────────────────────────────────

function eliminarReporte(i) {
    const confirmDelete = confirm("¿Está seguro de eliminar este reporte?");

    if (confirmDelete) {
        const reportes = JSON.parse(localStorage.getItem("listaReportes")) || [];
        reportes.splice(i, 1);
        localStorage.setItem("listaReportes", JSON.stringify(reportes));
        cargarTabla();
    }
}

// ─── VER ──────────────────────────────────────────────────────────────────────

function verReporte(i) {
    const reportes = JSON.parse(localStorage.getItem("listaReportes")) || [];
    const r = reportes[i];

    alert(
        "Reporte:\n\n" +
        "Producto: "  + r.producto  + "\n" +
        "Cantidad: "  + r.cantidad  + "\n" +
        "Operacion: " + r.operacion + "\n" +
        "Fecha: "     + r.fecha
    );
}

// ─── INICIO ───────────────────────────────────────────────────────────────────

cargarTabla();
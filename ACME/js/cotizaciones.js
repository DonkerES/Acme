let productos = [];

// ─── TABLA ────────────────────────────────────────────────────────────────────

function cargarTabla() {
    const tbody = document.getElementById("cuerpoTabla");
    tbody.innerHTML = "";

    let subtotal = 0;

    productos.forEach(function(p, i) {
        const total = parseFloat(p.cantidad) * parseFloat(p.precioUnitario);
        subtotal += total;

        const tr = document.createElement("tr");
        tr.innerHTML =
            "<td>" + p.producto      + "</td>" +
            "<td>" + p.cantidad      + "</td>" +
            "<td>" + parseFloat(p.precioUnitario).toFixed(2) + "</td>" +
            "<td>" + total.toFixed(2) + "</td>" +
            '<td><div class="acciones">' +
                '<button class="eliminar" onclick="eliminarProducto(' + i + ')">Eliminar</button>' +
            "</div></td>";
        tbody.appendChild(tr);
    });

    const iva   = subtotal * 0.19;
    const total = subtotal + iva;

    document.getElementById("subtotal").textContent        = subtotal.toFixed(2);
    document.getElementById("iva").textContent             = iva.toFixed(2);
    document.getElementById("total").innerHTML             = "<strong>" + total.toFixed(2) + "</strong>";
}

// ─── MODAL AÑADIR PRODUCTO ────────────────────────────────────────────────────

function abrirModal() {
    document.getElementById("myModal").style.display = "block";
}

function cerrarModal() {
    document.getElementById("myModal").style.display = "none";
}

document.querySelector(".modal-content").addEventListener("click", function(event) {
    event.stopPropagation();
});

document.getElementById("openModal").onclick = function() {
    document.getElementById("producto").value       = "";
    document.getElementById("cantidad").value       = "";
    document.getElementById("precioUnitario").value = "";
    abrirModal();
};

document.getElementById("closeModal").onclick = function() {
    cerrarModal();
};

window.onclick = function(event) {
    if (event.target == document.getElementById("myModal")) {
        cerrarModal();
    }
    if (event.target == document.getElementById("myModalResumen")) {
        document.getElementById("myModalResumen").style.display = "none";
    }
};

document.getElementById("cotizacionForm").addEventListener("submit", function(event) {
    event.preventDefault();

    productos.push({
        producto:       document.getElementById("producto").value.trim(),
        cantidad:       document.getElementById("cantidad").value.trim(),
        precioUnitario: document.getElementById("precioUnitario").value.trim()
    });

    cerrarModal();
    cargarTabla();
});

// ─── ELIMINAR PRODUCTO ────────────────────────────────────────────────────────

function eliminarProducto(i) {
    const confirmDelete = confirm("¿Está seguro de eliminar este producto?");
    if (confirmDelete) {
        productos.splice(i, 1);
        cargarTabla();
    }
}

// ─── GENERAR COTIZACION ───────────────────────────────────────────────────────

function generarCotizacion() {
    const cliente = document.getElementById("seleccionCliente").value.trim();
    const fecha   = document.getElementById("fechaCotizacion").value.trim();

    if (!cliente) {
        alert("Por favor ingresa el nombre del cliente.");
        return;
    }
    if (!fecha) {
        alert("Por favor ingresa la fecha de cotizacion.");
        return;
    }
    if (productos.length === 0) {
        alert("Por favor añade al menos un producto o servicio.");
        return;
    }

    let subtotal = 0;
    let filas = "";

    productos.forEach(function(p) {
        const total = parseFloat(p.cantidad) * parseFloat(p.precioUnitario);
        subtotal += total;
        filas +=
            "<tr>" +
                "<td>" + p.producto + "</td>" +
                "<td>" + p.cantidad + "</td>" +
                "<td>$" + parseFloat(p.precioUnitario).toFixed(2) + "</td>" +
                "<td>$" + total.toFixed(2) + "</td>" +
            "</tr>";
    });

    const iva   = subtotal * 0.19;
    const total = subtotal + iva;

    document.getElementById("resumenCotizacion").innerHTML =
        "<p><b>Cliente:</b> " + cliente + "</p>" +
        "<p><b>Fecha:</b> "   + fecha   + "</p>" +
        "<br>" +
        "<table>" +
            "<thead><tr>" +
                "<th>Producto/Servicio</th>" +
                "<th>Cantidad</th>" +
                "<th>Precio Unitario</th>" +
                "<th>Total</th>" +
            "</tr></thead>" +
            "<tbody>" + filas + "</tbody>" +
            "<tfoot>" +
                "<tr><td colspan='3' style='text-align:right'><strong>Subtotal:</strong></td><td>$" + subtotal.toFixed(2) + "</td></tr>" +
                "<tr><td colspan='3' style='text-align:right'><strong>IVA (19%):</strong></td><td>$" + iva.toFixed(2)      + "</td></tr>" +
                "<tr><td colspan='3' style='text-align:right'><strong>Total:</strong></td><td><strong>$" + total.toFixed(2) + "</strong></td></tr>" +
            "</tfoot>" +
        "</table>";

    document.getElementById("myModalResumen").style.display = "block";
}

document.getElementById("closeModalResumen").onclick = function() {
    document.getElementById("myModalResumen").style.display = "none";
};

// ─── CANCELAR ─────────────────────────────────────────────────────────────────

function cancelar() {
    if (confirm("¿Está seguro de cancelar? Se perderán los datos ingresados.")) {
        productos = [];
        document.getElementById("seleccionCliente").value = "";
        document.getElementById("fechaCotizacion").value  = "";
        cargarTabla();
    }
}

// ─── INICIO ───────────────────────────────────────────────────────────────────

cargarTabla();
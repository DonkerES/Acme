angular.module("ReporteApp", ["LocalStorageModule"])

.controller("ReporteController", function($scope, localStorageService) {

    // cargar reportes desde localStorage
    if (localStorageService.get("listaReportes")) {
        $scope.reportes = localStorageService.get("listaReportes");
    } else {
        $scope.reportes = [
            { producto: "Producto A", cantidad: "1", operacion: "Entrada", fecha: "mm/dd/yyyy" },
            { producto: "Producto B", cantidad: "1", operacion: "salida",  fecha: "mm/dd/yyyy" },
            { producto: "Producto C", cantidad: "1", operacion: "Entrada", fecha: "mm/dd/yyyy" }
        ];
        localStorageService.set("listaReportes", $scope.reportes);
    }

    $scope.newReporte    = {};
    $scope.editingIndex  = null;
    $scope.showModal     = false;
    $scope.tipoReporte   = "inventario";
    $scope.fechaInicio   = "";
    $scope.fechaFin      = "";

    // ─── ABRIR MODAL ──────────────────────────────────────────────────────────

    $scope.openReporteModal = function() {
        if (!$scope.fechaInicio) {
            alert("Por favor ingresa la Fecha Inicio.");
            return;
        }
        if (!$scope.fechaFin) {
            alert("Por favor ingresa la Fecha Fin.");
            return;
        }
        $scope.newReporte   = {};
        $scope.editingIndex = null;
        $scope.showModal    = true;
    };

    // ─── CERRAR MODAL ─────────────────────────────────────────────────────────

    $scope.closeModal = function() {
        $scope.showModal    = false;
        $scope.newReporte   = {};
        $scope.editingIndex = null;
    };

    // ─── GUARDAR (agregar o actualizar) ───────────────────────────────────────

    $scope.saveReporte = function() {
        if ($scope.editingIndex !== null) {
            $scope.reportes[$scope.editingIndex] = angular.copy($scope.newReporte);
        } else {
            $scope.reportes.push(angular.copy($scope.newReporte));
        }
        localStorageService.set("listaReportes", $scope.reportes);
        $scope.newReporte   = {};
        $scope.editingIndex = null;
        $scope.showModal    = false;
    };

    // ─── EDITAR ───────────────────────────────────────────────────────────────

    $scope.editReporte = function(index) {
        $scope.newReporte   = angular.copy($scope.reportes[index]);
        $scope.editingIndex = index;
        $scope.showModal    = true;
    };

    // ─── ELIMINAR ─────────────────────────────────────────────────────────────

    $scope.deleteReporte = function(index) {
        if (confirm("¿Está seguro de eliminar este reporte?")) {
            $scope.reportes.splice(index, 1);
            localStorageService.set("listaReportes", $scope.reportes);
        }
    };

    // ─── VER ──────────────────────────────────────────────────────────────────

    $scope.viewReporte = function(index) {
        const r = $scope.reportes[index];
        alert(
            "Reporte:\n\n" +
            "Producto: "  + r.producto  + "\n" +
            "Cantidad: "  + r.cantidad  + "\n" +
            "Operacion: " + r.operacion + "\n" +
            "Fecha: "     + r.fecha
        );
    };

    // ─── CANCELAR ─────────────────────────────────────────────────────────────

    $scope.cancelar = function() {
        if (confirm("¿Está seguro de cancelar?")) {
            $scope.fechaInicio = "";
            $scope.fechaFin    = "";
        }
    };

    // ─── GUARDAR ORDEN ────────────────────────────────────────────────────────

    $scope.guardarOrden = function() {
        alert("Orden guardada correctamente.");
    };

});
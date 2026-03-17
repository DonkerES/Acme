angular.module("CotizacionApp", ["LocalStorageModule"])

.controller("CotizacionController", function($scope) {

    $scope.productos     = [];
    $scope.newProducto   = {};
    $scope.newCotizacion = {};
    $scope.showModal     = false;
    $scope.showResumen   = false;

    // ─── CALCULOS ─────────────────────────────────────────────────────────────

    $scope.calcularSubtotal = function() {
        var subtotal = 0;
        $scope.productos.forEach(function(p) {
            subtotal += parseFloat(p.cantidad || 0) * parseFloat(p.precioUnitario || 0);
        });
        return subtotal;
    };

    $scope.calcularIva = function() {
        return $scope.calcularSubtotal() * 0.19;
    };

    $scope.calcularTotal = function() {
        return $scope.calcularSubtotal() + $scope.calcularIva();
    };

    // ─── MODAL AÑADIR PRODUCTO ────────────────────────────────────────────────

    $scope.openModal = function() {
        $scope.newProducto = {};
        $scope.showModal   = true;
    };

    $scope.closeModal = function() {
        $scope.showModal   = false;
        $scope.newProducto = {};
    };

    $scope.addProducto = function() {
        $scope.productos.push(angular.copy($scope.newProducto));
        $scope.newProducto = {};
        $scope.showModal   = false;
    };

    // ─── ELIMINAR PRODUCTO ────────────────────────────────────────────────────

    $scope.eliminarProducto = function(index) {
        if (confirm("¿Está seguro de eliminar este producto?")) {
            $scope.productos.splice(index, 1);
        }
    };

    // ─── GENERAR COTIZACION ───────────────────────────────────────────────────

    $scope.generarCotizacion = function() {
        if (!$scope.newCotizacion.cliente) {
            alert("Por favor ingresa el nombre del cliente.");
            return;
        }
        if (!$scope.newCotizacion.fecha) {
            alert("Por favor ingresa la fecha de cotizacion.");
            return;
        }
        if ($scope.productos.length === 0) {
            alert("Por favor añade al menos un producto o servicio.");
            return;
        }
        $scope.showResumen = true;
    };

    $scope.closeResumen = function() {
        $scope.showResumen = false;
    };

    // ─── CANCELAR ─────────────────────────────────────────────────────────────

    $scope.cancelar = function() {
        if (confirm("¿Está seguro de cancelar? Se perderán los datos ingresados.")) {
            $scope.productos     = [];
            $scope.newCotizacion = {};
            $scope.showResumen   = false;
        }
    };

});
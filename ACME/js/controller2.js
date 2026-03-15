//controlador de Gestor de productos 
angular.module("ProductApp", ["LocalStorageModule"])

.controller("ProductController", function($scope, localStorageService) {
    $scope.products = localStorageService.get("products") || [];
    $scope.newProduct = {};
    $scope.editingIndex = null;
    $scope.showModalProductos = false;

    // Abrir modal en modo agregar
    $scope.openProductosModal = function() {
        console.log("llega a abrir");
        $scope.newProduct = {};
        $scope.editingIndex = null;
        $scope.showModalProductos = true;
    };

    // Abrir modal en modo editar
    $scope.editProduct = function(index) {
        $scope.newProduct = angular.copy($scope.products[index]);
        $scope.editingIndex = index;
        $scope.showModalProductos = true;
    };

    // Guardar producto
    $scope.saveProduct = function() {
        if ($scope.newProduct.precioEntrada <= 0) {
            alert("El precio de entrada debe ser mayor que 0.");
            return;
        }
        if ($scope.newProduct.precioSalida <= 0) {
            alert("El precio de salida debe ser mayor que 0.");
            return;
        }
        if ($scope.newProduct.cantidad <= 0) {
            alert("La cantidad disponible debe ser mayor que 0.");
            return;
        }

        //Guardar
        if ($scope.editingIndex === null) {
            $scope.products.push(angular.copy($scope.newProduct));
        } else {
            $scope.products[$scope.editingIndex] = angular.copy($scope.newProduct);
        }
        localStorageService.set("products", $scope.products);

        $scope.newProduct = {};
        $scope.editingIndex = null;
        $scope.showModalProductos = false;
    };

    // Eliminar producto
    $scope.deleteProduct = function(index) {
        $scope.products.splice(index, 1);
        localStorageService.set("products", $scope.products);
    };

    // Cerrar modal
    $scope.closeModal = function() {
        $scope.showModalProductos = false;
        $scope.newProduct = {};
        $scope.editingIndex = null;
    };

    $scope.viewProduct = function(index) {
        const p = $scope.products[index];
    };
});
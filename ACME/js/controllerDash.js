angular.module("DashboardApp", ["LocalStorageModule"])

.controller("DashboardController", function($scope, localStorageService) {
    //datos desde localStorage
    $scope.products    = localStorageService.get("products")    || [];
    $scope.clientes    = JSON.parse(localStorage.getItem("listaClientes")) || [];
    $scope.proveedores = JSON.parse(localStorage.getItem("listaProveedores")) || [];
    $scope.categorias  = localStorageService.get("categories")  || [];

    // totales
    $scope.totalProductos    = $scope.products.length;
    $scope.totalClientes     = $scope.clientes.length;
    $scope.totalProveedores  = $scope.proveedores.length;
    $scope.totalCategorias   = $scope.categorias.length;

    // activos
    $scope.clientesActivos    = $scope.clientes.length;
    $scope.proveedoresActivos = $scope.proveedores.length;
    $scope.categoriasActivas  = $scope.categorias.length;

    // productos críticos
    $scope.productosCriticos = $scope.products.filter(p => p.cantidad < 10);
});
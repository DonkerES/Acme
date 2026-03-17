angular.module("ProveedorApp", ["LocalStorageModule"])

.controller("ProveedorController", function($scope, localStorageService) {

    // cargar proveedores desde localStorage
    if (localStorageService.get("listaProveedores")) {
        $scope.proveedores = localStorageService.get("listaProveedores");
    } else {
        $scope.proveedores = [
            { nombre: "Alberto",  apellido: "Muñoz", direccion: "Calle 5ta-Cra 9na", email: "albermu@gmail.com", telefono: "310427095"  },
            { nombre: "Cristian", apellido: "Salas", direccion: "Calla 30-Cra 10",   email: "crisa@gmail.com",   telefono: "1057157521" }
        ];
        localStorageService.set("listaProveedores", $scope.proveedores);
    }

    $scope.newProveedor  = {};
    $scope.editingIndex  = null;
    $scope.showModal     = false;
    $scope.searchText    = "";

    // ─── ABRIR MODAL AGREGAR ──────────────────────────────────────────────────

    $scope.openProveedoresModal = function() {
        $scope.newProveedor  = {};
        $scope.editingIndex  = null;
        $scope.showModal     = true;
    };

    // ─── CERRAR MODAL ─────────────────────────────────────────────────────────

    $scope.closeModal = function() {
        $scope.showModal    = false;
        $scope.newProveedor = {};
        $scope.editingIndex = null;
    };

    // ─── GUARDAR (agregar o actualizar) ───────────────────────────────────────

    $scope.saveProveedor = function() {
        if ($scope.editingIndex !== null) {
            $scope.proveedores[$scope.editingIndex] = angular.copy($scope.newProveedor);
        } else {
            $scope.proveedores.push(angular.copy($scope.newProveedor));
        }
        localStorageService.set("listaProveedores", $scope.proveedores);
        $scope.newProveedor = {};
        $scope.editingIndex = null;
        $scope.showModal    = false;
    };

    // ─── EDITAR ───────────────────────────────────────────────────────────────

    $scope.editProveedor = function(index) {
        $scope.newProveedor = angular.copy($scope.proveedores[index]);
        $scope.editingIndex = index;
        $scope.showModal    = true;
    };

    // ─── ELIMINAR ─────────────────────────────────────────────────────────────

    $scope.deleteProveedor = function(index) {
        if (confirm("¿Está seguro de eliminar este proveedor?")) {
            $scope.proveedores.splice(index, 1);
            localStorageService.set("listaProveedores", $scope.proveedores);
        }
    };

    // ─── VER ──────────────────────────────────────────────────────────────────

    $scope.viewProveedor = function(index) {
        const p = $scope.proveedores[index];
        alert(
            "Proveedor:\n\n" +
            "Nombre: "    + p.nombre    + " " + p.apellido + "\n" +
            "Direccion: " + p.direccion + "\n" +
            "Email: "     + p.email     + "\n" +
            "Telefono: "  + p.telefono
        );
    };

});
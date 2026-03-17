angular.module("ClienteApp", ["LocalStorageModule"])

.controller("ClienteController", function($scope, localStorageService) {

    // cargar clientes desde localStorage
    if (localStorageService.get("listaClientes")) {
        $scope.clientes = localStorageService.get("listaClientes");
    } else {
        $scope.clientes = [
            { nombre: "Juan",  apellido: "Perez", direccion: "calle 123 #45-67", email: "juanperez@gmail.com", telefono: "3108538117" },
            { nombre: "Maria", apellido: "Gomez", direccion: "centro casa1",      email: "marigo@gmail.com",    telefono: "3526846798" }
        ];
        localStorageService.set("listaClientes", $scope.clientes);
    }

    $scope.newCliente   = {};
    $scope.editingIndex = null;
    $scope.showModal    = false;
    $scope.searchText   = "";

    // ─── ABRIR MODAL AGREGAR ──────────────────────────────────────────────────

    $scope.openClientesModal = function() {
        $scope.newCliente   = {};
        $scope.editingIndex = null;
        $scope.showModal    = true;
    };

    // ─── CERRAR MODAL ─────────────────────────────────────────────────────────

    $scope.closeModal = function() {
        $scope.showModal    = false;
        $scope.newCliente   = {};
        $scope.editingIndex = null;
    };

    // ─── GUARDAR (agregar o actualizar) ───────────────────────────────────────

    $scope.saveCliente = function() {
        if ($scope.editingIndex !== null) {
            $scope.clientes[$scope.editingIndex] = angular.copy($scope.newCliente);
        } else {
            $scope.clientes.push(angular.copy($scope.newCliente));
        }
        localStorageService.set("listaClientes", $scope.clientes);
        $scope.newCliente   = {};
        $scope.editingIndex = null;
        $scope.showModal    = false;
    };

    // ─── EDITAR ───────────────────────────────────────────────────────────────

    $scope.editCliente = function(index) {
        $scope.newCliente   = angular.copy($scope.clientes[index]);
        $scope.editingIndex = index;
        $scope.showModal    = true;
    };

    // ─── ELIMINAR ─────────────────────────────────────────────────────────────

    $scope.deleteCliente = function(index) {
        if (confirm("¿Está seguro de eliminar este cliente?")) {
            $scope.clientes.splice(index, 1);
            localStorageService.set("listaClientes", $scope.clientes);
        }
    };

    // ─── VER ──────────────────────────────────────────────────────────────────

    $scope.viewCliente = function(index) {
        const c = $scope.clientes[index];
        alert(
            "Cliente:\n\n" +
            "Nombre: "    + c.nombre    + " " + c.apellido + "\n" +
            "Direccion: " + c.direccion + "\n" +
            "Email: "     + c.email     + "\n" +
            "Telefono: "  + c.telefono
        );
    };

});
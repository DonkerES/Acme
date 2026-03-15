//ANGULAR PARA CATEGORIAS

angular.module("CategoryApp", ["LocalStorageModule"])

.controller("CategoryController", function($scope, localStorageService) {

  if (localStorageService.get("categories")) {
      $scope.categories = localStorageService.get("categories");
  } else {
      $scope.categories = [];
  }

// Guardar categorías
localStorageService.set("categories", $scope.categories);

  $scope.newCategory = {};
  $scope.editingIndex = null;

  $scope.addCategory = function() {

    $scope.categories.push(angular.copy($scope.newCategory));
    localStorageService.set("categories", $scope.categories);
    $scope.newCategory = {};
};

//eliminar categoria

$scope.deleteCategory = function(index) {
    $scope.categories.splice(index, 1);
    localStorageService.set("categories", $scope.categories);
};

$scope.showModal = false;

// Abrir modal en modo agregar
$scope.openCategoriasModal= function() {
    $scope.newCategory = {};
    $scope.editingIndex = null;
    $scope.showModal = true;
};

// Abrir modal en modo editar
$scope.editCategory = function(index) {
    console.log("hola");
    $scope.newCategory = angular.copy($scope.categories[index]);
    $scope.editingIndex = index;
    $scope.showModal = true;
};

$scope.updateCategory = function() {

    $scope.categories[$scope.editingIndex] = angular.copy($scope.newCategory);
    localStorageService.set("categories", $scope.categories);

    // Resetear estado
    $scope.newCategory = {};
    $scope.editingIndex = null;
    $scope.showModal = false;
};

// Cerrar modal
$scope.closeModal = function() {
    $scope.showModal = false;
    $scope.newCategory = {};
    $scope.editingIndex = null;
};

$scope.viewProduct = function(index) {
    const p = $scope.products[index];
};

});


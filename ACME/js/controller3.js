angular.module("OrdenApp", ["LocalStorageModule"])

.controller("OrdenController", function($scope, localStorageService) {
  $scope.ordenes = localStorageService.get("ordenes") || [];
  $scope.newOrden = {};
  $scope.editingIndex = null;
  $scope.showModalOrden = false;

  $scope.openOrdenModal = function() {
    $scope.newOrden = {};
    $scope.editingIndex = null;
    $scope.showModalOrden = true;
  };

  $scope.editOrden = function(index) {
    $scope.newOrden = angular.copy($scope.ordenes[index]);
    $scope.editingIndex = index;
    $scope.showModalOrden = true;
  };

  $scope.saveOrden = function() {
    if ($scope.editingIndex === null) {
      $scope.ordenes.push(angular.copy($scope.newOrden));
    } else {
      $scope.ordenes[$scope.editingIndex] = angular.copy($scope.newOrden);
    }
    localStorageService.set("ordenes", $scope.ordenes);

    $scope.newOrden = {};
    $scope.editingIndex = null;
    $scope.showModalOrden = false;
  };

  $scope.deleteOrden = function(index) {
    $scope.ordenes.splice(index, 1);
    localStorageService.set("ordenes", $scope.ordenes);
  };

  $scope.closeModal = function() {
    $scope.showModalOrden = false;
    $scope.newOrden = {};
    $scope.editingIndex = null;
  };

  $scope.cancelarOrdenes = function() {
    $scope.ordenes = [];
    localStorageService.set("ordenes", $scope.ordenes);
    $scope.newOrden = {};
    $scope.editingIndex = null;
  };

  $scope.generarRecibo = function() {
    if ($scope.ordenes.length === 0) {
      alert("No hay órdenes para generar recibo.");
      return;
    }

    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    doc.setFontSize(16);
    doc.text("Recibo de Órdenes de Trabajo", 10, 10);

    let y = 20;

    $scope.ordenes.forEach(function(orden, i) {
      doc.setFontSize(12);
      doc.text(`Orden ${i+1}:`, 10, y);
      y += 6;
      doc.text(`Cliente: ${orden.cliente}`, 10, y);
      y += 6;
      doc.text(`Responsable: ${orden.responsable}`, 10, y);
      y += 6;
      doc.text(`Método de Pago: ${orden.metodoPago}`, 10, y);
      y += 6;
      doc.text(`Estado: ${orden.estado}`, 10, y);
      y += 10;
    });

    doc.save("recibo_ordenes.pdf");
  };


});
angular.module("Simplex").controller("simplexCtrl", function ($scope) {

	$scope.app = "Simplex";
			
	$scope.objetivos = [
		{nome: "Maximizar", codigo: 0},
		{nome: "Minimizar", codigo: 1}
	];
});
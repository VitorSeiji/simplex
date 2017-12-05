angular.module("Simplex").controller("tabelaCtrl", function ($scope, $stateParams) {

  
    $scope.valores = angular.copy($stateParams.params1);


    // console.log($scope.valores)
    
    $scope.igualdades = [
        {nome: "<=", codigo: 0},
        {nome: ">=", codigo: 1},
        {nome: "=", codigo: 2}
    ];

  // criar matrix de restricao

   var aux = []; //[0,1,2,3,4]
   for(var i = 0; i < $scope.valores.variaveis; i++){
      aux.push(i);
   }
   
   $scope.variaveis = aux;

   $scope.tabela = []; //[[1,2,3,4],[1,2,3,4],[1,2,3,4],[1,2,3,4]];

   for(var i = 0; i < $scope.valores.restricoes; i++) {
      $scope.tabela.push(aux);
   }


  // zerar $scope.valores de matrix, funcao, base e sinal

   $scope.matrix = [];

   for(var i=0; i<$scope.valores.restricoes; i++){
    $scope.matrix.push([]);
    for(var j=0; j < aux.length; j++){
      $scope.matrix[i].push(0);
    }
   }


   $scope.funcao = [];

   for(var i=0; i<$scope.valores.variaveis; i++){
    $scope.funcao.push(0);
   }


   $scope.base = [];

   for(var i=0; i<$scope.valores.restricoes; i++){
    $scope.base.push(0);
   }

   $scope.sinal = [];

   for(var i=0; i<$scope.valores.restricoes; i++){
    $scope.sinal.push();
    //console.log(igualdades)
   }

   
 


   //---------------------------------------------------------------------------------

  //http://www.shanidkv.com/blog/angularjs-adding-form-fields-dynamically

  //var app = angular.module('angularjs-starter', []);

    //app.controller('MainCtrl', function($scope) {

   // $scope.linhas = [{id: 'linha1'}];

   // $scope.addNewLinha = function() {
   //    var newItemNo = $scope.linhas.length+1;
   //    $scope.linhas.push({'id':'linha'+newItemNo});
   //  };
    
   //  $scope.removeLinha = function() {
   //    var lastItem = $scope.linhas.length-1;
   //    $scope.linhas.splice(lastItem);
   //  };


   // $scope.colunas = [{id: 'coluna1'}];

   //  $scope.addNewColuna = function() {
   //    var newItemNo = $scope.colunas.length+1;
   //    $scope.colunas.push({'id':'coluna'+newItemNo});
   //  };
    
   //  $scope.removeColuna = function() {
   //    var lastItem = $scope.colunas.length-1;
   //    $scope.colunas.splice(lastItem);
   //  };
//});


//----------------------------------------------------------------------------
// var valor = $stateParams.params1;

//     $scope.tabelas = [
    	
//     	{tabela: valor.variaveis}
    	
//     ];//quando criar um novo ctrl da proxima pg
			
    
// 	$scope.tabela = function (){
// 		//console.log(tabela.objetivo.codigo);
// 		console.log(valor);

// 		//var qtdVariaveis = parseInt(tabela.variaveis); 
// 		// for(var i=0; i<tabela.restricoes; i++){
// 		// 	for(var j=0;j<tabela.variaveis;j++) {

// 		// 	}
// 		// }
// 	}


});






angular.module("Simplex").config(function($stateProvider, $urlRouterProvider){

	$urlRouterProvider.otherwise("definicoes")

	$stateProvider
	.state("variaveis",{
		controller:"simplexCtrl",
		url:"/definicoes",
		templateUrl:"view/variaveis.html"
	})

	.state("criarTabela",{
		controller:"tabelaCtrl",
		url:"/insercoes",
		templateUrl:"view/criarTabela.html",
		params:{//passa valor da variavel para proxima pg
			params1:null	
		}
	})

	.state("iteracao",{
		controller:"iteracaoCtrl",
		url:"/iteracao",
		templateUrl:"view/iteracao.html",
		params:{//passa valor da variavel para proxima pg
			params2:null,
			params3:null,
			params4:null,
			params5:null,
			params6:null
		}
	})
})

angular.module("Simplex").controller("iteracaoCtrl", function ($scope, $stateParams) {
	
 
	$scope.funcao = angular.copy($stateParams.params2);
  $scope.matrix = angular.copy($stateParams.params3);
  $scope.base = angular.copy($stateParams.params4);
  $scope.sinal = angular.copy($stateParams.params5);
  $scope.valores = angular.copy($stateParams.params6);

  
	// console.log($scope.funcao);
 //  console.log($scope.matrix);
 //  console.log($scope.base);
 //  console.log($scope.sinal);
 //  console.log($scope.valores);
  
  

  $scope.menorValor1 = 1;
  $scope.menorValor2 = 99999999;
  var colunaPivo = 0;
  var linhaPivo = 0;
  var pivo = 0;
  var aux1 = 0;
  var cont = 1;
  var impo = 1;

  $scope.itera = [];
  $scope.coluna = [];
  $scope.resultado = [];
  $scope.sensibilidade = [];
  $scope.passoPasso = [];

  $scope.aux = $scope.valores.variaveis;
  $scope.qtdColuna = $scope.valores.restricoes + $scope.valores.variaveis + 1;
  $scope.qtdLinha = $scope.valores.restricoes + 1;
  

// titulo das colunas da tabela
 for(var i=0; i <  $scope.qtdColuna-1; i++)
    {
      $scope.coluna.push(0);
    }
     


//criar matrix interacao
   for(var i=0; i < $scope.qtdLinha; i++)
   {
    $scope.itera.push([]);
    for(var j=0; j <=  $scope.qtdColuna; j++)
    {
      $scope.itera[i].push(0);
    }
   }


   //base
    for(var i=0; i<$scope.qtdLinha-1; i++)
    {
      $scope.aux += 1;
      $scope.itera[i][0] = $scope.aux;
    }

   // insere matrix no intera

   for(var i=0; i < $scope.valores.restricoes; i++)
   {
    for(var j=0; j < $scope.valores.variaveis; j++)
    {
      $scope.itera[i][j+1]=$scope.matrix[i][j];
    }
   }

   // insere funcao no intera

  
   for(var i=0; i < $scope.valores.variaveis; i++)
   {
    if($scope.valores.objetivo.codigo == 0)
    {
      $scope.itera[$scope.qtdLinha-1][i+1]=$scope.funcao[i] * (-1);

    }
    else 
    {
      $scope.itera[$scope.qtdLinha-1][i+1]=$scope.funcao[i]
      console.log($scope.itera[$scope.qtdLinha-1][i+1])
    }
   }

   // insere base no intera

   for(var i=0; i < $scope.valores.restricoes; i++)
   {
     $scope.itera[i][$scope.qtdColuna]=$scope.base[i];
   }

   // insere variavel de folga no intera

   for(var i=0; i < $scope.qtdLinha-1; i++)
   {
    for(var j = $scope.valores.variaveis+1; j <=  $scope.qtdColuna; j++)
    {
      if(i==j-$scope.valores.variaveis-1)
      {
        $scope.itera[i][j] = 1;
      }
    }
   }

//---------------------------------------------------------------------
// calculo

 // $scope.iteracao = [];

 while($scope.menorValor1!=0)
 {

$scope.passoPasso.push(angular.copy($scope.itera))
   // $scope.addNewItercao = function() {
   //     $scope.iteracao.push($scope.itera);
   //    console.log($scope.iteracao);
    

//menor valor da funçao
if(impo == 1)
{
    impo = 0;
    $scope.menorValor1 = 0;
    $scope.menorValor2 = 99999999;
    colunaPivo = 0;
    linhaPivo = 0;
    pivo = 0;

    for(var i=0; i < $scope.qtdColuna; i++)
    {
      if($scope.itera[$scope.qtdLinha-1][i+1]<$scope.menorValor1)
      {
        // console.log("coluna:"+i )
        $scope.menorValor1 = $scope.itera[$scope.qtdLinha-1][i+1];
        colunaPivo = i+1;
         // console.log("menor valor:"+$scope.menorValor1 )

         // console.log("coluna pivo:"+colunaPivo)
      }
    }



    if (cont <= $scope.valores.iteracoes)
    {
      if ($scope.menorValor1 != 0)
      { 

        //quem sai da base
        for(var i=0; i < $scope.valores.restricoes; i++)
        {
          if ($scope.itera[i][colunaPivo] > 0)
          {
              if(($scope.itera[i][$scope.qtdColuna]/$scope.itera[i][colunaPivo]) < $scope.menorValor2)
              {
                 // console.log("linha:"+i+"coluna:"+colunaPivo)
                // console.log("qt C:"+$scope.itera[i][$scope.qtdColuna])
                
                $scope.menorValor2 = $scope.itera[i][$scope.qtdColuna]/$scope.itera[i][colunaPivo];
                linhaPivo = i;
                pivo = $scope.itera[i][colunaPivo];
                impo = 1;
                // console.log("linha pivo:"+linhaPivo)
              }
            
          } 
        }

        // troca da variavel de folga
        $scope.itera[linhaPivo][0] = colunaPivo;

        // dividir a linha do pivo pelo pivo 
        for(var i=0; i <  $scope.qtdColuna; i++)
        {
          if ($scope.itera[linhaPivo][i+1] != 0)
          {
              $scope.itera[linhaPivo][i+1] = $scope.itera[linhaPivo][i+1]/pivo;
          } 
        }


        // zerar coluna do pivo
        for(var i=0; i < $scope.qtdLinha; i++)
        {
          // console.log("linha:"+i+"coluna:"+colunaPivo)
          // console.log("1:"+$scope.itera[i][colunaPivo])
          // console.log("pivo"+$scope.itera[linhaPivo][colunaPivo])
          if(i != linhaPivo)
          {
            if ($scope.itera[i][colunaPivo] != 0)
            {
              
              var operador = $scope.itera[i][colunaPivo] * (-1);

              for(var j=0; j < $scope.qtdColuna; j++)
              {
                // console.log($scope.itera[linhaPivo][j+1])
                 // console.log("operador:"+operador)
                // console.log($scope.itera[i][j+1])

                $scope.itera[i][j+1] = ($scope.itera[linhaPivo][j+1] * operador) + $scope.itera[i][j+1]
               
                // console.log("valor de i:"+i+"  valor de j:"+j)
                 // console.log("linha:"+($scope.itera[linhaPivo][j+1] * operador) + $scope.itera[i][j+1])

              }
            }
          } 
        }
        // console.log($scope.itera);
      }
      cont++;
    }
    else
    {
      $scope.menorValor1 = 0;
    }
  }
  else 
  {
    $scope.menorValor1 = 0;
    $scope.impossivel = "solucao impossivel";
  }






// }
}

//--------------------------------------------------------------------------------------------------
  //resultado

      for(var j=0; j < $scope.valores.variaveis; j++)
      {
        for(var h=0; h < $scope.valores.restricoes; h++)
        {
          if($scope.itera[h][0] == j+1)
          {
            $scope.resultado.push($scope.itera[h][$scope.qtdColuna]);
            aux1 = 1;
          }
        }
        if (aux1 == 0)
        {
          $scope.resultado.push(0);
        }
        aux1 = 0;
      }
    
      for(var j=$scope.valores.variaveis; j < $scope.qtdColuna-1; j++)
      {
        for(var h=0; h < $scope.valores.restricoes; h++)
        {
            if($scope.itera[h][0] == j+1)
            {
              $scope.resultado.push($scope.itera[h][$scope.qtdColuna]);
              aux1 = 1;
            }
        }
          if (aux1 == 0)
          {
            $scope.resultado.push(0);
          }
          aux1 = 0;
      }
      
        $scope.resultado.push($scope.itera[$scope.qtdLinha-1][$scope.qtdColuna]);


//--------------------------------------------------------------------------------------------------
//sensibilidade

$scope.aux = $scope.valores.variaveis;
$scope.limite = [];



//criar matrix sensibilidade
   for(var i=0; i < $scope.valores.restricoes; i++)
   {
    $scope.sensibilidade.push([]);
    for(var j=0; j < 5; j++)
    {
      $scope.sensibilidade[i].push(0);
    }
   }


   //inserir as variaveis de folga
     //base
    for(var i=0; i<$scope.valores.restricoes; i++)
    {
      $scope.aux += 1;
      $scope.sensibilidade[i][0] = $scope.aux;
    }

    //preco sombra
    for(var i=0; i<$scope.valores.restricoes; i++)
    {
      $scope.sensibilidade[i][1] = $scope.itera[$scope.qtdLinha-1][$scope.valores.variaveis+i+1];
    }


    //valor inicial de B
    for(var i=0; i<$scope.valores.restricoes; i++)
    {
      $scope.sensibilidade[i][4] = $scope.base[i];
    }

    $scope.aux = $scope.valores.variaveis;
    var maiorSen = -100;
    var menorSen = 100;
    var aux2 = 0;
    //calculo da sesibilidade

    for(var i=0; i<$scope.valores.restricoes; i++)
    {
      var maiorSen = -99999999;
      var menorSen = 99999999;
      $scope.aux += 1;

      for(var j=0; j<$scope.valores.restricoes; j++)
      {
        if($scope.itera[j][$scope.aux] != 0)
        {
          // console.log("j"+j+"aux"+$scope.aux)
          $scope.limite.push(($scope.itera[j][$scope.qtdColuna]/$scope.itera[j][$scope.aux])*(-1)+$scope.base[i]);
          // console.log("limite"+$scope.limite)
          if($scope.sensibilidade[i][1] == 0)
          {
            $scope.sensibilidade[i][3] = $scope.base[i];

            if($scope.limite[aux2]<menorSen)
            {
              menorSen = $scope.limite[aux2];
              $scope.sensibilidade[i][2] = $scope.limite[aux2];
            }
          }
          else
          {
            if($scope.limite[aux2]>maiorSen)
            {
              maiorSen = $scope.limite[aux2];
              $scope.sensibilidade[i][3] = $scope.limite[aux2];
            }

            if($scope.limite[aux2]<menorSen)
            {
              menorSen = $scope.limite[aux2];
              $scope.sensibilidade[i][2] = $scope.limite[aux2];
            }
          }
          aux2++;
        }
      }
    }




// console.log($scope.resultado);
 




//   for(var i=0; i< $scope.valores.restricoes; i++)
//   {
      
//       if ($scope.base[i]<0)
//       {
//           for(var j=0; j< $scope.valores.variaveis; j++)
//           {
//             $scope.matrixVar[i][j]=(-1)*$scope.matrixVar[i][j];
//           }
//        }
//   }


//   $scope.matrixF = [];
//    // $scope.teste1 = 11;
//   for(var i=0; i< $scope.valores.restricoes; i++)
//   {
//     $scope.matrixF.push([]);
//     if($scope.sinal.nome == "<=")
//     {
//       $scope.teste1 = 111;
//         for(var j=0; j< $scope.valores.variaveis; j++)
//         {
//            if(i == j)
//            {
//             $scope.matrixF[i].push(1);
//            }
//            else
//            {
//             $scope.matrixF[i].push(0);
//            }
//         }
//     }
//     else
//     {
//       if($scope.sinalVar.nome == ">=")
//       {
//           for(var j=0; j< $scope.valores.variaveis; j++)
//           {
//              if(i == j)
//              {
//               $scope.matrixF[i].push(-1);
//              }
//              else
//              {
//               $scope.matrixF[i].push(0);
//              }
//           }
//       }
//       else
//       {
//         if($scope.sinalVar.nome == "=")
//         {
//             for(var j=0; j< $scope.valores.variaveis; j++)
//             {
//               $scope.matrixF[i].push(0);
//             }
//         }
//       }
//     }
//   }


// $scope.iteracoes 
    
//   var  $scope.qtdColuna =  $scope.valores.restricoes +  $scope.valores.variaveis + 1;
//   var $scope.qtdLinha =  $scope.valores.restricoes + 1;

//    for(var i=0; i<$scope.qtdLinha; i++){
//     $scope.iteracoes.
//     for(var j=0; j <  $scope.qtdColuna; j++){
//       $scope.iteracao[i].push();
//     }
//    }

});
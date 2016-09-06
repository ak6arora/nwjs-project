(function() {
  var app = angular.module("nwjs", ['ngRoute', 'ngAnimate','ngMaterial'])
  .run(function(){
  });

  app.config(function($routeProvider) {
    $routeProvider.when('/login', {
        templateUrl: 'pages/login.html',
        controller:'LoginController'
      })
      .otherwise({
        redirectTo: '/login'
      });
  });

  app.controller('LoginController', function($scope,$timeout){
  	$scope.isLoading=false;
  	$scope.login=function(){
  		$scope.isLoading=true;
  		$timeout(function(){
  			$scope.isLoading=false;
  		},2000)
  	}
  })

})();

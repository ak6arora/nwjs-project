(function() {
  var app = angular.module("nwjs", ['ngRoute', 'ngAnimate'])
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

  app.controller('LoginController', function(){
  	// alert('Login Page init')
  })

})();

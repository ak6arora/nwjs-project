(function() {
  var app = angular.module("nwjs", ['ngRoute', 'ngAnimate', 'ngMaterial'])
    .run(function($rootScope, $http) {
      $http.get("demodb.json")
        .success(function(data) {
          $rootScope.db = angular.fromJson(data);
        })
    });

  app.config(function($routeProvider) {
    $routeProvider.when('/login', {
        templateUrl: 'pages/login.html',
        controller: 'LoginController'
      })
      .when('/dashboard',{
        templateUrl: 'pages/dashboard.html',
        controller: 'DashboardController'
      })
      .otherwise({
        redirectTo: '/login'
      });
  });

  app.controller('LoginController', function($rootScope, $scope, $timeout, $mdDialog,$location) {
    $scope.isLoading = false;
    var alert = $mdDialog.alert({
      title: 'Incorrect Username',
      textContent: 'The username you entered doesnot exist',
      ok: 'Close'
    });
    $scope.login = function() {
      $scope.isLoading = true;
      $timeout(function() {
        if ($rootScope.db.users.indexOf($scope.username) > -1) {
          $location.path("/dashboard")
        } else {
          $mdDialog.show(alert)
        }
        $scope.isLoading = false;
      }, 2000)
    }
  })

})();

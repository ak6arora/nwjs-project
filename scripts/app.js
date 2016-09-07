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
      .when('/dashboard', {
        templateUrl: 'pages/dashboard.html',
        controller: 'DashboardController'
      })
      .otherwise({
        redirectTo: '/login'
      });
  });

  app.controller('LoginController', function($rootScope, $scope, $timeout, $mdDialog, $location) {
    $scope.isLoading = false;
    var alert = $mdDialog.alert({
      title: 'Invalid credentials',
      textContent: 'Please check your credentials',
      ok: 'Close'
    });
    $scope.login = function() {
      $scope.isLoading = true;
      $.ajax({
        url: "https://hrm.techaspect.com/symfony/web/index.php/auth/validateCredentials",
        type: 'POST',
        data: $('form').serialize(),
        beforeSend: function() {},
        success: function(data) {
          if (data.indexOf('Invalid credentials') != -1) {
            $scope.isLoading = false;
            $mdDialog.show($mdDialog.alert({
              title: 'Invalid credentials',
              textContent: 'Please check your credentials',
              ok: 'Close'
            }));
          }
          else {
            $location.path("/dashboard");
            $scope.$apply();
          }
        },
        error: function(err) {
          $scope.isLoading = false;
          $mdDialog.show($mdDialog.alert({
            title: 'Server Error',
            textContent: err,
            ok: 'Close'
          }));    
        }
      });

    }
  })

  app.controller('DashboardController', function() {

  })

})();

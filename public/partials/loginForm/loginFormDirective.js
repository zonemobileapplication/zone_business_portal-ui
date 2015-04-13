angular.module('zonePortalApp.directives')
.directive('loginForm', function() {
  return {
  	restrict: 'E',
  	controller: function($scope,$routeParams,$location) {
  		$scope.submitLoginForm = function(form) {
        if(form.$valid)
        {
          var username = $scope.user.email || undefined;
          var password = $scope.user.password || undefined;
          Parse.User.logIn(username, password, {
            success: function(user) {
              $location.path('/');
              $scope.$apply();
            },
            error: function(user, error) {
              alert("Invalid username or password.");
            }
          });
        }
  			
        else {
          alert("Please provide a username and password.");
        }
  		}

  	},
    templateUrl: '/partials/loginForm/loginFormView.html'
  };
});
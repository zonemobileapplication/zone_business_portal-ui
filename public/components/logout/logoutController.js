angular.module('zonePortalApp.controllers').controller('LogoutController', ['$scope','$routeParams','$location', function($scope,$routeParams,$location) {
	Parse.User.logOut();
	$location.path('/');
	
}]);
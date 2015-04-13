angular.module('zonePortalApp.controllers').controller('BusinessInfoController', ['$scope', function($scope) {
	
	$('#business-info-edit').hide();

	$scope.user = {};
	$scope.user.business = Parse.User.current().get("business");
	$scope.user.email = Parse.User.current().get("email");
	$scope.user.location = Parse.User.current().get("location");
	$scope.user.phone = Parse.User.current().get("phone");
	$scope.user.address = Parse.User.current().get("address");
	$scope.user.description = Parse.User.current().get("description");

	$scope.showUpdatePage = function() {
		$('#business-info-display').hide();
		$('#business-info-edit').show();
	}
	$scope.showDisplayPage = function() {
		$scope.user.business = Parse.User.current().get("business");
		$scope.user.email = Parse.User.current().get("email");
		$scope.user.location = Parse.User.current().get("location");
		$scope.user.phone = Parse.User.current().get("phone");
		$scope.user.address = Parse.User.current().get("address");
		$scope.user.description = Parse.User.current().get("description");
		$('#business-info-display').show();
		$('#business-info-edit').hide();
	}
	
}]);
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
		//alert("yo");
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
	$scope.showMoreInfo = function() {
		swal({title: "Business Information", text: "Using this page, you can update your company’s information. The information that you enter will be displayed on the Zone mobile application, as you can see on the iPhone graphic on the right side of the screen.", confirmButtonText: "Got It" });
	}
	
}]);
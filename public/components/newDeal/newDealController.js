angular.module('zonePortalApp.controllers').controller('NewDealController', ['$scope', '$routeParams', '$location', function($scope,$routeParams,$location) {

	$scope.deal = {}
	$scope.deal.rank = "Rank";
	$scope.deal.type = "Deal Type";
	$scope.options = {};
	$scope.options.items = [];
	$scope.options.discount = [];
	$scope.options.discount[0] = "Half Off";

	$scope.submitNewDeal = function(form) {
		if($scope.deal.rank == "Rank" || $scope.deal.school == "School") 
		{
			form.$valid = false;
		}
		if(form.$valid) {
			var user = Parse.User.current();
			var nDeal = Parse.Object.extend("Deals");
			var newDeal = new nDeal();

			var type = "";

			if($scope.deal.type == 1)
			{
				type = $scope.options.discount[1] + "% off of " + $scope.options.items[0];
			}
			else if($scope.deal.type == 2)
			{
				type = "Free " + $scope.options.items[0] + " with purchase of " + $scope.options.items[1];
			}
			else if($scope.deal.type == 3)
			{
				type = "Buy one " + $scope.options.items[0] + " get one " + $scope.options.items[1] + " " + $scope.options.discount[0];
			}

			if($scope.deal.image) 
			{
				var image = $scope.deal.image;
		        var imageBase64= image.replace(/^data:image\/(png|jpeg);base64,/, "");
		        var parseFile = new Parse.File("dealimage", {base64:imageBase64});
				parseFile.save().then(function() {
					console.log("successfully saved image");
				}, function(error) {
				  	console.log(error);
				});
			}
			else {
				var parseFile = undefined;
			}
			

			newDeal.set("vendor",user.id);
			newDeal.set("description",$scope.deal.description);
			newDeal.set("rank",$scope.deal.rank);
			newDeal.set("dealImage", parseFile);
			newDeal.set("type", type);

			newDeal.save(null, {
			  success: function(newDeal) {
			    // Execute any logic that should take place after the object is saved.
			    $location.path('/deals');
			    $scope.$apply();
			  },
			  error: function(newDeal, error) {
			    // Execute any logic that should take place if the save fails.
			    // error is a Parse.Error with an error code and message.
			    alert(error.message);
			  }
			}); 

		}
		else {
			alert("Please fill out all the fields.");
		}
		

	}

	$scope.showMoreInfo = function() {
		swal({title: "Create a Deal", text: "You can upload a deal to the mobile application using the preset options or your own custom deal. To see how the deals will appear on the mobile application, please refer to the iPhone image on the right of the screen. The deal rank option allows you to rank your deals from most valuable (ie the deal that gives the largest discount) to least valuable. The Zone mobile app will then optimize the deal, so that it will get the greatest exposure and number of redemptions based on the “point” value that Zone assigns to the deal on the mobile app. For each deal, please indicate which school you would like the deals to be available for (if you have locations at multiple schools, please choose a school.)", confirmButtonText: "Got It" });
	}
	
}]);
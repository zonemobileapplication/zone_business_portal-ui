angular.module('zonePortalApp.controllers').controller('NewDealController', ['$scope', '$routeParams', '$location', function($scope,$routeParams,$location) {

	$scope.deal = {}
	$scope.deal.rank = "Rank";
	$scope.deal.school = "School";

	$scope.submitNewDeal = function(form) {
		if($scope.deal.rank == "Rank" || $scope.deal.school == "School") 
		{
			form.$valid = false;
		}
		if(form.$valid) {
			var user = Parse.User.current();
			var nDeal = Parse.Object.extend("Deals");
			var newDeal = new nDeal();

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
			

			newDeal.set("cost",$scope.deal.cost);
			newDeal.set("vendor",user.id);
			newDeal.set("description",$scope.deal.description);
			newDeal.set("rank",$scope.deal.rank);
			newDeal.set("school",$scope.deal.school);
			newDeal.set("dealImage", parseFile);

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
	
}]);
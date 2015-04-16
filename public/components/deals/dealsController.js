angular.module('zonePortalApp.controllers').controller('DealsController', ['$scope','$route', function($scope,$route) {
	$scope.deals = [];
	var user = Parse.User.current();
	var DealClass = Parse.Object.extend("Deals");

	$scope.read = function() {
		var q = new Parse.Query(DealClass);
		q.equalTo("Vendor",user.id);
		q.find({
		  success: function(results){
		    for(i in results){
		    	var deals = [];
		    	var dealImage = results[i].get("dealImage");
		    	var image = "";
		    	var width = 0;
		    	if(dealImage) 
		    	{
		    		image = dealImage.url();
		    		width = 50;
		    	}
		    	
		    	var deal = {
		    		description: results[i].get("description"),
		    		rank: results[i].get("rank"),
		    		school: results[i].get("school"),
		    		id: results[i].id,
		    		url: image,
		    		width: width,
		    		type: results[i].get("type")
		    	}
		      $scope.deals.push(deal);    
		    }
		    if($scope.deals.length == 0)
		    {
		    	$scope.message = "There are currently no deals to display.";
		    }
		    else {
		    	$scope.message = "";
		    }
		    $scope.$apply();
		  }
		});

	}
	$scope.delete = function(id) {
		var Deals = Parse.Object.extend("Deals");
		var query = new Parse.Query(Deals);
		query.get(id, {
		  success: function(deal) {
		    deal.destroy({
			  success: function(result) {
			    $route.reload();
			  },
			  error: function(result, error) {
			    // The delete failed.
			    // error is a Parse.Error with an error code and message.
			  }
			});
		  },
		  error: function(object, error) {
		    // The object was not retrieved successfully.
		    // error is a Parse.Error with an error code and message.
		  }
		});
		
	}

	$scope.showMoreInfo = function() {
		swal({title: "Deals", text: "As you can see on the right side of the page in the iPhone image, the name of your restaurant, a photo that you provide when creating your deals, and your most enticing deal will be displayed in the list of deals on the “Deal Zone” of the mobile app. Once you have uploaded one deal, your business’s deals will go live on the mobile app.", confirmButtonText: "Got It" });
	}

	$scope.read();

	
	
}]);
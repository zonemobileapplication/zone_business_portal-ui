angular.module('zonePortalApp.controllers').controller('DealsController', ['$scope','$route', function($scope,$route) {
	$scope.deals = [];
	var user = Parse.User.current();
	var DealClass = Parse.Object.extend("Deals");

	$scope.read = function() {
		var q = new Parse.Query(DealClass);
		q.equalTo("vendor",user.id);
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
		    		cost: results[i].get("cost"),
		    		description: results[i].get("description"),
		    		rank: results[i].get("rank"),
		    		school: results[i].get("school"),
		    		id: results[i].id,
		    		url: image,
		    		width: width
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

	$scope.read();

	
	
}]);
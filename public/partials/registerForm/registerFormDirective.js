angular.module('zonePortalApp.directives')
.directive('registerForm', function() {
  return {
  	restrict: 'E',
  	controller: function($scope,$routeParams,$location) {
  		$scope.user = {};
  		$scope.user.location = "Isla Vista/Santa Barbara";
  		$scope.submitRegisterForm = function(form) {
        
  			if(form.$valid)
  			{
  				var newUser = new Parse.User();
          var nVendor = Parse.Object.extend("Vendors");
          var newVendor = new nVendor();


          //Set new user information
  	  		newUser.set("name", $scope.user.business);
          newUser.set("business", $scope.user.business);
  	  		newUser.set("username", $scope.user.email);
  				newUser.set("email", $scope.user.email);
  				newUser.set("password", $scope.user.password);
  				newUser.set("phone", $scope.user.phone);
  				newUser.set("address", $scope.user.address);
  				newUser.set("location", $scope.user.location);
  				newUser.set("description", $scope.user.description);
          newUser.set("points", 0);

          //Set new vendor information
          newVendor.set("school",$scope.user.location);
          newVendor.set("Name",$scope.user.business);
          newVendor.set("address",$scope.user.address);
          newVendor.set("description",$scope.user.description);


  				newUser.signUp(null, {
  				  success: function(user) {
  				    var username = $scope.user.email || undefined;
              var password = $scope.user.password || undefined;
              Parse.User.logIn(username, password, {
                success: function(user) {
                  newVendor.set("vendorID",user.id);

                  newVendor.save(null, {
                    success: function(newVendor) {
                      // Execute any logic that should take place after the object is saved.
                      console.log('New vendor created with objectId: ' + newVendor.id);
                    },
                    error: function(newVendor, error) {
                      // Execute any logic that should take place if the save fails.
                      // error is a Parse.Error with an error code and message.
                      console.log('Failed to create new vendor, with error code: ' + error.message);
                    }
                  });

                  $location.path('/');
                  $scope.$apply();
                },
                error: function(user, error) {
                  alert("Thanks for registering!");
                }
              });
  				  },
  				  error: function(user, error) {
  				    alert("Error: " + error.code + " " + error.message);
  				  }
  				});
    			}
    			else {
    				alert("Please fill out all the fields.");
    			}
  			
  			
  		}

  	},
    templateUrl: '/partials/registerForm/registerFormView.html'
  };
});
angular.module('zonePortalApp.directives')
.directive('updateInfo', function() {
  return {
  	restrict: 'E',
  	controller: function($scope) {
      var currentUser = Parse.User.current();
  		$scope.user = {};
      $scope.user.business = currentUser.get('business');
      $scope.user.email = currentUser.get('email');
      $scope.user.phone = currentUser.get('phone');
      $scope.user.address = currentUser.get('address');
      $scope.user.description = currentUser.get('description');
  		$scope.user.location = "Isla Vista/Santa Barbara";
  		$scope.submitUpdateInfoForm = function() {

    		currentUser.set("business", $scope.user.business);
    		currentUser.set("username", $scope.user.email);
  			currentUser.set("email", $scope.user.email);
  			currentUser.set("phone", $scope.user.phone);
  			currentUser.set("address", $scope.user.address);
        currentUser.set("location", $scope.user.location);
  			currentUser.set("description", $scope.user.description);
        currentUser.save(null, {
          success: function(user) {
            // Execute any logic that should take place after the object is saved.
           alert("Your information was successfully saved.");
          },
          error: function(user, error) {
            // Execute any logic that should take place if the save fails.
            // error is a Parse.Error with an error code and message.
            alert('Failed to create new object, with error code: ' + error.message);
          }
        });
  			user.signUp(null, {
  			  success: function(user) {
  			    alert("success");
  			  },
  			  error: function(user, error) {
  			    alert("Error: " + error.code + " " + error.message);
  			  }
  			});
  			
  		}

  	},
    templateUrl: '/partials/updateInfo/updateInfoView.html'
  };
});
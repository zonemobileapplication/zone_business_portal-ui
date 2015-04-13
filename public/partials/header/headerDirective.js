angular.module('zonePortalApp.directives', [])
.directive('mainHeader', function() {
  return {
  	restrict: 'E',
  	controller: function($scope) {
  		$scope.navButtons = [];
  		if ( Parse.User.current() != null ) {
  			$scope.navBtns = ["logout","analytics","deals","information"];
	    }     

  	},
    templateUrl: '/partials/header/headerView.html'
  };
});
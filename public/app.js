var zoneApp = angular.module('zonePortalApp',[
	'ngRoute',
	'ui.bootstrap',
	//'parse-angular',
	'zonePortalApp.controllers',
	//'zonePortalApp.services',
	'zonePortalApp.directives'
	]);


zoneApp
.config(['$routeProvider', function($routeProvider) {

	Parse.initialize("QTNQx70P9oEPTP6NllcvEzTgiPOfkhzpHyhyw8d4", "AFnMlJ58ecJ8OzUqOFXQaySKRw9RgTyACXwOtfT0");
	$routeProvider.
	when('/', {
		templateUrl: 'components/businessInfo/businessInfoView.html',
	}).
	when('/login', {
		templateUrl: 'components/login/loginView.html',
	}).
	when('/deals', {
		templateUrl: 'components/deals/dealsView.html',
	}).
	when('/newdeal', {
		templateUrl: 'components/newDeal/newDealView.html',
	}).
	when('/analytics', {
		templateUrl: 'components/analytics/analyticsView.html',
	}).
	when('/logout', {
		templateUrl: '/components/logout/logoutView.html'
	}).
	otherwise({
		redirectTo: '/'
	});

}])
.run( function($rootScope, $location) {

    // register listener to watch route changes
    $rootScope.$on( "$routeChangeStart", function(event, next, current) {
      if ( Parse.User.current() == null ) {
        // no logged user, we should be going to #login
        if ( next.templateUrl == 'components/login/loginView.html' ) {
          // already going to #login, no redirect needed
        } else {
          // not going to #login, we should redirect now
          $location.path( "/login" );
        }
      }      
    });
 })
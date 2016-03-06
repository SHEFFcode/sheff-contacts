'use strict';

angular.module('sheffContacts.contacts', ['ngRoute', 'firebase'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/contacts', {
    templateUrl: 'contacts/contacts.html',
    controller: 'ContactsCtrl'
  });
}])

//contacts controller
.controller('ContactsCtrl', ['$scope', '$firebaseArray', function($scope, $firebaseArray) {
	var ref = new Firebase('https://sheffcontacts.firebaseio.com/contacts');
	$scope.contacts = $firebaseArray(ref);
	$scope.showAddForm = function() {
		$scope.addFormShow = true;

	};
	$scope.hide = function() {
		$scope.addFormShow = false;
	};
	$scope.addFormSubmit = function() {
		console.log('adding contact');
		//assign values to all fields

	};
}]);
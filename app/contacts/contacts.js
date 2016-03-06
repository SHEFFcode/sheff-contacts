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
	//init firebase connection
	var ref = new Firebase('https://sheffcontacts.firebaseio.com/contacts');
	//get contacts
	$scope.contacts = $firebaseArray(ref);
	$scope.showAddForm = function() {
		$scope.addFormShow = true;
		$scope.hidden = true;

	};

	//Hide form
	$scope.hide = function() {
		$scope.addFormShow = false;
		$scope.hidden = false;
	};

	//hide contact
	$scope.hideContact = function() {
		$scope.contactShow = false;
	}

	//submit contact
	$scope.addFormSubmit = function() {
		console.log('adding contact');
		//assign values to all fields
		if ($scope.name) { var name = $scope.name; } else { var name = null; }
		if ($scope.email) { var email = $scope.email; } else { var email = null; }
		if ($scope.company) { var company = $scope.company; } else { var company = null; }
		if ($scope.mobile_phone) { var mobile_phone = $scope.mobile_phone; } else { var mobile_phone = null; }
		if ($scope.home_phone) { var home_phone = $scope.home_phone; } else { var home_phone = null; }
		if ($scope.work_phone) { var work_phone = $scope.work_phone; } else { var work_phone = null; }
		if ($scope.street_address) { var street_address = $scope.street_address; } else { var street_address = null; }
		if ($scope.city) { var city = $scope.city; } else { var city = null; }
		if ($scope.state) { var state = $scope.state; } else { var state = null; }
		if ($scope.zip) { var zip = $scope.zip; } else { var zip = null; }
		if ($scope.city) { var city = $scope.city; } else { var city = null; }

		//build object
		$scope.contacts.$add({
			name: name,
			email: email,
			company: company,
			phones: [
			{
				mobile: mobile_phone,
				home: home_phone,
				work: work_phone
			}
			],
			address: [
			{
				street_address: street_address,
				city: city,
				state: state,
				zip: zip
			}
			]
		})
		.then(function(ref) {
			var id = ref.key();
			console.log('Added contact with id ' + id);

			//clear form
			clearFields();

			//hide form
			$scope.addFormShow = false;

			//send message to user
			$scope.msg = 'Contact Added';

		});
	}

	$scope.showContact = function(contact) {
		//set scope variables equal to contact object variables
		console.log(contact);
		if (contact.name) { $scope.name = contact.name; } else { $scope.name = null; }
		if (contact.email) { $scope.email = contact.email; } else { $scope.email = null; }
		if (contact.comapny) { $scope.comapny = contact.comapny; } else { $scope.comapny = null; }
		if (contact.phones[0].work) { $scope.work_phone = contact.phones[0].work; } else { $scope.work_phone = null; }
		if (contact.phones[0].home) { $scope.home_phone = contact.phones[0].home; } else { $scope.home_phone = null; }
		if (contact.phones[0].mobile) { $scope.mobile_phone = contact.phones[0].mobile; } else { $scope.mobile_phone = null; }
		if (contact.address[0].street_address) { $scope.street_address = contact.address[0].street_address; } else { $scope.street_address = null; }
		if (contact.address[0].city) { $scope.city = contact.address[0].city; } else { $scope.city = null; }
		if (contact.address[0].state) { $scope.state = contact.address[0].state; } else { $scope.state = null; }
		if (contact.address[0].zip) { $scope.zip = contact.address[0].zip; } else { $scope.zip = null; }

		//set contactShow to true
		$scope.contactShow = true;
		$scope.hidden = true;
	};

	//clear $scope fields
	function clearFeilds() {
		$scope.name = '';
		$scope.email = '';
		$scope.company = '';
		$scope.mobile_phone = '';
		$scope.home_phone = '';
		$scope.work_phone = '';
		$scope.street_address = '';
		$scope.city = '';
		$scope.state = '';
		$scope.zip = '';
	}
}]);
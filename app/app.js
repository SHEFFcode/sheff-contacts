'use strict';

// Declare app level module which depends on views, and components
angular.module('sheffContacts', [
  'ngRoute',
  'firebase',
  'sheffContacts.contacts'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/contacts'});
}]);

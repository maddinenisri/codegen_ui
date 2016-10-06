'use strict';

var codgenuiApp = angular.module('maddinenisri.CodegenUi', ['ngAnimate', 'ngResource', 'ui.router', 'ngSanitize'])

.constant('version', 'v0.1.0')

.config(function($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise("/home");

  $stateProvider
    .state('home', {
      url: '/home',
      templateUrl: 'views/home.html'
    })
    .state('home.list', {
      url: '/list',
      templateUrl: 'views/home-list.html',
      controller: function($scope) {
        $scope.dogs = ['Bernese', 'Husky', 'Goldendoodle'];
      }
    })
    // nested list with just some random string data
    .state('home.paragraph', {
      url: '/paragraph',
      template: 'I could sure use a drink right now.'
    })
    .state('features', {
      url: '/features',
      templateUrl: 'views/features.html'
    })
    .state('contact', {
      url: '/contact',
      views: {
        '': { templateUrl: 'views/contact.html' },
        'columnOne@contact': { template: 'Look I am a column!' },
        'columnTwo@contact': {
          templateUrl: 'views/table-data.html',
          controller: 'scotchController'
        },
      }
    })
});

codgenuiApp.controller('scotchController', function($scope) {

  $scope.message = 'Scotch List';

  $scope.scotches = [{
    name: 'Macallan 12',
    price: 50
  }, {
    name: 'Chivas Regal Royal Salute',
    price: 10000
  }, {
    name: 'Glenfiddich 1937',
    price: 20000
  }];

});
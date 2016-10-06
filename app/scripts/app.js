'use strict';

angular.module('maddinenisri.CodegenUi', ['ngAnimate', 'ngResource', 'ui.router', 'ngSanitize'])

  .constant('version', 'v0.1.0')

  .config(function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise("/");

    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'views/home.html'
      })
      .state('features', {
        url: '/features',
        templateUrl: 'views/features.html'
      })
      .state('contact', {
        url: '/contact',
        templateUrl: 'views/contact.html'
      })

  });


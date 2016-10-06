'use strict';

angular.module('maddinenisri.CodegenUi')

  .controller('MainCtrl', function($scope, $location, version) {

    $scope.$path = $location.path.bind($location);
    $scope.version = version;

  });

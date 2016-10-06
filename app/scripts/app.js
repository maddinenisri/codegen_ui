'use strict';

var codgenuiApp = angular.module('maddinenisri.CodegenUi', ['flowchart', 'ngAnimate', 'ngResource', 'ui.router', 'ngSanitize'])

.constant('version', 'v0.1.0')
  .factory('prompt', function() {
    return prompt;
  })
  .config(function(NodeTemplatePathProvider) {
    NodeTemplatePathProvider.setTemplatePath("flowchart/node.html");
  })
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
          'columnOne@contact': {
            templateUrl: 'views/flowchart.html',
            controller: 'flowchartController'
          },
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

codgenuiApp.controller('flowchartController', function($scope, prompt, Modelfactory, flowchartConstants) {
  var deleteKeyCode = 46;
  var ctrlKeyCode = 17;
  var aKeyCode = 65;
  var escKeyCode = 27;
  var nextNodeID = 10;
  var nextConnectorID = 20;
  var ctrlDown = false;

  var model = {
    nodes: [{
      name: "ngFlowchart",
      id: 2,
      x: 400,
      y: 100,
      color: '#000',
      borderColor: '#000',
      connectors: [{
        type: flowchartConstants.bottomConnectorType,
        id: 9
      }, {
        type: flowchartConstants.bottomConnectorType,
        id: 10
      }]
    }, {
      name: "Implemented with AngularJS",
      id: 3,
      x: 400,
      y: 300,
      color: '#F15B26',
      connectors: [{
        type: flowchartConstants.topConnectorType,
        id: 1
      }, {
        type: flowchartConstants.topConnectorType,
        id: 2
      }, {
        type: flowchartConstants.topConnectorType,
        id: 3
      }, {
        type: flowchartConstants.bottomConnectorType,
        id: 4
      }, {
        type: flowchartConstants.bottomConnectorType,
        id: 5
      }, {
        type: flowchartConstants.bottomConnectorType,
        id: 12
      }]
    }, {
      name: "Easy Integration",
      id: 4,
      x: 200,
      y: 600,
      color: '#000',
      borderColor: '#000',
      connectors: [{
        type: flowchartConstants.topConnectorType,
        id: 13
      }, {
        type: flowchartConstants.topConnectorType,
        id: 14
      }, {
        type: flowchartConstants.topConnectorType,
        id: 15
      }]
    }, {
      name: "Customizable templates",
      id: 5,
      x: 600,
      y: 600,
      color: '#000',
      borderColor: '#000',
      connectors: [{
        type: flowchartConstants.topConnectorType,
        id: 16
      }, {
        type: flowchartConstants.topConnectorType,
        id: 17
      }, {
        type: flowchartConstants.topConnectorType,
        id: 18
      }]
    }],
    edges: [{
      source: 10,
      destination: 1
    }, {
      source: 5,
      destination: 14
    }, {
      source: 5,
      destination: 17
    }]
  };


  $scope.flowchartselected = [];
  var modelservice = Modelfactory(model, $scope.flowchartselected);
  $scope.modelservice = modelservice;
  $scope.model = model;

  $scope.keyDown = function(evt) {
    if (evt.keyCode === ctrlKeyCode) {
      ctrlDown = true;
      evt.stopPropagation();
      evt.preventDefault();
    }
  };

  $scope.keyUp = function(evt) {

    if (evt.keyCode === deleteKeyCode) {
      modelservice.deleteSelected();
    }

    if (evt.keyCode == aKeyCode && ctrlDown) {
      modelservice.selectAll();
    }

    if (evt.keyCode == escKeyCode) {
      modelservice.deselectAll();
    }

    if (evt.keyCode === ctrlKeyCode) {
      ctrlDown = false;
      evt.stopPropagation();
      evt.preventDefault();
    }
  };

  $scope.addNewNode = function() {
    var nodeName = prompt("Enter a node name:", "New node");
    if (!nodeName) {
      return;
    }

    var newNode = {
      name: nodeName,
      id: nextNodeID++,
      x: 200,
      y: 100,
      color: '#F15B26',
      connectors: [{
        id: nextConnectorID++,
        type: flowchartConstants.topConnectorType
      }, {
        id: nextConnectorID++,
        type: flowchartConstants.topConnectorType
      }, {
        id: nextConnectorID++,
        type: flowchartConstants.bottomConnectorType
      }, {
        id: nextConnectorID++,
        type: flowchartConstants.bottomConnectorType
      }]
    };

    model.nodes.push(newNode);
  };

  $scope.activateWorkflow = function() {
    angular.forEach($scope.model.edges, function(edge) {
      edge.active = !edge.active;
    });
  };

  $scope.addNewInputConnector = function() {
    var connectorName = prompt("Enter a connector name:", "New connector");
    if (!connectorName) {
      return;
    }

    var selectedNodes = modelservice.nodes.getSelectedNodes($scope.model);
    for (var i = 0; i < selectedNodes.length; ++i) {
      var node = selectedNodes[i];
      node.connectors.push({ id: nextConnectorID++, type: flowchartConstants.topConnectorType });
    }
  };

  $scope.addNewOutputConnector = function() {
    var connectorName = prompt("Enter a connector name:", "New connector");
    if (!connectorName) {
      return;
    }

    var selectedNodes = modelservice.nodes.getSelectedNodes($scope.model);
    for (var i = 0; i < selectedNodes.length; ++i) {
      var node = selectedNodes[i];
      node.connectors.push({ id: nextConnectorID++, type: flowchartConstants.bottomConnectorType });
    }
  };

  $scope.deleteSelected = function() {
    modelservice.deleteSelected();
  };

  $scope.callbacks = {
    edgeDoubleClick: function() {
      console.log('Edge double clicked.');
    },
    edgeMouseOver: function() {
      console.log('mouserover')
    },
    isValidEdge: function(source, destination) {
      return source.type === flowchartConstants.bottomConnectorType && destination.type === flowchartConstants.topConnectorType;
    },
    nodeCallbacks: {
      'doubleClick': function(event) {
        console.log('Node was doubleclicked.')
      }
    }
  };
});
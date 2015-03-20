'use strict';

var gameBoard = require('./gameBoard.js');
var tutorial = require('./tutorial.js');

// routeApp controlls the different views for this page
var routeApp = angular.module('routeApp', [
  'ngRoute',
  'tutApp',
  'gameApp'
  ]);

routeApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/', {
        templateUrl: './tutorial',
        controller: 'tutorialController as tCtrl'
      }).
      when('/game', {
        templateUrl: './game',
        controller: 'gameController as gCtrl'
      }).
      otherwise({
        redirectTo: '/game'
      });
  }]);
'use strict';

/* App Module */

var myApp = angular.module('myApp', [
  'ngRoute',
  'mainControllers',
  'mainDirectives'
]);

myApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
        when('/index', {
          templateUrl: 'partials/index.html'}).
        when('/reg', {
          templateUrl: 'partials/reg.html',
          controller: 'FormCtrl'
        }).
        when('/regresult', {
          templateUrl: 'partials/regresult.html'
        }).   
        when('/abyss', {
          templateUrl: 'partials/abyss.html', 
          controller: 'AbyssCtrl'
        }).
        when('/legions', {
          templateUrl: 'partials/legions.html', 
          controller: 'LegionsCtrl'
        }).
		when('/players', {
          templateUrl: 'partials/players.html', 
          controller: 'PlayersCtrl'
        }).
        otherwise({
          redirectTo: '/index'
      });
  }
]);
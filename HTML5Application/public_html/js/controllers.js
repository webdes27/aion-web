'use strict';

/* Controllers */

var mainControllers = angular.module('mainControllers', []);

var url = 'http://aion.kristal-lab.ru/client/index.php/site/getdata?callback=JSON_CALLBACK';

mainControllers.controller('HelloCntl', ['$scope',
function($scope) {
  $scope.name = 'мир';
}
]);

mainControllers.controller('AbyssCtrl', ['$scope', '$http',
function($scope, $http) {
	$http.jsonp(url, {params : {type : "abyss"}}).
	success(function(data, status, headers, config) {
	  $scope.abyss = data;
	});
}
]);

mainControllers.controller('LegionsCtrl', ['$scope', '$http',
function($scope, $http) {
	$http.jsonp(url, {params : {type : "legions"}}).
	success(function(data, status, headers, config) {
	  $scope.legions = data;
	});
}
]);

mainControllers.controller('PlayersCtrl', ['$scope', '$http',
function($scope, $http) {
	$http.jsonp(url, {params : {type : "players"}}).
	success(function(data, status, headers, config) {
	  $scope.players = data;
	});
}
]);



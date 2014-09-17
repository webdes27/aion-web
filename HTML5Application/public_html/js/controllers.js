'use strict';

/* Controllers */

var mainControllers = angular.module('mainControllers', []);

var url = 'http://aion.kristal-lab.ru/client/index.php/site/getdata?callback=JSON_CALLBACK';

mainControllers.controller('AbyssCtrl', ['$scope', '$http',
function($scope, $http) {

	$http.jsonp(url, {params : {type : "abyss"}}).
	success(function(data, status, headers, config) {
	  $scope.abyss = data;
	});
	
	$http.get('data/ranks.json').success(function(data){
	   $scope.ranks=data; 
	});
	
	$scope.getRankById = function(id){
		var data = $scope.ranks;
		function getName(code) {
		  return data.filter(
			  function(data){return data.id == code}
		  );
		}
		var found = getName(id);
		return found[0].name;
	}
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
	
	$http.get('data/world.json').success(function(data){
	   $scope.world=data; 
	});
	
	$scope.getWorld = function(id){
		var data = $scope.world;
		function getName(code) {
		  return data.filter(
			  function(data){return data.world_id == code}
		  );
		}
		var found = getName(id);
		if (typeof found[0] === "undefined") {
		return 'Не известно';
		} else {
		return found[0].name;
		}
	}
	
	$http.get('data/titles.json').success(function(data){
	   $scope.titles=data; 
	});
	
	$scope.getTitle = function(id){
		var data = $scope.titles;
		function getName(code) {
		  return data.filter(
			  function(data){return data.title_id == code}
		  );
		}
		var found = getName(id);
		if (typeof found[0] === "undefined") {
		return '-';
		} else {
		return found[0].name;
		}
	}
        
	$http.get('data/level.json').success(function(data){
	   $scope.levels=data; 
	});

        $scope.getLevelByExp = function(exp) {
            var data = $scope.levels;
            var level = 0;
            for (var k in data) {
                if (parseInt(exp) <= parseInt(data[k].exp)) {
                    level = data[k].level;
                    break;
                }
            }
            return level;
        };
}
]);

mainControllers.controller('FormCtrl', ['$scope', '$http', '$location', '$rootScope',
    function($scope, $http, $location, $rootScope) {
        $scope.formData = {};
        $scope.processForm = function() {
                $http({
                method  : 'POST',
                url     : 'http://host3/index.php/site/signupjson',
                data    : $.param($scope.formData),  // pass in data as strings
                headers : { 'Content-Type': 'application/x-www-form-urlencoded' }  // set the headers so angular passing info as form data (not request payload)
            })
                .success(function(data) {
                    console.log(data);

                    if (!data.success) {
                        // if not successful, bind errors to error variables
                        $scope.errorName = (typeof data.errors.name !== "undefined") ? data.errors.name[0] : '';
                        $scope.errorPassword = (typeof data.errors.password !== "undefined") ? data.errors.password[0] : '';
                        $scope.errorEmail = (typeof data.errors.email !== "undefined") ?  data.errors.email[0] : '';
                    } else {
                        // if successful, bind success message to message
                        $scope.message = data.message;
                        $rootScope.reg = { message: data.message };
                        $location.path('/regresult');
                    }
                });
        };

    }
]);


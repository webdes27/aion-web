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
	
	$scope.getLevelByExp = function(exp) {
		var level;
		if (exp <= 0) {level = "1";}
		else if (exp <= 650) {level = "1";}
		else if (exp <= 2567) {level = "2";}
		else if (exp <= 6797) {level = "3";}
		else if (exp <= 15490) {level = "4";}
		else if (exp <= 30073) {level = "5";}
		else if (exp <= 52958) {level = "6";}
		else if (exp <= 87894) {level = "7";}
		else if (exp <= 140329) {level = "8";}
		else if (exp <= 213454) {level = "9";}
		else if (exp <= 307558) {level = "10";}
		else if (exp <= 438553) {level = "11";}
		else if (exp <= 608161) {level = "12";}
		else if (exp <= 825336) {level = "13";}
		else if (exp <= 1091985) {level = "14";}
		else if (exp <= 1418170) {level = "15";}
		else if (exp <= 1810467) {level = "16";}
		else if (exp <= 2332547) {level = "17";}
		else if (exp <= 3002260) {level = "18";}
		else if (exp <= 3820082) {level = "19";}
		else if (exp <= 4820229) {level = "20";}
		else if (exp <= 6115323) {level = "21";}
		else if (exp <= 7665200) {level = "22";}
		else if (exp <= 9667124) {level = "23";}
		else if (exp <= 12015782) {level = "24";}
		else if (exp <= 14702523) {level = "25";}
		else if (exp <= 17819939) {level = "26";}
		else if (exp <= 21422200) {level = "27";}
		else if (exp <= 25434736) {level = "28";}
		else if (exp <= 30111208) {level = "29";}
		else if (exp <= 35939440) {level = "30";}
		else if (exp <= 42747682) {level = "31";}
		else if (exp <= 50838806) {level = "32";}
		else if (exp <= 60528213) {level = "33";}
		else if (exp <= 73197342) {level = "34";}
		else if (exp <= 89321807) {level = "35";}
		else if (exp <= 109063829) {level = "36";}
		else if (exp <= 135085670) {level = "37";}
		else if (exp <= 165021833) {level = "38";}
		else if (exp <= 201169803) {level = "39";}
		else if (exp <= 243343723) {level = "40";}
		else if (exp <= 292699203) {level = "41";}
		else if (exp <= 350659083) {level = "42";}
		else if (exp <= 415031452) {level = "43";}
		else if (exp <= 485413854) {level = "44";}
		else if (exp <= 559280864) {level = "45";}
		else if (exp <= 643809037) {level = "46";}
		else if (exp <= 741317548) {level = "47";}
		else if (exp <= 853743989) {level = "48";}
		else if (exp <= 982653882) {level = "49";}
		else if (exp <= 1128723910) {level = "50";}
		else if (exp <= 1306188688) {level = "51";}
		else if (exp <= 1510443689) {level = "52";}
		else if (exp <= 1746929453) {level = "53";}
		else if (exp <= 2018321807) {level = "54";}
		else if (exp <= 2320050276) {level = "55";}
		else if (exp <= 2666120304) {level = "56";}
		else if (exp <= 3052865037) {level = "57";}
		else if (exp <= 3476726163) {level = "58";}
		else if (exp <= 3945498124) {level = "59";}
		else if (exp <= 4448612196) {level = "60";}
		return level; 
	};
}
]);




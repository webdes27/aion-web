'use strict';

/* Directives */

var mainDirectives = angular.module('mainDirectives', []);

mainDirectives.directive('compNavbar', function(){
return {
    restrict: 'E',
    replace: true,
    transclude: true,
    scope: true,
    templateUrl: 'partials/menu.html',
    controller: function($scope, $element, $location){
        $scope.isActive = function(viewLocation){
            var active = false;
            if(viewLocation === $location.path()){
                active = true;
            }
            return active;
        }
    }
 }
});

mainDirectives.directive('statNavbar', function(){
return {
    restrict: 'E',
    replace: true,
    transclude: true,
    scope: true,
    templateUrl: 'partials/stat.html',
    controller: function($scope, $http) {
		var url = 'http://aion.kristal-lab.ru/client/index.php/site/getdata?callback=JSON_CALLBACK';
		$http.jsonp(url, {params : {type : "stat"}}).
		success(function(data, status, headers, config) {
		  $scope.stat = data;
		});
	}
 }
});
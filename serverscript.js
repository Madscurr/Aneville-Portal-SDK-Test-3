angular.module('PortalApp')

.controller('widgetCtrl', ['$scope','$http','$q', function ($scope, $http, $q) {
  
  $scope.portalHelpers.config={
    "title":"Aneville Portal SDK Test 3",
    "icon":"icon-club"
  };
  
  // Initialize input variable
  $scope.insertValue = {value:""};

  // Show loading message in the first column
  $scope.portalHelpers.showView('loading.html',1);
  
  // Show loading animation
  $scope.portalHelpers.toggleLoading(true);	
  
  // Ensure table structure is setup
  $scope.portalHelpers.invokeServerFunction('init').then(function(){
  	$scope.portalHelpers.invokeServerFunction('getData').then(function(result){
    	$scope.dbData = result;
    });
  });
  
  // Get data for the widget
  $http.get('/ImportantLinks/JSONSource').success(function(data){
	// Make data available in the scope
  	$scope.links = data;
	// Turn off loading animation
    $scope.portalHelpers.toggleLoading(false);	
	// Show main view
    $scope.portalHelpers.showView('main.html',1);
  });
  
  // Insert a value into the database
  $scope.insertData = function(){
  	if($scope.insertValue.length>50)
      alert('value should be less than 50 characters');
    else{
      	$scope.portalHelpers.invokeServerFunction('insert',{value:$scope.insertValue.value}).then(function(result){
        	$scope.dbData = result;
        });
    }
  }
  
}])
// Custom directive example
.directive('DirectiveName', ['$http', function ($http) {
    return {
        link: function (scope, el, attrs) {
          	
        }
    };
}])
// Custom filter example
.filter('FilterName', function () {
      return function (input, arg1, arg2) {
		var output = input;
        return output;
      }
});
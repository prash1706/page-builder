var myPageApp = angular.module('myPageApp', []);

myPageApp.controller('showPageCtrl', function($scope) {
});

myPageApp.controller('createPageCtrl', function($scope, $rootScope){
  $scope.submit = function(){
    $rootScope = $scope;
  }
});

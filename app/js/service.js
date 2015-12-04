var serviceApp = angular.module('serviceApp', []);
serviceApp.factory('DataService', function($http) {
  return {
    saveData: function(data, success, error) {
      $http.put('/save', data).success(success).error(error);
    },
    getData: function(success, error) {
      $http.get('/get').success(success).error(error);
    },
    createPage: function(data, success, error) {
      $http.post('/page', data).success(success).error(error);
    }
  };
});

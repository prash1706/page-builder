var myPageApp = angular.module('myPageApp', ['ui.router', 'ngFileUpload']);

myPageApp.controller('SetMainCtrl', ['$scope', '$http', '$timeout', '$state', '$rootScope', 'Upload', function($scope, $http, $timeout, $state, $rootScope, Upload) {
  function setState() {
    if ($state.current.name == "setting.leadspace") {
      $scope.currentPage = 0;
    } else if ($state.current.name == "setting.definition1") {
      $scope.currentPage = 1;
    } else if ($state.current.name == "setting.definition2") {
      $scope.currentPage = 2;
    } else if ($state.current.name == "setting.promotion1") {
      $scope.currentPage = 3;
    } else if ($state.current.name == "setting.promotion2") {
      $scope.currentPage = 4;
    } else if ($state.current.name == "setting.promotion3") {
      $scope.currentPage = 5;
    } else if ($state.current.name == "setting.discovery") {
      $scope.currentPage = 6;
    } else if ($state.current.name == "setting.contact") {
      $scope.currentPage = 7;
    };
  };
  setState();

  $scope.createPage = function() {
    console.log($rootScope.data.setting);
    $('#createBtn').button('loading');
    var data = $rootScope.data;
    $http.put('/tempsave', data).then(function(res) {
      console.log('Save file');
      $timeout(function() {
        $('#createBtn').button('reset');
        window.open('#/myPage', '_blank');
      }, 500);
    }, function(res) {
      alert('Save failed!');
    });
  };

  $scope.save = function() {
    var data = $rootScope.data;
    $('#saveBtn').button('loading');
    $http.put('/save', data).then(function(res) {
      console.log('Save file');
    }, function(res) {
      alert('Save failed!');
    });
    $('#saveBtn').button('reset');
  };

  $scope.setFiles = function(element) {
    $scope.$apply(function($scope) {
      $scope.myFile = element.files[0];
      $('#loadBtn').button('loading');
      Upload.upload({
        url: '/upload',
        method: 'POST',
        data: {
          file: $scope.myFile,
        },
      }).then(function(response) {
        $scope.parseFile();
      }, function(response) {
        alert('Load failed!');
      });
      $('#loadBtn').button('reset');
    });
  };

  $scope.parseFile = function() {
    $http.get('./tmp/setting.json').then(function(res) {
      $rootScope.data = res.data;
    }, function(res) {
      console.log(res);
      alert('Get json file failed!');
    });
  };
}]);

myPageApp.controller('SetLeadSpaceCtrl', function($scope) {});

myPageApp.controller('SetDefinition1Ctrl', function($scope, $rootScope, $timeout) {
  $scope.tempSetting = {
    type: $rootScope.data.setting.definition1.type,
    substyle: $rootScope.data.setting.definition1.substyle
  };

  $scope.mySetting = {
    type: $rootScope.data.setting.definition1.type,
    substyle: $rootScope.data.setting.definition1.substyle
  };

  $scope.$watch(function() {
    return $rootScope.data.setting.definition1;
  }, function() {
    $scope.mySetting = $rootScope.data.setting.definition1;
    $scope.tempSetting = $rootScope.data.setting.definition1;
    console.log($rootScope.data.setting.definition1);
  });

  $scope.showWarning = false;
  $scope.isRequired = true;
  $scope.introColCount = "4";
  $scope.isStyleSelect = true;

  function autoHideWarning() {
    $scope.showWarning = true;
    $timeout(function() {
      $scope.showWarning = false;
    }, 3000);
  };

  $scope.setStyle = function() {
    if ($scope.tempSetting.type == 1) {
      if ($scope.tempSetting.substyle < 1 || $scope.tempSetting.substyle > 4) {
        autoHideWarning();
        return;
      }
    } else if ($scope.tempSetting.type == 2) {
      if ($scope.tempSetting.substyle < 5 || $scope.tempSetting.substyle > 6) {
        autoHideWarning();
        return;
      }
    } else if ($scope.tempSetting.type == 3) {
      if ($scope.tempSetting.substyle < 7 || $scope.tempSetting.substyle > 14) {
        autoHideWarning();
        return;
      }
    } else {
      return;
    }
    $rootScope.data.setting.definition1.type = $scope.tempSetting.type;
    $rootScope.data.setting.definition1.substyle = $scope.tempSetting.substyle;
    $scope.mySetting.type = $scope.tempSetting.type;
    $scope.mySetting.substyle = $scope.tempSetting.substyle;
    $('#myModal').modal('hide');
  }
});

myPageApp.controller('SetDefinition2Ctrl', function($scope, $rootScope, $timeout) {
  $scope.tempSetting = {
    type: $rootScope.data.setting.definition2.type,
    substyle: $rootScope.data.setting.definition2.substyle
  };

  $scope.mySetting = {
    type: $rootScope.data.setting.definition2.type,
    substyle: $rootScope.data.setting.definition2.substyle
  };

  $scope.$watch(function() {
    return $rootScope.data.setting.definition2;
  }, function() {
    $scope.mySetting = $rootScope.data.setting.definition2;
    console.log($rootScope.data.setting.definition2);
  });

  $scope.showWarning = false;
  $scope.isRequired = true;
  $scope.introColCount = "4";

  function autoHideWarning() {
    $scope.showWarning = true;
    $timeout(function() {
      $scope.showWarning = false;
    }, 3000);
  };
  $scope.setStyle = function() {
    if ($scope.tempSetting.type == 1) {
      if ($scope.tempSetting.substyle < 1 || $scope.tempSetting.substyle > 4) {
        autoHideWarning();
        return;
      }
    } else if ($scope.tempSetting.type == 2) {
      if ($scope.tempSetting.substyle < 5 || $scope.tempSetting.substyle > 6) {
        autoHideWarning();
        return;
      }
    } else if ($scope.tempSetting.type == 3) {
      if ($scope.tempSetting.substyle < 7 || $scope.tempSetting.substyle > 14) {
        autoHideWarning();
        return;
      }
    } else {
      return;
    }
    $rootScope.data.setting.definition2.type = $scope.tempSetting.type;
    $rootScope.data.setting.definition2.substyle = $scope.tempSetting.substyle;
    $scope.mySetting.type = $scope.tempSetting.type;
    $scope.mySetting.substyle = $scope.tempSetting.substyle;
    $('#myModal').modal('hide');
  }
});

myPageApp.controller('SetPromotionCtrl', function($scope) {});

myPageApp.controller('SetDiscoveryCtrl', function($scope) {});

myPageApp.controller('SetContactCtrl', function($scope) {});

myPageApp.controller('MyPageCtrl', function($scope, $http, $rootScope) {
  $http.get('./tmp/temp.json').then(function(res) {
    $rootScope.data = res.data;
    console.log(res.data);
  }, function(res) {
    console.log(res);
  });
});

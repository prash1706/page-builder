var myPageApp = angular.module('myPageApp', ['ui.router']);

myPageApp.controller('SetMainCtrl', function($scope, $state, $rootScope) {
  $scope.setting = {
    definition1: {
      type: 0,
      substyle: 0
    },
    definition2: {
      type: 0,
      substyle: 0
    },
  };

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
});

myPageApp.controller('SetLeadSpaceCtrl', function($scope) {});

myPageApp.controller('SetDefinition1Ctrl', function($scope, $timeout) {
  $scope.tempSetting = {
    type: 0,
    substyle: 0
  };

  $scope.mySetting = {
    type: 3,
    substyle: 7
  };

  $scope.introColCount = "4";
  $scope.tempSetting.type = $scope.setting.definition1.type;
  $scope.tempSetting.substyle = $scope.setting.definition1.substyle;
  $scope.showWarning = false;
  $scope.isRequired = true;

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
    } else{
      return;
    }
    $scope.setting.definition1.type = $scope.tempSetting.type;
    $scope.setting.definition1.substyle = $scope.tempSetting.substyle;
    $scope.mySetting.type = $scope.tempSetting.type;
    $scope.mySetting.substyle = $scope.tempSetting.substyle;
    $('#myModal').modal('hide');
  }
});

myPageApp.controller('SetDefinition2Ctrl', function($scope, $timeout) {
  $scope.tempSetting = {
    type: 0,
    substyle: 0
  };

  $scope.mySetting = {
    type: 0,
    substyle: 0
  };

  $scope.tempSetting.type = $scope.setting.definition2.type;
  $scope.tempSetting.substyle = $scope.setting.definition2.substyle;
  $scope.showWarning = false;
  $scope.isRequired = false;

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
    }
    $scope.setting.definition2.type = $scope.tempSetting.type;
    $scope.setting.definition2.substyle = $scope.tempSetting.substyle;
    $scope.mySetting.type = $scope.tempSetting.type;
    $scope.mySetting.substyle = $scope.tempSetting.substyle;
    $('#myModal').modal('hide');
  }
});

myPageApp.controller('SetPromotionCtrl', function($scope) {});

myPageApp.controller('SetDiscoveryCtrl', function($scope) {});

myPageApp.controller('SetContactCtrl', function($scope) {});

myPageApp.controller('MyPageCtrl', function($scope, $rootScope) {});

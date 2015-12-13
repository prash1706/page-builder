var myPageApp = angular.module('myPageApp', ['ui.router', 'serviceApp']);

myPageApp.controller('SetMainCtrl', ['$scope', '$http', '$timeout', '$state', '$rootScope', 'DataService', function($scope, $http, $timeout, $state, $rootScope, DataService) {
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
  $scope.$watch(function() {
    return $state.current.name
  }, function() {
    setState();
  });

  $scope.settingData = [];
  $scope.settingData.push(DataService.getDefaultData);
  DataService.getData(function(res) {
    $scope.settingData = $scope.settingData.concat(res);
  }, function(res) {
    console.log("Get Templates Failed.")
  });
  // $scope.settingData = DataService.getDefaultData;

  $scope.currentData = null;
  $scope.tarData = null;
  $scope.tarName = null;
  $scope.templateName = null;
  $scope.result = 0;

  function showResult(result, name) {
    $scope.result = result;
    $scope.templateName = name;
    $timeout(function() {
      $scope.result = 0;
    }, 2000);
  }

  $scope.load = function() {
    $rootScope.data = $scope.currentData.data;
  };

  $scope.createPage = function() {
    $('#createBtn').button('loading');
    var data = $rootScope.data;
    DataService.createPage(data, function(res) {
      $timeout(function() {
        $('#createBtn').button('reset');
        window.open('../tmp/test.html', '_blank');
      }, 500);
    }, function(res) {
      showResult(7,"");
      $('#createBtn').button('reset');
    });
  };

  $scope.add = function() {
    if ($scope.tarName == "" || $scope.tarName == "default") {
      showResult(2, $scope.tarName);
      $('#addModal').modal('hide');
    } else {
      var isRight = true;
      for (var i = 0; i < $scope.settingData.length; i++) {
        if ($scope.settingData[i].name == $scope.tarName) {
          isRight = false;
          $('#addModal').modal('hide');
          showResult(2, $scope.tarName);
          break;
        }
      };
      if (isRight) {
        var data = {};
        data.name = $scope.tarName;
        if ($scope.tarData){
          data.data = $scope.tarData.data;
        };
        DataService.add(data, function(res) {
          showResult(1, $scope.tarName);
          $scope.settingData.push(res);
          $('#addModal').modal('hide');
        }, function(res) {
          showResult(2, $scope.tarName);
          $('#addModal').modal('hide');
        })
      }
    }
  };

  $scope.delete = function(){
    DataService.delete($scope.currentData, function(res){
      for(var i = 0; i < $scope.settingData.length; i++){
        if ($scope.settingData[i].name == $scope.currentData.name){
          $scope.settingData.splice(i, 1);
          showResult(3, $scope.currentData.name);
          break;
        };
      }
    }, function(res){
      showResult(4, $scope.currentData.name);
    })
  };

  $scope.save = function() {
    $('#saveBtn').button('loading');
    var data = {
      name: $scope.currentData.name,
      data: $rootScope.data
    };
    DataService.saveData(data, function(res) {
      for (var i = 0; i < $scope.settingData.length; i++) {
        if ($scope.settingData[i].name == $scope.currentData.name) {
          $scope.settingData.data = data.data;
          $scope.currentData.data = data.data;
          break;
        }
      };
      $timeout(function() {
        $('#saveBtn').button('reset');
        showResult(5, $scope.currentData.name);
      }, 1000);
    }, function(res) {
      showResult(6, $scope.currentData.name);
      $('#saveBtn').button('reset');
    })
  };
}]);

myPageApp.controller('SetLeadSpaceCtrl', function($scope, $rootScope) {

});

myPageApp.controller('SetDefinition1Ctrl', function($scope, $rootScope, $timeout) {
  $scope.mySetting = {
    type: $rootScope.data.setting.defi1.type,
    substyle: $rootScope.data.setting.defi1.substyle
  };

  $scope.$watch(function() {
    return $rootScope.data.setting.defi1;
  }, function() {
    $scope.mySetting = $rootScope.data.setting.defi1;
  });

  $scope.showWarning1 = false;
  $scope.showWarning2 = false;
  $scope.isRequired = true;
  $scope.introColCount = "4";

  function autoHideWarning() {
    $timeout(function() {
      $scope.showWarning1 = false;
      $scope.showWarning2 = false;
    }, 2000);
  };

  $scope.setStyle = function() {
    if ($scope.tempSetting.type == 1) {
      if ($scope.tempSetting.substyle < 1 || $scope.tempSetting.substyle > 4) {
        $scope.showWarning2 = true;
        autoHideWarning();
        return;
      }
    } else if ($scope.tempSetting.type == 2) {
      if ($scope.tempSetting.substyle < 5 || $scope.tempSetting.substyle > 6) {
        $scope.showWarning2 = true;
        autoHideWarning();
        return;
      }
    } else if ($scope.tempSetting.type == 3) {
      if ($scope.tempSetting.substyle < 7 || $scope.tempSetting.substyle > 14) {
        $scope.showWarning2 = true;
        autoHideWarning();
        return;
      }
    } else if ($scope.tempSetting.type == 0) {
      $scope.showWarning1 = true;
      autoHideWarning();
      return;
    }
    $rootScope.data.setting.defi1.type = $scope.tempSetting.type;
    $rootScope.data.setting.defi1.substyle = $scope.tempSetting.substyle;
    $scope.mySetting.type = $scope.tempSetting.type;
    $scope.mySetting.substyle = $scope.tempSetting.substyle;
    $('#defi1Modal').modal('hide');
  };

  $scope.getStyle = function() {
    $scope.tempSetting = {
      type: $rootScope.data.setting.defi1.type,
      substyle: $rootScope.data.setting.defi1.substyle
    };
  };
});

myPageApp.controller('SetDefinition2Ctrl', function($scope, $rootScope, $timeout) {
  $scope.mySetting = {
    type: $rootScope.data.setting.defi2.type,
    substyle: $rootScope.data.setting.defi2.substyle
  };

  $scope.$watch(function() {
    return $rootScope.data.setting.defi2;
  }, function() {
    $scope.mySetting = $rootScope.data.setting.defi2;
  });

  $scope.showWarning1 = false;
  $scope.showWarning2 = false;
  $scope.isRequired = true;
  $scope.introColCount = "4";

  function autoHideWarning() {
    $timeout(function() {
      $scope.showWarning1 = false;
      $scope.showWarning2 = false;
    }, 2000);
  };

  $scope.setStyle = function() {
    if ($scope.tempSetting.type == 1) {
      if ($scope.tempSetting.substyle < 1 || $scope.tempSetting.substyle > 4) {
        $scope.showWarning2 = true;
        autoHideWarning();
        return;
      }
    } else if ($scope.tempSetting.type == 2) {
      if ($scope.tempSetting.substyle < 5 || $scope.tempSetting.substyle > 6) {
        $scope.showWarning2 = true;
        autoHideWarning();
        return;
      }
    } else if ($scope.tempSetting.type == 3) {
      if ($scope.tempSetting.substyle < 7 || $scope.tempSetting.substyle > 14) {
        $scope.showWarning2 = true;
        autoHideWarning();
        return;
      }
    } else if ($scope.tempSetting.type == 0) {
      $scope.showWarning1 = true;
      autoHideWarning();
      return;
    }
    $rootScope.data.setting.defi2.type = $scope.tempSetting.type;
    $rootScope.data.setting.defi2.substyle = $scope.tempSetting.substyle;
    $('#defi2Modal').modal('hide');
  };

  $scope.getStyle = function() {
    $scope.tempSetting = {
      type: $rootScope.data.setting.defi2.type,
      substyle: $rootScope.data.setting.defi2.substyle
    };
  };

  $scope.deleteStyle = function() {
    $rootScope.data.setting.defi2.type = 0;
    $rootScope.data.setting.defi2.substyle = 0;
    $('#defi2Modal').modal('hide');
  };
});

myPageApp.controller('SetPromotion1Ctrl', function($scope, $rootScope, $timeout) {
  $scope.mySetting = {
    type: $rootScope.data.setting.prom1.type,
    substyle: $rootScope.data.setting.prom1.substyle
  };

  $scope.$watch(function() {
    return $rootScope.data.setting.prom1;
  }, function() {
    $scope.mySetting = $rootScope.data.setting.prom1;
  });

  $scope.showWarning1 = false;
  $scope.showWarning2 = false;
  $scope.isRequired = true;
  $scope.introColCount = "4";

  function autoHideWarning() {
    $timeout(function() {
      $scope.showWarning1 = false;
      $scope.showWarning2 = false;
    }, 2000);
  };

  $scope.setStyle = function() {
    if ($scope.tempSetting.type == 1) {
      if ($scope.tempSetting.substyle < 1 || $scope.tempSetting.substyle > 2) {
        $scope.showWarning2 = true;
        autoHideWarning();
        return;
      }
    } else if ($scope.tempSetting.type == 2) {
      if ($scope.tempSetting.substyle < 3 || $scope.tempSetting.substyle > 6) {
        $scope.showWarning2 = true;
        autoHideWarning();
        return;
      }
    } else if ($scope.tempSetting.type == 3) {
      if ($scope.tempSetting.substyle < 7 || $scope.tempSetting.substyle > 8) {
        $scope.showWarning2 = true;
        autoHideWarning();
        return;
      }
    } else if ($scope.tempSetting.type == 4) {
      if ($scope.tempSetting.substyle < 9 || $scope.tempSetting.substyle > 10) {
        $scope.showWarning2 = true;
        autoHideWarning();
        return;
      }
    } else if ($scope.tempSetting.type == 0) {
      $scope.showWarning1 = true;
      autoHideWarning();
      return;
    }
    $rootScope.data.setting.prom1.type = $scope.tempSetting.type;
    $rootScope.data.setting.prom1.substyle = $scope.tempSetting.substyle;
    $('#prom1Modal').modal('hide');
  };

  $scope.getStyle = function() {
    $scope.tempSetting = {
      type: $rootScope.data.setting.prom1.type,
      substyle: $rootScope.data.setting.prom1.substyle
    };
  };

  $scope.deleteStyle = function() {
    $rootScope.data.setting.prom1.type = 0;
    $rootScope.data.setting.prom1.substyle = 0;
    $('#prom1Modal').modal('hide');
  };
});

myPageApp.controller('SetPromotion2Ctrl', function($scope, $rootScope, $timeout) {
  $scope.mySetting = {
    type: $rootScope.data.setting.prom2.type,
    substyle: $rootScope.data.setting.prom2.substyle
  };

  $scope.$watch(function() {
    return $rootScope.data.setting.prom2;
  }, function() {
    $scope.mySetting = $rootScope.data.setting.prom2;
  });

  $scope.showWarning1 = false;
  $scope.showWarning2 = false;
  $scope.isRequired = true;
  $scope.introColCount = "4";

  function autoHideWarning() {
    $timeout(function() {
      $scope.showWarning1 = false;
      $scope.showWarning2 = false;
    }, 2000);
  };

  $scope.setStyle = function() {
    if ($scope.tempSetting.type == 1) {
      if ($scope.tempSetting.substyle < 1 || $scope.tempSetting.substyle > 2) {
        $scope.showWarning2 = true;
        autoHideWarning();
        return;
      }
    } else if ($scope.tempSetting.type == 2) {
      if ($scope.tempSetting.substyle < 3 || $scope.tempSetting.substyle > 6) {
        $scope.showWarning2 = true;
        autoHideWarning();
        return;
      }
    } else if ($scope.tempSetting.type == 3) {
      if ($scope.tempSetting.substyle < 7 || $scope.tempSetting.substyle > 8) {
        $scope.showWarning2 = true;
        autoHideWarning();
        return;
      }
    } else if ($scope.tempSetting.type == 4) {
      if ($scope.tempSetting.substyle < 9 || $scope.tempSetting.substyle > 10) {
        $scope.showWarning2 = true;
        autoHideWarning();
        return;
      }
    } else if ($scope.tempSetting.type == 0) {
      $scope.showWarning1 = true;
      autoHideWarning();
      return;
    }
    $rootScope.data.setting.prom2.type = $scope.tempSetting.type;
    $rootScope.data.setting.prom2.substyle = $scope.tempSetting.substyle;
    $('#prom2Modal').modal('hide');
  };

  $scope.getStyle = function() {
    $scope.tempSetting = {
      type: $rootScope.data.setting.prom2.type,
      substyle: $rootScope.data.setting.prom2.substyle
    };
  };

  $scope.deleteStyle = function() {
    $rootScope.data.setting.prom2.type = 0;
    $rootScope.data.setting.prom2.substyle = 0;
    $('#prom2Modal').modal('hide');
  };
});

myPageApp.controller('SetPromotion3Ctrl', function($scope, $rootScope, $timeout) {
  $scope.mySetting = {
    type: $rootScope.data.setting.prom3.type,
    substyle: $rootScope.data.setting.prom3.substyle
  };

  $scope.$watch(function() {
    return $rootScope.data.setting.prom3;
  }, function() {
    $scope.mySetting = $rootScope.data.setting.prom3;
  });

  $scope.showWarning1 = false;
  $scope.showWarning2 = false;
  $scope.isRequired = true;
  $scope.introColCount = "4";

  function autoHideWarning() {
    $timeout(function() {
      $scope.showWarning1 = false;
      $scope.showWarning2 = false;
    }, 2000);
  };

  $scope.setStyle = function() {
    if ($scope.tempSetting.type == 1) {
      if ($scope.tempSetting.substyle < 1 || $scope.tempSetting.substyle > 2) {
        $scope.showWarning2 = true;
        autoHideWarning();
        return;
      }
    } else if ($scope.tempSetting.type == 2) {
      if ($scope.tempSetting.substyle < 3 || $scope.tempSetting.substyle > 6) {
        $scope.showWarning2 = true;
        autoHideWarning();
        return;
      }
    } else if ($scope.tempSetting.type == 3) {
      if ($scope.tempSetting.substyle < 7 || $scope.tempSetting.substyle > 8) {
        $scope.showWarning2 = true;
        autoHideWarning();
        return;
      }
    } else if ($scope.tempSetting.type == 4) {
      if ($scope.tempSetting.substyle < 9 || $scope.tempSetting.substyle > 10) {
        $scope.showWarning2 = true;
        autoHideWarning();
        return;
      }
    } else if ($scope.tempSetting.type == 0) {
      $scope.showWarning1 = true;
      autoHideWarning();
      return;
    }
    $rootScope.data.setting.prom3.type = $scope.tempSetting.type;
    $rootScope.data.setting.prom3.substyle = $scope.tempSetting.substyle;
    $('#prom3Modal').modal('hide');
  };

  $scope.getStyle = function() {
    $scope.tempSetting = {
      type: $rootScope.data.setting.prom3.type,
      substyle: $rootScope.data.setting.prom3.substyle
    };
  };

  $scope.deleteStyle = function() {
    $rootScope.data.setting.prom3.type = 0;
    $rootScope.data.setting.prom3.substyle = 0;
    $('#prom3Modal').modal('hide');
  };
});

myPageApp.controller('SetDiscoveryCtrl', function($scope, $rootScope, $timeout) {
  $scope.mySetting = {
    type: $rootScope.data.setting.disc.type,
    substyle: $rootScope.data.setting.disc.substyle
  };

  $scope.$watch(function() {
    return $rootScope.data.setting.disc;
  }, function() {
    $scope.mySetting = $rootScope.data.setting.disc;
  });

  $scope.showWarning1 = false;
  $scope.showWarning2 = false;
  $scope.isRequired = true;
  $scope.introColCount = "4";

  function autoHideWarning() {
    $timeout(function() {
      $scope.showWarning1 = false;
      $scope.showWarning2 = false;
    }, 2000);
  };

  $scope.setStyle = function() {
    if ($scope.tempSetting.type == 1) {
      if ($scope.tempSetting.substyle != 1) {
        $scope.showWarning2 = true;
        autoHideWarning();
        return;
      }
    } else if ($scope.tempSetting.type == 2) {
      if ($scope.tempSetting.substyle < 2 || $scope.tempSetting.substyle > 6) {
        $scope.showWarning2 = true;
        autoHideWarning();
        return;
      }
    } else if ($scope.tempSetting.type == 0) {
      $scope.showWarning1 = true;
      autoHideWarning();
      return;
    }
    $rootScope.data.setting.disc.type = $scope.tempSetting.type;
    $rootScope.data.setting.disc.substyle = $scope.tempSetting.substyle;
    $('#discModal').modal('hide');
  };

  $scope.getStyle = function() {
    $scope.tempSetting = {
      type: $rootScope.data.setting.disc.type,
      substyle: $rootScope.data.setting.disc.substyle
    };
  };

  $scope.deleteStyle = function() {
    $rootScope.data.setting.disc.type = 0;
    $rootScope.data.setting.disc.substyle = 0;
    $('#discModal').modal('hide');
  };
});

myPageApp.controller('SetContactCtrl', function($scope, $rootScope) {});


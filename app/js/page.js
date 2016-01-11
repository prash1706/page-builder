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
    } else if ($state.current.name == "setting.meta") {
      $scope.currentPage = 8;
    };
  };
  $scope.$watch(function() {
    return $state.current.name
  }, function() {
    setState();
  });

  $scope.settingData = [];
  $scope.spaces = ['Public'];
  $scope.settingData.push(DataService.getDefaultData);

  DataService.getData(function(res) {
    $scope.settingData = $scope.settingData.concat(res);
    angular.forEach($scope.settingData, function(item) {
      if (!item.space) {
        item.space = "Public";
      };
      var i;
      for (i = 0; i < $scope.spaces.length; i++) {
        if ($scope.spaces[i] === item.space) {
          break;
        }
      };
      if (i === $scope.spaces.length) {
        $scope.spaces.push(item.space);
      };
    });
    console.log($scope.spaces);
  }, function(res) {
    console.log("Get Templates Failed.")
  });
  // $scope.settingData = DataService.getDefaultData;

  $scope.currentData = null;
  $scope.tarData = null;
  $scope.tarName = "";
  $scope.templateName = "";
  $scope.tarNewSpace = "";
  $scope.fromSpace = "";
  $scope.result = 0;

  $scope.$watch(function(){
    return $scope.tarName + $scope.tarNewSpace;
  }, function(){
    if ($scope.tarName){
      $scope.tarName = $scope.tarName.replace(/\s/, '_');
      $scope.tarName = $scope.tarName.replace(/[^\d\w\_\-]/, '');
      $scope.tarNewSpace = $scope.tarNewSpace.replace(/\s/, '_');
      $scope.tarNewSpace = $scope.tarNewSpace.replace(/[^\d\w\_\-]/, '');
    };
  });

  function showResult(result, name) {
    $scope.result = result;
    $scope.templateName = name;
    $timeout(function() {
      $scope.result = 0;
    }, 2000);
  }

  $scope.load = function() {
    $scope.currentData = $scope.tarData;
    $scope.currentSpace = $scope.tarSpace;
    var str = angular.toJson($scope.currentData.data);
    $rootScope.data = angular.fromJson(str);
  };

  $scope.createPage = function() {
    $('#createBtn').button('loading');
    var data = {
      data: $rootScope.data
    };
    if ($scope.currentData) {
      data.name = $scope.currentData.name;
      data.space = $scope.currentData.space;
    };
    // console.log("Meta Data:", $rootScope.data.meta);
    DataService.createPage(data, function(res) {
      $timeout(function() {
        $('#createBtn').button('reset');
        window.open('./pages/' + data.space + '/' + data.name + '.html', '_blank');
      }, 500);
    }, function(res) {
      showResult(7, "");
      $('#createBtn').button('reset');
    });
  };

  $scope.add = function() {
    if ($scope.tarName == "" || $scope.tarName == "default") {
      showResult(2, $scope.tarName);
    } else {
      var isRight = true;
      if (!$scope.tarSpace) {
        for (var i = 0; i < $scope.spaces.length; i++) {
          if ($scope.spaces[i] == $scope.tarNewSpace) {
            isRight = false;
            showResult(2, $scope.tarName);
            break;
          }
        };
      };
      for (var i = 0; i < $scope.settingData.length; i++) {
        if ($scope.settingData[i].name == $scope.tarName && $scope.settingData[i].space == $scope.tarSpace) {
          isRight = false;
          showResult(2, $scope.tarName);
          break;
        };
      };
      if (isRight) {
        var data = {};
        data.name = $scope.tarName;
        if (!$scope.tarSpace) {
          data.space = $scope.tarNewSpace;
        } else {
          data.space = $scope.tarSpace;
        };
        if ($scope.fromSpace && $scope.tarData) {
          data.data = $scope.tarData.data;
        };
        console.log(data, 'data');
        DataService.add(data, function(res) {
          showResult(1, $scope.tarName);
          $scope.settingData.push(data);
          if (!$scope.tarSpace) {
            $scope.spaces.push(data.space);
          };
        }, function(res) {
          showResult(2, $scope.tarName);
        });
      };
    };
  };

  $scope.swap = function(type) {
    // type: 1  swap pro1 and prom2
    // type: 2  swap pro2 and prom3
    if (type == 1) {
      var prom1 = $rootScope.data.prom1;
      var prom2 = $rootScope.data.prom2;
      var setting1 = $rootScope.data.setting.prom1;
      var setting2 = $rootScope.data.setting.prom2;
      $rootScope.data.prom1 = prom2;
      $rootScope.data.setting.prom1 = setting2;
      $rootScope.data.prom2 = prom1;
      $rootScope.data.setting.prom2 = setting1;
    } else {
      var prom3 = $rootScope.data.prom3;
      var prom2 = $rootScope.data.prom2;
      var setting3 = $rootScope.data.setting.prom3;
      var setting2 = $rootScope.data.setting.prom2;
      $rootScope.data.prom3 = prom2;
      $rootScope.data.setting.prom3 = setting2;
      $rootScope.data.prom2 = prom3;
      $rootScope.data.setting.prom2 = setting3;
    }
    showResult(8, $scope.tarName);
    console.log($rootScope.data.prom2);
  };

  $scope.delete = function() {
    DataService.delete($scope.currentData, function(res) {
      for (var i = 0; i < $scope.settingData.length; i++) {
        if ($scope.settingData[i].name == $scope.currentData.name) {
          $scope.settingData.splice(i, 1);
          showResult(3, $scope.currentData.name);
          break;
        };
      }
    }, function(res) {
      showResult(4, $scope.currentData.name);
    })
  };

  $scope.save = function() {
    $('#saveBtn').button('loading');
    var data = {
      name: $scope.currentData.name,
      space: $scope.currentData.space,
      data: $rootScope.data
    };
    DataService.saveData(data, function(res) {
      for (var i = 0; i < $scope.settingData.length; i++) {
        if ($scope.settingData[i].name == $scope.currentData.name && $scope.settingData[i].space == $scope.currentData.space) {
          $scope.settingData.data = data.data;
          $scope.currentData.data = data.data;
          break;
        };
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
  $scope.substyle = ['', 'Substyle: Image background', 'Substyle: Video background'];
});

myPageApp.controller('SetDefinition1Ctrl', function($scope, $rootScope, $timeout) {
  $scope.mySetting = {
    type: $rootScope.data.setting.defi1.type,
    substyle: $rootScope.data.setting.defi1.substyle
  };

  $scope.style = ['', 'Style:Introduction', 'Style:Asset promo', 'Style:Step-by-step'];
  $scope.substyle = ['', 'Substyle:Text only,one column', 'Substyle:Text only,two columns', 'Substyle:With CTA,one column', 'Substyle:With CTA,two columns', 'Substyle:With image', 'Substyle:With video', 'Substyle:Icons with individual CTAs(3 steps)', 'Substyle:Icons with individual CTAs(4 steps)', 'Substyle:Icons with single CTA(3 steps)', 'Substyle:Icons with single CTA(4 steps)', 'Substyle:Numbers with individual CTAs(3 steps)', 'Substyle:Numbers with individual CTAs(4 steps)', 'Substyle:Numbers with single CTAs(3 steps)', 'Substyle:Numbers with single CTAs(4 steps)'];
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

  $scope.style = ['', 'Style:Introduction', 'Style:Asset promo', 'Style:Step-by-step'];
  $scope.substyle = ['', 'Substyle:Text only,one column', 'Substyle:Text only,two columns', 'Substyle:With CTA,one column', 'Substyle:With CTA,two columns', 'Substyle:With image', 'Substyle:With video', 'Substyle:Icons with individual CTAs(3 steps)', 'Substyle:Icons with individual CTAs(4 steps)', 'Substyle:Icons with single CTA(3 steps)', 'Substyle:Icons with single CTA(4 steps)', 'Substyle:Numbers with individual CTAs(3 steps)', 'Substyle:Numbers with individual CTAs(4 steps)', 'Substyle:Numbers with single CTAs(3 steps)', 'Substyle:Numbers with single CTAs(4 steps)'];

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

  $scope.style = ['', 'Style:Featured solution', 'Style:Solution overview', 'Style:Case study', 'Style: Testimonial'];
  $scope.substyle = ['', 'Substyle:Two solutions', 'Substyle:Three solutions', 'Substyle:Icons, two rows', 'Substyle:Icons three rows', 'Substyle:Bullets, two rows', 'Substyle:Bullets, three rows', 'Substyle:One statistic', 'Substyle:Two statistics', 'Substyle:No photo', 'Substyle:With photo'];

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

  $scope.style = ['', 'Style:Featured solution', 'Style:Solution overview', 'Style:Case study', 'Style: Testimonial'];
  $scope.substyle = ['', 'Substyle:Two solutions', 'Substyle:Three solutions', 'Substyle:Icons, two rows', 'Substyle:Icons three rows', 'Substyle:Bullets, two rows', 'Substyle:Bullets, three rows', 'Substyle:One statistic', 'Substyle:Two statistics', 'Substyle:No photo', 'Substyle:With photo'];


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

  $scope.style = ['', 'Style:Featured solution', 'Style:Solution overview', 'Style:Case study', 'Style: Testimonial'];
  $scope.substyle = ['', 'Substyle:Two solutions', 'Substyle:Three solutions', 'Substyle:Icons, two rows', 'Substyle:Icons three rows', 'Substyle:Bullets, two rows', 'Substyle:Bullets, three rows', 'Substyle:One statistic', 'Substyle:Two statistics', 'Substyle:No photo', 'Substyle:With photo'];

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

  $scope.style = ['', 'Style:Call to action', 'Style:Related resources'];
  $scope.substyle = ['', '', 'Substyle:two cards', 'Substyle:three cards', 'Substyle:four cards', 'Substyle:five cards', 'Substyle:six cards'];

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

});

myPageApp.controller('SetContactCtrl', function($scope, $rootScope) {
  $scope.substyle = ['', 'Substyle:No social media links', 'Substyle:With social media links'];

  $scope.deleteStyle = function() {
    $rootScope.data.setting.contact = 0;
  };
});

myPageApp.controller('SetMetaCtrl', function($scope, $rootScope) {

});

var myPageApp = angular.module('myPageApp', ['ui.router', 'ngFileUpload', 'serviceApp']);

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
    } else if ($state.current.name == "setting.manage") {
      $scope.currentPage = 10;
    };
  };
  $scope.$watch(function() {
    return $state.current.name
  }, function() {
    setState();
  });

  $scope.settingData = [];
  $scope.spaces = [];
  $scope.images = [];
  $scope.settingData.push(DataService.getDefaultData);
  $scope.value = 0;

  $scope.startPro = function() {
    $scope.showPro = true;
    $scope.value = 0;
    $scope.timeout = $timeout(function() {
      $scope.value = Math.random() * 30 + 30;
      var maxTemp = Math.random() * 10 + 80;
      var cell = 0;

      function slowPro() {
        cell = (maxTemp - $scope.value) / 20;
        $scope.timeout = $timeout(function() {
          $scope.value += cell;
          slowPro();
        }, 200);
      };
      slowPro();
    }, 100);
  };

  $scope.stopPro = function() {
    $timeout.cancel($scope.timeout);
    $scope.value = 100;
    $timeout(function() {
      $scope.showPro = false;
    }, 500);
  };

  $scope.stopProAsyn = function(callback) {
    $timeout.cancel($scope.timeout);
    $scope.value = 100;
    $timeout(function() {
      $scope.showPro = false;
      callback();
    }, 500);
  };

  $scope.$on(
    "$destroy",
    function(event) {
      $timeout.cancel($scope.timeout);
    }
  );
  // setInterval(function() {
  //   $scope.$apply($scope.startPro);
  // }, 5000);


  DataService.getFolder(function(res) {
    $scope.startPro();
    console.log(res);
    $scope.spaces = res;
    $scope.spaces.unshift({ _id: '0', name: 'Public' });
    var space_arr = [];
    $scope.spaces.forEach(function(space) {
      space_arr.push(space._id);
    });
    var space_str = space_arr.join(',');
    DataService.getData(function(res) {
      $scope.settingData = [];
      $scope.settingData.push(DataService.getDefaultData);
      for (var i in res) {
        if (!res[i].data) {
          res[i].data = DataService.getNullData.data;
        };
        if (!res[i].space || space_str.indexOf(res[i].space) === -1) {
          res[i].space = "0";
        };
        if (!res[i].data.meta) {
          res[i].data.meta = {
            language: DataService.getDefaultLanguage[7].language,
            country: DataService.getDefaultCountry[124].country
          };
        } else if (!res[i].data.meta.country || !res[i].data.meta.language) {
          res[i].data.meta.country = res[i].data.meta.country || DataService.getDefaultCountry[124].country;
          res[i].data.meta.language = res[i].data.meta.language || DataService.getDefaultLanguage[7].language;
        };
        $scope.settingData.push(res[i]);
      };
      console.log("[GetData] $scope.settingData:", $scope.settingData);
      $scope.images = [];
      DataService.getImage(function(res) {
        $scope.images = res;
        console.log("[GetImage] $scope.images:", $scope.images);
        $scope.stopPro();
      }, function(res) {
        console.error(res);
        $scope.stopPro();
      });
    }, function(res) {
      console.log("Get Templates Failed.");
      $scope.stopPro();
    });
  }, function(res) {
    console.log("Get Folders Failed.");
    $scope.stopPro();
  });

  $scope.currentData = null;
  $scope.tarData = null;
  $scope.tarName = "";
  $scope.templateName = "";
  $scope.fromSpace = "";
  $scope.result = 0;

  $scope.$watch(function() {
    return $scope.tarName;
  }, function() {
    if ($scope.tarName) {
      $scope.tarName = $scope.tarName.replace(/\s/, '_');
      $scope.tarName = $scope.tarName.replace(/[^\d\w\_\-]/, '');
    };
  });

  function showResult(result, name) {
    $timeout.cancel($scope.mesTimeout);
    $scope.result = result;
    $scope.templateName = name;
    $scope.mesTimeout = $timeout(function() {
      $scope.result = 0;
    }, 2000);
  };

  $scope.load = function() {
    $scope.currentData = $scope.tarData;
    $scope.currentSpace = $scope.tarSpace;
    var str = angular.toJson($scope.currentData.data);
    $rootScope.data = angular.fromJson(str);
    console.log("[Load finished] ", $scope.currentData);
  };

  $scope.createPage = function() {
    $('#createBtn').button('loading');
    $scope.startPro();
    var data = {
      _id: $scope.currentData._id,
      _rev: $scope.currentData._rev,
      name: $scope.currentData.name,
      space: $scope.currentData.space,
      data: $rootScope.data
    };
    if ($scope.currentData.name != 'default') {
      DataService.saveData(data, function(res) {
        for (var i = 0; i < $scope.settingData.length; i++) {
          if ($scope.settingData[i].name == $scope.currentData.name && $scope.settingData[i].space == $scope.currentData.space) {
            $scope.settingData.data = data.data;
            $scope.settingData._id = res.id;
            $scope.settingData._rev = res.rev;
            $scope.currentData.data = data.data;
            $scope.currentData._id = res.id;
            $scope.currentData._rev = res.rev;
            break;
          };
        };
        showResult(5, $scope.currentData.name);
        var data_cre = {
          data: $rootScope.data
        };
        var str = angular.toJson($rootScope.data);
        data_cre.data = angular.fromJson(str);

        if ($scope.currentData && $scope.currentSpace) {
          data_cre.name = $scope.currentData.name;
          data_cre.space = $scope.currentSpace.name;
        };
        if (data_cre.data.meta.country && data_cre.data.meta.language) {
          for (var i = 0; i < DataService.getDefaultCountry.length; i++) {
            if (DataService.getDefaultCountry[i].country == data_cre.data.meta.country) {
              data_cre.data.meta.country = DataService.getDefaultCountry[i].code;
              break;
            };
          };
          for (var i = 0; i < DataService.getDefaultLanguage.length; i++) {
            if (DataService.getDefaultLanguage[i].language == data_cre.data.meta.language) {
              data_cre.data.meta.language = DataService.getDefaultLanguage[i].code;
              break;
            };
          };
        };
        DataService.createPage(data_cre, function(res) {
          $timeout(function() {
            $('#createBtn').button('reset');
            window.open('./pages/' + data_cre.space + '/' + data_cre.name + '.html', '_blank');
          }, 500);
          $scope.stopPro();
        }, function(res) {
          showResult(7, "");
          $('#createBtn').button('reset');
          $scope.stopPro();
        });
      }, function(res) {
        showResult(6, $scope.currentData.name);
        $scope.stopPro();
        $('#saveBtn').button('reset');
      });
    } else {
      var data_cre = {
        data: $rootScope.data
      };
      var str = angular.toJson($rootScope.data);
      data_cre.data = angular.fromJson(str);

      if ($scope.currentData && $scope.currentSpace) {
        data_cre.name = $scope.currentData.name;
        data_cre.space = $scope.currentSpace.name;
      };
      if (data_cre.data.meta.country && data_cre.data.meta.language) {
        for (var i = 0; i < DataService.getDefaultCountry.length; i++) {
          if (DataService.getDefaultCountry[i].country == data_cre.data.meta.country) {
            data_cre.data.meta.country = DataService.getDefaultCountry[i].code;
            break;
          };
        };
        for (var i = 0; i < DataService.getDefaultLanguage.length; i++) {
          if (DataService.getDefaultLanguage[i].language == data_cre.data.meta.language) {
            data_cre.data.meta.language = DataService.getDefaultLanguage[i].code;
            break;
          };
        };
      };
      DataService.createPage(data_cre, function(res) {
        $timeout(function() {
          $('#createBtn').button('reset');
          window.open('./pages/' + data_cre.space + '/' + data_cre.name + '.html', '_blank');
        }, 500);
        $scope.stopPro();
      }, function(res) {
        showResult(7, "");
        $('#createBtn').button('reset');
        $scope.stopPro();
      });
    };
  };

  $scope.add = function() {
    if ($scope.tarName == "" || $scope.tarName == "default") {
      showResult(2, $scope.tarName);
    } else {
      var isRight = true;
      for (var i = 0; i < $scope.settingData.length; i++) {
        if ($scope.settingData[i].name == $scope.tarName && $scope.settingData[i].space == $scope.tarSpace._id) {
          isRight = false;
          showResult(2, $scope.tarName);
          break;
        };
      };
      if (isRight) {
        $scope.startPro();
        var data = {};
        data.name = $scope.tarName;
        data.space = $scope.tarSpace._id;
        if ($scope.fromSpace && $scope.tarData) {
          data.data = $scope.tarData.data;
        } else {
          data.data = DataService.getNullData.data;
        };
        console.log("[add] data = ", data);
        DataService.add(data, function(res) {
          showResult(1, $scope.tarName);
          data._id = res.id;
          data._rev = res.rev;
          $scope.settingData.push(data);
          $scope.stopProAsyn(function() {
            $('#loadAutoModal').modal('show');
          });
        }, function(res) {
          $scope.stopPro();
          showResult(2, $scope.tarName);
        });
      };
    };
  };

  $scope.verifyPageOpened = function() {
    $scope.tarData = null;
    $scope.tarName = '';
    if (!$scope.currentData || $scope.currentData.name == 'default') {
      $('#addModal').modal('show');
    } else {
      $('#saveCurrentModal').modal('show');
    };
  };

  $scope.saveAuto = function() {
    $('#saveBtn').button('loading');
    $scope.startPro();
    var data = {
      _id: $scope.currentData._id,
      _rev: $scope.currentData._rev,
      name: $scope.currentData.name,
      space: $scope.currentData.space,
      data: $rootScope.data
    };
    DataService.saveData(data, function(res) {
      for (var i = 0; i < $scope.settingData.length; i++) {
        if ($scope.settingData[i].name == $scope.currentData.name && $scope.settingData[i].space == $scope.currentData.space) {
          $scope.settingData.data = data.data;
          $scope.settingData._id = res.id;
          $scope.settingData._rev = res.rev;
          $scope.currentData.data = data.data;
          $scope.currentData._id = res.id;
          $scope.currentData._rev = res.rev;
          break;
        };
      };
      $('#saveBtn').button('reset');
      showResult(5, $scope.currentData.name);
      $scope.stopPro();
      $('#addModal').modal('show');
    }, function(res) {
      showResult(6, $scope.currentData.name);
      $scope.stopPro();
      $('#saveBtn').button('reset');
    });
  };

  $scope.loadAuto = function() {
    $scope.currentData = $scope.settingData[$scope.settingData.length - 1];
    $scope.currentSpace = $scope.tarSpace;
    var str = angular.toJson($scope.currentData.data);
    $rootScope.data = angular.fromJson(str);
    console.log("[Load finished] ", $scope.currentData);
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
    $scope.startPro();
    DataService.delete($scope.currentData, function(res) {
      for (var i = 0; i < $scope.settingData.length; i++) {
        if ($scope.settingData[i].name == $scope.currentData.name) {
          $scope.settingData.splice(i, 1);
          showResult(3, $scope.currentData.name);
          break;
        };
      };
      $scope.stopPro();
      $scope.currentData = null;
      $scope.currentSpace = null;
      $rootScope.data = {};
      $rootScope.data.setting = {
        lead: 0,
        defi1: {
          type: 0,
          substyle: 0,
        },
        defi2: {
          type: 0,
          substyle: 0,
        },
        prom1: {
          type: 0,
          substyle: 0
        },
        prom2: {
          type: 0,
          substyle: 0
        },
        prom3: {
          type: 0,
          substyle: 0
        },
        disc: {
          type: 0,
          substyle: 0
        },
        contact: 0
      };
    }, function(res) {
      showResult(4, $scope.currentData.name);
      $scope.stopPro();
    });
  };

  $scope.save = function() {
    $('#saveBtn').button('loading');
    $scope.startPro();
    var data = {
      _id: $scope.currentData._id,
      _rev: $scope.currentData._rev,
      name: $scope.currentData.name,
      space: $scope.currentData.space,
      data: $rootScope.data
    };
    DataService.saveData(data, function(res) {
      for (var i = 0; i < $scope.settingData.length; i++) {
        if ($scope.settingData[i].name == $scope.currentData.name && $scope.settingData[i].space == $scope.currentData.space) {
          $scope.settingData.data = data.data;
          $scope.settingData._id = res.id;
          $scope.settingData._rev = res.rev;
          $scope.currentData.data = data.data;
          $scope.currentData._id = res.id;
          $scope.currentData._rev = res.rev;
          break;
        };
      };
      $('#saveBtn').button('reset');
      showResult(5, $scope.currentData.name);
      $scope.stopPro();
    }, function(res) {
      showResult(6, $scope.currentData.name);
      $scope.stopPro();
      $('#saveBtn').button('reset');
    });
  };
}]);

myPageApp.controller('SetLeadSpaceCtrl', function($scope, $rootScope) {
  $scope.substyle = ['', 'Substyle: Image background', 'Substyle: Video background', 'Substyle: Image background - small'];
});

myPageApp.controller('SetDefinition1Ctrl', function($scope, $rootScope, Upload, $timeout) {
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
    console.log("[Defi1 Data Changed] $scope.mySetting = ", $scope.mySetting);
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

  $scope.updateIndex = function(index) {
    $scope.imageIndex = index;
  };

  $scope.updateUrl = function(url) {
    $scope.imageUrl = url;
  };

  $scope.setImageUrl = function() {
    $rootScope.data.defi1.asset.imgUrl = $scope.imageUrl;
  };

  $scope.upload = function() {
    $("#uploadBtn").button('loading');
    $scope.startPro();
    console.log("$scope.isNewImage", $scope.isNewImage);
    console.log("$scope.tarImage", $scope.tarImage);
    console.log("$scope.currentImage", $scope.currentImage);
    var data = {};
    if ($scope.isNewImage) {
      data = {
        folder: $scope.tarImage
      };
    } else {
      data = {
        _id: $scope.currentImage._id,
        _rev: $scope.currentImage._rev,
        folder: $scope.currentImage.folder
      };
    };
    Upload.upload({
      url: '/image/upload',
      data: data,
      file: $scope.myFile
    }).then(function(res) {
      $scope.stopPro();
      console.log(res.data);
      if ($scope.isNewImage) {
        $scope.images.push(res.data);
        $rootScope.data.defi1.asset.imgUrl = res.data.images[0].url;
        console.log($scope.images);
      } else {
        $scope.currentImage._rev = res.data._rev;
        $scope.currentImage._id = res.data._id;
        $scope.currentImage.images.push(res.data.image);
        $rootScope.data.defi1.asset.imgUrl = res.data.image.url;
        console.log($scope.images);
      };
      $scope.tarImage = '';
      $scope.isNewImage = false;
      $("#uploadBtn").button('reset');
    }, function(err) {
      $scope.stopPro();
      console.error(err);
      $("#uploadBtn").button('reset');
    });
  }
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
  $scope.countryStr = ["Afganistan",
    "Algeria",
    "Angola",
    "Anguilla",
    "Antigua and Barbuda",
    "Argentina",
    "Aruba",
    "Australia",
    "Austria",
    "Bahamas",
    "Bahrain",
    "Bangladesh",
    "Barbados",
    "Belgium/Luxembourg",
    "Bermuda",
    "Bolivia",
    "Botswana",
    "Brazil",
    "British Virgin Islands",
    "Brunei Darussalam",
    "Bulgaria",
    "Burkina Faso",
    "Cambodia",
    "Cameroon",
    "Canada",
    "Cayman Islands",
    "Chad",
    "Chile",
    "China",
    "Colombia",
    "Congo",
    "Costa Rica",
    "Croatia",
    "Curacao",
    "Cyprus",
    "Czech Republic",
    "Denmark",
    "Dominica",
    "Congo, The Democratic Republic of the",
    "Ecuador",
    "Egypt",
    "Estonia",
    "Ethiopia",
    "Finland",
    "France",
    "Gabon",
    "Germany",
    "Ghana",
    "Greece",
    "Grenada",
    "Guyana",
    "Hong Kong",
    "Hungary",
    "India",
    "Indonesia",
    "Iraq",
    "Ireland",
    "Israel",
    "Italy",
    "Ivory Coast",
    "Jamaica",
    "Japan",
    "Jordan",
    "Kazakhstan",
    "Kenya",
    "Korea, Republic of",
    "Kuwait",
    "Latvia",
    "Lebanon",
    "Lithuania",
    "Libya",
    "Madagascar",
    "Malawi",
    "Malaysia",
    "Mauritius",
    "Mexico",
    "Montserrat",
    "Morocco",
    "Mozambique",
    "Namibia",
    "Nepal",
    "Netherlands",
    "New Zealand",
    "Niger",
    "Nigeria",
    "Norway",
    "Oman",
    "Pakistan",
    "Paraguay",
    "Peru",
    "Philippines",
    "Poland",
    "Portugal",
    "Qatar",
    "Romania",
    "Russian Federation",
    "Saint Kitts and Nevis",
    "Saint Lucia",
    "Saint Vincent and the Grenadines",
    "Saudi Arabia",
    "Senegal",
    "Serbia",
    "Seychelles",
    "Sierra Leone",
    "Singapore",
    "Slovakia",
    "Slovenia",
    "South Africa",
    "Spain",
    "Sri Lanka",
    "Suriname",
    "Sweden",
    "Switzerland",
    "Taiwan",
    "Tanzania, United Republic of",
    "Thailand",
    "Trinidad and Tobago",
    "Tunisia",
    "Turkey",
    "Turks and Caicos Islands",
    "Uganda",
    "Ukraine",
    "United Arab Emirates",
    "United Kingdom",
    "United States",
    "Uruguay",
    "Uzbekistan",
    "Venezuela",
    "Vietnam",
    "Yemen",
    "Zambia",
    "Zimbabwe"
  ];
  $scope.languageStr = [
    "Bulgarian",
    "Chinese (Simplified)",
    "Chinese (Traditional)",
    "Croatian",
    "Czech",
    "Danish",
    "Dutch",
    "English",
    "Estonian",
    "Finnish",
    "French",
    "German",
    "Greek",
    "Hebrew",
    "Hungarian",
    "Italian",
    "Japanese",
    "Kazakh",
    "Korean",
    "Latvian",
    "Lithuanian",
    "Norwegian",
    "Polish",
    "Portuguese",
    "Romanian",
    "Russian",
    "Serbian",
    "Slovak",
    "Slovenian",
    "Spanish",
    "Swedish",
    "Turkish",
    "Ukrainian",
    "Uzbek",
    "Vietnamese",
    "Zimbabwe"
  ];
});

myPageApp.controller('ManageCtrl', function($scope, $rootScope, DataService) {

  $scope.hasLogged = false;
  $scope.myFolder = {};

  $scope.check = function() {
    if ($scope.password == 'admin') {
      $scope.hasLogged = true;
    };
  };

  $scope.setMyFolder = function(item) {
    $scope.myFolder = item;
  };

  $scope.addFolder = function() {
    $scope.startPro();
    var folder = {
      name: $scope.tarFolder
    };
    DataService.addFolder(folder, function(res) {
      folder._id = res.id;
      folder._rev = res.rev;
      $scope.spaces.push(folder);
      $scope.tarFolder = '';
      $scope.stopPro();
    }, function(res) {
      $scope.stopPro();
      console.error(res);
    });
  };

  $scope.deleteFolder = function() {
    $scope.startPro();
    var folder = {
      _id: $scope.myFolder._id,
      _rev: $scope.myFolder._rev,
      name: $scope.myFolder.name
    };
    DataService.deleteFolder(folder, function(res) {
      var index = 0;
      for (index = 0; index < $scope.spaces.length; index++) {
        if ($scope.spaces[index]._id == folder._id) {
          break;
        };
      };
      $scope.spaces.splice(index, 1);
      $scope.tarFolder = '';
      $scope.stopPro();
    }, function(res) {
      $scope.stopPro();
      console.error(res);
    });
  };

  $scope.renameFolder = function() {
    $scope.startPro();
    var folder = {
      _id: $scope.myFolder._id,
      _rev: $scope.myFolder._rev,
      name: $scope.tarFolder
    };
    DataService.renameFolder(folder, function(res) {
      folder._id = res.id;
      folder._rev = res.rev;
      var index = 0;
      for (index = 0; index < $scope.spaces.length; index++) {
        if ($scope.spaces[index]._id == $scope.myFolder._id) {
          break;
        };
      };
      $scope.spaces.splice(index, 1, folder);
      $scope.tarFolder = '';
      $scope.stopPro();
    }, function(res) {
      $scope.stopPro();
      console.error(res);
    });
  };
});

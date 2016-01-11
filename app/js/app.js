'use strict';

angular.module('myApp', ['ui.router', 'myPageApp'])
  .config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/setting/leadspace');

    $stateProvider
      .state('setting', {
        url: '',
        templateUrl: 'views/setting.html',
        controller: 'SetMainCtrl'
      })
      .state('setting.leadspace', {
        url: '/setting/leadspace',
        templateUrl: 'views/leadspace.html',
        controller: 'SetLeadSpaceCtrl'
      })
      .state('setting.definition1', {
        url: '/setting/definition1',
        templateUrl: 'views/definition1.html',
        controller: 'SetDefinition1Ctrl'
      })
      .state('setting.definition2', {
        url: '/setting/definition2',
        templateUrl: 'views/definition2.html',
        controller: 'SetDefinition2Ctrl'
      })
      .state('setting.promotion1', {
        url: '/setting/promotion1',
        templateUrl: 'views/promotion1.html',
        controller: 'SetPromotion1Ctrl'
      })
      .state('setting.promotion2', {
        url: '/setting/promotion2',
        templateUrl: 'views/promotion2.html',
        controller: 'SetPromotion2Ctrl'
      })
      .state('setting.promotion3', {
        url: '/setting/promotion3',
        templateUrl: 'views/promotion3.html',
        controller: 'SetPromotion3Ctrl'
      })
      .state('setting.discovery', {
        url: '/setting/discovery',
        templateUrl: 'views/discovery.html',
        controller: 'SetDiscoveryCtrl'
      })
      .state('setting.contact', {
        url: '/setting/contact',
        templateUrl: 'views/contact.html',
        controller: 'SetContactCtrl'
      })
      .state('setting.meta', {
        url: '/setting/meta',
        templateUrl: 'views/meta.html',
        controller: 'SetMetaCtrl'
      });
  }])
  .run(function($rootScope) {
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
  });

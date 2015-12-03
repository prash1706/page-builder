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
        templateUrl: 'views/definition.html',
        controller: 'SetDefinition1Ctrl'
      })
      .state('setting.definition2', {
        url: '/setting/definition2',
        templateUrl: 'views/definition.html',
        controller: 'SetDefinition2Ctrl'
      })
      .state('setting.promotion1', {
        url: '/setting/promotion1',
        templateUrl: 'views/promotion.html',
        controller: 'SetPromotion1Ctrl'
      })
      .state('setting.promotion2', {
        url: '/setting/promotion2',
        templateUrl: 'views/promotion.html',
        controller: 'SetPromotion2Ctrl'
      })
      .state('setting.promotion3', {
        url: '/setting/promotion3',
        templateUrl: 'views/promotion.html',
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
      .state('myPage', {
        url: '/myPage',
        templateUrl: 'views/myPage.html',
        controller: 'MyPageCtrl'
      });
  }])
  .run(function($rootScope) {
    $rootScope.data = {};
    $rootScope.data.lead = {
      headline: 'API economy',
      subhead: 'Power innovation and build new revenue streams by making APIs part of your business model. Connect with an IBM expert to find out how. ',
      imgUrl: '../images/leadspace-bg.jpg',
      videoUrl: '',
      cat: 'Register for a free consultation',
      catUrl: '#'
    };
    $rootScope.data.defi1 = {
      intro: {
        subhead: 'lorem ipsum',
        column1: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla et consectetur quam, a faucibus neque. Integer sit amet ante ut ipsum pellentesque varius. Ut nec varius libero, venenatis hendrerit leo. Nullam eget ligula nec massa dapibus egestas. Etiam feugiat rutrum ipsum vitae porttitor. Pellentesque nec leo eget turpis ornare mattis. Donec vitae pellentesque elit. Vivamus et purus pellentesque, gravida sapien sit amet, dapibus lorem. Pellentesque lacinia vel orci sit amet sagittis. Ut vel mi eget magna fringilla aliquam vitae rhoncus ex. Sed scelerisque rhoncus turpis, at pulvinar eros malesuada ac. Morbi varius dictum ultricies.',
        column2: ['Mauris augue dui, blandit non malesuada quis, ornare vitae justo.', 'Etiam gravida nisl vel fringilla bibendum. Vestibulum at ultrices nisl.', 'Aliquam finibus ex risus, vitae ultrices justo luctus non.', 'Duis hendrerit lectus mattis, tristique nisi at, mollis risus.'],
        ctaLeadIn: 'Lorem ipsum dolor sit amet, consectetur.',
        cta: 'Lorem ipsum',
        ctaUrl: '#'
      },
      asset: {
        subhead: 'What is the API economy?',
        body: 'Exposing digital services to employees, partners and consumers, the API economy is an environment that’s driving industry transformation as a result of cloud, mobile, the Internet of Things and cognitive computing. Application programming interfaces (APIs) are the glue connecting services and systems across and between organizations.For business leaders, when a business delivers an API, it expands its brand and revenue potential. For architects and developers, APIs create efficiencies and fuel innovation, turning a single idea into an industry-disrupting app.Read the white paper, “The Power of the API Economy,” to gain insight into these new business opportunities.',
        cta: 'View the PDF',
        ctaUrl: 'http://www.redbooks.ibm.com/redpapers/pdfs/redp5096.pdf',
        imgUrl: '../../../images/mlp_reference-api-whatis.png',
        videoUrl:'https://www.youtube.com/watch?v=flXFf8M6dWI&index=1&list=WL'
      },
      step: {
        subhead: 'Three ways to thrive in the API economy',
        step1: {
          imgUrl: 'http://www.ibm.com/middleware/integration/us-en/api-economy/images/mlp-reference-api-icons-01.png',
          title: '1. Define an API strategy',
          desc: 'Uncover your best opportunities for monetization and develop a clear path to fulfill them.',
          cta: 'Register for a free consultation',
          ctaUrl: 'http://www-01.ibm.com/marketing/iwm/iwm/web/signup.do?source=ibm-apimancon'
        },
        step2: {
          imgUrl: 'http://www.ibm.com/middleware/integration/us-en/api-economy/images/mlp-reference-api-icons-02.png',
          title: '2. Build new APIs quickly',
          desc: 'Easily develop and deploy robust APIs powered by Node.js capabilities.',
          cta: 'Get started with Bluemix and StrongLoop',
          ctaUrl: 'https://developer.ibm.com/bluemix/2015/09/10/getting-started-bluemix-strongloop/'
        },
        step3: {
          imgUrl: 'http://www.ibm.com/middleware/integration/us-en/api-economy/images/mlp-reference-api-icons-03.png',
          title: '3. Secure and track your APIs',
          desc: 'Manage access to your APIs, protect them from breaches and watch how they’re performing.',
          cta: 'Sign up for a free trial',
          ctaUrl: 'http://apps.admin.ibmcloud.com/manage/trial/apim.html'
        }
      }
    };
    $rootScope.data.contact = {
      phone: '877-426-3774',
      priority: 'Middleware'
    };
    $rootScope.data.setting = {
      defi1: {
        type: 1,
        substyle: 4,
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
      }
    };
  });

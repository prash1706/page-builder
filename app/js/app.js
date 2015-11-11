'use strict';

angular.module('myApp', ['ngRoute', 'myPageApp'])
  .config(['$routeProvider', function($routeProvider) {
    $routeProvider
      .when('/myPage', {
        templateUrl: 'views/myPage.html',
        controller: 'showPageCtrl'
      })
      .when('/', {
        templateUrl: 'views/pageBuilder.html',
        controller:'createPageCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  }])
  .run(function($rootScope) {
    $rootScope.leadspace = {
      'headline': 'API economy',
      'subhead': 'Power innovation and build new revenue streams by making APIs part of your business model. Connect with an IBM expert to find out how. ',
      'imgUrl':'http://styleguide.nst.ibm.vsadev.com/assets/northstar/images/API_leadspace.jpg',
      'cat': 'Register for a free consultation',
      'catUrl': 'images/mlp-reference-apieconomy-2000x493px-1x.jpg'
    };
    $rootScope.intro = {
      'subhead': 'lorem ipsum',
      'column1': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla et consectetur quam, a faucibus neque. Integer sit amet ante ut ipsum pellentesque varius. Ut nec varius libero, venenatis hendrerit leo. Nullam eget ligula nec massa dapibus egestas. Etiam feugiat rutrum ipsum vitae porttitor. Pellentesque nec leo eget turpis ornare mattis. Donec vitae pellentesque elit. Vivamus et purus pellentesque, gravida sapien sit amet, dapibus lorem. Pellentesque lacinia vel orci sit amet sagittis. Ut vel mi eget magna fringilla aliquam vitae rhoncus ex. Sed scelerisque rhoncus turpis, at pulvinar eros malesuada ac. Morbi varius dictum ultricies.',
      'ctaLeadIn': 'Lorem ipsum dolor sit amet, consectetur.',
      'cta': 'Lorem ipsum',
      'ctaUrl': '#'
    };
    $rootScope.asset = {
      'subhead': 'What is the API economy?',
      'body': 'Exposing digital services to employees, partners and consumers, the API economy is an environment that’s driving industry transformation as a result of cloud, mobile, the Internet of Things and cognitive computing. Application programming interfaces (APIs) are the glue connecting services and systems across and between organizations.For business leaders, when a business delivers an API, it expands its brand and revenue potential. For architects and developers, APIs create efficiencies and fuel innovation, turning a single idea into an industry-disrupting app.Read the white paper, “The Power of the API Economy,” to gain insight into these new business opportunities.',
      'cta': 'View the PDF',
      'ctaUrl': 'http://www.redbooks.ibm.com/redpapers/pdfs/redp5096.pdf',
      'imgUrl': 'http://lorempixel.com/580/520/'
    };
    $rootScope.step = {
      'subhead': 'Three ways to thrive in the API economy',
      'step1': {
        'imgUrl': 'http://www.ibm.com/middleware/integration/us-en/api-economy/images/mlp-reference-api-icons-01.png',
        'title': '1. Define an API strategy',
        'desc': 'Uncover your best opportunities for monetization and develop a clear path to fulfill them.',
        'cta': 'Register for a free consultation',
        'ctaUrl': 'http://www-01.ibm.com/marketing/iwm/iwm/web/signup.do?source=ibm-apimancon'
      },
      'step2': {
        'imgUrl': 'http://www.ibm.com/middleware/integration/us-en/api-economy/images/mlp-reference-api-icons-02.png',
        'title': '2. Build new APIs quickly',
        'desc': 'Easily develop and deploy robust APIs powered by Node.js capabilities.',
        'cta': 'Get started with Bluemix and StrongLoop',
        'ctaUrl': 'https://developer.ibm.com/bluemix/2015/09/10/getting-started-bluemix-strongloop/'
      },
      'step3': {
        'imgUrl': 'http://www.ibm.com/middleware/integration/us-en/api-economy/images/mlp-reference-api-icons-03.png',
        'title': '3. Secure and track your APIs',
        'desc': 'Manage access to your APIs, protect them from breaches and watch how they’re performing.',
        'cta': 'Sign up for a free trial',
        'ctaUrl': 'http://apps.admin.ibmcloud.com/manage/trial/apim.html'
      }
    };
    $rootScope.related = {
      'subhead':'Learn more about the API economy',
      'relat1':{
        'body':'Take a deeper dive into API basics',
        'cta':'Learn the basics',
        'ctaUrl':'https://developer.ibm.com/api/'
      },
      'relat2':{
        'body':'Locate advanced resources and connect with developers through API Explorer',
        'cta':'Join the community',
        'ctaUrl':'https://developer.ibm.com/api/'
      },
      'relat3':{
        'body':'EyeQ speeds time to market with IBM Bluemix',
        'cta':'Read the full story',
        'ctaUrl':'https://developer.ibm.com/api/'
      }
    }
    $rootScope.contact = {
      'phone': '877-426-3774',
      'priority': 'Middleware'
    };
    /*
    {
      'leadspace': {
        'headline': 'API economy',
        'subhead': 'Power innovation and build new revenue streams by making APIs part of your business model. Connect with an IBM expert to find out how. ',
        'cat': 'Register for a free consultation',
        'catUrl': 'images/mlp-reference-apieconomy-2000x493px-1x.jpg'
      },
      'intro': {
        'subhead': 'lorem ipsum',
        'column1': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla et consectetur quam, a faucibus neque. Integer sit amet ante ut ipsum pellentesque varius. Ut nec varius libero, venenatis hendrerit leo. Nullam eget ligula nec massa dapibus egestas. Etiam feugiat rutrum ipsum vitae porttitor. Pellentesque nec leo eget turpis ornare mattis. Donec vitae pellentesque elit. Vivamus et purus pellentesque, gravida sapien sit amet, dapibus lorem. Pellentesque lacinia vel orci sit amet sagittis. Ut vel mi eget magna fringilla aliquam vitae rhoncus ex. Sed scelerisque rhoncus turpis, at pulvinar eros malesuada ac. Morbi varius dictum ultricies.',
        'ctaLeadIn': 'Lorem ipsum dolor sit amet, consectetur.',
        'cta': 'Lorem ipsum',
        'ctaUrl': '#'
      },
      'asset': {
        'subhead': 'What is the API economy?',
        'body': 'Exposing digital services to employees, partners and consumers, the API economy is an environment that’s driving industry transformation as a result of cloud, mobile, the Internet of Things and cognitive computing. Application programming interfaces (APIs) are the glue connecting services and systems across and between organizations.For business leaders, when a business delivers an API, it expands its brand and revenue potential. For architects and developers, APIs create efficiencies and fuel innovation, turning a single idea into an industry-disrupting app.Read the white paper, “The Power of the API Economy,” to gain insight into these new business opportunities.',
        'cta': 'View the PDF',
        'ctaUrl': 'http://www.redbooks.ibm.com/redpapers/pdfs/redp5096.pdf',
        'imgUrl': 'images/mlp_reference-api-whatis.png'
      },
      'step': {
        'subhead': 'Three ways to thrive in the API economy',
        'step1': {
          'imgUrl': 'http://www.ibm.com/middleware/integration/us-en/api-economy/images/mlp-reference-api-icons-01.png',
          'title': '1. Define an API strategy',
          'desc': 'Uncover your best opportunities for monetization and develop a clear path to fulfill them.',
          'cta': 'Register for a free consultation',
          'ctaUrl': 'http://www-01.ibm.com/marketing/iwm/iwm/web/signup.do?source=ibm-apimancon'
        },
        'step2': {
          'imgUrl': 'http://www.ibm.com/middleware/integration/us-en/api-economy/images/mlp-reference-api-icons-02.png',
          'title': '2. Build new APIs quickly',
          'desc': 'Easily develop and deploy robust APIs powered by Node.js capabilities.',
          'cta': 'Get started with Bluemix and StrongLoop',
          'ctaUrl': 'https://developer.ibm.com/bluemix/2015/09/10/getting-started-bluemix-strongloop/'
        },
        'step3': {
          'imgUrl': 'http://www.ibm.com/middleware/integration/us-en/api-economy/images/mlp-reference-api-icons-03.png',
          'title': '3. Secure and track your APIs',
          'desc': 'Manage access to your APIs, protect them from breaches and watch how they’re performing.',
          'cta': 'Sign up for a free trial',
          'ctaUrl': 'http://apps.admin.ibmcloud.com/manage/trial/apim.html'
        }
      },
      'contact': {
        'phone': '877-426-3774',
        'priority': 'Middleware'
      }
    }
    */
  });
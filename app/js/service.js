var serviceApp = angular.module('serviceApp', []);
serviceApp.factory('DataService', function($http) {
  return {
    add: function(data, success, error) {
      $http.post('/templates', data).success(success).error(error);
    },
    delete: function(data, success, error) {
      $http.delete('/templates/' + data._id + '/' + data._rev).success(success).error(error);
    },
    saveData: function(data, success, error) {
      $http.post('/templates/' + data._id, data).success(success).error(error);
    },
    getData: function(success, error) {
      $http.get('/templates').success(success).error(error);
    },
    createPage: function(data, success, error) {
      $http.post('/page', data).success(success).error(error);
    },
    addFolder: function(data, success, error) {
      $http.post('/folder', data).success(success).error(error);
    },
    deleteFolder: function(data, success, error){
      $http.delete('/folder/' + data._id + '/' + data._rev).success(success).error(error);
    },
    renameFolder: function(data, success, error){
      $http.put('/folder/' + data._id, data).success(success).error(error);
    },
    getFolder: function(success, error) {
      $http.get('/folder').success(success).error(error);
    },
    getImage: function(success, error){
      $http.get('/image').success(success).error(error);
    },
    getDefaultData: {
      "name": "default",
      "space": "0",
      "data": {
        "contact": {
          "googleUrl": "https://plus.google.com/106375465587386953111/about",
          "youtubeUrl": "https://www.youtube.com/user/IBMintegrationMedia",
          "twitterUrl": "https://twitter.com/IBMintegration",
          "ibmUrl": "https://www-304.ibm.com/connections/blogs/aim/?lang=en_us",
          "priority": "Middleware",
          "phone": "877-426-3774"
        },
        "disc": {
          "resource": {
            "res6": {
              "ctaUrl": "#",
              "cta": "Lorem ipsum dor 6",
              "body": "Lorem ipsum dolor sit amet, consectetur."
            },
            "res5": {
              "ctaUrl": "#",
              "cta": "Lorem ipsum dor 5",
              "body": "Lorem ipsum dolor sit amet, consectetur."
            },
            "res4": {
              "ctaUrl": "#",
              "cta": "Lorem ipsum dor 4",
              "body": "Lorem ipsum dolor sit amet, consectetur."
            },
            "res3": {
              "ctaUrl": "#",
              "cta": "Lorem ipsum dor 3",
              "body": "Lorem ipsum dolor sit amet, consectetur."
            },
            "res2": {
              "ctaUrl": "#",
              "cta": "Lorem ipsum dor 2",
              "body": "Lorem ipsum dolor sit amet, consectetur."
            },
            "res1": {
              "ctaUrl": "#",
              "cta": "Lorem ipsum dor 1",
              "body": "Lorem ipsum dolor sit amet, consectetur."
            },
            "subhead": "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
          },
          "action": {
            "ctaUrl": "#",
            "cta": "Lorem ipsum dor",
            "ctaLeadIn": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sagittis finibus justo ut mollis. Curabitur in feugiat neque, at feugiat mauris. In condimentum orci non sem varius tempus. Duis malesuada nunc sagittis placerat egestas."
          }
        },
        "defi2": {
          "step": {
            "step4": {
              "ctaUrl": "http://apps.admin.ibmcloud.com/manage/trial/apim.html",
              "cta": "Sign up for a free trial",
              "desc": "Manage access to your APIs, protect them from breaches and watch how they’re performing.",
              "title": "3. Secure and track your APIs",
              "imgUrl": "http://www.ibm.com/middleware/integration/us-en/api-economy/images/mlp-reference-api-icons-03.png"
            },
            "step3": {
              "ctaUrl": "http://apps.admin.ibmcloud.com/manage/trial/apim.html",
              "cta": "Sign up for a free trial",
              "desc": "Manage access to your APIs, protect them from breaches and watch how they’re performing.",
              "title": "3. Secure and track your APIs",
              "imgUrl": "http://www.ibm.com/middleware/integration/us-en/api-economy/images/mlp-reference-api-icons-03.png"
            },
            "step2": {
              "ctaUrl": "https://developer.ibm.com/bluemix/2015/09/10/getting-started-bluemix-strongloop/",
              "cta": "Get started with Bluemix and StrongLoop",
              "desc": "Easily develop and deploy robust APIs powered by Node.js capabilities.",
              "title": "2. Build new APIs quickly",
              "imgUrl": "http://www.ibm.com/middleware/integration/us-en/api-economy/images/mlp-reference-api-icons-02.png"
            },
            "step1": {
              "ctaUrl": "http://www-01.ibm.com/marketing/iwm/iwm/web/signup.do?source=ibm-apimancon",
              "cta": "Register for a free consultation",
              "desc": "Uncover your best opportunities for monetization and develop a clear path to fulfill them.",
              "title": "1. Define an API strategy",
              "imgUrl": "http://www.ibm.com/middleware/integration/us-en/api-economy/images/mlp-reference-api-icons-01.png"
            },
            "ctaUrl": "#",
            "cta": "Lorem ipsum",
            "ctaLeadIn": "Lorem ipsum dolor sit amet, consectetur.",
            "subhead": "Three ways to thrive in the API economy"
          },
          "asset": {
            "videoUrl": "https://www.youtube.com/watch?v=flXFf8M6dWI&index=1&list=WL",
            "imgUrl": "../../../images/mlp_reference-api-whatis.png",
            "ctaUrl": "http://www.redbooks.ibm.com/redpapers/pdfs/redp5096.pdf",
            "cta": "View the PDF",
            "body": "Exposing digital services to employees, partners and consumers, the API economy is an environment that’s driving industry transformation as a result of cloud, mobile, the Internet of Things and cognitive computing. Application programming interfaces (APIs) are the glue connecting services and systems across and between organizations.For business leaders, when a business delivers an API, it expands its brand and revenue potential. For architects and developers, APIs create efficiencies and fuel innovation, turning a single idea into an industry-disrupting app.Read the white paper, “The Power of the API Economy,” to gain insight into these new business opportunities.",
            "subhead": "What is the API economy?"
          },
          "intro": {
            "ctaUrl": "#",
            "cta": "Lorem ipsum",
            "ctaLeadIn": "Lorem ipsum dolor sit amet, consectetur.",
            "column2": [
              "Mauris augue dui, blandit non malesuada quis, ornare vitae justo.",
              "Etiam gravida nisl vel fringilla bibendum. Vestibulum at ultrices nisl.",
              "Aliquam finibus ex risus, vitae ultrices justo luctus non.",
              "Duis hendrerit lectus mattis, tristique nisi at, mollis risus."
            ],
            "column1": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla et consectetur quam, a faucibus neque. Integer sit amet ante ut ipsum pellentesque varius. Ut nec varius libero, venenatis hendrerit leo. Nullam eget ligula nec massa dapibus egestas. Etiam feugiat rutrum ipsum vitae porttitor. Pellentesque nec leo eget turpis ornare mattis. Donec vitae pellentesque elit. Vivamus et purus pellentesque, gravida sapien sit amet, dapibus lorem. Pellentesque lacinia vel orci sit amet sagittis. Ut vel mi eget magna fringilla aliquam vitae rhoncus ex. Sed scelerisque rhoncus turpis, at pulvinar eros malesuada ac. Morbi varius dictum ultricies.",
            "subhead": "lorem ipsum"
          }
        },
        "defi1": {
          "step": {
            "step4": {
              "ctaUrl": "http://apps.admin.ibmcloud.com/manage/trial/apim.html",
              "cta": "Sign up for a free trial",
              "desc": "Manage access to your APIs, protect them from breaches and watch how they’re performing.",
              "title": "4. Secure and track your APIs",
              "imgUrl": "http://www.ibm.com/middleware/integration/us-en/api-economy/images/mlp-reference-api-icons-03.png"
            },
            "step3": {
              "ctaUrl": "http://apps.admin.ibmcloud.com/manage/trial/apim.html",
              "cta": "Sign up for a free trial",
              "desc": "Manage access to your APIs, protect them from breaches and watch how they’re performing.",
              "title": "3. Secure and track your APIs",
              "imgUrl": "http://www.ibm.com/middleware/integration/us-en/api-economy/images/mlp-reference-api-icons-03.png"
            },
            "step2": {
              "ctaUrl": "https://developer.ibm.com/bluemix/2015/09/10/getting-started-bluemix-strongloop/",
              "cta": "Get started with Bluemix and StrongLoop",
              "desc": "Easily develop and deploy robust APIs powered by Node.js capabilities.",
              "title": "2. Build new APIs quickly",
              "imgUrl": "http://www.ibm.com/middleware/integration/us-en/api-economy/images/mlp-reference-api-icons-02.png"
            },
            "step1": {
              "ctaUrl": "http://www-01.ibm.com/marketing/iwm/iwm/web/signup.do?source=ibm-apimancon",
              "cta": "Register for a free consultation",
              "desc": "Uncover your best opportunities for monetization and develop a clear path to fulfill them.",
              "title": "1. Define an API strategy",
              "imgUrl": "http://www.ibm.com/middleware/integration/us-en/api-economy/images/mlp-reference-api-icons-01.png"
            },
            "ctaUrl": "#",
            "cta": "Lorem ipsum",
            "ctaLeadIn": "Lorem ipsum dolor sit amet, consectetur.",
            "subhead": "Three ways to thrive in the API economy"
          },
          "asset": {
            "videoUrl": "https://www.youtube.com/watch?v=flXFf8M6dWI&index=1&list=WL",
            "imgUrl": "http://lorempixel.com/700/420/",
            "ctaUrl": "http://www.redbooks.ibm.com/redpapers/pdfs/redp5096.pdf",
            "cta": "View the PDF",
            "body": "Exposing digital services to employees, partners and consumers, the API economy is an environment that’s driving industry transformation as a result of cloud, mobile, the Internet of Things and cognitive computing. Application programming interfaces (APIs) are the glue connecting services and systems across and between organizations.For business leaders, when a business delivers an API, it expands its brand and revenue potential. For architects and developers, APIs create efficiencies and fuel innovation, turning a single idea into an industry-disrupting app.Read the white paper, “The Power of the API Economy,” to gain insight into these new business opportunities.",
            "subhead": "What is the API economy?"
          },
          "intro": {
            "ctaUrl": "#",
            "cta": "Lorem ipsum",
            "ctaLeadIn": "Lorem ipsum dolor sit amet, consectetur.",
            "column2": [
              "Mauris augue dui, blandit non malesuada quis, ornare vitae justo.",
              "Etiam gravida nisl vel fringilla bibendum. Vestibulum at ultrices nisl.",
              "Aliquam finibus ex risus, vitae ultrices justo luctus non.",
              "Duis hendrerit lectus mattis, tristique nisi at, mollis risus."
            ],
            "column1": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla et consectetur quam, a faucibus neque. Integer sit amet ante ut ipsum pellentesque varius. Ut nec varius libero, venenatis hendrerit leo. Nullam eget ligula nec massa dapibus egestas. Etiam feugiat rutrum ipsum vitae porttitor. Pellentesque nec leo eget turpis ornare mattis. Donec vitae pellentesque elit. Vivamus et purus pellentesque, gravida sapien sit amet, dapibus lorem. Pellentesque lacinia vel orci sit amet sagittis. Ut vel mi eget magna fringilla aliquam vitae rhoncus ex. Sed scelerisque rhoncus turpis, at pulvinar eros malesuada ac. Morbi varius dictum ultricies.",
            "subhead": "lorem ipsum"
          }
        },
        "lead": {
          "catUrl": "#",
          "cat": "Register for a free consultation",
          "videoUrl": "http://www.ibm.com/middleware/integration/us-en/api-economy/vids/API-economy-assessement-leadspace.mp4",
          "imgUrl": "http://webdev.somerslab.ibm.com/v18-portfolio/patterns/assets/northstar/images/leadspace-purple.jpg",
          "subhead": "Power innovation and build new revenue streams by making APIs part of your business model. Connect with an IBM expert to find out how. ",
          "headline": "API economy"
        },
        "setting": {
          "contact": 1,
          "disc": {
            "substyle": 4,
            "type": 2
          },
          "prom3": {
            "substyle": 2,
            "type": 1
          },
          "prom2": {
            "substyle": 9,
            "type": 4
          },
          "prom1": {
            "substyle": 8,
            "type": 3
          },
          "defi2": {
            "substyle": 9,
            "type": 3
          },
          "defi1": {
            "substyle": 5,
            "type": 2
          },
          "lead": 1
        },
        "prom1": {
          "feat": {
            "subhead": "Lorem ipsum dolor sit amet",
            "solu1": {
              "body": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sagittis finibus justo ut mollis. Curabitur in feugiat neque, at feugiat mauris. In condimentum orci non sem varius tempus. Duis malesuada nunc sagittis placerat egestas.",
              "imgUrl": "http://lorempixel.com/600/340",
              "title": "Lorem ipsum dolor sit amet 1",
              "cta": "Lorem ipsum dolor sit amet",
              "ctaUrl": "#"
            },
            "solu2": {
              "body": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sagittis finibus justo ut mollis. Curabitur in feugiat neque, at feugiat mauris. In condimentum orci non sem varius tempus. Duis malesuada nunc sagittis placerat egestas.",
              "imgUrl": "http://lorempixel.com/600/340",
              "title": "Lorem ipsum dolor sit amet 2",
              "cta": "Lorem ipsum dolor sit amet",
              "ctaUrl": "#"
            },
            "solu3": {
              "body": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sagittis finibus justo ut mollis. Curabitur in feugiat neque, at feugiat mauris. In condimentum orci non sem varius tempus. Duis malesuada nunc sagittis placerat egestas.",
              "title": "Lorem ipsum dolor sit amet 3",
              "cta": "Lorem ipsum dolor sit amet",
              "ctaUrl": "#",
              "imgUrl": "http://lorempixel.com/600/340"
            }
          },
          "solu": {
            "subhead": "Featured solution: IBM API Management",
            "ctaLeadIn": "Discover how IBM API Management can help you in the API economy.",
            "cta": "Watch the demo",
            "ctaUrl": "#",
            "solu1": {
              "imgUrl": "http://webdev.somerslab.ibm.com/v18-portfolio/patterns/assets/northstar/images/API_SolutionOverview_Icons_101915-01.png",
              "feat": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse commodo. 1"
            },
            "solu2": {
              "imgUrl": "http://webdev.somerslab.ibm.com/v18-portfolio/patterns/assets/northstar/images/API_SolutionOverview_Icons_101915-02.png",
              "feat": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse commodo. 2"
            },
            "solu3": {
              "imgUrl": "http://webdev.somerslab.ibm.com/v18-portfolio/patterns/assets/northstar/images/API_SolutionOverview_Icons_101915-03.png",
              "feat": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse commodo. 3"
            },
            "solu4": {
              "imgUrl": "http://webdev.somerslab.ibm.com/v18-portfolio/patterns/assets/northstar/images/API_SolutionOverview_Icons_101915-04.png",
              "feat": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse commodo. 4"
            },
            "solu5": {
              "imgUrl": "http://webdev.somerslab.ibm.com/v18-portfolio/patterns/assets/northstar/images/API_SolutionOverview_Icons_101915-03.png",
              "feat": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse commodo. 5"
            },
            "solu6": {
              "imgUrl": "http://webdev.somerslab.ibm.com/v18-portfolio/patterns/assets/northstar/images/API_SolutionOverview_Icons_101915-03.png",
              "feat": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse commodo. 6"
            }
          },
          "case": {
            "ctaUrl": "#",
            "cta": "Lorem ipsum dolor sit amet",
            "caption2": "Lorem ipsum dolor sit amet",
            "statistic2": 7.7999999999999998,
            "body": "Lorem ipsum dolor sit amet, nam graeci aliquip consetetur at, in duo simul tantas accommodare, vix everti blandit ea. Populo aliquip placerat pro no percipit.",
            "subhead": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse commodo.",
            "statistic1": 50,
            "caption1": "Lorem ipsum dolor sit amet",
            "imgUrl": "http://lorempixel.com/1632/918"
          },
          "test": {
            "attribution": "Jerry Cuomo, IBM Middleware CTO, speaking about IBM’s acquisition of StrongLoop",
            "photo": "http://lorempixel.com/100/100",
            "quote": "“I predict that because of [the StrongLoop acquisition], one million new business APIs will be created to act as the fuel to accelerate the API economy.”",
            "ctaUrl": "#",
            "cta": "Lorem ipsum dolor sit amet"
          }
        },
        "prom2": {
          "feat": {
            "subhead": "Lorem ipsum dolor sit amet",
            "solu1": {
              "body": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sagittis finibus justo ut mollis. Curabitur in feugiat neque, at feugiat mauris. In condimentum orci non sem varius tempus. Duis malesuada nunc sagittis placerat egestas.",
              "imgUrl": "http://lorempixel.com/600/340",
              "title": "Lorem ipsum dolor sit amet 1",
              "cta": "Lorem ipsum dolor sit amet",
              "ctaUrl": "#"
            },
            "solu2": {
              "body": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sagittis finibus justo ut mollis. Curabitur in feugiat neque, at feugiat mauris. In condimentum orci non sem varius tempus. Duis malesuada nunc sagittis placerat egestas.",
              "imgUrl": "http://lorempixel.com/600/340",
              "title": "Lorem ipsum dolor sit amet 2",
              "cta": "Lorem ipsum dolor sit amet",
              "ctaUrl": "#"
            },
            "solu3": {
              "body": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sagittis finibus justo ut mollis. Curabitur in feugiat neque, at feugiat mauris. In condimentum orci non sem varius tempus. Duis malesuada nunc sagittis placerat egestas.",
              "title": "Lorem ipsum dolor sit amet 3",
              "cta": "Lorem ipsum dolor sit amet",
              "ctaUrl": "#",
              "imgUrl": "http://lorempixel.com/600/340"
            }
          },
          "solu": {
            "subhead": "Featured solution: IBM API Management",
            "ctaLeadIn": "Discover how IBM API Management can help you in the API economy.",
            "cta": "Watch the demo",
            "ctaUrl": "#",
            "solu1": {
              "imgUrl": "http://styleguide.nst.ibm.vsadev.com/assets/northstar/images/API_SolutionOverview_Icons_101915-01.png",
              "feat": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse commodo. 1"
            },
            "solu2": {
              "imgUrl": "http://styleguide.nst.ibm.vsadev.com/assets/northstar/images/API_SolutionOverview_Icons_101915-02.png",
              "feat": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse commodo. 2"
            },
            "solu3": {
              "imgUrl": "http://styleguide.nst.ibm.vsadev.com/assets/northstar/images/API_SolutionOverview_Icons_101915-03.png",
              "feat": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse commodo. 3"
            },
            "solu4": {
              "imgUrl": "http://styleguide.nst.ibm.vsadev.com/assets/northstar/images/API_SolutionOverview_Icons_101915-04.png",
              "feat": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse commodo. 4"
            },
            "solu5": {
              "imgUrl": "http://styleguide.nst.ibm.vsadev.com/assets/northstar/images/API_SolutionOverview_Icons_101915-03.png",
              "feat": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse commodo. 5"
            },
            "solu6": {
              "imgUrl": "http://styleguide.nst.ibm.vsadev.com/assets/northstar/images/API_SolutionOverview_Icons_101915-03.png",
              "feat": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse commodo. 6"
            }
          },
          "case": {
            "ctaUrl": "#",
            "cta": "Lorem ipsum dolor sit amet",
            "caption2": "Lorem ipsum dolor sit amet",
            "statistic2": 7.7999999999999998,
            "body": "Lorem ipsum dolor sit amet, nam graeci aliquip consetetur at, in duo simul tantas accommodare, vix everti blandit ea. Populo aliquip placerat pro no percipit.",
            "subhead": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse commodo.",
            "statistic1": 50,
            "caption1": "Lorem ipsum dolor sit amet",
            "imgUrl": "http://lorempixel.com/1632/918"
          },
          "test": {
            "attribution": "Jerry Cuomo, IBM Middleware CTO, speaking about IBM’s acquisition of StrongLoop",
            "photo": "http://lorempixel.com/100/100",
            "quote": "“I predict that because of [the StrongLoop acquisition], one million new business APIs will be created to act as the fuel to accelerate the API economy.”",
            "ctaUrl": "#",
            "cta": "Lorem ipsum dolor sit amet"
          }
        },
        "prom3": {
          "feat": {
            "subhead": "Lorem ipsum dolor sit amet",
            "solu1": {
              "body": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sagittis finibus justo ut mollis. Curabitur in feugiat neque, at feugiat mauris. In condimentum orci non sem varius tempus. Duis malesuada nunc sagittis placerat egestas.",
              "imgUrl": "http://lorempixel.com/600/340",
              "title": "Lorem ipsum dolor sit amet 1",
              "cta": "Lorem ipsum dolor sit amet",
              "ctaUrl": "#"
            },
            "solu2": {
              "body": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sagittis finibus justo ut mollis. Curabitur in feugiat neque, at feugiat mauris. In condimentum orci non sem varius tempus. Duis malesuada nunc sagittis placerat egestas.",
              "imgUrl": "http://lorempixel.com/600/340",
              "title": "Lorem ipsum dolor sit amet 2",
              "cta": "Lorem ipsum dolor sit amet",
              "ctaUrl": "#"
            },
            "solu3": {
              "body": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sagittis finibus justo ut mollis. Curabitur in feugiat neque, at feugiat mauris. In condimentum orci non sem varius tempus. Duis malesuada nunc sagittis placerat egestas.",
              "title": "Lorem ipsum dolor sit amet 3",
              "cta": "Lorem ipsum dolor sit amet",
              "ctaUrl": "#",
              "imgUrl": "http://lorempixel.com/600/340"
            }
          },
          "solu": {
            "subhead": "Featured solution: IBM API Management",
            "ctaLeadIn": "Discover how IBM API Management can help you in the API economy.",
            "cta": "Watch the demo",
            "ctaUrl": "#",
            "solu1": {
              "imgUrl": "http://styleguide.nst.ibm.vsadev.com/assets/northstar/images/API_SolutionOverview_Icons_101915-01.png",
              "feat": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse commodo. 1"
            },
            "solu2": {
              "imgUrl": "http://styleguide.nst.ibm.vsadev.com/assets/northstar/images/API_SolutionOverview_Icons_101915-02.png",
              "feat": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse commodo. 2"
            },
            "solu3": {
              "imgUrl": "http://styleguide.nst.ibm.vsadev.com/assets/northstar/images/API_SolutionOverview_Icons_101915-03.png",
              "feat": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse commodo. 3"
            },
            "solu4": {
              "imgUrl": "http://styleguide.nst.ibm.vsadev.com/assets/northstar/images/API_SolutionOverview_Icons_101915-04.png",
              "feat": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse commodo. 4"
            },
            "solu5": {
              "imgUrl": "http://styleguide.nst.ibm.vsadev.com/assets/northstar/images/API_SolutionOverview_Icons_101915-03.png",
              "feat": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse commodo. 5"
            },
            "solu6": {
              "imgUrl": "http://styleguide.nst.ibm.vsadev.com/assets/northstar/images/API_SolutionOverview_Icons_101915-03.png",
              "feat": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse commodo. 6"
            }
          },
          "case": {
            "ctaUrl": "#",
            "cta": "Lorem ipsum dolor sit amet",
            "caption2": "Lorem ipsum dolor sit amet",
            "statistic2": 7.7999999999999998,
            "body": "Lorem ipsum dolor sit amet, nam graeci aliquip consetetur at, in duo simul tantas accommodare, vix everti blandit ea. Populo aliquip placerat pro no percipit.",
            "subhead": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse commodo.",
            "statistic1": 50,
            "caption1": "Lorem ipsum dolor sit amet",
            "imgUrl": "http://lorempixel.com/1632/918"
          },
          "test": {
            "attribution": "Jerry Cuomo, IBM Middleware CTO, speaking about IBM’s acquisition of StrongLoop",
            "photo": "http://lorempixel.com/100/100",
            "quote": "“I predict that because of [the StrongLoop acquisition], one million new business APIs will be created to act as the fuel to accelerate the API economy.”",
            "ctaUrl": "#",
            "cta": "Lorem ipsum dolor sit amet"
          }
        },
        "meta": {
          keywords: "API Economy",
          canonical: "http://nsdev.somerslab.ibm.com/",
          description: "V18 Digital Meta data",
          title: "API Economy",
          "country": "United States",
          "language": "English",
          robots: "index,follow",
          dctDate: "2016-01-01",
          dctRight: "© Copyright IBM Corp. 2014"
        },
      }
    },
    getNullData: {
      "name": "null",
      "space": "Public",
      "data": {
        "contact": {},
        "disc": {

        },
        "defi2": {

        },
        "defi1": {},
        "lead": {},
        "setting": {
          "contact": 0,
          "disc": {
            "substyle": 1,
            "type": 1
          },
          "prom3": {
            "substyle": 0,
            "type": 0
          },
          "prom2": {
            "substyle": 0,
            "type": 0
          },
          "prom1": {
            "substyle": 0,
            "type": 0
          },
          "defi2": {
            "substyle": 0,
            "type": 0
          },
          "defi1": {
            "substyle": 1,
            "type": 1
          },
          "lead": 1
        },
        "prom1": {

        },
        "prom2": {

        },
        "prom3": {

        },
        "meta": {
          "keywords": "",
          "description": "",
          "title": "",
          "industry": "",
          "version": "",
          "country": "United States",
          "language": "English",
          "type": "",
          "owner": "",
          "locale": "",
          "subjects": "",
          "destination": "",
          "publishdate": "",
          "category": ""
        },
      }
    },
    getDefaultCountry: [{
      code: "af",
      country: "Afganistan"
    }, {
      code: "dz",
      country: "Algeria"
    }, {
      code: "ao",
      country: "Angola"
    }, {
      code: "ai",
      country: "Anguilla"
    }, {
      code: "ag",
      country: "Antigua and Barbuda"
    }, {
      code: "ar",
      country: "Argentina"
    }, {
      code: "aw",
      country: "Aruba"
    }, {
      code: "au",
      country: "Australia"
    }, {
      code: "at",
      country: "Austria"
    }, {
      code: "bs",
      country: "Bahamas"
    }, {
      code: "bh",
      country: "Bahrain"
    }, {
      code: "bd",
      country: "Bangladesh"
    }, {
      code: "bb",
      country: "Barbados"
    }, {
      code: "be",
      country: "Belgium/Luxembourg"
    }, {
      code: "bm",
      country: "Bermuda"
    }, {
      code: "bo",
      country: "Bolivia"
    }, {
      code: "bw",
      country: "Botswana"
    }, {
      code: "br",
      country: "Brazil"
    }, {
      code: "vg",
      country: "British Virgin Islands"
    }, {
      code: "bn",
      country: "Brunei Darussalam"
    }, {
      code: "bg",
      country: "Bulgaria"
    }, {
      code: "bf",
      country: "Burkina Faso"
    }, {
      code: "kh",
      country: "Cambodia"
    }, {
      code: "cm",
      country: "Cameroon"
    }, {
      code: "ca",
      country: "Canada"
    }, {
      code: "ky",
      country: "Cayman Islands"
    }, {
      code: "td",
      country: "Chad"
    }, {
      code: "cl",
      country: "Chile"
    }, {
      code: "cn",
      country: "China"
    }, {
      code: "co",
      country: "Colombia"
    }, {
      code: "cg",
      country: "Congo"
    }, {
      code: "cr",
      country: "Costa Rica"
    }, {
      code: "hr",
      country: "Croatia"
    }, {
      code: "cw",
      country: "Curacao"
    }, {
      code: "cy",
      country: "Cyprus"
    }, {
      code: "cz",
      country: "Czech Republic"
    }, {
      code: "dk",
      country: "Denmark"
    }, {
      code: "dm",
      country: "Dominica"
    }, {
      code: "cd",
      country: "Congo, The Democratic Republic of the"
    }, {
      code: "ec",
      country: "Ecuador"
    }, {
      code: "eg",
      country: "Egypt"
    }, {
      code: "ee",
      country: "Estonia"
    }, {
      code: "et",
      country: "Ethiopia"
    }, {
      code: "fi",
      country: "Finland"
    }, {
      code: "fr",
      country: "France"
    }, {
      code: "ga",
      country: "Gabon"
    }, {
      code: "de",
      country: "Germany"
    }, {
      code: "gh",
      country: "Ghana"
    }, {
      code: "gr",
      country: "Greece"
    }, {
      code: "gd",
      country: "Grenada"
    }, {
      code: "gy",
      country: "Guyana"
    }, {
      code: "hk",
      country: "Hong Kong"
    }, {
      code: "hu",
      country: "Hungary"
    }, {
      code: "in",
      country: "India"
    }, {
      code: "id",
      country: "Indonesia"
    }, {
      code: "iq",
      country: "Iraq"
    }, {
      code: "ie",
      country: "Ireland"
    }, {
      code: "il",
      country: "Israel"
    }, {
      code: "it",
      country: "Italy"
    }, {
      code: "ci",
      country: "Ivory Coast"
    }, {
      code: "jm",
      country: "Jamaica"
    }, {
      code: "jp",
      country: "Japan"
    }, {
      code: "jo",
      country: "Jordan"
    }, {
      code: "kz",
      country: "Kazakhstan"
    }, {
      code: "ke",
      country: "Kenya"
    }, {
      code: "kr",
      country: "Korea, Republic of"
    }, {
      code: "kw",
      country: "Kuwait"
    }, {
      code: "lv",
      country: "Latvia"
    }, {
      code: "lb",
      country: "Lebanon"
    }, {
      code: "lt",
      country: "Lithuania"
    }, {
      code: "ly",
      country: "Libya"
    }, {
      code: "mg",
      country: "Madagascar"
    }, {
      code: "mw",
      country: "Malawi"
    }, {
      code: "my",
      country: "Malaysia"
    }, {
      code: "mu",
      country: "Mauritius"
    }, {
      code: "mx",
      country: "Mexico"
    }, {
      code: "ms",
      country: "Montserrat"
    }, {
      code: "ma",
      country: "Morocco"
    }, {
      code: "mz",
      country: "Mozambique"
    }, {
      code: "na",
      country: "Namibia"
    }, {
      code: "np",
      country: "Nepal"
    }, {
      code: "nl",
      country: "Netherlands"
    }, {
      code: "nz",
      country: "New Zealand"
    }, {
      code: "ne",
      country: "Niger"
    }, {
      code: "ng",
      country: "Nigeria"
    }, {
      code: "no",
      country: "Norway"
    }, {
      code: "om",
      country: "Oman"
    }, {
      code: "pk",
      country: "Pakistan"
    }, {
      code: "py",
      country: "Paraguay"
    }, {
      code: "pe",
      country: "Peru"
    }, {
      code: "ph",
      country: "Philippines"
    }, {
      code: "pl",
      country: "Poland"
    }, {
      code: "pt",
      country: "Portugal"
    }, {
      code: "qa",
      country: "Qatar"
    }, {
      code: "ro",
      country: "Romania"
    }, {
      code: "ru",
      country: "Russian Federation"
    }, {
      code: "kn",
      country: "Saint Kitts and Nevis"
    }, {
      code: "lc",
      country: "Saint Lucia"
    }, {
      code: "vc",
      country: "Saint Vincent and the Grenadines"
    }, {
      code: "sa",
      country: "Saudi Arabia"
    }, {
      code: "sn",
      country: "Senegal"
    }, {
      code: "rs",
      country: "Serbia"
    }, {
      code: "sc",
      country: "Seychelles"
    }, {
      code: "sl",
      country: "Sierra Leone"
    }, {
      code: "sg",
      country: "Singapore"
    }, {
      code: "sk",
      country: "Slovakia"
    }, {
      code: "si",
      country: "Slovenia"
    }, {
      code: "za",
      country: "South Africa"
    }, {
      code: "es",
      country: "Spain"
    }, {
      code: "lk",
      country: "Sri Lanka"
    }, {
      code: "sr",
      country: "Suriname"
    }, {
      code: "se",
      country: "Sweden"
    }, {
      code: "ch",
      country: "Switzerland"
    }, {
      code: "tw",
      country: "Taiwan"
    }, {
      code: "tz",
      country: "Tanzania, United Republic of"
    }, {
      code: "th",
      country: "Thailand"
    }, {
      code: "tt",
      country: "Trinidad and Tobago"
    }, {
      code: "tn",
      country: "Tunisia"
    }, {
      code: "tr",
      country: "Turkey"
    }, {
      code: "tc",
      country: "Turks and Caicos Islands"
    }, {
      code: "ug",
      country: "Uganda"
    }, {
      code: "ua",
      country: "Ukraine"
    }, {
      code: "ae",
      country: "United Arab Emirates"
    }, {
      code: "uk",
      country: "United Kingdom"
    }, {
      code: "us",
      country: "United States"
    }, {
      code: "uy",
      country: "Uruguay"
    }, {
      code: "uz",
      country: "Uzbekistan"
    }, {
      code: "ve",
      country: "Venezuela"
    }, {
      code: "vn",
      country: "Vietnam"
    }, {
      code: "ye",
      country: "Yemen"
    }, {
      code: "zm",
      country: "Zambia"
    }, {
      code: "zw",
      country: "Zimbabwe"
    }],
    getDefaultLanguage: [{
      code: "bg",
      language: "Bulgarian"
    }, {
      code: "zh",
      language: "Chinese (Simplified)"
    }, {
      code: "zh",
      language: "Chinese (Traditional)"
    }, {
      code: "hr",
      language: "Croatian"
    }, {
      code: "cs",
      language: "Czech"
    }, {
      code: "da",
      language: "Danish"
    }, {
      code: "nl",
      language: "Dutch"
    }, {
      code: "en",
      language: "English"
    }, {
      code: "et",
      language: "Estonian"
    }, {
      code: "fi",
      language: "Finnish"
    }, {
      code: "fr",
      language: "French"
    }, {
      code: "de",
      language: "German"
    }, {
      code: "el",
      language: "Greek"
    }, {
      code: "he",
      language: "Hebrew"
    }, {
      code: "hu",
      language: "Hungarian"
    }, {
      code: "it",
      language: "Italian"
    }, {
      code: "ja",
      language: "Japanese"
    }, {
      code: "kk",
      language: "Kazakh"
    }, {
      code: "ko",
      language: "Korean"
    }, {
      code: "lv",
      language: "Latvian"
    }, {
      code: "lt",
      language: "Lithuanian"
    }, {
      code: "no",
      language: "Norwegian"
    }, {
      code: "pl",
      language: "Polish"
    }, {
      code: "pt",
      language: "Portuguese"
    }, {
      code: "ro",
      language: "Romanian"
    }, {
      code: "ru",
      language: "Russian"
    }, {
      code: "sr",
      language: "Serbian"
    }, {
      code: "sk",
      language: "Slovak"
    }, {
      code: "sl",
      language: "Slovenian"
    }, {
      code: "es",
      language: "Spanish"
    }, {
      code: "sv",
      language: "Swedish"
    }, {
      code: "tr",
      language: "Turkish"
    }, {
      code: "uk",
      language: "Ukrainian"
    }, {
      code: "uz",
      language: "Uzbek"
    }, {
      code: "vi",
      language: "Vietnamese"
    }, {
      code: "en",
      language: "Zimbabwe"
    }],
  };
});

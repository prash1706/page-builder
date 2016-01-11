var serviceApp = angular.module('serviceApp', []);
serviceApp.factory('DataService', function($http) {
  return {
    add: function(data, success, error) {
      $http.post('/templates', data).success(success).error(error);
    },
    delete: function(data, success, error) {
      $http.delete('/templates/' + data._id).success(success).error(error);
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
    getDefaultData: {
      "name": "default",
      "space": "Public",
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
            "ctaLeadIn": "How can you thrive in the API economy? Find out now."
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
        "lead": {
          "catUrl": "#",
          "cat": "Register for a free consultation",
          "videoUrl": "http://www.ibm.com/middleware/integration/us-en/api-economy/vids/API-economy-assessement-leadspace.mp4",
          "imgUrl": "../../images/leadspace-bg.jpg",
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
          "lead": 2
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
          description: "V18 Digital Meta data",
          title: "API Economy",
          industry: "Test industry",
          version: "v18",
          country: "US - test",
          type: "CTB00",
          owner: "Haresh Patel/Richmond/Contr/IBM",
          locale: "en-MX",
          subjects: "IN.J",
          destination: "Paris, France",
          publishdate: "Oct 6, 2015, 4:44:14 PM EDT",
          category: "SB03"
        },
      },
    }
  };
});

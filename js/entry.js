requirejs.config({
    baseUrl:"js/libs",
    paths:{
        "app":"../app",
        "angular":"angular.min",
        "uiRouter":"angular-ui-router.min",
        "uiBootstrap":"ui-bootstrap.min",
        "routes":"../config/routes",
        //util
        "util/getSystemInfo":"../utils/getSystemInfo",
        
        //interceptor
        'interceptor/httpService' 			: '../interceptor',
        
        //directive
        'directive/uiFormDirective':'../directive/uiFormDirective',
        
        //i18n
        'nls/en_US'											: 'translations/en_US',
		'nls/zh_HK'											: 'translations/zh_HK',
		'nls/zh_CN'											: 'translations/zh_CN',
		'nls/support/en_US'							: 'translations/support/en_US',
		'nls/support/zh_HK'							: 'translations/support/zh_HK',
		'nls/support/zh_CN'							: 'translations/support/zh_CN',
		'nls/supportContact/en_US'			: 'translations/supportContact/en_US',
		'nls/supportContact/zh_HK'			: 'translations/supportContact/zh_HK',
		'nls/supportContact/zh_CN'			: 'translations/supportContact/zh_CN',
		'nls/supportTnc/en_US'					: 'translations/supportTnc/en_US',
		'nls/supportTnc/zh_HK'					: 'translations/supportTnc/zh_HK',
		'nls/supportTnc/zh_CN'					: 'translations/supportTnc/zh_CN',
		'nls/supportPrivacy/en_US'			: 'translations/supportPrivacy/en_US',
		'nls/supportPrivacy/zh_HK'			: 'translations/supportPrivacy/zh_HK',
		'nls/supportPrivacy/zh_CN'			: 'translations/supportPrivacy/zh_CN',
		'nls/register/en_US'						: 'translations/register/en_US',
		'nls/register/zh_HK'						: 'translations/register/zh_HK',
		'nls/register/zh_CN'						: 'translations/register/zh_CN',
        
        //config
        "config/envConfig":"../config/envConfig"
    },
    shim:{
        "app":{
            deps:["angular","uiRouter","uiBootstrap"]
        },
        "uiRouter":{
            deps:["angular"]
        },
        "uiBootstrap":{
            deps:["angular"]
        },
        "directive/uiFormDirective":{
            deps:["angular"]
        }
    }
});

requirejs([
    "app",
    "routes",
    "util/getSystemInfo",
    "config/envConfig",
    "interceptor/httpService",
    "directive/uiFormDirective"
],function(app,routes){
    app.config(["$stateProvider","$urlRouterProvider","$httpProvider",function($stateProvider, $urlRouterProvider,$httpProvider){
        
        
        console.log(routes)
        // Don't strip trailing slashes from calculated URLs
        //$resourceProvider.defaults.stripTrailingSlashes = true;

        // HTML5 mode
       // $locationProvider.hashPrefix("!");

        // add interceptor for all http activities
		$httpProvider.interceptors.push('httpServiceInterceptor');
        
        $urlRouterProvider.otherwise("/");
        //router setting
        for(var key in routes){
            //if(routes.hasOwnProperty(key)){
                $stateProvider.state(key,{
                    //"resolve":routes[key].requireFiles,
                    "url":routes[key].url,
                    "templateUrl":routes[key].templateUrl
                })
           // }
        }
<<<<<<< HEAD
      
        
    }]);
  
=======
      /*  
        $translateProvider
            .registerAvailableLanguageKeys(['en_US', 'zh_HK', 'zh_CN'], {
		    'en': 'en_US',
		    'en*': 'en_US',
		    'zh_TW': 'zh_HK',
		    'zh': 'zh_HK'
		  })
        .useLoader('translationLoader')
        .determinePreferredLanguage()
        .fallbackLanguage('zh_HK');
        
        try{
			
				$translateProvider.preferredLanguage('zh_CN');
			
		} catch (error){}
        */
    }]);
    
   /* app.factory('translationLoader', function($q, appConstants){
		var translation_part = [];
		return function(options){
			appConstants.lang = options.key;
			var deferred = $q.defer(),
					files = ['nls/'+options.key];
			// get the addix translations
			if(appConstants.affixTranslation.length > 0){
				for(var i = 0; i < appConstants.affixTranslation.length; i++){
					files.push('nls/'+appConstants.affixTranslation[i]+'/'+options.key);
				}
			}
			require(files, function(){
				var translations = {};
				for( var i in arguments){
					angular.extend(translations, arguments[i]);
				}
				deferred.resolve(translations);
			}, function(error){
				console.log('cannot get the translation, reason(s): ', error);
				deferred.reject(options.key);
			})
			return deferred.promise;
		}
	});*/
>>>>>>> e293ae4d14bdd5218eca24e14934ecb8e7c9cf48
    
    app.service('appConstants', function( getSystemInfo, envConfig) {
        var self = this;
		this.device = getSystemInfo.device;
		this.lang = null;
		this.os = getSystemInfo.os; // change to check the copy link hide on iphone
		this.appVersion = 1;
		this.debug = envConfig.debug;
    });
    
    app.run(function(appConstants){
        console.log(appConstants)
    });
    
    angular.element(document).ready(function() {
		console.log("<<< Load bootstrap - Start >>>");
		angular.bootstrap(document, ["app"]);
		console.log("<<< Load bootstrap - End >>>");
	});
    
});

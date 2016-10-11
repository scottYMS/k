requirejs.config({
    baseUrl:"js/libs",
    paths:{
        "app":"../app",
        "angular":"angular.min",
        "uiRouter":"angular-ui-router.min",
        "uiBootstrap":"ui-bootstrap.min",
        "routes":"../config/routes",
        
        "util/getSystemInfo":"../utils/getSystemInfo",
        
        'interceptor/httpService' 			: '../interceptor',
        
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
        }
    }
});

requirejs([
    "app",
    "routes",
    "util/getSystemInfo",
    "config/envConfig",
    "interceptor/httpService"
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
        
    }]);
    
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

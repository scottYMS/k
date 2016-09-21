requirejs.config({
    baseUrl:"js/libs",
    paths:{
        "app":"../app",
        "angular":"angular.min",
        "uiRouter":"angular-ui-router.min",
        "uiBootstrap":"ui-bootstrap.min",
        "routes":"../config/routes"
    },
    shim:{
        "app":{
            deps:["uiRouter","uiBootstrap"]
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
    "routes"
],function(app,routes){
    app.config(function($stateProvider, $urlRouterProvider, $controllerProvider, $compileProvider, $filterProvider, $provide){
        
        
        
        //html5 mode
        
        
        //router setting
        for(var key in routes){
            if(routes.hasOwnProperty(key)){
                $stateProvider.state(key,{
                    resolve:routes[key].requireFiles,
                    url:routes[key].url,
                    templateUrl:routes[key].templateUrl
                })
            }
        }
        
        
        $stateProvider.otherwise("/");
    });
    
    angular.element(document).ready(function() {
		console.log("<<< Load bootstrap - Start >>>");
		angular.bootstrap(document, ["app"]);
		console.log("<<< Load bootstrap - End >>>");
	});
    
});

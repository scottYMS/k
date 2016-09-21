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
        console.log($controllerProvider.register)
    });
    
    angular.element(document).ready(function() {
		console.log("<<< Load bootstrap - Start >>>");
		angular.bootstrap(document, ["app"]);
		console.log("<<< Load bootstrap - End >>>");
	});
    
});

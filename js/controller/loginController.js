// control the activities on home page
define(['appsdollar', 'service/facebookService'], function(appsdollar) {
	return appsdollar.controller('loginController', function(httpService, authenticationService, facebookService, appConstants, $state, $scope, $stateParams) {
		var emailInput = angular.element(document.getElementsByName('email'));
		var passwordInput = angular.element(document.getElementsByName('password'));
		emailInput.on('focus', function(){
			window.setTimeout(function(){
				window.scrollTo(0, 100);
			}, 500);
		});
		passwordInput.on('focus', function(){
			window.setTimeout(function(){
				window.scrollTo(0, 100);
			}, 500);
		});

		if(localStorage.getItem('loginEmail')){
			$scope.email = localStorage.getItem('loginEmail');
		}

		$scope.action = appConstants.stateAction ? appConstants.stateAction.login : null;

		// hide the footer on myCart page and show it when user goes to other page
		$scope.$emit('showFooter', {'show': false});
		$scope.$on('$destroy', function(){
			$scope.$emit('showFooter', {'show': true});
			emailInput.off('focus');
			passwordInput.off('focus');
		});

	  $scope.login = function (){
	  	var loginType = 0;
	  	var param = { email: $scope.email, password: $scope.password, loginType:loginType };
	  	if($scope.isRememberMe){
	  		localStorage.setItem('loginEmail', $scope.email);
	  	} else if(localStorage.getItem('loginEmail')){
	  		localStorage.removeItem('loginEmail');
	  	}
	  	authenticationService.login(param)
	  	.then(function(){
	  		if($scope.action) {
	  			appConstants.stateAction.login = null;
	  			$state.go($scope.action.target, $scope.action.data);
	  		} else {
	  			$state.go('home');
	  		}
	  	}, function(response){
	  		$scope.password = "";
	  		$scope.form.$setPristine();
	  		if(response && response.data && response.data.reAcceptTnc == 1){
	  			$state.go('reAcceptTnc', {token: response.data.token});
				}
	  	});
	  };

	  $scope.loginFacebook = function(){
	  	if(appConstants.stateAction)
	  		sessionStorage.setItem('stateAction', JSON.stringify(appConstants.stateAction));
	  	console.log('JSON.stringify(appConstants.stateAction)', JSON.stringify(appConstants.stateAction));
	  	facebookService.login().
	  		then(function(){
	  			if($scope.action) {
						sessionStorage.removeItem("stateAction");
						if(appConstants.stateAction)
		  				appConstants.stateAction.login = null;
		  			$state.go($scope.action.target, $scope.action.data);
		  		} else {
		  			$state.go('home');
		  		}
	  		}, function(response){
	  		if(response.data.reAcceptTnc == 1){
	  			$state.go('reAcceptTnc', {token: response.data.token});
				}
	  	});
	  }
	  if(appConstants.hashParam && sessionStorage.facebook_type && appConstants.handlingFb){
			console.log('handling Facebook login return');
			// get the action data if any
			if(sessionStorage.stateAction){
				var stateAction = JSON.parse(sessionStorage.stateAction);
			}
			$scope.action = sessionStorage.stateAction ? stateAction.login : null;
			$scope.loginFacebook();
		}
	});
});

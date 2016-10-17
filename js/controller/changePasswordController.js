define(['appsdollar'], function(appsdollar){
	return appsdollar.controller('changePasswordController', function(authenticationService, $state, $scope, $uibModal, $translate){
		$scope.submit = function(){
			authenticationService.changePassword($scope.password)
    	.then(function(){
    		$scope.showNotification();
    	});
		}

		$scope.showNotification = function(){
			$uibModal.open({
				templateUrl: 'template/modal/popup.html',
				controller: 'popUpController',
				windowClass: 'modal-popup-container',
				size : 'popup',
				resolve: {
					type: function(){
						return 'notify'
					},
					message: function() {
						return {
							'title' : $translate.instant('change-password'),
							'content' : $translate.instant('change-password-success-msg')
						};
					}
				}
			}).result.then(function(data) {
				authenticationService.logout().then(function(){
					$state.go('home');
				});
			}, function() {
				console.log("-popup from Cancel");
			});
		}
	});
})

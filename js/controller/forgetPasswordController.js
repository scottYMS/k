// control the activities on home page
define(['appsdollar'], function(appsdollar) {
	return appsdollar.controller('forgetPasswordController', function(authenticationService, appConstants, $state, $scope, $uibModal, $translate) {

    $scope.forget = function (){
    	console.log($scope.email);
    	authenticationService.forgetPassword($scope.email)
    	.then(function(){
    		$scope.showNotification();
    	});
    };

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
							'title' : $translate.instant('forget-password'),
							'content' : $translate.instant('foret-password-success-msg', {'email': $scope.email})
						};
					}
				}
			}).result.then(function(data) {
				$state.go('home');
			}, function() {
				console.log("-popup from Cancel");
			});
		}
	});
});

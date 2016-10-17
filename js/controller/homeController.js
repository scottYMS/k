// control the activities on home page
define(['appsdollar', 'util/addtohomescreen', 'util/timeAgoFilter'], function(appsdollar){
	return appsdollar.controller('homeController', function(httpService, appConstants, $scope, $rootScope, $state, $uibModal, $translate){

		//Add To Home Screen Banner and force the locale
		addToHomescreen({
		   appID: 'addToHomeScreen',
		   message: appConstants.lang == "zh_HK" ? "zh_tw" : appConstants.lang.toLowerCase()
		});

		// to resend the request to server after lang changed
		var changeLang = $rootScope.$on('$translateChangeSuccess', function(event, stateData){
			init();
		});

		$scope.$on('$destroy', function(){
			changeLang();
			if(addToHomescreen().shown == true)
				addToHomescreen().remove();
		});

		$scope.contentTypes = appConstants.contentTypes;

	 	// facebook return handling
		if(appConstants.verifyEmailSuccess){
			showPopup('verified-email');
			appConstants.verifyEmailSuccess = false;
		}
		//init();

		function init(){
			httpService.request('home',{}, true).then(
			function(response){
				$scope.featuredContents = response.data.featuredContents;
				$scope.recommendContent = response.data.recommendContent;
				// $scope.news = response.data.news;
				$scope.promotion = response.data.promotion;
				// $scope.banners = response.data.homeBanners;  // will un-comment if server return the banners

				// banners
				$scope.banners = [];
				for(var i in response.data.homeBanners){
					if(response.data.homeBanners[i].destinationType == 0){
						$scope.banners.push({
							url: response.data.homeBanners[i].homeBannerUrl,
							target: response.data.homeBanners[i].destination
						});
					} else {
						var typeName = appConstants.contentType[response.data.homeBanners[i].destinationType].concat("Detail");
						$scope.banners.push({
							url: response.data.homeBanners[i].homeBannerUrl,
							target: typeName+"({contentId:"+response.data.homeBanners[i].destination+"})"
						});
					}
				}

				// contentTypes
				appConstants.contentTypes = [];
				for(var i in response.data.contentTypes){
					appConstants.contentTypes.push(angular.extend({
						link: appConstants.contentType[response.data.contentTypes[i].contentType]
					}, response.data.contentTypes[i]));
				}

				$scope.contentTypes = appConstants.contentTypes;

				// $scope.news.timestamp = new Date($scope.news.newsCreatedTime.replace(/-/g, "/"));
			});
		}

		$scope.goToDetail = function(type, id){
			var typeName = appConstants.contentType[type].concat("Detail");
			$scope.storeContentType(type);
			$state.go(typeName, { contentId: id });
		}

		$scope.storeContentType = function(contentType){
			console.log('storeContentType', contentType);
			for(var i in appConstants.contentTypes){
				if(appConstants.contentTypes[i].contentType == contentType){
					appConstants.contentTypes[i].selected = true;
				} else {
					appConstants.contentTypes[i].selected = false;
				}
			}
		}

		function showPopup(msg){
			$uibModal.open({
				templateUrl: 'template/modal/popup.html',
				controller: 'popUpController',
				windowClass: 'modal-popup-container',
				size : 'popup',
				keyboard : false,
				resolve: {
					type: function(){
						return "";
					},
					message: function() {
						return {
							content : "",
							title: $translate.instant(msg)
						};
					}
				}
			});
		}

	});
});

// control the list activities on favourite list page
'use strict';

define(['appsdollar'], function(appsdollar) {
	return appsdollar.controller('favouriteListController', function(httpService, $scope, $translate,$state ,appConstants, currencyService, favouriteService, $rootScope, myCartService, $timeout) {
		$scope.isOpenDropDown = false;
		$scope.showNotification = false;
		$scope.isDisableLoad = true;
		$scope.categories = [];
		$scope.currencyMapping = currencyService.getCurrencyMapping();
		$scope.showLimit = 10; // limit the records showing on the screen, initial 10
		$scope.showStep = 10; // add 10 records after user scroll to the bottom
		$scope.fetchNumber = 20; // how many records will fetch for each request

		// to resend the request to server after lang changed
		var changeLang = $rootScope.$on('$translateChangeSuccess', function(event, stateData){
			init();
		});

		$scope.$on('$destroy', function(){
			changeLang();
		});

		$scope.items = [
	    'The first choice!',
	    'And another choice for you.',
	    'but wait! A third!'
	  ];

		init();

		function init() {
			getFirstList();
		}

		function getFirstList()
		{
			httpService.request("favouriteList", {
				userId: appConstants.userId
			}).then(
				// success
				function(response){
					console.log(response);
					$scope.index = 1;
					$scope.contents = [];
					$scope.totalSize = 0;
					$scope.index += response.data.contents ? response.data.contents.length - 1 : 0;
					$scope.isDisableLoad = false;

					// for(var i in response.data){
					// 	$scope.contents = $scope.contents.concat(response.data.contents);
					// 	$scope.totalSize += response.data[i].totalSize;
					// }

					$scope.contents = response.data.contents;
					$scope.totalSize = response.data.totalSize;

					for(var i in $scope.contents){
						var noPrice = false;
						if($scope.contents[i].supportPaymentMethods && $scope.contents[i].supportPaymentMethods.length > 0){
							for(var j in $scope.contents[i].supportPaymentMethods){
								if(!$scope.contents[i].isPromotion && $scope.contents[i].supportPaymentMethods[j].paymentPoints > 0){
									noPrice = false;
								} else if($scope.contents[i].isPromotion && $scope.contents[i].supportPaymentMethods[j].promotionPoints > 0){
									noPrice = false;
								} else {
									noPrice = true;
								}
							}
						}
						if(noPrice){
							$scope.contents[i].supportPaymentMethods = null;
						}
					}

					console.log('$scope.contents', $scope.contents);

					//If No result found
					if(!$scope.contents || $scope.contents.length == 0 || response.data == null ){
						failResponse();
					}
				},
				//Fail
				function(response){
						failResponse();
			});
		}

		function failResponse(){
			$scope.isEmptyResult = true;
			$scope.isDisableLoad = false; //Hide spinning loader
		}

		$scope.loadMore = function() {
			if($scope.showLimit < $scope.totalSize){
				$scope.showLimit += $scope.showStep;
			}
			console.log("loadMore()" + $scope.contents.length + " <-> " + $scope.totalSize);
			if ($scope.totalSize - $scope.showLimit <= $scope.showStep && $scope.contents.length < $scope.totalSize) {
				$scope.isDisableLoad = true;
				httpService.request("searchList", {
					searchName: searchKey,
					startIndex: $scope.index,
					endIndex: $scope.index + $scope.fetchNumber
				}).then(function(response) {
					$scope.index += response.data.contents.length - 1;
					$scope.contents = $scope.contents.concat(response.data.contents);
					$scope.totalSize = response.data.totalSize;
					$scope.isDisableLoad = false;
				});
			}
		}

		$scope.goToDetail = function(type, id){
			var typeName = appConstants.contentType[type].concat("Detail");
			for(var i in appConstants.contentTypes){
				if(appConstants.contentTypes[i].contentType == type){
					appConstants.contentTypes[i].selected = true;
				} else {
					appConstants.contentTypes[i].selected = false;
				}
			}
			$state.go(typeName, { contentId: id });
		}

		$scope.addToCart = function(index){
			console.log('index', index);
			var item = {
				id: $scope.contents[index].contentId,
				quantity: 1,
				contentType: $scope.contents[index].contentType
			};

			myCartService.addItem(item);
			//Show notification
			$scope.showNotification = true;
			$timeout(function(){$scope.showNotification = false;}, 1500);
			console.log('list', myCartService.getList());
		}

		$scope.removeFav = function(index){
			console.log('index', index);
			console.log('$scope.contents[index]', $scope.contents[index]);

			favouriteService.unFavourite($scope.contents[index].contentId)
				.then(function(response){
					console.log('response', response);
					getFirstList()
				});
		}

	});
});

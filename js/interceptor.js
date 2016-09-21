/**
 * Service for handling the error code return from server.
 */
"use strict";

define(["app"], function(app){
	return app.factory("httpServiceInterceptor", function(appConstants, $q){
		var getTimeStamp = function() {
			var date = new Date();
			return date.getFullYear() + ""
				+ (date.getMonth()+1) + ""
				+ date.getDate() + ""
				+ date.getHours() + ""
				+ date.getMinutes() + ""
				+ date.getSeconds() + "";
		};

		/**
		 * Print Web Service header and logs.
		 * @param request web service request parameters
		 */
		var printWebServiceStart = function(request) {
			console.log("===============================================================================");
			console.log("%cHTTP Services - Start", "font-size: 14px; padding: 3px;");
			console.log("%c" + request.url + "", "font-size: 10px; padding: 3px;");
			console.log("Request (Object) : ", request);
			console.log("Params : ", JSON.stringify(request.params));
			console.log("===============================================================================");
		};

		/**
		 * Print Web Service footer and logs.
		 * @param success the request is completed with success or not
		 * @param response the respnose data from web services
		 */
		var printWebServiceEnd = function(success, response) {
			console.log("===============================================================================");
			console.log("%cHTTP Services - End", "font-size: 14px; padding: 3px;");
			console.log("%c" + response.config.url + "", "font-size: 10px; padding: 3px;");
			console.log("Success          : ", success);
			console.log("Response (Object): ", response);
			// console.log("Response (String): ", JSON.stringify(response));
			console.log("===============================================================================");
		};

		return {
			"request": function(config){
				if(config.url.indexOf('.html') == -1){
					config.params = angular.extend({
						"userId"			: appConstants.userId,
						"sessionId"		: appConstants.sessionId,
						"partyId"			: appConstants.partyId,
						"entryId"			: appConstants.entryId,
						"device"			: appConstants.device,
						"os"					: appConstants.os,
						// "appVersion"	: appConstants.appVersion,
						"lang"				: appConstants.lang,
						"_timestamp"	: getTimeStamp()
					}, config.params || {});
					printWebServiceStart(config);
				}
				return config;
			},
			"response": function(response) {
				if (response.config.url.indexOf('.html') == -1) {
					return $q.when(response).then(
						function success(response) {
							if (response.config.url.indexOf('.html') == -1) {
								if (response.data.state == 200) {
									printWebServiceEnd(true, response);
									return response;
								} else {
									printWebServiceEnd(false, response);
									return $q.reject(response);
								}
							}
						}, function error(response) {
							printWebServiceEnd(false, response);
							return $q.reject(response);
						});
				} else {
					return response;
				}
			}
		}
	});
});

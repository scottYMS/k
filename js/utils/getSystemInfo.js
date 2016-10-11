define(['app'], function(app) {
	return app.factory("getSystemInfo", function() {
		var param = {};

		if (navigator.userAgent.match(/Android/i)){
			var width = window.innerWidth;
			param["device"] = width >= 768?"tablet":"mobile";
			param["os"] = getOsId("aos");
		}else if (navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPod/i)){
			param["device"] = "mobile";
			param["os"] =  getOsId("ios");
		}else if (navigator.userAgent.match(/iPad/i)){
			param["device"] = "tablet";
			param["os"] =  getOsId("ios");
		}else{
			param["device"] = "mobile";
			param["os"] =  getOsId("other");
			//param["os"] = "ios";
		}

		function getOsId(os)
		{
			switch (os) {
                case "ios":
                    return 1;
                    break;
                case "aos":
                    return 2;
                    break;
                default:
                    return 2;
			}
		}

		return param;
	});
});

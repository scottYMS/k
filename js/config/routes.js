define([],function(){
    return {
        'home': {
			url: "/",
			templateUrl: "template/home.html",
			requireFiles: ["controller/home"],
			data: {
				title: "",
				back: false,
				affixTranslation: false,
				auth: false
			}
		},
		'login': {
			url: "/login",
			templateUrl: "template/login.html",
			requireFiles: ["controller/login"],
			data: {
				title: "login",
				back: 'back',
				affixTranslation: false,
				auth: false
			}
		}
    }
});
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
		},
        "register":{
            url: "/login",
			templateUrl: "template/register.html",
			requireFiles: ["controller/register"],
			data: {
				title: "register",
				back: 'back',
				affixTranslation: false,
				auth: false
			}
        },
        "changePassword":{
            url: "/login",
			templateUrl: "template/changePassword.html",
			requireFiles: ["controller/changePassword"],
			data: {
				title: "changePassword",
				back: 'back',
				affixTranslation: false,
				auth: false
			}
        }
    }
});
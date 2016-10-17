define(["app"],function(app){
    app
        .directive("uiWidget",["regexpService",function(regexpService){
            
        return {
            restrict:"EA",
            scope:{
                "binddata":"=",
                "regexp":"@",
                "isrequire":"@"
            },
            template:function(ele,opts){
                return '<div class="form-group" ><input type="text" ng-blur="checkValidata(this)" ng-model="binddata" /><span ng-show="error" class="ui-input-tips">{{message}}</span></div>';   
            },
            replace:true,
            controller:function($scope){
                $scope.error = false;
                $scope.message = "";
            },
            link:function(scope,ele,attr){
                
                scope.checkValidata = function($element){
                    scope.error = false;
                    scope.message = "";
                    var val=scope.binddata;
                    if(scope.isrequire){
                        if(val==""){
                            scope.error = true;
                            scope.message = "不能为空";
                            //scope.$apply();
                            return false;
                        }
                    }
                    if(scope.regexp && scope.regexp.indexOf(":")>-1){
                        if(scope.regexp.indexOf("&")>-1){
                            var temp = scope.regexp.split(":");
                            var reg = regexpService.getRegExp(temp[0]);
                            if(scope.regexp && angular.isFunction(reg)){
                                var flag = reg.apply(val,temp[1]);
                                if(flag==false){
                                    scope.error = true;
                                    scope.message = "输入格式错误";

                                }
                            }
                        }
                    }else{
                        var reg = regexpService.getRegExp(scope.regexp);
                        if(scope.regexp && angular.isFunction(reg)){
                        var flag = reg(val);
                        if(flag==false){
                            scope.error = true;
                            scope.message = "输入格式错误";
                            
                        }
                    }
                    }
                    
                    //scope.$apply();
                }
            }
            
        }
    }])
    .service("regexpService",function(){
        var self = this;
        /* 是否英文 */
        function isEnglish(v) {
            var re = new RegExp("^[a-zA-Z\_]+$");
            if (re.test(v)) return true;
            return false;
        }
        //是否为函数
        function isFunction(func){
            if(typeof func=="function"){
                return true;
            }
            return false;
        }

        //
        function isNull(val){
            return val==""
        }

        //是否为IP
        function isIP(strIP) { 
            if (isNull(strIP)) return false; 
            var re=/^(\d+)\.(\d+)\.(\d+)\.(\d+)$/g //匹配IP地址的正则表达式 
            if(re.test(strIP)) 
            { 
                if( RegExp.$1 <256 && RegExp.$2<256 && RegExp.$3<256 && RegExp.$4<256) {return true;} 
            } 
            return false; 
        } 

        /* 是否英文+数字 */
        function isEnglishAndNumber(v) {

            var re = new RegExp("^[0-9a-zA-Z\_]+$");
            if (re.test(v)) return true;
            return false;
        }

        /* 是否汉字 */
        function isChinese(v) {
            var re = new RegExp("^[\u4e00-\u9fa5]+$");
            if (re.test(v)) return true;
            return false;
        }

    //
        function maxLength(v,max){
            var len = v.length;
            if(len<=max){
                return true;
            }else{
                return false;
            }
        }

    //
        function minLength(v,min){
            var len = v.length;
            if(len>=max){
                return true;
            }else{
                return false;
            }
        }

    /* 是否QQ */
        function isQQ(v) {
            var re = new RegExp("^[1-9][0-9]{4,9}$");
            if (re.test(v)) return true;
            return false;
        }

    /* 是否电话 */
        function isMobile(v) {
            var re = new RegExp("^(0|86|17951)?(13[0-9]|15[012356789]|18[0-9]|14[57])[0-9]{8}$");
            if (re.test(v)) return true;
            return false;
        }

    /* 是否邮件 */
        function isEmail(v) {
            var re = new RegExp("^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$");
            if (re.test(v)) return true;
            return false;
        }

    //检查输入字符串是否符合正整数格式 
        function isNumber(v) {
            var re = new RegExp("^[0-9]+$");
            if (re.test(v)) return true;
            return false;
        }
     /* 是否整数 */
        function isInteger( str ){  
            var regu = /^[-]{0,1}[0-9]{1,}$/; 
            return regu.test(str); 
        } 

     /* 
        用途：检查输入字符串是否是带小数的数字格式,可以是负数 
        输入： s：字符串 
        返回： 如果通过验证返回true,否则返回false 
        */ 
        function isDecimal( str ){   
            if(isInteger(str)) return true; 
            var re = /^[-]{0,1}(\d+)[\.]+(\d+)$/; 
            if (re.test(str)) { 
                if(RegExp.$1==0&&RegExp.$2==0) return false; 
                return true; 
            } else { 
                return false; 
            } 
        } 

    /* 
        用途：检查输入字符串是否符合金额格式 格式定义为带小数的正数，小数点后最多三位 
        输入： s：字符串 
        返回： 如果通过验证返回true,否则返回false 

        */ 
        function isMoney( s ){   
            var regu = "^[0-9]+[\.][0-9]{0,3}$"; 
            var re = new RegExp(regu); 
            if (re.test(s)) { 
                return true; 
            } else { 
                return false; 
            } 
        } 

    /* 
        用途：检查输入字符串是否只由英文字母和数字组成 
        输入：s：字符串 
        返回：如果通过验证返回true,否则返回false 
        */ 
        function isNumberOrLetter( s ){//判断是否是数字或字母 
            var regu = "^[0-9a-zA-Z]+$"; 
            var re = new RegExp(regu); 
            if (re.test(s)) { 
                return true; 
            }else{ 
                return false; 
            } 
        } 
    /* 
        用途：判断是否是日期 
        输入：date：日期；fmt：日期格式 
        返回：如果通过验证返回true,否则返回false 
        */ 
        function isDate( date, fmt ) { 
            if (fmt==null) fmt="yyyyMMdd"; 
            var yIndex = fmt.indexOf("yyyy"); 
            if(yIndex==-1) return false; 
            var year = date.substring(yIndex,yIndex+4); 
            var mIndex = fmt.indexOf("MM"); 
            if(mIndex==-1) return false; 
            var month = date.substring(mIndex,mIndex+2); 
            var dIndex = fmt.indexOf("dd"); 
            if(dIndex==-1) return false; 
            var day = date.substring(dIndex,dIndex+2); 
            if(!isNumber(year)||year>"2100" || year< "1900") return false; 
            if(!isNumber(month)||month>"12" || month< "01") return false; 
            if(day>getMaxDay(year,month) || day< "01") return false; 
            return true; 
        } 
        var regExpList= {
            "english":isEnglish,
            "englishandnumber":isEnglishAndNumber,
            "ischinese":isChinese,
            "qq":isQQ,
            "mobile":isMobile,
            "email":isEmail,
            "integer":isInteger,
            "isip":isIP,
            "isnumber":isNumber,
            "ismoney":isMoney,
            "isdecimal":isDecimal,
            "isdate":isDate,
            "minlength":minLength,
            "maxlength":maxLength,
        }
        this.getRegExp = function(type){
            if(!regExpList.hasOwnProperty(type)){
                
                return false;
            }
            return regExpList[type];
        }
        return self;
    })
    .filter("uiDecimal",["envConfig",function(envConfig){
        console.log(envConfig);
        return function(input,future){
            if(input==""||!input || isNaN(input))return ;
            return (input*1).toFixed(2);
        }
    }]);
    
});
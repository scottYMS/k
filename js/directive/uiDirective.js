define(["app"],function(app){
    app.directive("back-drop-button",["strackService",function(strackService){
        return {
            restrict:"EA",
            template:function(){
                return '<span class="backdrop" ng-show="isshow" ng-click="addPagerTostrack()" isshow="backdropShow"></span>'
            },
            scope:{
                isshow:"="
            },
            controller:function($scope){
                var isclick = false;
                $scope.addPagerTostrack = function(){
                    if(isclick){
                        return false;
                    }
                    
                }
            },
            link:function(scope,ele,attr,parCtrl){
                
            }
        }
    }])
    .service("strackService",function(){
        var self = this;
        this.createStrack = function(){
            this.list = [];
            this.length = 0;
            this.push = function(value){
                this.list.push(value);
                this.length++;
            }
            this.pop = function(){
                this.list.pop();
                this.length--;
            }
            this.getList = function(){
                return this.list;
            }
            this.search = function(value){
                for(var i=0;i<this.length;i++){
                    var item = this.list[i];
                    if(item==value){
                        return i;
                    }
                }
            }
        }
        return self;
    });
});
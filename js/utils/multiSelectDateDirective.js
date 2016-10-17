/**
 * Multi-Select Date Directive
 *
 * !!This JS file is called by registerController.js ONLY!!
 *
 **/

define(['appsdollar'], function(appsdollar) {
	return appsdollar.directive('multiSelectDate', function($filter) {
	  return {
	    restrict: 'E',
	    require: '?ngModel',
	    link: function(scope, element, attrs, ngModel) {
	      if (!ngModel) return;

	      // GET FROM NG MODEL AND PUT IT IN LOCAL SCOPE
	      ngModel.$render = function() {
	        scope.date = {
	          day: $filter('date')(ngModel.$viewValue, 'dd'),
	          month: $filter('date')(ngModel.$viewValue, 'MM'),
	        };
	      };

	      // WATCH FOR scope.date CHANGES
	      scope.$watch('date', function(date) {

	        // IF REQUIRED
	        // if (attrs.required) {
	        if (!!date.month || !!date.day) {
	        	// Get number of days based on month + year
	          // (January = 31, February = 28, April = 30, February 2000 = 29) or 31 if no month selected yet
	          var nbDays = date.month == 2 ? 29 : new Date(2016, scope.date.month, 0).getDate() || 31;

	          // VALIDATION RULES
	          var monthIsValid = !!date.month && date.month >= 1 && date.month <= 12;
	          var dayIsValid = !!date.day && date.day >= 1 && date.day <= nbDays;

	          console.log('date.month: ', date.month, '\t monthIsValid: ', monthIsValid);
	          console.log('date.day: ', date.day, '\t dayIsValid: ', dayIsValid);

	          // SET INPUT VALIDITY
	          ngModel.$setValidity('required', monthIsValid || dayIsValid ? true : false);
	          ngModel.$setValidity('monthRequired', monthIsValid ? true : false);
	          ngModel.$setValidity('dayRequired', dayIsValid ? true : false);

	          // UPDATE NG MODEL
	          if (monthIsValid && dayIsValid) {
	            ngModel.$setViewValue(new Date(0000, date.month - 1, date.day));
	          }
	        }

	        // IF NOT REQUIRED (still need the 3 values filled to update the model)
	        // else if (date.year && date.month && date.day) {
	        //   ngModel.$setViewValue(new Date(date.year, date.month - 1, date.day));
	        // }

	        // IF NOT REQUIRED (still need the 3 values filled to update the model)
	        // else if (date.year && date.month && date.day) {
	        //   ngModel.$setViewValue(new Date(date.year, date.month - 1, date.day));
	        // }

	      }, true);
	    }
	  }
	});;
});

define(['app'], function(app){
		app.filter('timeAgoFilter', function($translate){
			return function(input, future){
				if(!input) return "";
        var substitute = function (key, number){
          return $translate.instant(key, {'value': number});
        },

        	nowTime = (new Date()).getTime(),
          date = (new Date(input.replace(/-/g, '/'))).getTime(),
          //refreshMillis= 6e4, //A minute
          strings= {},
          dateDifference = nowTime - date,
          words,
          seconds = Math.abs(dateDifference) / 1000,
          minutes = seconds / 60,
          hours = minutes / 60,
          days = hours / 24,
          years = days / 365,
          separator = strings.wordSeparator === undefined ?  " " : strings.wordSeparator;

          if(future){
          	words = seconds < 119 && substitute('minuteShort', 1) ||
	          minutes < 60 && substitute('minutesShort', Math.round(minutes)) ||
	          minutes < 119 && substitute('hourShort', 1) ||
	          hours < 24 && substitute('hoursShort', Math.round(hours)) ||
	          hours < 47 && substitute('dayShort', 1) ||
	          substitute('daysShort', Math.round(days));
          } else{
          	words = seconds < 45 && substitute('seconds-ago', Math.round(seconds)) ||
	          seconds < 90 && substitute('minute-ago', 1) ||
	          minutes < 45 && substitute('minutes-ago', Math.round(minutes)) ||
	          minutes < 90 && substitute('hour-ago', 1) ||
	          hours < 24 && substitute('hours-ago', Math.round(hours)) ||
	          hours < 42 && substitute('day-ago', 1) ||
	          days < 30 && substitute('days-ago', Math.round(days)) ||
	          days < 45 && substitute('month-ago', 1) ||
	          days < 365 && substitute('months-ago', Math.round(days / 30)) ||
	          years < 1.5 && substitute('year-ago', 1) ||
	          substitute('years-ago', Math.round(years));
	          }

					return words;
				}
		});
});

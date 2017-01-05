(function(global,$){
	var SEP 	= '-';
	var SLOT 	= [];
	var FORMAT 	= 'yyyy-mm-dd';

	// Greeter seperate execution context inside an immediatly invoked function
	var jTime = function (dateFormat,timeFormat){
		return new jTime.init(dateFormat,timeFormat);
	}

	jTime.prototype = {
		 // 'this' refers to the calling object at execution time
        formatDate: function(format) {
              var seperators = ['-','\\','/',' ','.'];
              for (var i = 0;i<= format.length;i++){
              	if (seperators.indexOf(format[i])  !== -1) {
              		SEP = format[i];
              		break;
              	}
              }

              var x = format.split(SEP);
              SLOT[0] = x[0];
              SLOT[1] = x[1];
              SLOT[2] = x[2];
              FORMAT = SLOT[0]+SEP+SLOT[1]+SEP+SLOT[2];
              console.log(FORMAT);
              return this;
        },
        getReadableDate: function(date){
        	// current format dd-mm-yyyy
        	// it has to be yyyy-mm-dd
        	var day,month,year;
        	var t = date.split(SEP);

        	if (SLOT[0] == 'dd'){
        		day = t[0]
        	}else if (SLOT[1] == 'dd'){
        		day = t[1];
        	}else if (SLOT[2] == 'dd'){
        		day = t[2];
        	}


        	if (SLOT[0] == 'mm'){
        		month = t[0]
        	}else if (SLOT[1] == 'mm'){
        		month = t[1];
        	}else if (SLOT[2] == 'mm'){
        		month = t[2];
        	}

        	if (SLOT[0] == 'yyyy'){
        		year = t[0]
        	}else if (SLOT[1] == 'yyyy'){
        		year = t[1];
        	}else if (SLOT[2] == 'yyyy'){
        		year = t[2];
        	}

        	console.log(year+SEP+month+SEP+day);
        	return new Date(year+SEP+month+SEP+day);
        },
        forHumans: function(date,range){ //jTime().forhumans('dynamic',ago(minute))
        	//type 	= type 					|| 'static';
        	range 	= range.toLowerCase() 	|| 'minute';
        	var unixTime; 
        	var readableDate = this.getReadableDate(date);
        	console.log("readableDate: " + readableDate);

        	switch (range){
        		case 'ms' 	|| 'millisecond' 	|| 'milliseconds':
        			unixTime = 1000;
        			range = 'milliseconds';
        			break;
        		case 's' 	|| 'second' 		|| 'seconds':
        			unixTime = 60*1000;
        			range = 'seconds';
        			break;
        		case 'm' 	|| 'minute' 		|| 'minutes':
        			unixTime = 60*1000;
        			range = 'minutes';
        			break;
        		case 'h' 	|| 'hour' 	 		|| 'hours':
        			unixTime = 60*60*1000;
        			range = 'hours';
        			break;
        		case 'd' 	|| 'day' 	 		|| 'days':
        			unixTime = 24*60*60*1000;
        			range = 'days';
        			break;
        		case 'mm'	|| 'month' 			|| 'months':
        			unixTime = (24*60*60*1000) * 30;
        			range = 'months';
        			break;
        		case 'y' 	|| 'year' 	 		|| 'years':
        			unixTime = ((24*60*60*1000) * 30) * 365;
        			range = 'years';
        			break;
        	}

        	// readable date
        	var dateNow 		= new Date().getTime();
			var specifiedDate 	= new Date(readableDate);
			var difference = Math.ceil(Math.abs(specifiedDate - dateNow) / unixTime);
			return difference + " " +range+ " ago";
        }
	};

	// the actual object is created here, allowing us to 'new' an object without calling 'new'
    jTime.init = function(dateFormat, timeFormat) {
        
        var self = this;
        self.dateFormat = dateFormat || FORMAT;
        self.timeFormat = timeFormat || 'h:i:s';
        
        self.formatDate(self.dateFormat);
    }
    
    // trick borrowed from jQuery so we don't have to use the 'new' keyword
    jTime.init.prototype = jTime.prototype;
    
    // attach our Greetr to the global object, and provide a shorthand '$G' for ease our poor fingers
    global.jTime = jTime;

}(window,$));

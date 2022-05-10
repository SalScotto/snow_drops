var LoggerUtil = Class.create();
LoggerUtil.prototype = {
    
    debug: false,
    isProduction: false,
    signature: '',

    initialize: function(log_sign){
        var gdt = new GlideDateTime();
        this.year = gdt.getYearUTC();
        this.month = gdt.getMonthUTC();
        this.day = gdt.getDayOfMonthUTC();

        this.debug = gs.getProperty('PROPERTY NAME EXPRESSING IF THE DEBUG IS ON', true);
        if(log_sign){
            this.signature = log_sign + ":\t ";
        }
        this.isProduction = gs.getProperty('instance_name') == 'Production instance name';
    },

    info: function(message){
        if(this.debug && !this.isProduction) {
            gs.info(this.signature+message);
        }
    },

    warning: function(message){
        gs.warn(this.signature+message);
    },

    error: function(message){
        gs.error(this.signature+message);
    },

    tick: function(){
        return new GlideDateTime().getNumericValue();;
    },

    time: function(_tick){
        //Takes the value returned by this.tick() and returns the delay in milliseconds
        var tock = new GlideDateTime().getNumericValue();
        return (tock - _tick);
    }
}
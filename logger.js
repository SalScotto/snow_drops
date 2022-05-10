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
        this.signature = log_sign;
        this.isProduction = gs.getProperty('instance_name') == 'Production instance name';
    },

    info: function(message){
        if(this.debug && !this.isProduction) {
            gs.info(this.log_sign+":\t "+message);
        }
    },

    warning: function(message){
        gs.warn(this.log_sign+":\t "+message);
    },

    error: function(message){
        gs.error(this.log_sign+":\t "+message);
    },

    tick: function(){
        return new GlideDateTime().getNumericValue();;
    },

    time: function(_tick){
        var tock = new GlideDateTime().getNumericValue();
        return (tock - _tick);
    }
}
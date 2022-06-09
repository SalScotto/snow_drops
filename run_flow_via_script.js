//Use this script to execute a Flow related to a catalog item via script
//SN Version: Rome+

try {
    var inputs = {};
    inputs['table_name'] = 'Table Name';
    inputs['request_item'] =gr; // GlideRecord of table: sc_req_item 

    // Start Asynchronously: Uncomment to run in background.
    // sn_fd.FlowAPI.getRunner().flow('global.grc__sr_diritto_degli_interessati').inBackground().withInputs(inputs).run();
            
    // Execute Synchronously: Run in foreground.
    sn_fd.FlowAPI.getRunner().flow('global.grc__sr_diritto_degli_interessati').inForeground().withInputs(inputs).run();
    
} catch (ex) {
    var message = ex.getMessage();
    gs.error(message);
}
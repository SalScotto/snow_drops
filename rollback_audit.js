//Script to roll back differences from sys_history_line of audited tables
//Must run in global scope for GlideHistorySet to work!
//Or else, run the first while in a bg-script

var pagesize = 100; //Used to limit the number of records, refresh & generate can take quite a while
var fieldsToUpdate = ['state','status','assigned_to'];
var targetTable = '';

if(fieldsToUpdate.length < 1){
    return false;
}

var recordToUpdate = new GlideRecord(targetTable); //Target table
recordToUpdate.addEncodedQuery('');
//Query used to filter the records, should have a filter in order to not consider the same records in the next iterations (or else, remove the pagination limit)
recordToUpdate.setLimit(pagesize);
recordToUpdate.query();
while(recordToUpdate.next()){

    var hs = new GlideHistorySet(recordToUpdate);
    try{
        if(hs.getSummaryRecord() !== null) {
            hs.refresh();
        } else {
            hs.generate();
        }
    }catch (e){
        gs.warn("Error "+e.toString()+" while generating history for "+recordToUpdate.getValue('sys_id'));
    }

    var histSet = new GlideRecord('sys_history_set');
    histSet.addQuery('table',targetTable); //target table as before;
    histSet.addQuery('id', recordToUpdate.getValue('sys_id'));
    histSet.orderByDesc('sys_updated_on');
    histSet.setLimit(1);
    histSet.query();
    if(histSet.hasNext()){
        var toUpdate = false;

        var oldValues = {};
        for(var i=0; i < fieldsToUpdate.length; i++){
            oldValues[fieldsToUpdate[i]] = null;
        }

        var histLine = new GlideRecord('sys_history_line');
        histLine.addEncodedQuery("");
        //Query as before in order to consider only a subset of updates of the (record,field) identified; can use user_id and update_time fields
        
        histLine.addQuery("set.table", targetTable);
        histLine.addQuery("set.id", recordToUpdate.getValue('sys_id'));
        
        var fieldOrCond = histLine.addQuery('field',fieldsToUpdate[0]);
        for(var i=1; i < fieldsToUpdate.length; i++){
            fieldOrCond.addOrCondition('field',fieldsToUpdate[i])
        }

        histLine.addNotNullQuery("old_value"); //Comment out if not needed
        histLine.query();

        while(histLine.next()){
            oldValues[histLine.getValue('field')]=histLine.getValue('old_value');
        }
        
        for(var a in oldValues){
            if(oldValues[a] == null){
                continue;
            }
            gs.info(a+": from "+oldValues[a]+" to "+ recordToUpdate.getValue(a));
            
            recordToUpdate.setValue(a, oldValues[a]);
            toUpdate = true;
        }
        if(toUpdate){
            recordToUpdate.setWorkflow(false); //Comment out if not needed
            recordToUpdate.update();
        }
    }else{
        gs.warn("Error while retrieving history set for "+recordToUpdate.getValue('sys_id'));
    }
}
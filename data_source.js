//Run data source / transform map via script
var job_sysid = '';
var job_gr = new GlideRecord('sysauto_script');
job_gr.get(job_sysid);
if (typeof SncTriggerSynchronizer != 'undefined')
   SncTriggerSynchronizer.executeNow(job_gr);
else
   Packages.com.snc.automation.TriggerSynchronizer.executeNow(job_gr);
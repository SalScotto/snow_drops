//Same as eval, but for servicenow

var now_GR = new GlideRecord('x_app_table');
now_GR.short_description = 'Testing GlideScopedEvaluator';
now_GR.test_script = "gs.getUser().getName() + ' says ' + greeting; ";
now_GR.insert();

//setup variables to be used by the script
var vars = {'greeting' : 'hello'};

//Evaluate the script from the field
var evaluator = new GlideScopedEvaluator();
gs.info(evaluator.evaluateScript(now_GR, 'test_script', vars));

// Now retrieve the result
evaluator.evaluateScript(gr, 'u_test_script', null);
gs.info(evaluator.getVariable('result'));
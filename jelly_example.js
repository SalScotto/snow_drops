//https://docs.servicenow.com/bundle/rome-application-development/page/script/general-scripting/concept/c_ExtensionsToJellySyntax.html#r_Gevaluate

//Set variable with a given expression from Rhino (server side script):
<g:evaluate var="jvar_assessment" expression="RP.getWindowProperties().get('assessment')" />

//Set variable with the result of a GlideRecord (e.g. use it inside a select-option)
<g:evaluate var="jvar_choices" object="true">
    var result = [];
    var choices = new GlideRecord('sys_choice');
    choices.addEncodedQuery('name=sys_frequency^element=value^language=en^inactive=false');
    choices.orderBy('sequence');
    choices.query();
    while(choices.next()){
        result.push([choices.display+'', choices.value+'']);
    }
    result;
</g:evaluate>
...
<select id='select_choice' class='select2-search form-control'>
    <j:forEach var="jvar_choice" items="${jvar_choices}"> 
        <option value="${jvar_choice[1]}">${jvar_choice[0]}</option>		
    </j:forEach>
</select>

//Access other jelly variables - access them as attributes of jvar object
<g:evaluate var="jvar_example" jelly="true">
    var asmt = jvar.jvar_assessment;
    asmt;
</g:evaluate>


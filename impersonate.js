//Impersonate a user via script:
var current_user = gs.getUserID();
var compiler = assessment.getValue('user');
var previous = gs.getSession().impersonate(compiler);
// do what you have to do...

//Up to Orlando, it works with impersonating back the "previous" value returned from the impersonator
//Since Paris, it won't always return a correct value, so you have to use "current_user"
gs.getSession().impersonate(previous); //gs.getSession().impersonate(current_user);
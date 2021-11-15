//Listing all properties from an object

var object;

for(var prop in object){
    gs.info("> VARDUMP: "+prop+":\t "+object[prop]);
}
/*--- Compilo ---*/
console.log("Compiling Toffee Script");
console.time('Compiling time');
String.prototype.trim = function() { return this.replace(/^\s+|\s+$/g, ''); };

var src = document.querySelector("script[type='text/toffee']").innerText;
var bin = '';

var class_list = src.split('Class');

class_list.forEach(function(e) {
    var class_name = e.split('({')[0].trim();
    if (class_name !== '') {
        console.log(' --> compiling ' + class_name + ' ...');
        src = src.replace('Class '+ class_name, 'var ' + class_name + ' = Species.Class' );

        //src = src.replace(class_name + ' : function(', 'initialize : function _' + class_name + '(' );
        src = src.replace(class_name + '(', 'initialize : function _' + class_name + '(' );
    }

});
console.timeEnd('Compiling time');

console.log("Executing Toffee Script");

console.time('Executing time');

document.write('<script>'+src+'<\/script>');

console.timeEnd('Executing time');
/*--- Compilo ---*/

/*-----------------------------------------*/
console.log("Compiling Toffee Script");
console.time('Total compiling time');
/*-----------------------------------------*/
    String.prototype.trim = function() { return this.replace(/^\s+|\s+$/g, ''); };

    var src = document.querySelector("script[type='text/toffee']").innerText;
    var bin = '';

    /*-----------------------------------------*/
    console.log('1- Class compiling')
    console.time('Class compiling time');
    /*-----------------------------------------*/

        var class_list = src.split('Class');

        class_list.forEach(function(e) {
            var class_name = e.split('({')[0].trim();

            if(class_name[0] !== '/') {
                if (class_name !== '') {
                    console.log(' --> compiling ' + class_name + ' ...');

                    src = src.replace('Class '+ class_name, 'var ' + class_name + ' = Species.Class' );

                    //src = src.replace(class_name + ' : function(', 'initialize : function _' + class_name + '(' );
                    src = src.replace(class_name + '(', 'initialize : function _' + class_name + '(' );
                    src = src.replace('::', 'Extends : ');
                }
            }

        });
    console.timeEnd('Class compiling time');

    /*-----------------------------------------*/
    console.log('2- System compiling')
    console.time('System compiling time');
    /*-----------------------------------------*/

        src = src.replace(/puts\(/g, 'console.log(');
        src = src.replace(/watch\(/g, 'Species.watch(');
        src = src.replace(/aop.before\(/g, 'Species.aop.before(');
        src = src.replace(/aop.after\(/g, 'Species.aop.after(');

    console.timeEnd('System compiling time');

console.timeEnd('Total compiling time');



console.log("Executing Toffee Script");

console.time('Executing time');

//<script src="species.min.js"></script>
document.write('<script src="toffee.runtime.js"><\/script>');
document.write('<script>'+src+'<\/script>');

console.timeEnd('Executing time');
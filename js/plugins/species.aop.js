/*
    http://bjarlestam.wordpress.com/2009/05/27/simple-javascript-aop-framework/
*/

var Species = (function (species) {

    species.aop = {
        before : function(obj, fname, advice) {
            var oldFunc = obj[fname];
                obj[fname] = function() {
                advice.apply(this, arguments);
                return oldFunc.apply(this, arguments);
            }
        },
        after : function(obj, fname, advice) {
            var oldFunc = obj[fname];
            obj[fname] = function() {
                oldFunc.apply(this, arguments);
                return advice.apply(this, arguments);
            };
        }
    }


    return species;
}(Species));

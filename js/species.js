
var Species = (function () {
    var species = {}
    /*var species = function(T){
        return { Class : species.Class }
    };*/
    
    species.Class = function(class_def) {
        var m, k;

        if(class_def.Extends) {
            k = Object.create(class_def.Extends);
            if(k.initialize) { k.initialize.prototype = k; }
            k.parent = class_def.Extends;
        } else {
            k = Object.create({});
        }

        for(m in class_def) {
            if(m != 'Extends') { if(m != 'New') {
                Object.defineProperty(k, m,{
                    value : class_def[m],
                    writable: true,
                    enumerable: true,
                    configurable: true
                });
            }}
        }

        k.New = function(props) {
            var inst = Object.create(k);
            if (inst.initialize) { inst.initialize.apply(inst, arguments); }
            return inst;
        }
        return k;
    };
    return species;
}());
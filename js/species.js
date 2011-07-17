/**
  * species.js - copyright @k33G_org
  * version 1.0
  * https://github.com/k33g/species
  * MIT License
  */

var Species = (function () {
    var species = {};

    species.Class = function(class_def) {
        var m, k, t;
        if(class_def.Extends) {
            k = Object.create(class_def.Extends);
            if(k.initialize) { k.initialize.prototype = k; }
            k.parent = class_def.Extends;
        } else {
            k = Object.create({});
        }

        for(m in class_def) {
            Object.defineProperty(k, m,{
                value : class_def[m],
                writable: true,
                enumerable: true,
                configurable: true
            });
        }

        /*--- if initialize is named ---*/
        Object.defineProperty(k, "typeName",{
            value : class_def["initialize"] ? class_def["initialize"].name : null,
            writable: false,
            enumerable: true,
            configurable: false
        });

        /*--- isInstance ---*/
        Object.defineProperty(k, "isInstance",{
            value : false,
            writable: false,
            enumerable: true,
            configurable: false
        });

        /*--- isInstanceOf ---*/
        Object.defineProperty(k, "isInstanceOf",{
            value : function(klass) {
                if(this.isInstance){
                    return this.typeName == klass.typeName ? true : false;
                } else { return false; }

            },
            writable: false,
            enumerable: true,
            configurable: false
        });


        k.New = function(props) {
            var inst = Object.create(k);
            inst.isInstance = true;
            if (inst.initialize) { inst.initialize.apply(inst, arguments); }
            return inst;
        }
        return k;
    };
    return species;
}());

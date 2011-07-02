/**
  * species.js - copyright @k33G_org
  * version 1.0
  * https://github.com/k33g/species
  * MIT License
  */

var Species = (function () {
    var species = {};

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
            Object.defineProperty(k, m,{
                value : class_def[m],
                writable: true,
                enumerable: true,
                configurable: true
            });
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
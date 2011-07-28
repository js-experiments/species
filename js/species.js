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

        /*--- define members ---*/
        for(m in class_def) {

            if(class_def[m].get || class_def[m].set) {//Property is defined by code
                Object.defineProperty(k, m,{
                    get : class_def[m].get ? class_def[m].get : undefined,
                    set : class_def[m].set ? class_def[m].set : undefined,
                    enumerable: true,
                    configurable: true
                });

            } else {

                if(typeof class_def[m] === 'function') { //function
                    Object.defineProperty(k, m,{
                        value : class_def[m],
                        writable: true,
                        enumerable: true,
                        configurable: true
                    });
                } else { //Property is generated

                    Object.defineProperty(k, '_'+ m.toLowerCase(),{
                        value : class_def[m],
                        writable: true,
                        enumerable: true,
                        configurable: true
                    });
                    
                    Object.defineProperty(k, m,{
                        get : new Function('return this._' + m.toLowerCase() + ';'),
                        set : new Function('value', 'this._' + m.toLowerCase() + ' = value;'),
                        enumerable: true,
                        configurable: true
                    });
                }
            }
        }

        /*--- if initialize is named ---*/
        Object.defineProperty(k, "typeName",{
            value : class_def["initialize"] ? class_def["initialize"].name.replace('_','') : null,
            writable: false,
            enumerable: true,
            configurable: false
        });

        /*--- isInstance ---*/
        Object.defineProperty(k, "isInstance",{
            value : false,
            writable: true,
            enumerable: true,
            configurable: true
        });

        /*--- isInstanceOf ---*/
        Object.defineProperty(k, "isInstanceOf",{
            value : function(klass) {
                if(this.isInstance()){
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

    species.deSerialize = function(args) { //from : json_object, to : species_object
        //Species.deSerialize({ from : s, to : Z })
        //TODO : find doc about JSON.bind()
        var m, tmp = JSON.parse(args.from);
        for(m in tmp) {
            args.to[m] = tmp[m];
        }
        return args.to;
    };

    species.serialize = function(species_object) {
        return JSON.stringify(species_object);
    }

    return species;
}());

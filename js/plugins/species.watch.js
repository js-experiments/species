var Species = (function (species) {

    /*--- Watching ---*/
    species.watch = function(what, propertyName, handler) {
        var old_propertyName = propertyName;
        propertyName = '_' + propertyName.toLowerCase();

        what['__'+propertyName] = what[propertyName];

        Object.defineProperty(what, propertyName,{
            get : function(){ return what['__'+propertyName]; },
            set : function(value) {
                handler.call(what, { propertyName : old_propertyName, oldValue : what['__'+propertyName], newValue : value });
                what['__'+propertyName] = value;
            },
            enumerable: true,
            configurable: true
        });

    };

    /*--- UnWatching ---*/
    species.unwatch = function(what, propertyName) {

        propertyName = '_' + propertyName.toLowerCase();

        var value = what[propertyName];
        delete what[propertyName]; // remove getter and setter
        //remove watch et unwatch ???
        what[propertyName] = value;

    }

    return species;
}(Species));

var Species = (function (species) {

    /*--- Watching ---*/
    Object.prototype.watch = function (propertyName, handler) {

        this['__'+propertyName] = this[propertyName];

        Object.defineProperty(this, propertyName,{
            get : function(){ return this['__'+propertyName]; },
            set : function(value) {
                handler.call(this, { propertyName : propertyName, oldValue : this['__'+propertyName], newValue : value });
                this['__'+propertyName] = value;
            },
            enumerable: true,
            configurable: true
        });
    };

    /*--- UnWatching ---*/
    Object.prototype.unwatch = function (propertyName) {
        var value = this[propertyName];
        delete this[propertyName]; // remove getter and setter
        this[propertyName] = value;
    };

    //Species.watch ??? instead of Object.watch ???

    return species;
}(Species));

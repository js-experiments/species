

var Species = (function (species) {

    species.dom = function(selector) {
        return {
            elements : [].slice.apply(document.querySelectorAll(selector)),
            set : function(args) {
                var m;
                this.elements.forEach(function(elt) {
                    for(m in args.prop) {
                        if (args.prop.hasOwnProperty(m)) { elt[m] = args.prop[m]; };
                    };
                    for(m in args.attr) {
                        if (args.prop.hasOwnProperty(m)) { elt.setAttribute(m, args.attr[m]); };
                    };
                    for(m in args.bind) {
                        if (args.bind.hasOwnProperty(m)) { elt.addEventListener(args.bind[m].event, args.bind[m].callback, false); };
                    };
                });
                return this;
            },
            get : function(arg) {
                if(arg.prop) { return this.elements.length > 0 ? this.elements[0][arg.prop] : null; };
                if(arg.attr) { return this.elements.length > 0 ? this.elements[0].getAttribute(arg.attr) : null; }
            },
            findAll : function() { return this.elements; },
            find : function() { return this.elements[0]; },
            first : function() { this.elements = this.elements[this.elements.length-1]; return this; },
            last : function() { this.elements = this.elements[this.elements.length-1]; return this; },
            select : function(n) { this.elements = this.elements[n]; return this; }
        }
    };

    window.$dom = species.dom; /*TODO: tester if exist*/
    return species;
}(Species));

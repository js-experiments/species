

var Species = (function (species) {

    function S4() { return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1); }

    /*
        $dom('button').set({attr : { style : 'color:green'}, prop : { innerHTML : 'HELLO' } })
        $dom('button').set({attr : { style : 'color:green'}, prop : { innerHTML : 'HELLO' } }).first().set({attr:{style:'color:red'}})

        $dom('button').set({
                attr : { style : 'color:green'},
                prop : { innerHTML : 'HELLO' }
            }).first().set({
                    attr:{style:'color:red'}
                }).all().set({
                        prop:{innerHTML:'SALUT'}
                    });

        $dom('button').set({
                attr : { style : 'color:green'},
                prop : { innerHTML : 'HELLO' }
            }).first().set({
                    attr:{style:'color:red'},
                    prop:{innerHTML:'hello'}
                }).all().last().set({
                        attr:{ style : 'color:orange'}
                    });
     */

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
                        if (args.attr.hasOwnProperty(m)) { elt.setAttribute(m, args.attr[m]); };
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
            
            first : function() { this.elements = [this.elements[0]]; return this; },
            last : function() { this.elements = [this.elements[this.elements.length-1]]; return this; },
            select : function(n) { this.elements = [this.elements[n]]; return this; },
            all : function(arg) {
                selector = arg === undefined ? selector : arg;
                this.elements = [].slice.apply(document.querySelectorAll(selector));
                return this;
            },

            removeAttr : function(name) {
                console.log('removeAttr');
                this.elements.forEach(function(elt){ elt.removeAttribute(name); });
                return this;
            },

            remove : function() {
                this.elements.forEach(function(elt){ elt.parentNode.removeChild(elt); });
                return this;
            },

            add : function(tag, args) {
                var nel = document.createElement(tag);

                this.elements.forEach(function(elt){
                    //nel.setAttribute('id', '_' + (S4() + S4() + S4() + S4()  + S4()  + S4() + S4() + S4()));
                    nel.setAttribute('id', '_tmp_');
                    elt.appendChild(nel);

                    if(args) species.dom('#'+nel.getAttribute('id')).set(args);

                    if(nel.getAttribute('id') === '_tmp_') nel.removeAttribute('id')



                });
                return this;
            }
        }
    };
    if(!window.$dom){window.$dom = species.dom;}

    return species;
}(Species));


/*
    _lavanja.dom.bind = function(typeEvent,callback) {
        if(this.element){
            this.element.addEventListener(typeEvent,callback,false);
        } else {
            this.elements.forEach(function(elt){ elt.addEventListener(typeEvent,callback,false); });
        }
        return this;
    }
*/
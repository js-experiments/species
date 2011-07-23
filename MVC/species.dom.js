

var Species = (function (species) {

    species.dom = function(selector) {
        return {
            elements : [].slice.apply(document.querySelectorAll(selector)),
            prop : species.dom.prop,
            attr : species.dom.attr
        }
    };
    /*
        $dom('#cmd02').prop('innerHTML')
        $dom('#cmd02').prop({ innerHTML: 'Hello' });
        $dom('#cmd02').prop({ onclick : function(){ console.log('click click'); } });
        $dom('#cmd02').prop({ innerHTML: 'SALUT', onclick : function() { console.log('###SALUT###'); } });

    */
    species.dom.prop = function(args) {
        var m;
        if(typeof args == 'string') {
            return this.elements.length > 0 ? this.elements[0][args] : null;
        } else {
            this.elements.forEach(function(elt) {
                for(m in args) {
                    if (args.hasOwnProperty(m)) { elt[m] = args[m] };
                }
            });
            return this;
        }
    };

    /*
        $dom('#cmd02').attr({name:'CMD02', 'data-info' : 'hello'})
        $dom('#cmd02').attr({style:'font-size:200%; color : red'})
        $dom('#cmd02').attr('style')
    */
    species.dom.attr = function(args) {
        var m;
        if(typeof args == 'string') {
            return this.elements.length > 0 ? this.elements[0].getAttribute(args) : null;
        } else {
            this.elements.forEach(function(elt) {
                for(m in args) {
                    if (args.hasOwnProperty(m)) { elt.setAttribute(m, args[m]); }
                }
            });
            return this;
        }
    };

    /*
    species.dom.css = function() {
        var args = arguments;
        if(this.elements.length > 0 && args.length > 0) {
            if(args.length > 1) {
                this.elements.forEach(function(elt) { elt.setAttribute(args[0], args[1]);  });
                return this;
            } else {
                return this.elements[0].getAttribute(args[0]);
            }
        } else { return null; }
    };
    */

    species.dom.findAll = function(selector){ return [].slice.apply(document.querySelectorAll(selector)); };
    species.dom.find = function(selector){ return document.querySelector(selector) };

    window.$dom = species.dom; /*TODO: tester if exist*/
    return species;
}(Species));

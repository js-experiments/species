

var Species = (function (species) {

    species.dom = function(selector) {
        return {
            elements : [].slice.apply(document.querySelectorAll(selector)),
            element : null,
            position : null,
            one : species.dom.one,
            all : species.all,

            html : species.dom.html,
            text : species.dom.text,
            val : species.dom.val,
            attr : species.dom.attr,
            removeAttr : _lavanja.dom.removeAttr,
            css : species.dom.css,


            first : species.dom.first,
            last : species.dom.last,
            next : species.dom.next,
            previous : species.dom.previous,
            select : species.dom.select,
            remove : species.dom.remove,
            add : species.dom.add,

            bind : species.dom.bind
        }
    };

    species.dom.one = function(selector){
        return document.querySelector(selector);
    };

    species.dom.all = function(selector){
        return this.element;
    };

    species.dom.first = function(){
        this.position = 0;
        this.element = this.elements[this.position];
        return this;
    };

    species.dom.last = function(){
        this.position = this.elements.length -1;
        this.element = this.elements[this.position];
        return this;
    };

    species.dom.next = function(){
        this.position += 1;
        this.element = this.elements[this.position];
        return this;
    };

    species.dom.previous = function(){
        this.position -= 1;
        this.element = this.elements[this.position];
        return this;
    };

    species.dom.select = function(i){
        this.position = i;
        this.element = this.elements[this.position];
        return this;
    };

    species.dom.html = function(html) {
        if(this.element){
            if(html) {
                this.element.innerHTML  =  html;
                return this;
            } else {
                return this.element.innerHTML;
            }
        } else {
            this.elements.forEach(function(elt){ elt.innerHTML  =  html; });
            return  this;
        }

    };

    species.dom.text = function(text) {
        if(this.element){
            if(text) {
                this.element.innerText  =  text;
                return this;
            } else {
                return this.element.innerText;
            }
        } else {
            this.elements.forEach(function(elt){ elt.innerText  =  text; });
            return  this;
        }

    };

    species.dom.val = function(value) {
        if(this.element){
            if(value) {
                this.element.value  =  value;
                return this;
            } else {
                return this.element.value;
            }
        } else {
            this.elements.forEach(function(elt){ elt.value  =  value; });
            return  this;
        }

    };

    species.dom.attr = function(arg) {
        if(this.element){
            if(typeof arg == 'string'){
                return this.element.getAttribute(arg);
            } else {
                var m;
                for (m in arg) {
                    this.element.setAttribute(m,arg[m]);
                }
                return this;
            }
        } else {
            this.elements.forEach(function(elt){
                var m;
                for (m in arg) {
                    elt.setAttribute(m,arg[m]);
                }
            });
            return  this;
        }

    };

    species.dom.css = function(arg) {
        if(this.element){
            if(arg == undefined){
                return this.element.style.cssText
            } else {
                if(typeof arg == 'string'){
                    return this.element.style[arg];
                } else {
                    var m;
                    for (m in arg) {
                        this.element.style[m] = arg[m];
                    }
                    return this;
                }
            }
        } else {
            this.elements.forEach(function(elt){
                var m;
                for (m in arg) {
                    elt.style[m] = arg[m];
                }
            });
            return  this;
        }
    };

    species.dom.removeAttr = function(name) {
        if(this.element){
            this.element.removeAttribute(name);
        } else {
            this.elements.forEach(function(elt){ elt.removeAttribute(name); });
        }
        return this;
    };

    species.dom.remove = function() {
        if(this.element){
            this.element.parentNode.removeChild(this.element);
        } else {
            this.elements.forEach(function(elt){ elt.parentNode.removeChild(elt); });
        }
        return this; /*--- TODO set position or not ? ---*/
    };

    species.dom.add = function(element) {

        function createElt(element) {
            var nel = document.createElement(element.tag);

            if(element.attr) {
                var m;
                for (m in element.attr) {
                    nel.setAttribute(m,element.attr[m]);
                }
            }
            if(element.css) {
                var m;
                for (m in element.css) {
                    nel.style[m] = element.css[m];
                }
            }
            if(element.val) { nel.value = element.val; }
            if(element.html) { nel.innerHTML = element.html; }
            if(element.text) { nel.innerText = element.text; }

            return nel;
        }

        if(this.element){
            this.element.appendChild(createElt(element));
        } else {
            this.elements.forEach(function(elt){ elt.appendChild(createElt(element)); });
        }
        return this; /*--- TODO set position or not ? ---*/
    };

    species.dom.bind = function(typeEvent,callback) {
        if(this.element){
            this.element.addEventListener(typeEvent,callback,false);
        } else {
            this.elements.forEach(function(elt){ elt.addEventListener(typeEvent,callback,false); });
        }
        return this;
    }

    return species;
}(Species));






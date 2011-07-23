

/* dependencies : species.dom.js */

var Species = (function (species) {

    species.Renderer = Species.Class({

        Engine : {
            get : function() { return this.engine; },
            set : function(value) { this.engine = value; }
        },

        ToHTML : {
            get : function() { return this.toHTML; },
            set : function(value) { this.toHTML = value ; }
        }

    });


    species.Controller = Species.Class({

        View : { /*dom element*/
            get : function() { console.log('get view'); return this.view; },
            set : function(value) { console.log('set view'); this.view = value; }
        },



        Events : {
            //get : function() {  },
            set : function(eventsList) {
                var i;
                for(i=0; i<eventsList.length; i++){
                    species.dom.findAll(eventsList[i].what).forEach(
                        function(element) {
                            element.addEventListener(eventsList[i].event, eventsList[i].onEvent, false);
                        }
                    );
                }
            }
        },

        
        render : function(args) {
            var template = species.dom.find(args.template);
            var partElement = species.dom.find(args.to);
            //partElement.innerHTML = Mustache.to_html(template.innerText, args.data);
            partElement.innerHTML = species.Renderer.Engine[species.Renderer.ToHTML](template.innerText, args.data);
        },

        listenChanges : function(model, cllbk, linkToView) {
            /*
                model : Model
                cllbk : function
                linkToView : boolean (cf. Controller.view)
            */
            //TODO: ne pas oublier la vue
        },

        /* childs have to always override the constructor and named it with _<name of class>*/
        initialize : function _Controller(){

        }
    });

    /*
    un controller a des méthodes
    une méthode peut retourner des flux
    une méthode peut avoir une vue (elle doit se terminer par render)
    attacher la vue au controller ?
     */

    return species;
}(Species));








var Species = (function (species) {
    var sel_all = function(selector) { return [].slice.apply(document.querySelectorAll(selector)); };
    var sel_one = function(selector) { return document.querySelector(selector); };
    species.Controller = Species.Class({



        Events : {
            //get : function() {  },
            set : function(eventsList) {
                var i;
                for(i=0; i<eventsList.length; i++){

                    sel_all(eventsList[i].what).forEach(
                        function(element) {
                            element.addEventListener(eventsList[i].event, eventsList[i].onEvent, false);
                        }
                    );
                }
            }
        },

        
        render : function(args) {

        },

        //Listen
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






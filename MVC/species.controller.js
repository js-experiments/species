/*
    http://documentcloud.github.com/backbone/
 */

var Species = (function (species) {

    species.Controller = Species.Class({

        View : { /*zepto element*/
            get : function() { console.log('get view'); return this.view; },
            set : function(value) { console.log('set view'); this.view = value; }
        },

        Events : {
            //get : function() {  },
            set : function(eventsList) {
                var i;
                for(i=0; i<eventsList.length; i++){
                    $(eventsList[i].element).bind(eventsList[i].event, eventsList[i].onEvent);
                }
            }
        },

        /*
                {element : '#cmd01', event : 'click', onEvent : console.log('Afficher la liste')},
                {element : '#cmd02', event : 'click', onEvent : console.log('Cacher la liste')}
         */

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






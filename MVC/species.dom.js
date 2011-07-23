

var Species = (function (species) {

    species.dom = {
        findAll : function(selector){ return [].slice.apply(document.querySelectorAll(selector)); },
        find : function(selector){ return document.querySelector(selector) }
    };
    window.$dom = species.dom; /*TODO: tester if exist*/
    return species;
}(Species));






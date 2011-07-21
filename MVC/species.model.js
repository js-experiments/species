/*
    http://documentcloud.github.com/backbone/
 */

var Species = (function (species) {

    species.Model = Species.Class({
        UID : {
            get : function() {
                if(this.__uid) {
                    return this.__uid;
                } else {
                    function S4() { return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1); }
                    this.__uid = (S4() + S4() + S4() + S4()  + S4()  + S4() + S4() + S4());
                    return this.__uid;
                }
            },
            set : function(value) { this.__uid = value; }
        },

        Id : {
            get : function() { return this.id; },
            set : function(value) { this.id = value; }
        },

        /* childs have to always override the constructor and named it with _<name of class>*/
        initialize : function _Model(){

        }
    });

    species.ModelHelper = Species.Class({

        Models : {},

        Model : {
            get : function() { return this.model; },
            set : function(value) { this.model = value; }
        },

        initialize : function _ModelHelper() {
            //this.Models = {}; /*voir si on ne peut pas faire autrement*/
        },

        save : function(model) {
            //Calling getter UID
            model.UID;
            //console.log('saving ... ' + JSON.stringify(model));

        },

        clone : function(o) {
            var tmpo = Object.create(o), m;
            for(m in tmpo) { tmpo[m] = o[m]; }
            tmpo.UID = "";
            return tmpo;
        },

        getAll : function() { return _.toArray(this.Models); },

        each : function(cll, cbk) {
            _.toArray(this.Models).forEach(cll);
        },

        find : function(cll) {
            return _.detect(_.toArray(this.Models), cll);
        },

        filter : function(cll) {
            return _.select(_.toArray(this.Models), cll);
        },

        get : function(id) { return this.Models[id]; },

        add : function(model) {
            if(typeof model == 'object' && model.length !== undefined) {
                var i;
                for(i = 0; i < model.length; i+=1){
                    if(model[i].isInstanceOf(this.Model)){
                        //this.Models.push({ Id : model[i].Id, Model : model[i]});
                        this.Models[model[i].Id] = model[i];
                    } else {
                        throw "Error : add " + model[i].typeName + " instead of " + this.Model.typeName;
                    }
                }
            } else {
                if(model.isInstanceOf(this.Model)){
                    //this.Models.push({ Id : model.Id, Model : model});
                    this.Models[model.Id] = model;
                } else {
                    throw "Error : add " + model.typeName + " instead of " + this.Model.typeName;
                }
            }
        },


        /*TODO : remove ???*/

        _oldMethods : {},

        bind : function(args) {
            this._oldMethods[args.method] = this[args.method];
            if(args.before) { Species.aop.before(this, args.method, args.before); }
            if(args.after) { Species.aop.after(this, args.method, args.after); }
        },
        unBind : function(methodeNameToUnBind) {
            /*TODO*/
        }

    });

    return species;
}(Species));






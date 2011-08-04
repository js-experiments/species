    var BBModel = Species.Class({

        initialize : function _Model() {
            this.model = Backbone.Model.extend(this.def);

            this.model = new this.model;

            for(var m in this.model) {
                this[m] = this.model[m];
            }

        }
    });
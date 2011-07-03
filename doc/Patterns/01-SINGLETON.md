##Singleton

    var Singleton = Species.Class({
        instantiated : false,
        instance : null,
        name : '',

        getInstance : function(name) {
            if(!Singleton.instantiated) {
                Singleton.instantiated = true;
                Singleton.instance = Singleton.New(name);
            } else {
                console.log('already instantiated');
            }
            return Singleton.instance;
        },

        initialize : function(name) {
            this.name = name;
        }
    });

    var S1 = Singleton.getInstance('Singleton');
    var S2 = Singleton.getInstance('An other Singleton');

    console.log(S1.name);
    console.log(S2.name);
    console.log(Singleton.instance.name);
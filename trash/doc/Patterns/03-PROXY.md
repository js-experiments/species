##Proxy

    var Human = Species.Class({
        name : '',
        walking : function() {
            console.log(this.name + ' is walking');
        },
        Name : function(arg) {
            return arg === undefined ? this.name : this.name = arg;
        },
        initialize : function(name) {
            this.name = name;
        }
    });

    var HumanProxy = Species.Class({
        human : {},
        walking : function(){
            console.log('before walking ...');
            this.human.walking();
            console.log('after walking ...');
        },
        Name : function(arg) {
            return arg === undefined ? this.human.name : this.human.name = arg;
        },
        initialize : function(human) {
            this.human = human;
        }
    });

    var Bob = HumanProxy.New(Human.New('Bob'));
    Bob.walking();
    console.log(Bob.Name());

    var Sam = HumanProxy.New(Human.New());
    Sam.Name('Sam');
    Sam.walking();
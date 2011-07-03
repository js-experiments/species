##Factory

    var Duck = Species.Class({
        kind : 'Duck',
        initialize : function() {
            console.log('I am a ' + this.kind);
        }
    });

    var RealDuck = Species.Class({
        Extends : Duck,
        kind : 'RealDuck'
    });

    var PlasticDuck = Species.Class({
        Extends : Duck,
        kind : 'PlasticDuck'
    });

    var DucksFactory = Species.Class({
        getInstance : function(choice) {
            switch(choice) {
                case 'D' : return Duck.New(); break;
                case 'R' : return RealDuck.New(); break;
                case 'P' : return PlasticDuck.New(); break;
                default : return Duck.New(); break;
            }
        }
    });


    var D = DucksFactory.getInstance('D'),
            R = DucksFactory.getInstance('R'),
            P = DucksFactory.getInstance('P'),
            X = DucksFactory.getInstance();
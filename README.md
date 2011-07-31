#Species

##JS Class structure, Java style OOP

**Only for Webkit and FF** *(IE9 ?)*

- no side effect with variable scope
- able to call super(parent) constructor even with several Class generations
- able to call parent method in overridden method
- Classes (aka "Species") are serializable, member are watchable (if you want)
- AOP is possible
- ability to write plugins
- inheritance and ability to call super members

##Usage

###Define Class

- The keyword is `Species.Class({ /* class definition */})`
- To instantiate a class : `class_name.New(parameters)`

####Example

    var Human = Species.Class({
        /*--- Default Values ---*/

        FirstName : 'John',
        LastName : 'Doe',
        NickName : 'Johnny',

        /*--- Constructor ---*/
        // Convention : if you want a typed instance, you have to name wit underscore + variable name
        initialize : function _Human() {

            console.log('Human constructor');

            //Member without default value
            this.Remark = 'HELLO';

        },

        sayHello : function() {
            console.log('Hello, i am ' + this.FirstName + ' ' + this.LastName);
        }

    });

    /*--- get Human instance ---*/

    var Bob = Human.New();

    console.log(Bob.isInstance, Bob.isInstanceOf(Human), Bob.typeName);
    /* -> displays : true, true, "Human" */

**Remark :** If you name the constructor like this `initialize : function _Human()`, you obtain a typed instances :

- `Bob.typeName` return `Human`
- `Bob.isInstanceOf(Human)` return true

###Serialization (json)

You can do that :

    var s_bob = Species.serialize(Bob);
    var  OtherBob = Species.deSerialize({from : s_bob, to : Human.New()});

###Inheritance

You have just to create a property `Extends` :

    var Animal = Species.Class({
        Name : '???',
        initialize : function(args) {
            console.log('Animal constructor');
            this.Name = args.Name;
        }
    });

    var Dog = Species.Class({
        Extends : Animal,
        kind : '?',
        initialize : function(args) {
            console.log('Dog constructor');
            this.kind = args.kind;
            Dog.parent.initialize.call(this,args);
        }
    });

    var LittleDog = Species.Class({
        Extends : Dog,
        initialize : function(args) {
            console.log('LittleDog constructor');
            LittleDog.parent.initialize.call(this,args);
        }
    });

**Remark :** to call parent method, use this : `class_name.parent.initialize.call(this, args);`

###Simple AOP

Species allows you to add method before and after an other method of a class or of an class instance :

####Species AOP methods

- `Species.aop.before(class_or_instance, 'name_of_method_as_string', function)`
- `Species.aop.after(class_or_instance, 'name_of_method_as_string', function)`

####Example :

    var Human = Species.Class({
        Name : 'John Doe',
        walk : function() {
            console.log(this.Name + ' is walking');
        },
        initialize : function _Human(name) {
            if(name) this.Name = name;
        }
    });

    Species.aop.before(Human, 'walk', function() { console.log(this.Name + ' starts walking'); })

    var Bob = Human.New();
    Bob.walk();

    var Sam = Human.New('Sam');
    Species.aop.after(Sam, 'walk', function() { console.log(this.Name + ' stops walking'); })

    Sam.walk();

###Watchable members

You can watch change of value of member of an instance (or all instances) of a class :

####Methods

- `Species.watch(class_or_instance, 'name_of_member_as_string', handler_function)`
- `Species.unwatch(class_or_instance, 'name_of_member_as_string')`

The handler function is something like that `function(arg) { /* do something */ }`, where arg is an object you can read to obtain old and new values of the watchable member (see example) :

    arg : {
        propertyName
        oldValue
        newValue
    }

####Example :

    var Human = Species.Class({
        Name : 'John Doe',
        walk : function() {
            console.log(this.Name + ' is walking');
        },
        initialize : function _Human(name) {
            if(name) this.Name = name;
        }
    });

    Species.watch(Human,'Name', function(result) {
        console.log( 'Property : ' + result.propertyName + ' Old : ' + result.oldValue + ' New : ' + result.newValue);
    });

    var Bob = Human.New();

    Bob.Name = 'Bob Morane';

    var Sam = Human.New('Sam');

    Species.watch(Sam, 'Name', function(result) {
        console.log( 'Only for Sam : Property : ' + result.propertyName + ' Old : ' + result.oldValue + ' New : ' + result.newValue);
    });
    Sam.Name = 'Sammy'

##More classical OOP

With Species, you can thinking like in Java (or C#), and almost reproduce your classical OOP mind logic.

###Pattern examples :

####Singleton :

    var Singleton = Species.Class({
        Instantiated : false,
        Instance : {},
        Name : '',

        getInstance : function(name) {
            if(!Singleton.Instantiated) {
                Singleton.Instantiated = true;
                Singleton.Instance = Singleton.New(name);
            } else {
                console.log('already instantiated');
            }
            return Singleton.Instance;
        },

        initialize : function(name) {
            this.Name = name;
        }
    });

####Factory :

    var Duck = Species.Class({
        Kind : 'Duck',
        initialize : function() {
            console.log('I am a ' + this.Kind);
        }
    });

    var RealDuck = Species.Class({
        Extends : Duck,
        Kind : 'RealDuck'
    });

    var PlasticDuck = Species.Class({
        Extends : Duck,
        Kind : 'PlasticDuck'
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

####Proxy :

    var Human = Species.Class({
        Name : '',
        walking : function() {
            console.log(this.Name + ' is walking');
        },

        initialize : function(name) {
            this.Name = name;
        }
    });

    var HumanProxy = Species.Class({
        human : {},
        walking : function(){
            console.log('before walking ...');
            this.human.walking();
            console.log('after walking ...');
        },

        initialize : function(human) {
            this.human = human;
        }
    });

    var Bob = HumanProxy.New(Human.New('Bob'));
    Bob.walking();

    var Sam = HumanProxy.New(Human.New('Sam'));

    Sam.walking();

####Decorator :

    var Car = Species.Class({
        price : 0,
        Price : function(arg){
            return arg === undefined ? this.price : this.price = arg;
        }
    });

    var AstonMartin = Species.Class({
        Extends : Car,
        initialize : function() {
            this.Price(1000000);
            console.log("Aston Martin base price : " + this.Price());
        }
    });


    var Option = Species.Class({
        Extends : Car,
        originalCar : {},
        optionPrice : {},
        initialize : function(originalCar, optionPrice){
            this.originalCar = originalCar;
            this.optionPrice = optionPrice;
        },

        Price : function(){
            return this.originalCar.Price() + this.optionPrice;
        }

    });

    var AirConditioning = Species.Class({
        Extends : Option,
        initialize : function(car) {
            AirConditioning.parent.initialize.call(this,car,5000);
            console.log("AirConditioning : 5000");
        }
    });

    var Parachute = Species.Class({
        Extends : Option,
        initialize : function(car) {
            Parachute.parent.initialize.call(this,car,55000);
            console.log("Parachute : 55000");
        }
    });

    var Amphibious = Species.Class({
        Extends : Option,
        initialize : function(car) {
            Amphibious.parent.initialize.call(this,car,555000);
            console.log("Amphibious : 555000");
        }
    });


    var astonMartin = AstonMartin.New();
    astonMartin = AirConditioning.New(astonMartin);
    astonMartin = Parachute.New(astonMartin);
    astonMartin = Amphibious.New(astonMartin);

    console.log("Aston Martin total price : " + astonMartin.Price());

####Etc. ...

##One More Thing : plugins

It's very easy to add functionalities to Species :

    var Species = (function (species) {

        species.something = function(arg) { /*doing something*/ }

        return species;
    }(Species));

##License



Species is available under the terms of the [MIT-License](http://en.wikipedia.org/wiki/MIT_License#License_terms).

Copyright 2011, Philippe Charrière


- - -

    http://closure-compiler.appspot.com/home

    // ==ClosureCompiler==
    // @compilation_level SIMPLE_OPTIMIZATIONS
    // @output_file_name species.min.js
    // @code_url https://raw.github.com/k33g/species/master/js/species.js
    // ==/ClosureCompiler==

- - -
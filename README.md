#Species

##JS Class structure, Java style OOP

**Only for Webkit and FF** *(IE9 ?)*

Demo : [http://jsfiddle.net/rZNfM/4/](http://jsfiddle.net/rZNfM/4/)

- no side effect with variable scope
- able to call super(parent) constructor even with several Class generations
- able to call parent method in overridden method

##Usage

    //TODO
    //Convention, if property name is `Remark`, the pseudo private variable must be named with lowercase : `remark`

##Typing your classes

it's possible if you use named function with the constructor : always prefix name with `_`

###Usage

    var human = Class({
        Name : "",
        initialize : function _human(n){
            this._name = n;
        }
    });

    var animal = Class({
        Name : "",
        initialize : function _animal(n){
            this._name = n;
        }
    });

    var bob = human.New("bob");
    var wolf = animal.New("wolf");

- `bob.typeName` is equals to `"human"`
- `wolf.typeName` is equals to `"animal"`


- `bob.isInstanceOf(human)` returns `true`
- `wolf.isInstanceOf(human)` returns `false`
- `human.isInstanceOf(human)` returns `false`


- `bob.isInstance` is equals to `true`
- `wolf.isInstance` is equals to `true`
- `human.isInstance` is equals to `false`
- `animal.isInstance` is equals to `false`

##Properties

    //TODO

##Patterns

cf. patterns directory

##PlugIns

###AOP

You can decorate methods of a class or an instance of class with functions (before and after) :
You need to declare species.aop.js

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

    /*
        John Doe starts walking
        John Doe is walking
        Sam starts walking
        Sam is walking
        Sam stops walking
    */


###Watch

You can "watch" changes of value member of an instance of a class (for all instances or only some instances) (not properties only simple types) :
You need to declare species.watch.js

    var Human = Species.Class({
        Name : 'John Doe',
        walk : function() {
            console.log(this.Name + ' is walking');
        },
        initialize : function _Human(name) {
            if(name) this.Name = name;
        }
    });

    Human.watch('_name', function(result) {
        console.log( 'Property : ' + result.propertyName + ' Old : ' + result.oldValue + ' New : ' + result.newValue);
    });

    var Bob = Human.New();

    Bob.Name = 'Bob Morane';

    var Sam = Human.New('Sam');

    Sam.watch('_name', function(result) {
        console.log( 'Only for Sam : Property : ' + result.propertyName + ' Old : ' + result.oldValue + ' New : ' + result.newValue);
    });
    Sam.Name = 'Sammy'

    /*
        Property : Name Old : John Doe New : Bob Morane
        Property : Name Old : John Doe New : Sam
        Only for Sam : Property : Name Old : Sam New : Sammy
    */


- - -

http://closure-compiler.appspot.com/home

// ==ClosureCompiler==
// @compilation_level SIMPLE_OPTIMIZATIONS
// @output_file_name species.min.js
// @code_url https://raw.github.com/k33g/species/master/js/species.js
// ==/ClosureCompiler==

// ==ClosureCompiler==
// @compilation_level SIMPLE_OPTIMIZATIONS
// @output_file_name species.all.min.js
// @code_url https://raw.github.com/k33g/species/master/js/species.js
// @code_url https://raw.github.com/k33g/species/master/js/plugins/species.aop.js
// @code_url https://raw.github.com/k33g/species/master/js/plugins/species.watch.js
// ==/ClosureCompiler==
- - -
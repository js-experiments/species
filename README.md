#Species

##JS Class structure, Java style OOP


Demo : [http://jsfiddle.net/rZNfM/4/](http://jsfiddle.net/rZNfM/4/)

- no side effect with variable scope
- able to call super(parent) constructor even with several Class generations
- able to call parent method in overridden method

##Usage

    var Animal = Species.Class({
        name : '???',
        position : { x:0, y:0 },
        sayHello : function() {
            console.log('Hello, i am ' +
                this.name + ', pos : ' +
                this.position.x + ', ' + this.position.y);
        },
        /*--- Getter/Setter ---*/
        Position : function(arg) {
            return arg === undefined ? this.position : this.position = arg;
        },
        test : function() { console.log('Test Animal'); },
        /*--- Constructor ---*/
        initialize : function(args) {
            console.log('Animal constructor');
            this.name = args.name;
            this.position = args.position;
        }
    });

    var a = Animal.New({ name :'A', position : { x:5,y:5 } });
    a.Position({ x:7, y:8 });
    a.sayHello();

    var Dog = Species.Class({
        /*--- inheritance ---*/
        Extends : Animal,
        test : function() {
            console.log('call Parent test method');
            Dog.parent.test.call(this);
            console.log('Test Dog');
        },
        initialize : function(args) {
            console.log('Dog constructor');
            console.log('call Parent constructor');
            Dog.parent.initialize.call(this,args);
        }
    });

    var d = Dog.New({ name :'D', position : { x:25,y:47 } });
    d.sayHello();
    d.test();

    var LittleDog = Species.Class({
        Extends : Dog,
        kind : '',
        sayHello : function() {
            LittleDog.parent.sayHello.call(this);
            console.log('and i am a ' + this.kind);
        },
        initialize : function(args) {
            this.kind = args.kind;
            LittleDog.parent.initialize.call(this,args);
        }
    });

    var cookie = LittleDog.New({ kind : 'Chiwawa', name :'Cookie', position : { x:1,y:1 } });
    cookie.sayHello();

##Typing your classes

it's possible if you use named function with the constructor :

###Usage

    var human = Class({
        name : "",
        initialize : function human(n){
            this.name = n;
        }
    });

    var animal = Class({
        name : "",
        initialize : function animal(n){
            this.name = n;
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



##Patterns

- Singleton : [http://jsfiddle.net/k33g_org/3THyk/](http://jsfiddle.net/k33g_org/3THyk/)
- Factory : [http://jsfiddle.net/k33g_org/Uvkp7/1/](http://jsfiddle.net/k33g_org/Uvkp7/1/)
- Proxy : [http://jsfiddle.net/k33g_org/ntEG5/](http://jsfiddle.net/k33g_org/ntEG5/)
- Decorator : [http://jsfiddle.net/k33g_org/NAsBv/](http://jsfiddle.net/k33g_org/NAsBv/)

- - -

    http://closure-compiler.appspot.com/home

    // ==ClosureCompiler==
    // @compilation_level SIMPLE_OPTIMIZATIONS
    // @output_file_name species.min.js
    // @code_url http://dl.dropbox.com/u/21154141/species/js/species.js
    // ==/ClosureCompiler==

    // ==ClosureCompiler==
    // @compilation_level SIMPLE_OPTIMIZATIONS
    // @output_file_name species.min.js
    // @code_url https://raw.github.com/k33g/species/master/js/species.js
    // ==/ClosureCompiler==


- - -
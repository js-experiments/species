var console = {};
console.log = function(){
    console.line += 1;
    var e = document.querySelector('#console');
    e.innerHTML = e.innerHTML + ' ' + arguments[0]  + '<br>';
};

console.code = function(idScript) {
    var s = document.createElement('pre');
    s.setAttribute('id','idScript');
    s.innerHTML += '<hr>';
    s.innerHTML += document.querySelector('#' + idScript).innerText;
    s.innerHTML += '<hr>';
    document.body.appendChild(s);

};

var c = document.createElement('div');
c.setAttribute('id','console');
c.style['color'] = 'white';
c.style['background'] = 'black';
c.style['font-family'] = 'monospace';

document.body.appendChild(c);


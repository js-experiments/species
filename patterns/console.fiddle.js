var console = {};
console.log = function(){ 
    console.line += 1;
    var e = document.querySelector('#console');
    e.style['color'] = 'white';
    e.style['background'] = 'black';
    e.style['font-family'] = 'monospace';    
    e.innerHTML = e.innerHTML + arguments[0] + '<br>';
}
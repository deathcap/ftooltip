'use strict';

var ftooltip = require('./');

var node = document.createElement('div');
node.style.border = '1px dotted black';
node.style.width = '100px';
node.style.height = '100px';
document.body.appendChild(node);

ftooltip(node, 'hello world');
//var t = document.createTextNode('hello world');
//ftooltip(node, t);
//t.textContent = 'hello world 2'; // demonstrate changing after the fact
//ftooltip(node, {info: 'hello world'});
//ftooltip(node, ['hello world', document.createElement('br'), 'second line']);
//ftooltip(node, {info:['hello world', document.createElement('br'), 'second line']});


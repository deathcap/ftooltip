'use strict';

var ftooltip = require('./');

var node = document.createElement('div');
node.style.border = '1px dotted black';
node.style.width = '100px';
node.style.height = '100px';
node.textContent = 'hello world';
document.body.appendChild(node);

//ftooltip(node, {info:'hi ftooltip'});
ftooltip(node, {info:['hi ftooltip', document.createElement('br'), 'second line']});


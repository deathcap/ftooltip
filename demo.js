'use strict';

var dtooltip = require('./');

var node = document.createElement('div');
node.style.border = '1px dotted black';
node.style.width = '100px';
node.style.height = '100px';
node.textContent = 'hello world';
document.body.appendChild(node);

//dtooltip(node, {info:'hi dtooltip'});
dtooltip(node, {info:['hi dtooltip', document.createElement('br'), 'second line']});


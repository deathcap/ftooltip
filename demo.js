'use strict';

var dtooltip = require('./');

var node = document.createElement('p');
node.textContent = 'hello world';
document.body.appendChild(node);

dtooltip(node, 'hi dtooltip');

'use strict';

var ftooltip = require('./');

var node = document.createElement('div');
node.style.border = '1px dotted black';
node.style.width = '100px';
node.style.height = '100px';
document.body.appendChild(node);

ftooltip(node, 'hello world');
//ftooltip(node, {info: 'hello world'});
//ftooltip(node, ['hello world', document.createElement('br'), 'second line']);
//ftooltip(node, {info:['hello world', document.createElement('br'), 'second line']});


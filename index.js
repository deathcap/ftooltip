'use strict';

var toarray = require('toarray');

module.exports = function(node, opts) {
  return new Tooltip(node, opts);
};

function Tooltip(node, opts) {
  this.node = node;

  if (typeof opts === 'string' || Array.isArray(opts)) {
    // shortcut
    opts = {info: opts};
  }

  this.info = toarray(opts.info) || [];
  this.style = opts.style || [
    'position: absolute;',
    'border: 1px solid black;',
    'background-color: black;',
    'pointer-events: none;',
    'color: white;',
    'z-index: 20;',
    opts.extraStyle || '',
    ].join('\n');

  this.enable();
}

Tooltip.prototype.enable = function() {
  this.node.addEventListener('mouseover', this.onMouseover = this.show.bind(this));
  this.node.addEventListener('mouseout', this.onMouseout = this.hide.bind(this));
};

Tooltip.prototype.disable = function() {
  this.node.removeEventListener('mouseover', this.onMouseover);
  this.node.removeEventListener('mouseout', this.onMouseout);
};

Tooltip.prototype.show = function(ev) {
  this.move(ev.x, ev.y);
  this.node.addEventListener('mousemove', this.onMousemove = this.track.bind(this));
};

Tooltip.prototype.track = function(ev) {
  this.move(ev.x, ev.y);
}

Tooltip.prototype.move = function(x, y) {
  if (!this.div) {
    this.div = document.createElement('div');
    for (var i = 0; i < this.info.length; i += 1) {
      var line = this.info[i];
      if (typeof line === 'string') {
        this.div.appendChild(document.createTextNode(line));
      } else if (line instanceof Element || line instanceof DocumentFragment) {
        this.div.appendChild(line);
      } else {
        this.div.appendChild(document.createTextNode(''+line));
      }
    }
    document.body.appendChild(this.div);
  }

  this.div.setAttribute('style', this.style);
  this.div.style.left = x + 'px';
  this.div.style.top = (y - this.div.clientHeight) + 'px';
};

Tooltip.prototype.hide = function() {
  this.node.removeEventListener('mousemove', this.onMousemove);
  if (this.div) {
    this.div.parentNode.removeChild(this.div);
    delete this.div;
  }
};

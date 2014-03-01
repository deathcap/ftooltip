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

  this.cachedDivHeights = [];

  this.enable();
}

Tooltip.prototype.enable = function() {
  this.node.addEventListener('mouseenter', this.onMouseenter = this.show.bind(this));
  this.node.addEventListener('mouseleave', this.onMouseleave = this.hide.bind(this));
};

Tooltip.prototype.disable = function() {
  this.node.removeEventListener('mouseenter', this.onMouseenter);
  this.node.removeEventListener('mouseleave', this.onMouseleave);
};

Tooltip.prototype.create = function() {
  this.div = document.createElement('div');
  
  var stringLines = 0;
  for (var i = 0; i < this.info.length; i += 1) {
    var line = this.info[i];
    if (typeof line === 'string') {
      this.div.appendChild(document.createTextNode(line));
      stringLines += 1;
    } else if (line instanceof Element || line instanceof DocumentFragment) {
      this.div.appendChild(line);
    } else {
      this.div.appendChild(document.createTextNode(''+line));
    }
  }
  document.body.appendChild(this.div);

  // cache clientHeight calculation because it is very slow
  if (stringLines === this.info.length) {
    // and cache string-only tooltip heights for even better performance (should be all the same)
    this.divHeight = this.cachedDivHeights[stringLines] || this.div.clientHeight;
    this.cachedDivHeights[stringLines] = this.divHeight;
  } else {
    this.divHeight = this.div.clientHeight;
  }
}

Tooltip.prototype.show = function(ev) {
  this.move(ev.x, ev.y);
  this.node.addEventListener('mousemove', this.onMousemove = this.track.bind(this));
};

Tooltip.prototype.track = function(ev) {
  this.move(ev.x, ev.y);
}

Tooltip.prototype.move = function(x, y) {
  if (!this.div) {
    this.create();
  }

  this.div.setAttribute('style', this.style);
  this.div.style.left = x + 'px';
  this.div.style.top = (y - this.divHeight) + 'px';
};

Tooltip.prototype.hide = function() {
  this.node.removeEventListener('mousemove', this.onMousemove);
  if (this.div) {
    this.div.parentNode.removeChild(this.div);
    delete this.div;
  }
};

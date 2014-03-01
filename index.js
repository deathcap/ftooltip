'use strict';

module.exports = function(node, opts) {
  return new Tooltip(node, opts);
};

function Tooltip(node, opts) {
  this.node = node;
  this.text = opts.text || 'tooltip';
  this.style = opts.style || [
    'position: absolute;',
    'border: 1px solid black;',
    'background-color: black;',
    'color: white;'
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
    this.div.appendChild(document.createTextNode(this.text));
    document.body.appendChild(this.div);
  }

  this.div.setAttribute('style', this.style);
  this.div.style.left = x + 'px';
  this.div.style.top = y + 'px';
};

Tooltip.prototype.hide = function() {
  this.node.removeEventListener('mousemove', this.onMousemove);
  if (this.div) {
    this.div.parentNode.removeChild(this.div);
    delete this.div;
  }
};

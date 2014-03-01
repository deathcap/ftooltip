'use strict';

module.exports = function(node, opts) {
  return new Tooltip(node, opts);
};

function Tooltip(node, opts) {
  this.node = node;
  this.text = opts.text || 'tooltip';

  this.enable();
}

Tooltip.prototype.enable = function() {
  this.node.addEventListener('mouseover', this.onMouseover = this.show.bind(this));
  this.node.addEventListener('mouseout', this.onMouseout = this.hide.bind(this));
};

Tooltip.prototype.disable = function() {
  this.node.removeListener('mouseover', this.onMouseover);
  this.node.removeListener('mouseout', this.onMouseout);
};

Tooltip.prototype.show = function() {
  this.div = document.createElement('div');
  this.div.appendChild(document.createTextNode(this.text));

  document.body.appendChild(this.div);
};

Tooltip.prototype.hide = function() {
  if (this.div) {
    this.div.parentNode.removeChild(this.div);
  }
};

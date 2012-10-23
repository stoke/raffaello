var utile = require('utile'),
    EventEmitter2 = require('eventemitter2').EventEmitter2,
    PluginSet = require('./pluginset');

function Application() {
  this.properties = {};
  this.plugins = new PluginSet();
  this.conf = {};
}

utile.inherits(Application, EventEmitter2);

Application.prototype.config = function(conf) {
  this.conf = utile.clone(conf);

  return this;
};

Application.prototype.set = function(k, v) {
  this.properties[k] = v;
};

Application.prototype.get = function(k) {
  return this.properties[k];
};

Application.prototype.use = function(P) {
  var plugin = new P();

  plugin.conf = utile.clone(this.conf);
  plugin.app = this;

  if (typeof plugin._constructor === 'function')
    plugin._constructor();
  
  this.plugins._push(plugin);

  return this;
};

module.exports = Application;
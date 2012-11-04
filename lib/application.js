var utile = require('utile'),
    EventEmitter2 = require('eventemitter2').EventEmitter2,
    optimal = require('optimal'),
    PluginSet = require('./pluginset');

function Application() {
  this.properties = {};
  this.plugins = new PluginSet();
  this.conf = {};

  this.load = this.use.bind(this, true);
}

utile.inherits(Application, EventEmitter2);

Application.prototype.config = function(conf) {
  this.conf = utile.clone(conf);

  return this;
};

Application.prototype.set = function(k, v) {
  this.properties[k] = v;
  
  return this;
};

Application.prototype.get = function(k) {
  return this.properties[k];
};

Application.prototype._link = function(plugin) {
  plugin.conf = utile.clone(this.conf);
  plugin.app = this;
  plugin.used = false;

  return plugin;
};

Application.prototype.use = function() {
  var args = optimal(arguments, 'b:[load=false], o:P'),
      plugin = new args.P(),
      load = args.load;

  this._link(plugin);
  plugin.used = !load;

  if (typeof plugin._constructor === 'function' && !load)
    plugin._constructor();
  
  this.plugins._push(plugin);

  return this;
};

Application.prototype.Instance = function() { // expose a new instance of PluginSet
  return new PluginSet(this.plugins);
};

module.exports = Application;

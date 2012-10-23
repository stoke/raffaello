var utile = require('utile'),
    util = require('util'),
    EventEmitter2 = require('eventemitter2').EventEmitter2,
    Plugin = require('./plugin');

function PluginFactory() {
  this.methods = {};
  this.properties = {};
};

PluginFactory.prototype.defineMethod = function(name, method) {
  if (typeof method !== 'function')
    throw new Error('A method must be a function');

  this.methods[name] = method;
};

PluginFactory.prototype.defineProperty = PluginFactory.prototype.set = function(name, value) {
  if (typeof value === 'function')
    throw new Error('A property must not be a function');

  this.properties[name] = value;
};

PluginFactory.prototype.setName = function(name) {
  this.name = name;
};

PluginFactory.prototype.extend = function(obj) {
  var self = this;

  utile.each(obj, function(v, k) {
    if (typeof v === 'function')
      self.defineMethod(k, v);
    else
      self.defineProperty(k, v);
  });
};

PluginFactory.prototype.getProperty = PluginFactory.prototype.get = function(name) {
  return this.properties[name];
};

PluginFactory.prototype.plugin = function() {
  if (!this.name) throw new Error('Name is needed');

  var plugin = function() {};

  utile.inherits(plugin, Plugin); // Inherits from Plugin skeleton

  utile.each(this.methods, function(v, k) {
    plugin.prototype[k] = v;
  });

  plugin.prototype.properties = this.properties;
  plugin.prototype.name = this.name;
  plugin.prototype.methods = Object.keys(this.methods);

  return plugin;
};

module.exports = PluginFactory;
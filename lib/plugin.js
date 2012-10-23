var utile = require('utile'),
    EventEmitter2 = require('eventemitter2').EventEmitter2;

function Plugin() {}

Plugin.prototype.defineProperty = Plugin.prototype.set = function(name, value) {
  this.properties[name] = this.app.middlewares.set(name, value) || value;
};

Plugin.prototype.getProperty = Plugin.prototype.get = function(name) {
  return this.app.middlewares.get(name, this.properties[name]) || this.properties[name];
};

utile.inherits(Plugin, EventEmitter2); // Inherits from EventEmitter

module.exports = Plugin;
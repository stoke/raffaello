var utile = require('utile'),
    EventEmitter2 = require('eventemitter2').EventEmitter2;


function Plugin() {}

utile.inherits(Plugin, EventEmitter2); // Inherits from EventEmitter

Plugin.prototype.addMethod = function(name, fn) {
  this.app.plugins._addMethod(name);
  this.methods.push(name);
  this[name] = fn;
};

Plugin.prototype.get = function(name) {
  return this.prototype[name];
};

Plugin.prototype.set = function(name, value) {
  this.prototype[name] = value;
};

module.exports = Plugin;
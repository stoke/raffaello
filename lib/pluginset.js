function PluginSet() {
  this.plugins = [];

  this.on = this._wrapper.bind(this, 'on');
  this.emit = this._wrapper.bind(this, 'emit');
}

PluginSet.prototype._wrapper = function(name) {
  var args = [].slice.call(arguments, 1);

  this.plugins.forEach(function(i) {
    if (typeof i[name] === 'function')
      i[name].apply(i, args);
  });
};

PluginSet.prototype._push = function(plugin) {
  var self = this;

  this.plugins.push(plugin);

  plugin.methods.forEach(function(x) {
    if (x.charAt(0) === '_' && x !== '_constructor')
      throw new Error('Methods starting with underscore (_) are reserved');

    if (!self[x])
      self[x] = self._wrapper.bind(self, x);
  });
};

PluginSet.prototype._get = function(name) {
  return this.plugins.filter(function(i) {
    return i.name === name;
  }).shift();
}

module.exports = PluginSet;
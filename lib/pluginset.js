function PluginSet(ps, app) {
  var self = this;

  this.plugins = [];

  this.on = this._wrapper.bind(this, 'on');
  this.emit = this._wrapper.bind(this, 'emit');

  if (ps instanceof PluginSet) {
    ps.plugins.forEach(function(plugin) {
      self._push(
        (app || plugin.app)._link(
          new plugin.constructor()
        )
      ); // basically, this will create another instance of the plugin, though it will run in the main application context
    });

    this._executeConstructors();
  }
}

PluginSet.prototype._wrapper = function(name) {
  var args = [].slice.call(arguments, 1),
      last = []

  this.plugins.forEach(function(i) {
    if (typeof i[name] === 'function')
      last.push( i[name].apply(i, args) );
  });

  return last.length === 1 ? last.shift() : last;
};

PluginSet.prototype._push = function(plugin) {
  var self = this;

  this.plugins.push(plugin);

  plugin.methods.forEach(function(x) {
    self._addMethod(x);
  });
};

PluginSet.prototype._addMethod = function(name) {
  if (name.charAt(0) === '_' && name !== '_constructor')
      throw new Error('Methods starting with underscore (_) are reserved');

  if (!this[name])
    this[name] = this._wrapper.bind(this, name);
};

PluginSet.prototype._get = function(name) {
  return this.plugins.filter(function(i) {
    return i.name === name;
  }).shift();
};

PluginSet.prototype._executeConstructors = function() {
  this.plugins.forEach(function(plugin) {
    if (!plugin.used)
      plugin._constructor();
  });
};

module.exports = PluginSet;
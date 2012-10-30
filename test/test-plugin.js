var expect = require('expect.js'),
    PluginFactory = require('../lib').PluginFactory,
    plugin = new PluginFactory(),
    Application = require('../lib').Application,
    app = new Application();

before(function() {
  plugin.extend({
    prop: 'yagonimod',

    getTest: function() {
      return this.get('prop');
    },

    setTest: function() {
      this.set('prop', 'yagxen');
    }
  });

  plugin.setName('test');

  app.use(plugin.plugin());
});

describe('plugin', function() {
  describe('#get', function() {
    it('should get a property', function() {
      expect(app.plugins.getTest()).to.be('yagonimod');
    });
  });

  describe('#set', function() {
    it('should set a property', function() {
      app.plugins.setTest(),
      expect(app.plugins.getTest()).to.be('yagxen');
    });
  });
});
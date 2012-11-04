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

    setTest: function(v) {
      this.set('prop', v || 'yagxen');
    },

    asyncTest: function(a, cbl) {
      cbl(++a);
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

  describe('#async', function() {
    it('should execute functions asynchronously', function(done) {
      app.plugins.async.asyncTest(3, function(t) {
        expect(t).to.be(4);
        done();
      });
    });
  });

  describe('Instance', function() {
    it('should leave the source plugin untouched', function() {
      var instance = app.Instance();

      instance.setTest('test');

      expect(instance.getTest()).to.be('test');
      expect(app.plugins.getTest()).to.be('yagxen');
    });
  });
});

var expect = require('expect.js'),
    PluginFactory = require('../lib').PluginFactory,
    plugin = new PluginFactory(),
    plugin1 = new PluginFactory(),
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
      cbl(null, ++a);
    }
  });

  plugin1.extend({
    asyncTest: function(a, cbl) {
      cbl(null, parseInt(a) + 2);
    }
  });
  
  plugin.setName('test');
  plugin1.setName('test1');

  app.use(plugin.plugin());
  app.use(plugin1.plugin());
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
      app.plugins.async.asyncTest(3, function(e, t) {
        expect(t.test).to.be(4);
        expect(t.test1).to.be(5);
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

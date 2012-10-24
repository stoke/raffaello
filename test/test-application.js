var expect = require('expect.js'),
    raffaello = require('../lib');

var app = new raffaello.Application();

describe('Application', function() {
  it('should have #use', function() {
    expect(app.use).to.be.a('function');
  });

  it('should have #config', function() {
    expect(app.config).to.be.a('function');
  });

  it('should have #load', function() {
    expect(app.load).to.be.a('function');
  });

  describe('#use', function() {
    var plugin = new raffaello.PluginFactory(), flag = false;
    plugin.setName('ubertest');
    
    plugin.defineMethod('test', function() {});
    plugin.defineMethod('_constructor', function() { flag = true; })

    app.use(plugin.plugin());

    it('should load plugin', function() {  
      expect(app.plugins._get('ubertest')).to.be.an('object');
    });

    it('should execute _constructor', function() {
      expect(flag).to.be.ok();
    });
  });

  describe('#load', function() {
    var plugin = new raffaello.PluginFactory(), flag = false;
    plugin.setName('ubertesta');
    
    plugin.defineMethod('test', function() {});
    plugin.defineMethod('_constructor', function() { flag = true; })

    app.load(plugin.plugin());

    it('should load plugin', function() {  
      expect(app.plugins._get('ubertesta')).to.be.an('object');
    });

    it('should not execute _constructor', function() {
      expect(flag).not.to.be.ok();
    });
  });

  describe('#Instance', function() {
    var app = new raffaello.Application(),
        plugin = new raffaello.PluginFactory(),
        flag = false;
    
    plugin.setName('test');
    plugin.extend({
      _constructor: function() { flag = true; },
      test: function() {}
    });

    app.load(plugin.plugin());
    
    var instance = app.Instance();

    it('should return an instance which contains plugin methods', function() {
      expect(instance.test).to.be.a('function');
    });

    it('should execute constructors of loaded plugins', function() {
      expect(flag).to.be.ok();
    })
  });
});
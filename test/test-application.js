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
});
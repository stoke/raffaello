var expect = require('expect.js'),
    raffaello = require('../lib'),
    Plugin = require('../lib/plugin');

describe('PluginFactory', function() {
  var plugin = new raffaello.PluginFactory();

  describe('#defineMethod', function() {
    plugin.defineMethod('test', function() {});

    it('should create a method', function() {
      expect(Object.keys(plugin.methods)).to.contain('test');
    });
  });

  describe('#defineProperty', function() {
    plugin.defineProperty('yago', 'nimod');

    it('should create a property', function() {
      expect(plugin.properties.yago).to.be('nimod');
    });
  });

  describe('#setName', function() {
    plugin.setName('testName');

    it('should set the name', function() {
      expect(plugin.name).to.be('testName');
    });
  });

  describe('#extend', function() {
    plugin.extend({
      property: 1337,
      method: function() {}
    });

    it('should automatically set properties and methods', function() {
      expect(Object.keys(plugin.methods)).to.contain('method');
      expect(Object.keys(plugin.properties)).to.contain('property');
    });
  });

  describe('#plugin', function() {
    var p = plugin.plugin();
    
    it('should generate a plugin instance', function() {
      expect(p.super_).to.be(Plugin);
    });
  });
});
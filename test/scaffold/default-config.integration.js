'use strict';

var path = require('path');
var should = require('chai').should();
var sinon = require('sinon');
var proxyquire = require('proxyquire');

describe('#defaultConfig', function() {
  var expectedExecPath = path.resolve(__dirname, process.env.HOME, './.npccoincore/data/npccoind');

  it('will return expected configuration', function() {
    var config = JSON.stringify({
      network: 'livenet',
      port: 3001,
      services: [
        'npccoind',
        'web'
      ],
      servicesConfig: {
        npccoind: {
          connect: [{
            rpchost: '127.0.0.1',
            rpcport: 7167,
            rpcuser: 'npccoin',
            rpcpassword: 'local321',
            zmqpubrawtx: 'tcp://127.0.0.1:28332'
           }]
        }
      }
    }, null, 2);
    var defaultConfig = proxyquire('../../lib/scaffold/default-config', {
      fs: {
        existsSync: sinon.stub().returns(false),
        writeFileSync: function(path, data) {
          path.should.equal(process.env.HOME + '/.npccoincore/npccoincore-node.json');
          data.should.equal(config);
        },
        readFileSync: function() {
          return config;
        }
      },
      mkdirp: {
        sync: sinon.stub()
      }
    });
    var home = process.env.HOME;
    var info = defaultConfig();
    info.path.should.equal(home + '/.npccoincore');
    info.config.network.should.equal('livenet');
    info.config.port.should.equal(3001);
    info.config.services.should.deep.equal(['npccoind', 'web']);
    var npccoind = info.config.servicesConfig.npccoind;
    should.exist(npccoind);
  });
  it('will include additional services', function() {
    var config = JSON.stringify({
      network: 'livenet',
      port: 3001,
      services: [
        'npccoind',
        'web',
        'insight-api-npccoin',
        'insight-ui-npccoin'
      ],
      servicesConfig: {
        npccoind: {
          connect: [{
            rpchost: '127.0.0.1',
            rpcport: 7167,
            rpcuser: 'npccoin',
            rpcpassword: 'local321',
            zmqpubrawtx: 'tcp://127.0.0.1:28332'
          }]
        }
      }
    }, null, 2);
    var defaultConfig = proxyquire('../../lib/scaffold/default-config', {
      fs: {
        existsSync: sinon.stub().returns(false),
        writeFileSync: function(path, data) {
          path.should.equal(process.env.HOME + '/.npccoincore/npccoincore-node.json');
          data.should.equal(config);
        },
        readFileSync: function() {
          return config;
        }
      },
      mkdirp: {
        sync: sinon.stub()
      }
    });
    var home = process.env.HOME;
    var info = defaultConfig({
      additionalServices: ['insight-api-npccoin', 'insight-ui-npccoin']
    });
    info.path.should.equal(home + '/.npccoincore');
    info.config.network.should.equal('livenet');
    info.config.port.should.equal(3001);
    info.config.services.should.deep.equal([
      'npccoind',
      'web',
      'insight-api-npccoin',
      'insight-ui-npccoin'
    ]);
    var npccoind = info.config.servicesConfig.npccoind;
    should.exist(npccoind);
  });
});

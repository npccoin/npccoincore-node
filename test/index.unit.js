'use strict';

var should = require('chai').should();

describe('Index Exports', function() {
  it('will export npccoincore-lib', function() {
    var npccoincore = require('../');
    should.exist(npccoincore.lib);
    should.exist(npccoincore.lib.Transaction);
    should.exist(npccoincore.lib.Block);
  });
});

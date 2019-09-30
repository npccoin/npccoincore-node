'use strict';

var createError = require('errno').create;

var NPCcoincoreNodeError = createError('NPCcoincoreNodeError');

var RPCError = createError('RPCError', NPCcoincoreNodeError);

module.exports = {
  Error: NPCcoincoreNodeError,
  RPCError: RPCError
};

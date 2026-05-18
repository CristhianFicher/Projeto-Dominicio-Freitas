#!/usr/bin/env node

if (typeof global.structuredClone !== 'function') {
  const { deserialize, serialize } = require('node:v8');
  global.structuredClone = (value) => deserialize(serialize(value));
}

require('../node_modules/eslint/bin/eslint.js');

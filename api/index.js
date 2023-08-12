#!/usr/bin/env node

process.env.BABEL_CACHE_PATH = './.babel.json';

require("babel-register");
require('./server/app.js');

#!/usr/bin/env node
import yargs = require('yargs/yargs');

const argv = yargs(process.argv.slice(2))
    .commandDir('veracode/cmd')
    .showHelpOnFail(true)
    .demandCommand(1,'')
    .argv;


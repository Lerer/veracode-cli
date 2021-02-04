#!/usr/bin/env node
import yargs = require('yargs/yargs');

const argv = yargs(process.argv.slice(2))
    .commandDir('veracode/cmd')
    .showHelpOnFail(true)
    .demandCommand(1,'')
    .wrap(process.stdout.columns)
    .option('prof',{
        'alias': 'veracode_profile',
        'default': 'default',
        'global':true,
        'describe': 'The profile name in the credentials file',
        'type':'string'
    })
    .argv;


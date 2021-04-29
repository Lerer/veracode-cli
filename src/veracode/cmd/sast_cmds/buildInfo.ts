
import {getBuildInfo} from '../../apis/sast/buildInfo';

exports.command = 'buildInfo';
exports.desc = 'Return an XML representation of the build info';
exports.builder =  (yargs:any) => {
  return yargs
  .option('appId', {
    alias: 'app',
    nargs: 1,
    demandOption: true,
    describe: 'Application ID',
    type: "number",
  })
  .option('sandboxId', {
    alias: 'sandbox',
    nargs: 1,
    demandOption: false,
    describe: 'Sandbox ID',
    type: "number"
  })
  .option('verbose', {
    describe: "Output result to screen"
  })
  .demandOption(['appId'])
  .requiresArg(['appId'])
  .help();
}
exports.handler = async function (argv:any) {
  if (isNaN(argv.appId)) {
    console.log('appId should be a number');
    process.exit(0);
  }
  if (argv.sandboxId !== undefined && isNaN(argv.sandboxId)) {
    console.log('sandboxId should be a number');
    process.exit(0);
  }

  const buildInfo = await getBuildInfo(argv.appId,argv.sandboxId,undefined);

  console.log(buildInfo);
  
  if (argv.verbose) {
    console.log(buildInfo);
  }
  console.log('Done');
}

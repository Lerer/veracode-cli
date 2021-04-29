
import {getApplications} from '../../apis/sast/applications';

exports.command = 'listApplications';
exports.desc = 'List (or search) applications by either their partial name, lagacy ID or GUID';
exports.builder =  (yargs:any) => {
  return yargs
  .option('appId', {
    alias: ['app','appid'],
    nargs: 1,
    demandOption: false,
    describe: 'Application ID',
    type: "number",
  })
  .option('appName', {
    alias: 'name',
    nargs: 1,
    demandOption: false,
    describe: 'Partial name of application profile',
    type: "string"
  })
  .option('GUID', {
    alias: 'guid',
    nargs: 1,
    demandOption: false,
    describe: 'The GUID of an application - which will result as a request to a specific single application',
    type: "string"
  })
  .strictOptions(true)
  .help();
}

exports.handler = async function (argv:any) {
  if (argv.appId && isNaN(argv.appId)) {
    console.log('appId should be a number');
    process.exit(0);
  }

  const applications = await getApplications(argv.appName,argv.GUID,argv.appId);

  console.log(JSON.stringify(applications,undefined,'  '));
}

import fs from 'fs';

 import {getBuildInfo} from '../../apis/sast/buildInfo';

exports.command = 'identifyOpenPolicyScan [inputfile] [options]'
exports.desc = 'create a list of workspaces which can be deleted - with zero project, and at least one more workspace with the same name';
exports.builder = (yargs:any) => {
    return yargs
        .option('inputfile', {
            alias: 'input',
            describe: 'Input file name - which contain a reqponce from list application request',
            default: 'apps.json',
            nargs: 1,
            demandOption: false,
            type: "string"
        })
        .option('since', {
            describe: "number of hours from which a scan request was opened since",
            default: 0,
            nargs: 1,
            demandOption: false,
            type: "number"
        })
        .strictOptions(true)
        .help();
  }

exports.handler =  async (argv:any) => {

    try {
        fs.accessSync(argv.inputfile, fs.constants.R_OK);
    } catch  (err) {
        console.log(`Input file [${argv.inputfile}] does not exist`);
        return;
    }      

    const input = fs.readFileSync(argv.inputfile,{encoding:'utf-8'});

    let jsonInput;
    try {
        jsonInput = JSON.parse(input);
    } catch (err) {
        console.log('Error parsing the file content. Maybe not in JSON format');
        return;
    }
    // to keep referance to a workspaces we want to keep with instead of no duplicate of a workspace with zero 
    let apps:any[] = [];
    if (jsonInput._embedded) {
        apps = jsonInput._embedded.applications;
    } else {
        apps = [jsonInput];
    }

    const foundProfiles = apps.filter((app:any) => {
        const staticScans = app.scans?.filter((scan:any) => scan.scan_type==='STATIC');
        if (staticScans.length===0 || staticScans[0].status==='PUBLISHED') {
            return false;
        }

        return true;
    });
    
    const suspects = await Promise.all(foundProfiles.map(async app => {
        const build = await getBuildInfo(app.id);
        
        return {
            appId:app.id,
            name:app.profile.name,
            guid:app.guid,
            policyBuild:build['$']
        };
    }));

    const oldPolicyScansProfiles = suspects.filter(app => {
        if (app.policyBuild.policy_updated_date) {
            const maybe:any = new Date(app.policyBuild.policy_updated_date);
            //console.log(maybe.toLocaleString());
            const diff = Date.now() - maybe;
            const hours = Math.floor(diff/1000/60/60);
            const minutes = Math.floor((diff-(hours*3600000))/60000);
            console.log(`${diff} millis which equates to ${Math.floor(diff/1000/60/60)} hours and ${minutes} minutes for app: ${app.name}`);
            return (hours > argv.since);
        } else {
            return true;
        }

    })


    console.log(JSON.stringify(oldPolicyScansProfiles,undefined,'  '));

}
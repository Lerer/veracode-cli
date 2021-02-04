import fs from 'fs';
import {outputWS} from '../sca';

exports.command = 'identify_redundant_workspaces [inputfile] [outputfile]'
exports.desc = 'create a list of workspaces which can be deleted - with zero project, and at least one more workspace with the same name';
exports.builder = (yargs:any) => {
    return yargs
        .option('inputfile', {
            alias: 'input',
            describe: 'Input file name. Can be created by running the list_workspaces command',
            default: 'workspaces.json'
        })
        .option('outputfile', {
            alias: 'output',
            describe: "Output result to screen",
            default: 'emptyWorkspaces.json'
        })
        .option('verbose', {
            describe: "Output result to screen"
        });
  }

exports.handler =  async (argv:any) => {
    const input = await fs.readFileSync(argv.inputfile,{encoding:'utf-8'});
    const jsonInput = JSON.parse(input);
    // to keep referance to a workspaces we want to keep with instead of no duplicate of a workspace with zero 
    const allZero:any = {};

    const forReduction = jsonInput.filter((ws:outputWS) => {

        if (ws.projects_count!==0) {
            return false;
        }

        if (allZero[ws.name]) {
            return true;
        }
        // current WS got zero (0) projects
        const sameWithNoEmpty = jsonInput.filter((inner:outputWS) => {
            return (inner.name===ws.name && (inner.projects_count>0));
        });

        if (sameWithNoEmpty.length===0) {
            // no other with same name, or, all other with same name has zero
            allZero[ws.name]=ws.id;
            return false; 
        } else {
            // there are other workspaces with at least one project
            return true;
        }
    });

    //console.log(overallResults);
    console.log('Printing to file "%s"',argv.outputfile);
    fs.writeFileSync(argv.outputfile,JSON.stringify(forReduction,null,4),{encoding:'utf-8'});

    if (argv.verbose) {
        console.log('verbose');
        forReduction.map((ws:outputWS) => {
        console.log('Workspace: [%s], site: [%s] has [%d] projects',ws.name,ws.id,ws.projects_count);
        })
    }
    console.log('Done');
}
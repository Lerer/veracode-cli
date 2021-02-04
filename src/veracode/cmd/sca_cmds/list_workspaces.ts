
import {getWorkspaces} from '../../apis/workspaces';
import fs from 'fs';
import {outputWS} from '../sca';

exports.command = 'list_workspaces [options]'
exports.desc = 'create a file with JSON content with Workspaces with their name, ID and, GUID'
exports.builder =  (yargs:any) => {
  return yargs
    .option('filename', {
      alias: 'f',
      describe: 'The output file name',
      default: 'workspaces.json'
    })
    .option('verbose', {
      describe: "Output result to screen"
    });
}
exports.handler = async function (argv:any) {
  console.log('Outputing workspaces to %s', argv.filename);
  let notDone:boolean = true;
  let page = 0;
  let overallResults:outputWS[] = [];

  while (notDone) {
    console.log('Querying page: %i',page);
    const workspaces = await getWorkspaces(page);

    let workspacesArr = workspaces?._embedded?.workspaces;
    if (workspacesArr) {
      let parsed:outputWS = workspacesArr.map((ws:any) => {
        return {
          name: ws.name,
          guid: ws.id,
          id: ws.site_id,
          projects_count: parseInt(ws.projects_count)
        };
      });
      //console.log(parsed);
      overallResults = overallResults.concat(parsed);
    }
    if (workspaces.page.number+1<workspaces.page.total_pages) {
      page++;
    } else {
      notDone = false;
    }
  }
  //console.log(overallResults);
  console.log('Printing to file "%s"',argv.filename);
  fs.writeFileSync(argv.filename,JSON.stringify(overallResults,null,4),{encoding:'utf-8'});

  if (argv.verbose) {
    console.log('verbose');
    overallResults.map((ws:outputWS) => {
      console.log('Workspace: [%s], site: [%s] has [%d] projects',ws.name,ws.id,ws.projects_count);
    })
  }
  console.log('Done');
}

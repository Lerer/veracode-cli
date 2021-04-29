import {getWorkspaces} from '../veracode/apis/sca/workspaces';


const testWorkspaces = async () => {
    const buildInfo = await getWorkspaces();
    console.log(JSON.stringify(buildInfo,null,'  '));
}

testWorkspaces();
  
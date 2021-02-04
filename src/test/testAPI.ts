import {getWorkspaces} from '../veracode/apis/workspaces';


const testWorkspaces = async () => {
    const buildInfo = await getWorkspaces();
    console.log(buildInfo);
}

testWorkspaces();
  
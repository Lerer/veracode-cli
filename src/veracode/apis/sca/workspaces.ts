import {request,DEFAULT_API_HOST} from '../queryHandler';

const DEFAULT_PAGE_SIZE = 500;

export async function getWorkspaces(page:number=0) : Promise<any | undefined> {
    //console.log('getWorkspaces - START');
    let workspaces = {};

    try {
        const workspacesRes = await request(
            'GET',
            DEFAULT_API_HOST,
            '/srcclr/v3/workspaces',
            {page,size:DEFAULT_PAGE_SIZE});
        //console.log(JSON.stringify(workspacesRes.data));
        workspaces = workspacesRes.data;
    } catch (e) {
        console.log(e);
        console.log(Object.keys(e));
        console.log(e.errno);
        console.log(e.code);
        console.log(e.config);
        console.log(e.isAxiosError);
        console.log(e.toJSON());
    }
    return workspaces;
}

export async function deleteWorkspace(workspaceGUID:string) : Promise<any | undefined> {
    let response = {message: 'Not working'};
    if (workspaceGUID ) {
        try {
            const workspaceRes = await request(
                'DELETE',
                DEFAULT_API_HOST,
                `/srcclr/v3/workspaces/${workspaceGUID}`,
                {});
            console.log(JSON.stringify(workspaceRes.data));
            response = workspaceRes.data;
        } catch (e) {
            console.log(e);
            console.log(Object.keys(e));
            console.log(e.errno);
            console.log(e.code);
            console.log(e.config);
            console.log(e.isAxiosError);
            console.log(e.toJSON());
        }
        return response;
    }
}

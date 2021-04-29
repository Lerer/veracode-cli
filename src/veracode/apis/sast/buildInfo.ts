import {request,DEFAULT_XML_API_HOST} from '../queryHandler';

const DEFAULT_PAGE_SIZE = 500;

export async function getBuildInfo(appId:number,sandboxId: number|undefined,buildId: number|undefined) : Promise<any | undefined> {
    //console.log('getWorkspaces - START');
    let buildInfo = '';

    let params:any = {app_id:appId};
    if (sandboxId) {
        console.log('adding sandbox id: ',sandboxId);
        params.sandbox_id = sandboxId;
    } else {
        console.log(sandboxId);
    }
    if (buildId) {
        params.build_id = buildId;
    }

    try {
        const buildInfoRes = await request(
            'GET',
            DEFAULT_XML_API_HOST,
            '/api/5.0/getbuildinfo.do',
            params);
        //console.log(JSON.stringify(workspacesRes.data));
        buildInfo = buildInfoRes.data;
    } catch (e) {
        console.log(e);
        console.log(Object.keys(e));
        console.log(e.errno);
        console.log(e.code);
        console.log(e.config);
        console.log(e.isAxiosError);
        console.log(e.toJSON());
    }
    return buildInfo;
}
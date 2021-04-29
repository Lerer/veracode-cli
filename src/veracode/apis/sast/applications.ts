import {request,DEFAULT_API_HOST} from '../queryHandler';

export async function getApplications(appName?: string|undefined,appGUID?:string|undefined,lagacyAppId?:number|undefined) : Promise<any | undefined> {
    console.log('getApplications - START');
    let applications = '';

    let path = '/appsec/v1/applications';
    let params:any = {};

    if (appGUID) {
        path = path+'/'+appGUID;
    } else {
        if (appName) {
            console.log('adding application name: ',appName);
            params.name = appName;
        } 
        if (lagacyAppId) {
            params.legacy_id = lagacyAppId;
        }
    }

    try {
        const applicationRes = await request(
            'GET',
            DEFAULT_API_HOST,
            path,
            params);
        applications = applicationRes.data;
    } catch (e) {
        console.log(e);
        console.log(Object.keys(e));
        console.log(e.errno);
        console.log(e.code);
        console.log(e.config);
        console.log(e.isAxiosError);
        console.log(e.toJSON());
    }
    console.log('getApplications - END');
    return applications;
}
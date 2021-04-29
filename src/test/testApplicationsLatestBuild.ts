import {getApplications} from '../veracode/apis/sast/applications';


const testApplications = async () => {
    const apps = await getApplications('AZURE');
    console.log(JSON.stringify(apps,null,'  '));
}

testApplications();
//import { type } from "os";

//const veracodeHmac = require('./veracode-hmac');
//const credHandler = require('./credsHandler');
import axios from 'axios';
import {generateHeader} from '../helpers/hmacHandler';

const USER_AGENT = 'veracode-api-handler';
const PROTOCOL = 'https://';
const DEFAULT_METHOD = 'GET';
type METHOD = 'GET'|'POST'|'DELETE';
export const DEFAULT_API_HOST = 'api.veracode.com';
export const guidRegEx:RegExp = /[a-z\d]{8}-[a-z\d]{4}-[a-z\d]{4}-[a-z\d]{4}-[a-z\d]{12}/i;

export async function request(inputMethod:METHOD,host:string,path:string, params:object) {
    //console.log('api query handler');

    let method:METHOD = inputMethod || DEFAULT_METHOD; 
    // funky for the Veracode HMAC generation
    let queryString:string = '';
    if(params !== null && Object.keys(params).length>0) {
        var entries:Array<[string,string]> = Object.entries(params);
        queryString = '?';
        let index = 0;
        for(var entry of entries)
        {   
            if(index > 0)
                queryString += '&';
            queryString += entry[0] + '=' + (''+entry[1]).replace(/\s/g, "+");
            index++;
        }
    }
    //console.log('before Axios.request');
    const authHeader:string = generateHeader(
        host, 
        path+queryString,
        method);

    //console.log(`Method: ${method}, Header:${authHeader}`);

    return axios.request({
        method,
        headers:{
            'Accept': 'application/json',
            'User-Agent': USER_AGENT,
            'Authorization': authHeader,
            "Accept-encoding": "utf8"
        },
        params,
        url: PROTOCOL + host + path
    });
}


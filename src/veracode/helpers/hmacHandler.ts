import * as crypto from  'crypto';
import {getLocalAuthorization} from './accessPropertiesReader';

const headerPreFix = "VERACODE-HMAC-SHA-256";
const verStr = "vcode_request_version_1";

function hmac256 (data:string|Int8Array, key:string|Buffer|Int8Array, format:"hex"|undefined)  {
    let hash = crypto.createHmac('sha256', key).update(data);
    if (format===undefined){
        return hash.digest();
    } else {
        // no format = Buffer / byte array
        return hash.digest(format);
    }
}

function getByteArray(hex:string)  {
	var bytes = [] as any;

	for(var i = 0; i < hex.length-1; i+=2){
	    bytes.push(parseInt(hex.substr(i, 2), 16));
	}

	// signed 8-bit integer array (byte array)
	return Int8Array.from(bytes);
}

export function generateHeader (host:string, urlPpath:string, method:string) {
    const credentials: {API_ID:any, SECRET:any} = getLocalAuthorization('default');
    let id:string = credentials.API_ID;
    let secret:string = credentials.SECRET;

    if (id === undefined || id.length===0 || secret===undefined || secret.length===0){
        //console.error('No credentials provided or incorrect credentials');
        console.error('No Veracode API credentials found. Please check your "credentials" file.');
        return '';
    }

    var data = `id=${id}&host=${host}&url=${urlPpath}&method=${method}`;
	var timestamp = (new Date().getTime()).toString();
	var nonce = crypto.randomBytes(16).toString("hex");

	// calculate signature
	var hashedNonce = hmac256(getByteArray(nonce), getByteArray(secret),undefined);
	var hashedTimestamp = hmac256(timestamp, hashedNonce,undefined);
	var hashedVerStr = hmac256(verStr, hashedTimestamp,undefined);
	var signature = hmac256(data, hashedVerStr, "hex");

	return `${headerPreFix} id=${id},ts=${timestamp},nonce=${nonce},sig=${signature}`;
}


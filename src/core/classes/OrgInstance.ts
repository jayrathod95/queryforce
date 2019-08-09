/***
 * Represents an authenticated org.
 */
import {Org} from "./Org";
import {OrgType} from "../interfaces/OrgType";

export class OrgInstance extends Org {

    instanceUrl: string;
    accessToken: string;

    constructor(type: OrgType, username: string, password: string, securityToken: string, instanceUrl: string, accessToken: string) {
        super(type, username, password, securityToken);
        this.instanceUrl = instanceUrl;
        this.accessToken = accessToken;
    }

    reOAuthenticate(){

    }

    refreshMetadata(){

    }

    executeQuery(query : string){

    }


}

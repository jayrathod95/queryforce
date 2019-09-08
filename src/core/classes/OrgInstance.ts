/***
 * Represents an authenticated org.
 */
import {Org} from "./Org";
import {OrgType} from "../interfaces/OrgType";

export class OrgInstance extends Org {

    instanceUrl: string;
    accessToken: string;
    refreshToken?: string;

    constructor(org: Org, instanceUrl: string, accessToken: string, refreshToken?: string) {
        super(org.type, org.username, org.password, org.securityToken);
        this.instanceUrl = instanceUrl;
        this.accessToken = accessToken;
        this.refreshToken= refreshToken;
    }


    reOAuthenticate() {

    }

    refreshMetadata() {

    }

    executeQuery(query: string) {

    }


}

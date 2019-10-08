/***
 * Represents an authenticated org.
 */
import {Org} from "./Org";
import {OrgType} from "./OrgType";
import {SForce} from "./SForce";

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

    executeQuery(soql: string) : Thenable<string> {
        return new Promise((resolve, reject) => {
            let db = new SForce.Database(this);
            db.query(soql);
        });
    }


}

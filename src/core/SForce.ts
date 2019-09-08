import {OrgInstance} from "./classes/OrgInstance";
import {Org} from "./classes/Org";

export class SForce {
    static login(org: Org): Thenable<OrgInstance> {
        return new Promise<OrgInstance>((resolve, reject) => {
            let jsforce = require('jsforce');
            let conn = new jsforce.Connection({loginUrl: org.getLoginUrl()});
            conn.login(org.username, org.password + org.securityToken, function (err: any, userInfo: any) {
                if (err) {
                    console.log(err);
                    reject(JSON.stringify(err));
                }else{
                    let instance =new OrgInstance(org,conn.instanceUrl,conn.accessToken, conn.refreshToken);
                    resolve(instance);
                }
            });

        });

    }
}
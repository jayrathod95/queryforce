import {OrgInstance} from "./OrgInstance";
import {Org} from "./Org";

export class SForce {
    static login(org: Org): Thenable<OrgInstance> {
        return new Promise<OrgInstance>((resolve, reject) => {
            let jsforce = require('jsforce');
            let conn = new jsforce.Connection({loginUrl: org.getLoginUrl()});
            conn.login(org.username, org.password + org.securityToken, function (err: any, userInfo: any) {
                if (err) {
                    reject(err.message);
                }else{
                    let instance =new OrgInstance(org,conn.instanceUrl,conn.accessToken, conn.refreshToken);
                    resolve(instance);
                }
            });

            // let instance =new OrgInstance(org,conn.instanceUrl,conn.accessToken, conn.refreshToken);
            // resolve(instance);

        });
    }

    static Database = class {
        org: Org;

        constructor(org:Org) {
            this.org = org;
        }

        query(soql: string): Thenable<string>{

            return new Promise((resolve, reject) => {});
        }

    };

}


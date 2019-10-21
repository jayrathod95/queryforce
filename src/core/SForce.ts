import {OrgInstance} from "./OrgInstance";
import {Org} from "./Org";
import List = Mocha.reporters.List;

export class SForce {
    static login(org: Org): Thenable<OrgInstance> {
        return new Promise<OrgInstance>((resolve, reject) => {
            let jsforce = require('jsforce');
            console.log(Org.getLoginUrl(org));
            let conn = new jsforce.Connection({loginUrl: Org.getLoginUrl(org)});
            conn.login(org.username, org.password + org.securityToken, function (err: any, userInfo: any) {
                if (err) {
                    reject(err.message);
                } else {
                    console.log(userInfo);
                    console.log(conn.accessToken);

                    let instance = new OrgInstance(org, conn.instanceUrl, conn.accessToken, conn.refreshToken);
                    resolve(instance);
                }
            });

            // let instance =new OrgInstance(org,conn.instanceUrl,conn.accessToken, conn.refreshToken);
            // resolve(instance);

        });
    }

    static Database = class {
        org: OrgInstance;

        constructor(org: OrgInstance) {
            this.org = org;
        }

        query(soql: string): Thenable<any> {
            return new Promise((resolve, reject) => {
                let records : Array<any> = new Array<any>();
                let jsforce = require('jsforce');
                let conn = new jsforce.Connection({
                    instanceUrl: this.org.instanceUrl,
                    accessToken: this.org.accessToken
                });
                let query = conn.query(soql).on('record', (record: any) => {
                    records.push(record);
                }).on('error',(err: any)=>{
                    reject(err);
                }).on('end',()=>{
                    resolve({records: records,totalSize: query.totalSize});
                }).run();
            });
        }

    };

}


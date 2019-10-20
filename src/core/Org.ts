/**
 * @description Represents a Salesforce org.
 * */
import {OrgType} from "./OrgType";
import {OrgInstance} from "./OrgInstance";
import {SForce} from "./SForce";



export class Org {
    type: OrgType;
    username: string;
    password: string;
    securityToken?: string;
    defaultConnection?: boolean = false;

    constructor(type: OrgType, username: string, password: string, securityToken?: string, defaultConnection:boolean = false) {
        this.type = type;
        this.username = username;
        this.password = password;
        this.securityToken = securityToken;
        this.defaultConnection = defaultConnection;
        //Object.seal(this);
    }

    static getLoginUrl(org :Org) {
        return (org.type === OrgType.PRODUCTION || org.type === OrgType.DEVELOPER) ? 'https://login.salesforce.com' : org.type == OrgType.SANDBOX ? 'https://test.salesforce.com' : '';
    }

    static getOAuthUrl(org: Org) {
        return (org.type === OrgType.PRODUCTION || org.type === OrgType.DEVELOPER) ? 'https://login.salesforce.com/services/oauth2/token' : org.type == OrgType.SANDBOX ? 'https://test.salesforce.com/services/oauth2/token' : '';
    }

    public login() : void{

    }

    public stringify(): void{

    }

}
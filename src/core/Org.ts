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

    getLoginUrl() {
        return (this.type === OrgType.PRODUCTION || this.type === OrgType.DEVELOPER) ? 'https://login.salesforce.com' : this.type == OrgType.SANDBOX ? 'https://test.salesforce.com' : '';
    }

    getOAuthUrl() {
        return (this.type === OrgType.PRODUCTION || this.type === OrgType.DEVELOPER) ? 'https://login.salesforce.com/services/oauth2/token' : this.type == OrgType.SANDBOX ? 'https://test.salesforce.com/services/oauth2/token' : '';
    }

    login() : void{

    }

    stringify(): void{

    }

}
import {OrgType} from "./OrgType";

export class Utils {
    static log(...params: any){
        let str = '';
        params.forEach(function (elem: any) {
            str = str + JSON.stringify(elem);
        });
    }

    static getOrgType(_orgType: string): OrgType | undefined{
        switch (_orgType.toUpperCase()) {
            case `${OrgType[OrgType.PRODUCTION]}` : return OrgType.PRODUCTION;
            case `${OrgType[OrgType.DEVELOPER]}` : return OrgType.DEVELOPER;
            case `${OrgType[OrgType.SANDBOX]}` : return OrgType.SANDBOX;
        }
    }

    static getOrgTypes(): string[]{
        let types : string[] = [];
        Object.values(OrgType).forEach(value => {
            if(typeof value === 'string'){
                types.push(value);
            }
        });
        return types;
    }
}
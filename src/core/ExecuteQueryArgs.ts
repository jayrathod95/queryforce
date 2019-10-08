import {CommandArgs} from "./CommandArgs";
import {OrgInstance} from "./OrgInstance";
import {Query} from "./Query";

export class ExecuteQueryArgs extends CommandArgs {
    org: OrgInstance;
    query: Query;

    constructor(org: OrgInstance, query: Query) {
        super();
        this.org = org;
        this.query = query;
    }

}
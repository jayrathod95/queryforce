import {Field} from "./Field";

export class Object {
    apiName: string;
    label?: string;
    fields?: Set<Field>;

    constructor(apiName: string, label: string, fields: Set<Field>) {
        this.apiName = apiName;
        this.label = label;
        this.fields = fields;
    }
}
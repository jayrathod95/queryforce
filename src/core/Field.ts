export class Field {
    apiName : string;
    label?: string;

    constructor(apiName: string, label?: string) {
        this.apiName = apiName;
        this.label = label;
    }
}
import {Query} from "./Query";
import {Filter} from "./Filter";
import {Field} from "./Field";

class SortParams {
    field: Field;
    asending: boolean;

    constructor(field: Field, asending: boolean) {
        this.field = field;
        this.asending = asending;
    }
}

export class Soql implements Query {

    object: Object;
    fields?: Array<string>;
    filter?: Filter;
    orderBy?: Array<SortParams>;
    limit?: number;
    offset?: number;

    constructor(object: Object, fields?: Array<string>) {
        this.object = object;
        this.fields = fields;
    }

    getQueryString() {
        // @ts-ignore
        return `SELECT ${this.fields.join(', ')} FROM ${this.object} ${this.filter ? ' WHERE ' + function (filter: Filter) {
            let str = '';
            let i = 0;
            do {
                if (i != 0)
                // @ts-ignore
                    filter = filter.nextFilter;
                str.concat(filter.field.apiName, ' ', filter.operator, ' ', filter.value + ' ');
                i++;
            } while (filter.nextFilterSeparator && filter.nextFilter);
            return str;
        }(this.filter) : ''} ${this.orderBy ? 'ORDER BY ' + function (orderParams: Array<SortParams>) {
            let str = '';
            orderParams.forEach((sortParam) => {
                str.concat(sortParam.field.apiName, ' ' + sortParam.asending ? 'ASC' : 'DESC');
            });
            return str;
        }(this.orderBy) : ''} ${this.limit ? `LIMIT ${this.limit}` : ''} ${this.offset ? `OFFSET ${this.offset}` : ''} `;
    }
}


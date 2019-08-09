import {Field} from "./Field";
import {ComparisonOperator} from "../interfaces/ComparisonOperator";
import {LogicalOperator} from "../interfaces/LogicalOperator";

export class Filter {
    field : Field;
    operator: ComparisonOperator;
    value: string | number | boolean;
    nextFilterSeparator?: LogicalOperator;
    nextFilter?: Filter;

    constructor(field: Field, operator: ComparisonOperator, value: string | number | boolean, nextFilterSeparator?: LogicalOperator, nextFilter?: Filter) {
        this.field = field;
        this.operator = operator;
        this.value = value;
        this.nextFilterSeparator = nextFilterSeparator;
        this.nextFilter = nextFilter;
    }
}
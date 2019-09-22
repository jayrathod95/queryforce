
export abstract class Command {
    static commandName: string;
    static commandLabel: string;

    abstract onCommandExecute(args?: any): void;
}
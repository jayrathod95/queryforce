
export abstract class Command {
    static commandName: string;
    static commandLabel: string;

    abstract onCommandExecute(): void;
}
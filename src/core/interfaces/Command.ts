import { State } from "../../state-handler/State";

export interface Command{
   commandName: string;
   commandLabel: string;
   onCommandExecute(state: State): void;
}
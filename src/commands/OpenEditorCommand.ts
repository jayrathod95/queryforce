import { Command } from "../core/interfaces/Command";
import { State} from "../state-handler/State";
import * as vscode from 'vscode';
import { ViewUtils } from "../view/ViewUtils";

export class OpenEditorCommand implements Command{
   commandName: string = 'extension.editor.open';   
   commandLabel: string = 'Open SOQL Editor';

   onCommandExecute(state: State): void {
      console.log('OpenEditorCommand called');
      
   }

   



}
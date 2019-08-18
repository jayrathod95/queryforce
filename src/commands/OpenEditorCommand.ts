import { Command } from "../core/interfaces/Command";
import { State} from "../state-handler/State";
import * as vscode from 'vscode';
import { ViewUtils } from "../view/ViewUtils";
import {TextEditor} from "../view/TextEditor";

export class OpenEditorCommand implements Command{
   commandName: string = 'extension.editor.open';   
   commandLabel: string = 'Open SOQL Editor';

   onCommandExecute(state: State): void {
      console.log('OpenEditorCommand called');
      let editor = new TextEditor('SOQL');
      editor.show();
   }

   



}
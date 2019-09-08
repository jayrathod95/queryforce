import { Command } from "../core/interfaces/Command";
import { State} from "../state-handler/State";
import * as vscode from 'vscode';
import { ViewUtils } from "../view/utils/ViewUtils";
import {TextEditor} from "../view/utils/TextEditor";

export class OpenEditorCommand extends Command{
   static commandName: string = 'queryforce.editor.open';
   static commandLabel: string = 'Open SOQL Editor';

   onCommandExecute(): void {
      console.log('OpenEditorCommand called');
      let editor = new TextEditor('SOQL');
      editor.show();
   }

   



}
import * as vscode from 'vscode';
import { OpenEditorCommand } from './OpenEditorCommand';
import { State } from '../state-handler/State';

export class CommandHandler{

   extensionContext: vscode.ExtensionContext;

   constructor(context: vscode.ExtensionContext){
      this.extensionContext = context;
   }

   registerCommands(){

      let state = new State();
      let openEditorCommand = new OpenEditorCommand();
      let openEditorDisp = vscode.commands.registerCommand(openEditorCommand.commandName,()=>{openEditorCommand.onCommandExecute(state);});

      this.extensionContext.subscriptions.push(
         openEditorDisp
      );
   }
}
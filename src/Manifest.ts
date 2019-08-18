import * as vscode from 'vscode';
import { OpenEditorCommand } from './commands/OpenEditorCommand';
import { State } from './state-handler/State';
import {ExtensionContext} from "vscode";
import {Logger} from "./state-handler/Logger";
import {OrgExplorerDataProvider} from "./view/trees/OrgExplorerDataProvider";

export class Manifest{

   static extensionContext: vscode.ExtensionContext;

   static init(context: ExtensionContext){
      Manifest.extensionContext = context;
      State.init(context);
      Logger.init();
      return Manifest;
   }

   private constructor(){

   }

   static registerCommands(){

      let state = new State();
      let openEditorCommand = new OpenEditorCommand();
      let openEditorDisp = vscode.commands.registerCommand(openEditorCommand.commandName,()=>{openEditorCommand.onCommandExecute(state);});

      Manifest.extensionContext.subscriptions.push(
         openEditorDisp
      );

      return Manifest;
   }

   static registerTreeViews() {
      vscode.window.registerTreeDataProvider('queryforce-explorer',new OrgExplorerDataProvider());
   }

}
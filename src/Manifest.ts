import * as vscode from 'vscode';
import { OpenEditorCommand } from './commands/OpenEditorCommand';
import { State } from './state-handler/State';
import {ExtensionContext, TreeDataProvider} from "vscode";
import {Logger} from "./state-handler/Logger";
import {OrgExplorerDataProvider, OrgTreeItem} from "./view/trees/OrgExplorerDataProvider";
import {AddConnectionCommand} from "./commands/AddConnectionCommand";
import {SetDefaultConnectionCommand} from "./commands/SetDefaultConnectionCommand";
import { Dao } from './state-handler/Dao';

export class Manifest{

   static extensionContext: vscode.ExtensionContext;
   static treeDataProviders: Map<string,TreeDataProvider<any>>;

   static init(context: ExtensionContext){
      Manifest.extensionContext = context;
      Manifest.treeDataProviders = new Map<string, TreeDataProvider<any>>();
      Dao.init();
      State.init(context);
      Logger.init();
      return Manifest;
   }

   private constructor(){

   }

   static registerCommands(){

      let openEditorCommand = new OpenEditorCommand();
      let openEditorDisp = vscode.commands.registerCommand(OpenEditorCommand.commandName,openEditorCommand.onCommandExecute);
      let addConnectionCmd = new AddConnectionCommand();
      let addConnectionDisp = vscode.commands.registerCommand(AddConnectionCommand.commandName,addConnectionCmd.onCommandExecute);
      let setDefaultConnectionCmd = new SetDefaultConnectionCommand();
      let setDefaultConnectionDisp = vscode.commands.registerCommand(SetDefaultConnectionCommand.commandName,setDefaultConnectionCmd.onCommandExecute);

      Manifest.extensionContext.subscriptions.push(
         openEditorDisp,
          addConnectionDisp,
          setDefaultConnectionDisp
      );

      return Manifest;
   }

   static registerTreeViews() {
      let orgExplorer = new OrgExplorerDataProvider();
      Manifest.treeDataProviders.set(OrgExplorerDataProvider.VIEW_ID,orgExplorer);

      Manifest.treeDataProviders.forEach((value, key) => {
         vscode.window.registerTreeDataProvider(key,value);
      });
   }

}
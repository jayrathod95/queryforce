// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import { window, MessageItem, ExtensionContext } from 'vscode';
import { Manifest } from './Manifest';
import { ViewUtils } from './view/utils/ViewUtils';
import { Toast } from './view/utils/Toast';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: ExtensionContext) {

	console.log('Congratulations, your extension "queryforce" is now active!');


	new Toast(`Queryforce activated! Start by executing command 'Add an Org'.`).show();

	Manifest.init(context)
		.registerCommands()
		.registerTreeViews();



}

// this method is called when your extension is deactivated
export function deactivate() { }

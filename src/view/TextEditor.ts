import * as vscode from "vscode";
import {State} from "../state-handler/State";


export class TextEditor {
    title: string;
    content?: string;
    filePath?: vscode.Uri;

    constructor(title: string, content?: string, filePath?: vscode.Uri) {
        this.title = title;
        this.content = content;
        this.filePath = filePath;
    }

    show(): PromiseLike<vscode.TextEditor> {
        return new Promise((resolve, reject) => {
            State.createSoqlFile().then((file: vscode.Uri) => {
                vscode.window.showTextDocument(file).then((textEditor) => {
                    resolve(textEditor);
                }, (reason => {
                    console.error(reason);
                    reject(reason);
                }));
            }, (err) => {
                console.error(err);
            });
        });
    }

}
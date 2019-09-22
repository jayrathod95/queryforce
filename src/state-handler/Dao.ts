import {Uri, workspace} from "vscode";
import {State} from "./State";
import * as fs from "fs";
import { Manifest } from "../Manifest";


export class Dao {

    static preferencesFile: Uri;

    static init():void{
        this.preferencesFile = Uri.file(`${Manifest.extensionContext.globalStoragePath}\\preferences.json`);
    }

    static updatePreferences(key: string, value: any): Thenable<void> {
        return new Promise((resolve, reject) => {
            if (fs.existsSync(this.preferencesFile.fsPath)) {
                fs.readFile(this.preferencesFile.fsPath, 'utf8', (err, data) => {
                    if (err) {
                        reject(err);
                    }
                    console.log(data);
                    console.log(JSON.stringify(value));

                    let parsedData = JSON.parse(data);
                    parsedData[key] = value;
                    fs.writeFile(this.preferencesFile.fsPath, JSON.stringify(parsedData), 'utf8', err1 => {
                        if (err1) {
                            reject(err1);
                        } else {
                            resolve();
                        }
                    });
                });
            } else {
                let data = {};
                // @ts-ignore
                data[key] = value;
                fs.writeFile(this.preferencesFile.fsPath, JSON.stringify(data), err => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve();
                    }
                });
            }
        });
    }

    static getPreferences(key: string, defaultValue: any): Thenable<any> {
        return new Promise((resolve, reject) => {
            if (fs.existsSync(this.preferencesFile.fsPath)) {
                fs.readFile(this.preferencesFile.fsPath, 'utf8',(err, data) => {
                    console.log('data----');
                    console.log(data);
                    if (err) {
                        reject(err);
                        return;
                    }
                    let parsedData = JSON.parse(data);
                    console.log(key in parsedData);
                    resolve(key in parsedData ? parsedData[key]: defaultValue);
                });
            }
        });
    }

}
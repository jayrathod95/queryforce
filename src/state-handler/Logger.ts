import {Uri} from "vscode";
import * as fs from 'fs';
import {State} from "./State";
import {Toast} from "../view/utils/Toast";
import {Constants} from "../core/Constants";

export class Logger {
    static logFile: Uri;

    static logError(err: any): void {
       Logger.logFile = Uri.file(`${State.EXTENSION_HOME}\\logs\\log_${new Date().toISOString().slice(0,10)}.txt`);
       if(fs.existsSync(Logger.logFile.fsPath)){
           fs.appendFile(Logger.logFile.fsPath,err,(err)=>{
               new Toast(Constants.ERROR_LOGGING_IN_FILE,'error').show();
           });
       }else{
           fs.writeFile(Logger.logFile.fsPath,err,(err)=>{
               new Toast(Constants.ERROR_LOG_FILE_CREATION,'error').show();
           });
       }
    }

    static init() {
        let logsDir = Uri.file(State.EXTENSION_HOME + '\\logs');
        console.log(logsDir.fsPath);
        if (!fs.existsSync(logsDir.fsPath)) {
            fs.mkdirSync(logsDir.fsPath);
        }
    }

}
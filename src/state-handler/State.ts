import {ExtensionContext, Uri, workspace, ExtensionKind} from "vscode";
import * as fs from 'fs';
import {Manifest} from "../Manifest";
export class State{

   static EXTENSION_HOME: string;

   constructor(){
      console.log('State initialized');
   }

   static init(context: ExtensionContext):void{
      State.EXTENSION_HOME = context.globalStoragePath;

      console.log(State.EXTENSION_HOME);
      if(!fs.existsSync(State.EXTENSION_HOME)){
         fs.mkdirSync(State.EXTENSION_HOME,{recursive:true});
      }
   }

   static createSoqlFile(fileName?:string):Thenable<Uri>{
      const filePath = `${State.EXTENSION_HOME}\\${fileName?fileName:'temp'}.soql`;
      return new Promise(function (resolve, reject) {
         fs.writeFile(filePath,'',(err)=>{
            if(err) reject(err);
            else resolve(Uri.file(filePath));
         });
      });
   }
}
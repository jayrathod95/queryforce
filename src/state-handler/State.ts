import {ExtensionContext, Uri} from "vscode";
import * as fs from 'fs';
import {Manifest} from "../Manifest";
import {Org} from "../core/classes/Org";
import {OrgType} from "../core/interfaces/OrgType";
import {Logger} from "./Logger";

export class State {

    static EXTENSION_HOME: string;

    private constructor() {
    }

    /**
     * Initialise state of the extension. This is called only on activation event.
     * @param context
     */
    static init(context: ExtensionContext): void {
        State.EXTENSION_HOME = context.globalStoragePath;

        console.log(State.EXTENSION_HOME);
        if (!fs.existsSync(State.EXTENSION_HOME)) {
            fs.mkdirSync(State.EXTENSION_HOME, {recursive: true});
        }
        context.globalState.update('orgs', []);
        State.saveConnection(new Org(OrgType.SANDBOX, 'test@test.com', '123123'));
        State.saveConnection(new Org(OrgType.SANDBOX, 'test@test.com1', '123123'));
    }

    /**
     *
     * @param fileName
     */
    static createSoqlFile(fileName?: string): Thenable<Uri> {
        const filePath = `${State.EXTENSION_HOME}\\${fileName ? fileName : 'temp'}.soql`;
        return new Promise(function (resolve, reject) {
            fs.writeFile(filePath, '', (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(Uri.file(filePath));
                }
            });
        });
    }

    /**
     * Return a map of username vs org details
     */
    static getConnections(): Thenable<Map<string, Org>> {
        let orgs = Manifest.extensionContext.globalState.get('orgs');
        if (orgs) {
            return Promise.resolve(orgs as Map<string, Org>);
        } else {
            return Promise.reject(Array.of());
        }
    }

    /**
     * Updates org details at persistent level
     * @param org Well, it's the org that you want save/update
     */
    static saveConnection(org: Org): Thenable<void> {
        return new Promise((resolve, reject) => {
            State.getConnections().then((orgs) => {
                orgs.set(org.username, org);
                Manifest.extensionContext.globalState.update('orgs', orgs).then(value => resolve(value), () => reject());
            });
        });
    }

    /**
     * Retrieve an org by username
     * @param username Salesforce username
     */
    static getConnection(username: string): Thenable<Org> {
        return new Promise((resolve, reject) => {
            State.getConnections().then(value => {
                if (value.has(username)) {
                    resolve(value.get(username));
                } else {
                    reject();
                }
            }, reason => {
                reject(reason);
            });
        });
    }

   /**
    * Pretty much self explanatory name, ain't it!
    * @param username
    */
    static removeConnection(username: string): Thenable<void> {
        return new Promise((resolve, reject) => {
            State.getConnections().then(connections => {
                if (connections.has(username)) {
                    connections.delete(username);
                    State.saveConnections(connections).then(value => resolve(value), reason => reject(reason));
                }
            });
        });
    }

   /**
    *
    * @param connections
    */
    private static saveConnections(connections: Map<string,Org>): Thenable<void>{
       return Manifest.extensionContext.globalState.update('orgs',connections);
    }

}
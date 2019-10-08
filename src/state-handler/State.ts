import {ExtensionContext, Uri} from "vscode";
import * as fs from 'fs';
import {Manifest} from "../Manifest";
import {Org} from "../core/Org";
import {OrgType} from "../core/OrgType";
import {Logger} from "./Logger";
import {Utils} from "../core/Utils";
import {Constants} from "../core/Constants";
import {OrgExplorerDataProvider} from "../view/trees/OrgExplorerDataProvider";
import {Dao} from "./Dao";

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
        State.saveConnection(new Org(OrgType.SANDBOX, 'test@test.com2', '123123'));
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
        return new Promise((resolve, reject) => {
            Dao.getPreferences(Constants.DS_KEY_ORGS, {}).then(value => {
                if (value) {
                    resolve(value);
                } else {
                    reject();
                }
            });
        });
    }

    /**
     * Updates org details at persistent level
     * @param org Well, it's the org that you want save/update
     */
    static saveConnection(org: Org): Thenable<void> {
        return new Promise((resolve, reject) => {
            State.getConnections().then((orgs) => {

                // @ts-ignore
                orgs[org.username] = org;
                Dao.updatePreferences(Constants.DS_KEY_ORGS, function () {
                    let plainObj = {};
                    for (let key of Object.keys(orgs)) {
                        // @ts-ignore
                        plainObj[key] = orgs[key];
                    }
                    return plainObj;
                }()).then(() => {
                    (Manifest.treeDataProviders.get(OrgExplorerDataProvider.VIEW_ID) as OrgExplorerDataProvider).refresh();
                    return resolve();
                }, () => reject());
                /*
                Manifest.extensionContext.globalState.update(Constants.DS_KEY_ORGS, orgs).then(value => {
                    (Manifest.treeDataProviders.get(OrgExplorerDataProvider.VIEW_ID) as OrgExplorerDataProvider).refresh();
                    return resolve(value);
                }, () => reject());*/
            }, (reason => {
                Utils.log('##: ', reason);
            }));
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
                    State.saveConnections(connections).then(value => {
                        (Manifest.treeDataProviders.get(OrgExplorerDataProvider.VIEW_ID) as OrgExplorerDataProvider).refresh();
                        return resolve(value);
                    }, reason => reject(reason));
                }
            });
        });
    }

    /**
     *
     * @param connections
     */
    private static saveConnections(connections: Map<string, Org>): Thenable<void> {
        return Manifest.extensionContext.globalState.update(Constants.DS_KEY_ORGS, connections);
    }

    static setDefaultOrg(username: string) : Thenable<void> {
        return new Promise((resolve, reject) => {
            Dao.updatePreferences(Constants.DS_KEY_DEFAULT_ORG,username).then(value => {
                (Manifest.treeDataProviders.get(OrgExplorerDataProvider.VIEW_ID) as OrgExplorerDataProvider).refresh();
                resolve();
            });
        });
    }

    /*
    static getDefaultOrg(): Thenable<Org> | undefined {
        return new Promise((resolve, reject) => {
            State.getDefaultOrgUsername().then(username => {
                if (username) {
                    return State.getConnection(username);
                }else { reject(); }
            }, reason => {
                reject(reason);
            });
        });
    }*/

    public static getDefaultOrgUsername(): Thenable<string | undefined> {
        return new Promise((resolve, reject) => {
           Dao.getPreferences(Constants.DS_KEY_DEFAULT_ORG,'').then(value => {
               resolve(value);
           });
        });
    }

    static getDefaultOrg() : Thenable<Org> {
        return new Promise((resolve, reject) => {
           State.getDefaultOrgUsername().then(username => {
               if (!username) {
                   reject();
                   return;
               }
               State.getConnection(username).then(value => resolve(value));
           },reason => reject(reason));
        });
    }
}
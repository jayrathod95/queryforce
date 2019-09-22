import {Event, EventEmitter, TreeDataProvider, TreeItem, TreeItemCollapsibleState} from "vscode";
import {State} from "../../state-handler/State";

export class OrgExplorerDataProvider implements TreeDataProvider<OrgTreeItem> {

    static VIEW_ID = 'queryforce-explorer';

    private _onDidChangeTreeData: EventEmitter<OrgTreeItem> = new EventEmitter<OrgTreeItem>();
    onDidChangeTreeData: Event<OrgTreeItem | undefined | null> = this._onDidChangeTreeData.event;

    refresh(): void {
        this._onDidChangeTreeData.fire();
    }

    getParent(element: OrgTreeItem): Thenable<OrgTreeItem | undefined | null> | OrgTreeItem | undefined | null {
        return undefined;
    }

    getTreeItem(element: OrgTreeItem): TreeItem | Thenable<TreeItem> {
        return element;
    }

    getChildren(element?: OrgTreeItem): Thenable<OrgTreeItem[]> {
        return !element ? new Promise((resolve, reject) => {
            State.getDefaultOrgUsername().then(defaultOrgUsername => {
                State.getConnections().then((connections => {
                    console.log(JSON.stringify(connections));
                    let orgs: Array<OrgTreeItem> = [];
                    for (let key of Object.keys(connections)){
                        orgs.push(new OrgTreeItem(key === defaultOrgUsername ? `${key} (Default)`: key, TreeItemCollapsibleState.None, key));
                    }/*
                    connections.forEach(((value, key, map) => {
                        orgs.push(new OrgTreeItem(key === defaultOrgUsername ? `${key} (Default)`: key, TreeItemCollapsibleState.None));
                    }));*/
                    resolve(orgs);
                }), reason => {
                    reject(reason);
                });
            });

        }) : Promise.reject(Array.of<OrgTreeItem>());
    }
}

export class OrgTreeItem extends TreeItem {
    username: string;
    constructor(label: string, collapsibleState: TreeItemCollapsibleState, username: string) {
        super(label, collapsibleState);
        this.username = username;
    }

}
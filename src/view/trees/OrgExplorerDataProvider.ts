import {Event, EventEmitter, TreeDataProvider, TreeItem, TreeItemCollapsibleState} from "vscode";
import {State} from "../../state-handler/State";

export class OrgExplorerDataProvider implements TreeDataProvider<OrgTreeItem>{

    static VIEW_ID = 'queryforce-explorer';

    private _onDidChangeTreeData: EventEmitter<OrgTreeItem> = new EventEmitter<OrgTreeItem>();
    onDidChangeTreeData: Event<OrgTreeItem | undefined | null> = this._onDidChangeTreeData.event;

    refresh(): void{
        this._onDidChangeTreeData.fire();
    }

    getParent(element: OrgTreeItem): Thenable<OrgTreeItem | undefined | null> | OrgTreeItem | undefined | null {
        return undefined;
    }

    getTreeItem(element: OrgTreeItem): TreeItem | Thenable<TreeItem> {
        return element;
    }

    getChildren(element?: OrgTreeItem): Thenable<OrgTreeItem[]> {
        return !element?new Promise((resolve, reject) => {
            console.log('test1');
            State.getConnections().then((connections => {
                console.log('test3');
                console.log(JSON.stringify(connections));
                let orgs: Array<OrgTreeItem> = [];
                connections.forEach(((value, key, map) => {
                    orgs.push(new OrgTreeItem(key,TreeItemCollapsibleState.None));
                }));
                console.log(orgs);
                resolve(orgs);
            }),reason => {
                console.log('test2');
                console.log(reason);
                reject(reason);
            });
        }): Promise.reject(Array.of<OrgTreeItem>());
    }
}

export class OrgTreeItem extends TreeItem{
    constructor(label:string,collapsibleState: TreeItemCollapsibleState){
        super(label,collapsibleState);
    }

}
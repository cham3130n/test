import { IFileSystem } from '../interfaces/IFileSystem';
import { INode } from '../interfaces/INode';
import { Directory } from './Directory';

/**
 * Vurtual filesystem implementing IFileSystem
 */
export class VirtualFileSystem implements IFileSystem{
    private readonly _root: Directory;

    constructor() {
        this._root = new Directory('');
    }

    /**
     * Finds the last Directory-element in Directory chain, given by strings, or null if it was not found
     * @param path ['foods', 'fruits', 'apples']
     * @param where Directory element to search from
     * @return INode|null
     * @private
     */
    private _getPath(path: string[], where: INode = null): INode {
        const pathCopy = [...path];
        const name = pathCopy.shift();
        const cwd = (where as Directory) || this._root;
        const sub = cwd.nodes
            .filter(node => node instanceof Directory)
            .find(node => node.name === name);
        if (!sub) {
            return null;
        }
        return pathCopy.length ? this._getPath(pathCopy, sub) : sub;
    }

    /**
     * Creates directory with given name
     * @param name
     * @throws Error
     */
    public createDirectory(name: string): void {
        const parts = name.split('/');
        const newName = parts.pop();
        const cwd = parts.length ? this._getPath(parts) as Directory : this._root;
        if (!cwd) {
            throw Error(`Cannot find directory to create subdirectory: ${name}.`);
        }
        if (cwd.nodes.find(node => node.name === name)) {
            throw Error('Directory already exists.');
        }
        const newNode = new Directory(newName, cwd)
        cwd.addNode(newNode);
    }

    /**
     * Moves INode from one INode to other
     * @param from INode source and object name, e.g. <dir>/<dir>/<dir>/<object>
     * @param to INode target name, e.g. <dir>/<dir>/<dir>
     * @throws Error
     */
    public moveNode(from: string, to: string): void {
        const fromParts = from.split('/');
        const objName = fromParts.pop();
        const toParts = to.split('/');

        const fromNode = fromParts.length ? this._getPath(fromParts) as Directory : this._root;
        if (!fromNode) throw Error(`Cannot find object to move ${from}`);

        const objNode = fromNode.nodes.find(node => node.name === objName);
        if (!objNode) throw Error(`Cannot find object to move ${from}`);

        const toNode = this._getPath(toParts) as Directory;
        if (!toNode) throw Error(`Cannot find target directory ${to}`);

        fromNode.removeNode(objNode);
        toNode.addNode(objNode);
        objNode.parent = toNode;
    }

    /**
     * Deletes node with given name
     * @param path INode source and object name, e.g. <dir>/<dir>/<dir>/<object>
     */
    public deleteNode(path: string): void {
        const parts = path.split('/');
        const objName = parts.pop();

        const fromNode = parts.length ? this._getPath(parts) as Directory : this._root;
        if (!fromNode) throw Error(`Cannot delete ${path} - ${parts.join('/')} does not exist`);

        const objNode = fromNode.nodes.find(node => node.name === objName);
        if (!objNode) throw Error(`Cannot delete ${path} - ${objName} does not exist`);

        fromNode.removeNode(objNode);
    }

    /**
     * Recursive directories list implementation
     * @param root
     * @param tab
     */
    public list(root: Directory = null, tab: string = ''): string[] {
        const curr = root || this._root;
        let directories = [];
        curr.nodes.forEach((node) => {
            directories.push(tab + node.name);
            if (node instanceof Directory) {
                directories = directories.concat(this.list(node as Directory, tab + ' '));
            }
        });

        return directories;
    }
}
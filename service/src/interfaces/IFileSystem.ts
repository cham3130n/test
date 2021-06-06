import { Directory } from '../fs/Directory';

/**
 * Common interface of any file system adapter
 */
export interface IFileSystem {
    /**
     * Create only Directory-nodes (should be IDirectory of course)
     * @param name (can be a path, e.g. 'valid/valid/valid/new-name')
     * @return void
     * @throws Error
     */
    createDirectory(name: string): void;

    /**
     * Move any node with full path name given
     * @param from INode path (the last one is moving) (Directory check inside)
     * @param to INode path (Directory check inside)
     * @return void
     * @throws Error
     */
    moveNode(from: string, to: string): void;

    /**
     * Delete any node with full path given
     * @param path INode path
     * @return void
     * @throws Error
     */
    deleteNode(path: string): void;

    /**
     * Recursive tabbed node list
     * @param root (null == tree root)
     * @param tab (=null, for internal use)
     * @return string[] array of lines for console output
     * @throws Error
     */
    list(root?: Directory, tab?: string): string[];
}
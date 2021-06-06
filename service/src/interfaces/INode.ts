/**
 * Simple Node interface (whenever it be directory, file record or smth else)
 */
export interface INode {
    /**
     * Displayable name of node
     */
    name: string;
    /**
     * Link to parent node
     */
    parent: INode;
    /**
     * Path getter, idn why i did it in the beginning, just left it as is
     * TODO remove sometimes
     */
    path: string;
}
import { VirtualFileSystem } from './src/fs/VirtualFileSystem';

describe('Virtual File System', () => {
    let vfs = null;

    beforeEach(() => {
        vfs = new VirtualFileSystem();
    });

    it('Check VFS creation', () => {
        expect(vfs instanceof VirtualFileSystem ).toBe(true);
        expect(vfs !== null && vfs !== undefined).toBeTruthy();
    });

    it('Check if VFS creates empty list on init', () => {
        expect(vfs.list()).toStrictEqual([]);
    });

    it('Check if VFS creates and sorts nodes', () => {
        vfs.createDirectory('oth');
        vfs.createDirectory('dir');
        vfs.createDirectory('dir/sub');
        expect(vfs.list()).toStrictEqual(['dir', ' sub', 'oth']);
    });

    it('Check if VFS fails to create nodes with similar names', () => {
        vfs.createDirectory('dir');
        expect(() => { vfs.createDirectory('dir') })
            .toThrow('Directory already exists.');
    });

    it('Check if VFS deletes node', () => {
        vfs.createDirectory('dir');
        vfs.createDirectory('dir/sub');
        vfs.deleteNode('dir/sub');
        expect(vfs.list()).toStrictEqual(['dir']);
    });

    it('Check if VFS fails to delete non-existent node', () => {
        vfs.createDirectory('dir');
        expect(() => { vfs.deleteNode('oth'); })
            .toThrow('Cannot delete oth - oth does not exist');
    });

    it('Check if VFS fails to delete FROM non-existent node', () => {
        vfs.createDirectory('dir');
        expect(() => { vfs.deleteNode('sub/oth'); })
            .toThrow('Cannot delete sub/oth - sub does not exist');
    });

    it('Check if VFS moves nodes', () => {
        vfs.createDirectory('dir');
        vfs.createDirectory('dir/sub');
        vfs.createDirectory('dir/sub/under');
        vfs.createDirectory('oth');
        vfs.moveNode('dir/sub', 'oth');
        expect(vfs.list()).toStrictEqual(['dir', 'oth', ' sub', '  under']);
    });

    it('Check if VFS fails to mode non-existent node', () => {
        vfs.createDirectory('dir');
        vfs.createDirectory('dir/sub');
        vfs.createDirectory('oth');
        expect(() => { vfs.moveNode('oth/sub', 'dir'); })
            .toThrow('Cannot find object to move oth/sub');
    });

    it('Check if VFS fails to move nodes with similar names to the same folder', () => {
        vfs.createDirectory('dir');
        vfs.createDirectory('dir/sub');
        vfs.createDirectory('oth');
        vfs.createDirectory('oth/sub');
        expect(() => { vfs.moveNode('oth/sub', 'dir'); })
            .toThrow('Cannot add node with same name (check existing nodes in current folder).')
    });
});







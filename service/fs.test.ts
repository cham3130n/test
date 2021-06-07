import { VirtualFileSystem } from './src/fs/VirtualFileSystem';


test('Check VFS creation', () => {
    const vfs = new VirtualFileSystem();
    expect(vfs instanceof VirtualFileSystem ).toBe(true);
    expect(vfs !== null && vfs !== undefined).toBeTruthy();
});

test('Check if VFS creates empty list on init', () => {
    const vfs = new VirtualFileSystem();
    expect(vfs.list()).toStrictEqual([]);
});

test('Check if VFS creates and sorts nodes', () => {
    const vfs = new VirtualFileSystem();
    vfs.createDirectory('oth');
    vfs.createDirectory('dir');
    vfs.createDirectory('dir/sub');
    expect(vfs.list()).toStrictEqual(['dir', ' sub', 'oth']);
});

test('Check if VFS fails to create nodes with similar names', () => {
    const vfs = new VirtualFileSystem();
    vfs.createDirectory('dir');
    expect(() => { vfs.createDirectory('dir') })
        .toThrow('Directory already exists.');
});

test('Check if VFS deletes node', () => {
    const vfs = new VirtualFileSystem();
    vfs.createDirectory('dir');
    vfs.createDirectory('dir/sub');
    vfs.deleteNode('dir/sub');
    expect(vfs.list()).toStrictEqual(['dir']);
});

test('Check if VFS fails to delete non-existent node', () => {
    const vfs = new VirtualFileSystem();
    vfs.createDirectory('dir');
    expect(() => { vfs.deleteNode('oth'); })
        .toThrow('Cannot delete oth - oth does not exist');
});

test('Check if VFS fails to delete FROM non-existent node', () => {
    const vfs = new VirtualFileSystem();
    vfs.createDirectory('dir');
    expect(() => { vfs.deleteNode('sub/oth'); })
        .toThrow('Cannot delete sub/oth - sub does not exist');
});

test('Check if VFS moves nodes', () => {
    const vfs = new VirtualFileSystem();
    vfs.createDirectory('dir');
    vfs.createDirectory('dir/sub');
    vfs.createDirectory('dir/sub/under');
    vfs.createDirectory('oth');
    vfs.moveNode('dir/sub', 'oth');
    expect(vfs.list()).toStrictEqual(['dir', 'oth', ' sub', '  under']);
});

test('Check if VFS fails to mode non-existent node', () => {
    const vfs = new VirtualFileSystem();
    vfs.createDirectory('dir');
    vfs.createDirectory('dir/sub');
    vfs.createDirectory('oth');
    expect(() => { vfs.moveNode('oth/sub', 'dir'); })
        .toThrow('Cannot find object to move oth/sub');
});

test('Check if VFS fails to move nodes with similar names to the same folder', () => {
    const vfs = new VirtualFileSystem();
    vfs.createDirectory('dir');
    vfs.createDirectory('dir/sub');
    vfs.createDirectory('oth');
    vfs.createDirectory('oth/sub');
    expect(() => { vfs.moveNode('oth/sub', 'dir'); })
        .toThrow('Cannot add node with same name (check existing nodes in current folder).')
})

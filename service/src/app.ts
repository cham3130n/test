import { CommandFactory } from './cli/CommandFactory';
import { VirtualFileSystem } from "./fs/VirtualFileSystem";

const cliSeparator: string = ' ';
const commandLines: string[] = [
    'CREATE fruits',
    'CREATE vegetables',
    'CREATE grains',
    'CREATE fruits/apples',
    'CREATE fruits/apples/fuji',
    'LIST',
    'CREATE grains/squash',
    'MOVE grains/squash vegetables',
    'CREATE foods',
    'MOVE grains foods',
    'MOVE fruits foods',
    'MOVE vegetables foods',
    'LIST',
    'DELETE fruits/apples',
    'DELETE foods/fruits/apples',
    'LIST',
];

const vfs = new VirtualFileSystem();

commandLines.forEach((commandLine: string) => {
    const [commandName, ...params] = commandLine.split(cliSeparator);
    console.log(commandLine);
    try {
        const command = CommandFactory.createCommand(commandName, vfs);
        const output = command.execute(params);
        if (output) {
            console.log(output.join('\n'));
        }
    } catch (error) {
        console.error(error.message);
    }
});

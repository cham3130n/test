import { IFileSystem } from '../interfaces/IFileSystem';
import { ICommand } from '../interfaces/ICommand';
import { List } from './List';
import { Move } from './Move';
import { Create } from './Create';
import { Delete } from './Delete';

function capitalize(line: string): string {
    return `${line[0].toUpperCase()}${line.slice(1).toLowerCase()}`;
}

/**
 * Command factory with inversion of FileSystem dependency. Fully static as singleton
 */
export class CommandFactory {
    // Commands list
    // Possible alternative - eval('new ${className}()') with permission checking
    private static _builtIn = {
        'List': fs => new List(fs),
        'Move': fs => new Move(fs),
        'Create': fs => new Create(fs),
        'Delete': fs => new Delete(fs),
    }

    /**
     * Create command by given name, passing them FileSystem implementation
     * @param command
     * @param fs
     */
    static createCommand(command: string, fs: IFileSystem): ICommand {
        const className = capitalize(command);
        if (!CommandFactory._builtIn[className]) {
            throw Error(`'${command}' is not a command.`);
        }
        return CommandFactory._builtIn[className](fs);
    }
}
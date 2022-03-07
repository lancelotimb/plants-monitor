import { runQuery } from './db.service';

const ADD_COMMAND = 'INSERT INTO commands_queue (command) VALUES (?);';

export async function addCommand(command: string): Promise<boolean> {
    return runQuery(ADD_COMMAND, [command]);
}

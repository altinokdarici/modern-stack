import { execSync } from 'child_process';

export const runCommand = (command: string) => {
    execSync(command, { stdio: 'inherit' });
};

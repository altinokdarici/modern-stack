import { readFileSync } from 'fs';

export interface PackageJson {
    name: string;
    devDependencies: Map<string, string>;
    dependencies: Map<string, string>;
}

export const readPackageJson = (filePath: string) => {
    const fileContent = readFileSync(filePath, 'utf8');
    return JSON.parse(fileContent) as PackageJson;
};

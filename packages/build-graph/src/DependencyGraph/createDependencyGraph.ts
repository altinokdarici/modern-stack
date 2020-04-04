import * as glob from 'glob';
import { readPackageJson, PackageJson } from '../Utils/readPackageJson';
import { createGraph, addNode, addEdge } from '../Graph';
import { DependencyGraph, Project } from './DependencyGraph';

export const createDependencyGraph = (
    rootPath: string,
    ignore: string[],
    onlyKnownDependencies: boolean,
): DependencyGraph => {
    const graph: DependencyGraph = createGraph();

    const projectNamePackageJsonMap: Map<string, PackageJson> = new Map<string, PackageJson>();

    const options: glob.IOptions = {
        ignore,
    };
    const files = glob.sync(`${rootPath}/**/package.json`, options);
    files.forEach((file) => {
        const packageJson = readPackageJson(file);
        addNode<string, Project>(graph, packageJson.name, { path: file });
        projectNamePackageJsonMap.set(packageJson.name, packageJson);
    });

    graph.nodes.forEach((node, key) => {
        const packageJson = projectNamePackageJsonMap.get(key);
        let dependencies: Set<string>;
        if (packageJson) {
            const allDependencies = [
                ...Object.keys(packageJson.dependencies || []),
                ...Object.keys(packageJson.devDependencies || []),
            ];

            dependencies = new Set<string>(
                onlyKnownDependencies ? allDependencies.filter((x) => graph.nodes.has(x)) : allDependencies,
            );
            dependencies.forEach((dependency) => {
                addEdge(graph, key, dependency);
            });
        }
    });

    return graph;
};

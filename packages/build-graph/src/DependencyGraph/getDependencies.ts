import { DependencyGraph } from './DependencyGraph';
import { getEdges } from '../Graph/getEdges';

export const getDependencies = (graph: DependencyGraph, packageName: string, onlyDirectDependencies: boolean) =>
    getEdges(graph, packageName, (project) => project.to, onlyDirectDependencies);

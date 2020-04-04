import { DependencyGraph } from './DependencyGraph';
import { getEdges } from '../Graph/getEdges';

export const getDependents = (graph: DependencyGraph, packageName: string, onlyDirectDependents: boolean) =>
    getEdges(graph, packageName, (project) => project.from, onlyDirectDependents);

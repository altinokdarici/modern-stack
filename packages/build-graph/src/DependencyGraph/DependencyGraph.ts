import { Graph } from '../Graph';

export interface Project {
    dependencies?: Set<string>;
    path: string;
}

export type DependencyGraph = Graph<string, Project>;

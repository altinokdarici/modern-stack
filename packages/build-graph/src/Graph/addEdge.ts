import { Graph, Key } from './Graph';
import { addNode } from './addNode';

const getOrCreateNode = <TKey extends Key, TValue>(
    graph: Graph<TKey, TValue>,
    key: TKey,
    createNodeIfNotExist = true,
) => {
    if (!graph.nodes.has(key)) {
        if (!createNodeIfNotExist) {
            throw new Error(`Node:${key} is not exist!`);
        }
        addNode(graph, key);
    }

    return graph.nodes.get(key);
};

/**
 * Adds dependency to the graph
 * @param graph DependencyGraph
 * @param from
 * @param to
 * @param createNodeIfNotExist
 */
export const addEdge = <TKey extends Key, TValue>(
    graph: Graph<TKey, TValue>,
    from: TKey,
    to: TKey,
    createNodeIfNotExist = true,
) => {
    const fromNode = getOrCreateNode(graph, from, createNodeIfNotExist);
    const toNode = getOrCreateNode(graph, to, createNodeIfNotExist);

    if (!graph.edges.has(from)) {
        graph.edges.set(from, new Set<TKey>());
    }

    graph.edges.get(from).add(to);

    fromNode.to.add(to);
    toNode.from.add(from);
};

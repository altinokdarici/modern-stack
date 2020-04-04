import { Graph, Key, Node } from './Graph';

export const createGraph = <TKey extends Key, TValue>(): Graph<TKey, TValue> => ({
    nodes: new Map<TKey, Node<TKey, TValue>>(),
    edges: new Map<TKey, Set<TKey>>(),
});

import { Graph, Key } from './Graph';

export const addNode = <TKey extends Key, TValue>(graph: Graph<TKey, TValue>, key: TKey, data?: TValue) => {
    graph.nodes.set(key, {
        data,
        key,
        to: new Set<TKey>(),
        from: new Set<TKey>(),
    });
};

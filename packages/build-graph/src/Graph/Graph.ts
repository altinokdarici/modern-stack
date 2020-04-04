export type Key = string | number;

export interface Node<TKey, TValue> {
    key: TKey;
    data?: TValue;
    from: Set<TKey>;
    to: Set<TKey>;
}

export interface Graph<TKey extends Key, TValue> {
    nodes: Map<TKey, Node<TKey, TValue>>;
    edges: Map<TKey, Set<TKey>>;
}

import { Node, Graph, Key } from './Graph';

export const getEdges = <TKey extends Key, TValue>(
    graph: Graph<TKey, TValue>,
    nodeName: TKey,
    propertySelector: (node: Node<TKey, TValue>) => Set<TKey>,
    onlyDirect: boolean,
) => {
    const processedPackages = new Set<TKey>();
    const dependents = new Set<TKey>();

    const getEdgesInternal = (nodeName: TKey) => {
        if (processedPackages.has(nodeName)) {
            return;
        }

        processedPackages.add(nodeName);
        const project = graph.nodes.get(nodeName);
        if (onlyDirect) {
            return propertySelector(project);
        }

        propertySelector(project).forEach((key) => {
            dependents.add(key);
            getEdgesInternal(key);
        });
    };

    getEdgesInternal(nodeName);
    return dependents;
};

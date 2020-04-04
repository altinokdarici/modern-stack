/* eslint-disable @typescript-eslint/no-empty-function */
import * as yargs from 'yargs';
import { createDependencyGraph, getDependencies, getDependents } from '../DependencyGraph';

const getIgnorePath = (ignorePath: string) => ignorePath.split(',').map((p) => p.trim());

yargs
    .help()
    .options({
        root: {
            alias: 'r',
            type: 'string',
        },
        ignorePath: {
            alias: 'i',
            type: 'string',
            description: 'Path to be ignored, comma separated',
        },
        onlyKnownDependencies: {
            type: 'boolean',
            description: 'onlyKnownDependencies',
            default: false,
        },
        packageName: {
            type: 'string',
        },
        onlyDirectDependencies: {
            type: 'boolean',
            description: 'onlyDirectDependencies',
            default: false,
        },
    })
    .command(
        'list',
        'list dependency graph',
        (_) => {},
        (argv) => {
            const ignorePath = getIgnorePath(argv.ignorePath);

            const graph = createDependencyGraph(argv.root, ignorePath, argv.onlyKnownDependencies);

            console.log(graph.edges);
        },
    )
    .command(
        'listDependencies',
        'list dependencies of a package',
        (_) => {},
        (argv) => {
            const ignorePath = getIgnorePath(argv.ignorePath);

            const graph = createDependencyGraph(argv.root, ignorePath, argv.onlyKnownDependencies);

            const dependencies = getDependencies(graph, argv.packageName, argv.onlyDirectDependencies);
            console.log(dependencies);
        },
    )
    .command(
        'listDependents',
        'list dependents of a package',
        (_) => {},
        (argv) => {
            const ignorePath = getIgnorePath(argv.ignorePath);

            const graph = createDependencyGraph(argv.root, ignorePath, argv.onlyKnownDependencies);

            const dependencies = getDependents(graph, argv.packageName, argv.onlyDirectDependencies);
            console.log(dependencies);
        },
    )
    .example(
        "list -r 'd:/r/myrepo' -i '**/node_modules/**, **/common/**' --onlyKnownDependencies true",
        'list dependency graph',
    ).argv;

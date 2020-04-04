import { task, tscTask, cleanTask, series } from 'just-scripts';

const lib = () => {
    task('clean', cleanTask());
    task('build', tscTask({ outDir: 'lib' }));
    task('rebuild', series('clean', 'build'));
};

export const justPresets = {
    lib,
};

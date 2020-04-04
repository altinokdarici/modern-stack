import { taskPresets, jestTask, task } from 'just-scripts';

taskPresets.lib();

task(
    'test',
    jestTask({
        passWithNoTests: true,
    }),
);

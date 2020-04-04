import { justPresets } from '@modern-stack/build/lib/just';
import { task, jestTask } from 'just-scripts';

justPresets.lib();

task(
    'test',
    jestTask({
        passWithNoTests: true,
    }),
);

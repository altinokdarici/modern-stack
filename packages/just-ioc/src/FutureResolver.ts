import { Dictionary } from './Container.Types';
import { Store } from './Store';

type PromiseDictionary<ServiceDictionary extends Dictionary> = {
    [P in keyof ServiceDictionary]: {
        promise: Promise<ServiceDictionary[P]>;
        resolve: (item: ServiceDictionary[P] | PromiseLike<ServiceDictionary[P]> | undefined) => void;
    };
};

export class FutureResolver<ServiceDictionary extends Dictionary> {
    private futureCallbackStore = new Store<PromiseDictionary<ServiceDictionary>>();

    public resolve = <T extends keyof ServiceDictionary>(key: T, resolver: (key: T) => ServiceDictionary[T]): void => {
        const callback = this.futureCallbackStore.get(key);
        if (callback) {
            callback.resolve(resolver(key));
        }
    };

    public getPromise = <T extends keyof ServiceDictionary>(key: T): Promise<ServiceDictionary[T]> => {
        let promiseResolver: (item: ServiceDictionary[T] | PromiseLike<ServiceDictionary[T]> | undefined) => void;
        const promise = new Promise<ServiceDictionary[T]>((resolve) => {
            promiseResolver = resolve;
        });
        return this.futureCallbackStore.get<T>(key, () => ({
            resolve: promiseResolver,
            promise,
        })).promise;
    };
}

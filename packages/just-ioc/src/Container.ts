import { Dictionary, Registry, Services, RegistryOptions, Lifetime } from './Container.Types';
import { Store } from './Store';
import { FutureResolver } from './FutureResolver';

const defaultOptions: RegistryOptions = {
    lifetime: Lifetime.Transient,
};

export class Container<ServiceDictionary extends Dictionary> {
    private registry = new Store<Registry<ServiceDictionary>>();
    private singletonStore = new Store<ServiceDictionary>();
    private futureResolver = new FutureResolver<ServiceDictionary>();

    public register = <T extends Services<ServiceDictionary>>(
        key: keyof Registry<ServiceDictionary>,
        factory: () => T,
        options?: RegistryOptions,
    ): this => {
        this.registry.add(key, {
            factory,
            options,
        });

        this.futureResolver.resolve(key, this.resolve);
        return this;
    };

    public tryResolve = <T extends keyof ServiceDictionary>(key: T): ServiceDictionary[T] | undefined => {
        const entry = this.registry.get(key);
        if (!entry) {
            return undefined;
        }
        const options = entry.options || defaultOptions;
        if (options.lifetime === Lifetime.Singleton) {
            return this.singletonStore.get<T>(key, entry.factory);
        }
        return entry.factory();
    };

    public resolve = <T extends keyof ServiceDictionary>(key: T): ServiceDictionary[T] => {
        const item = this.tryResolve<T>(key);
        if (!item) {
            throw `${key} can't found in the container`;
        }
        return item;
    };

    public resolveWhenReady = <T extends keyof ServiceDictionary>(key: T): Promise<ServiceDictionary[T]> => {
        return this.futureResolver.getPromise(key);
    };
}

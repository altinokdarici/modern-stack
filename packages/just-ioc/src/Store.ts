import { Dictionary } from './Container.Types';

export class Store<ServiceDictionary extends Dictionary> {
    private store: Partial<ServiceDictionary> = {};

    public get<T extends keyof ServiceDictionary>(key: T): ServiceDictionary[T] | undefined;
    public get<T extends keyof ServiceDictionary>(key: T, factory: () => ServiceDictionary[T]): ServiceDictionary[T];
    public get<T extends keyof ServiceDictionary>(
        key: T,
        factory?: () => ServiceDictionary[T],
    ): ServiceDictionary[T] | undefined {
        if (!this.store[key] && factory) {
            this.add(key, factory());
        }
        return this.store[key];
    }

    public add<T extends keyof ServiceDictionary>(key: T, value: ServiceDictionary[T]): this {
        this.store[key] = value;
        return this;
    }
}

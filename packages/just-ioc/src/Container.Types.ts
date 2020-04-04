export enum Lifetime {
    Transient,
    Singleton,
}

export interface RegistryOptions {
    lifetime: Lifetime;
}

export interface ContainerEntry<T> {
    factory: () => T;
    options?: RegistryOptions;
}

export type Dictionary = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any;
};

export type Registry<ServiceDictionary> = {
    [P in keyof ServiceDictionary]: ContainerEntry<ServiceDictionary[P]>;
};

export type Services<T extends Dictionary> = T[keyof T];

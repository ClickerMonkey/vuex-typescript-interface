export type ObjKeyof<T> = T extends object ? keyof T : never;

export type KeyofKeyof<T> = ObjKeyof<T> | { [K in keyof T]: ObjKeyof<T[K]> }[keyof T];

export type StripNever<T> = Pick<T, { [K in keyof T]: [T[K]] extends [never] ? never : K }[keyof T]>;

export type Lookup<T, K> = T extends any ? K extends keyof T ? T[K] : never : never;

export type Flatten<T> = T extends object ? StripNever<{ [K in KeyofKeyof<T>]:
  Exclude<K extends keyof T ? T[K] : never, object> |
  { [P in keyof T]: Lookup<T[P], K> }[keyof T]
}> : T

export type FlattenDeep<T> = Flatten<Flatten<Flatten<Flatten<Flatten<T>>>>>;


export type NamespacedModulesFor<T> = {
  [P in keyof T]: P extends 'modules'
  ? (T[P] extends object
    ? { [M in keyof T[P]]: IsNamespacedModule<T[P][M]> extends never ? never : M }[keyof T[P]]
    : never
  )
  : never
}[keyof T];

export type MergedModulesFor<T> = {
  [P in keyof T]: P extends 'modules'
  ? (T[P] extends object
    ? { [M in keyof T[P]]: IsNamespacedModule<T[P][M]> extends never ? M : never}[keyof T[P]]
    : never
  )
  : never
}[keyof T];

export type IsNamespacedModule<M> =
  M extends object
  ? { [P in keyof M]: P extends 'namespaced'
      ? (M[P] extends true ? P : never)
      : never
    }[keyof M]
  : never;

export type StateInputFor<T> = {
  [K in StateKeys<T>]: T[K];
}

export type SubStateFor<T> = {
  [M in NamespacedModulesFor<T>]: T extends { modules: { [P in M]: object } } ? StateFor<T['modules'][M]> : never;
}

export type MergedStateFor<T> = {
  [M in MergedModulesFor<T>]: T extends { modules: { [P in M]: object } } ? StateFor<T['modules'][M]> : never;
}

export type StateFor<T> = StateInputFor<T> & SubStateFor<T> & Flatten<MergedStateFor<T>>;

export type GettersForType<T> = {
  [K in GetterKeys<T>]: T[K];
}

export type SubGettersFor<T> = {
  [M in NamespacedModulesFor<T>]: T extends { modules: { [P in M]: object } } ? GettersFor<T['modules'][M]> : never;
}

export type MergedGettersFor<T> = {
  [M in MergedModulesFor<T>]: T extends { modules: { [P in M]: object } } ? GettersFor<T['modules'][M]> : never;
}
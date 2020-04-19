import _Vue, { WatchOptions } from 'vue';


import './vue';

/**
 * When and if https://github.com/Microsoft/TypeScript/issues/12754 is 
 * implemented, we can support namespaced modules - and Vuex can be completely
 * typesafe!
 * 
 * We also need Flatten to be infinitely deep since unnamespaced sub modules 
 * can have getters, mutations, and actions merged down into the store.
 * I was calling Flatten multiple times but that results in TypeScript dying.
 * 
 * TODO 
 * - Namespace support, obviously. Requires TS improvements.
 * - Root store $store has proper types. Requires TS improvements.
 * - Nested module merging. Requires TS improvements.
 * - Namespaced actions marked with root=true need to be placed in root store.
 */

export declare function install(Vue: typeof _Vue): void;


export type CustomVue = _Vue & { [key: string]: any };



export type EmptyObject = { [key: string]: never };

export type OptionalProperties<T, R> = T extends EmptyObject ? {} : R;

export type IfEquals<X, Y, A = X, B = never> =
  (<T>() => T extends X ? 1 : 2) extends
  (<T>() => T extends Y ? 1 : 2) ? A : B;

export type ObjKeyof<T> = T extends object ? keyof T : never;

export type KeyofKeyof<T> = ObjKeyof<T> | { [K in keyof T]: ObjKeyof<T[K]> }[keyof T];

export type StripNever<T> = Pick<T, { [K in keyof T]: [T[K]] extends [never] ? never : K }[keyof T]>;

export type Lookup<T, K> = T extends any ? K extends keyof T ? T[K] : never : never;

export type Flatten<T> = T extends object ? StripNever<{ [K in KeyofKeyof<T>]:
  Exclude<K extends keyof T ? T[K] : never, object> |
  { [P in keyof T]: Lookup<T[P], K> }[keyof T]
}> : T

export type Intersect<T> = T extends object
  ? { [K in keyof T]: (arg: T[K]) => void } extends Record<
      keyof T,
      (arg: infer A) => void
    >
    ? A
    : never
  : T;

export type Resolvable<T> = T | (() => T);

export type GetSingleElement<A, N> = A extends []
  ? N
  : A extends [infer P]
    ? P
    : A extends [(infer P)?]
      ? P | undefined
      : N;


export type Mutation<P, R = void> = (payload: P) => R;

export type IsMutation<M, Y, N = never> = M extends Mutation<infer P, infer R> ? (R extends void ? Y : N) : N;

export type MutationPayload<F, N = never> = F extends (...any: infer A) => void 
  ? GetSingleElement<A, N>
  : N;

export type MutationPayloadRoot<R, A, N = null | undefined> = {
  [K in keyof R]: K extends A
    ? MutationPayload<R[K], N>
    : K extends 'modules'
      ? { [M in keyof R[K]]: {
          [E in keyof R[K][M]]: E extends A
            ? MutationPayload<R[K][M][E], N>
            : never
          }[keyof R[K][M]]
        }[keyof R[K]]
      : never
}[keyof R];

export type Action<P, R, I = Promise<R>> = (payload: P) => I;

export type IsAction<A, Y, N = never> = A extends Action<infer P, infer R, infer I> ? (I extends Promise<any> ? Y : N) : N;

export type ActionPayload<F, N = never> = F extends (...args: infer A) => Promise<any>
  ? GetSingleElement<A, N>
  : N;

export type ActionPayloadRoot<R, A, N = null | undefined> = {
  [K in keyof R]: K extends A
    ? ActionPayload<R[K], N>
    : K extends 'modules'
      ? { [M in keyof R[K]]: {
          [E in keyof R[K][M]]: E extends A
            ? ActionPayload<R[K][M][E], N>
            : never
          }[keyof R[K][M]]
        }[keyof R[K]]
      : never
}[keyof R];

export type ActionResult<A> = A extends Action<infer P, infer R> ? R : never;

export type ActionResultRoot<R, A> = {
  [K in keyof R]: K extends A
    ? ActionResult<R[K]>
    : K extends 'modules'
      ? { [M in keyof R[K]]: {
          [E in keyof R[K][M]]: E extends A
            ? ActionResult<R[K][M][E]>
            : never
          }[keyof R[K][M]]
        }[keyof R[K]]
      : never
}[keyof R];


export type StateKeys<T> = {
  [P in keyof T]-?: T[P] extends Function 
    ? never 
    : P extends 'modules' | 'namespaced'
      ? never
      : IfEquals<{ [Q in P]: T[P] }, { -readonly [Q in P]: T[P] }, P>
}[keyof T];

export type GetterKeys<T> = {
  [P in keyof T]-?: IfEquals<{ [Q in P]: T[P] }, { -readonly [Q in P]: T[P] }, never, P>
}[keyof T];

export type MutationKeys<S> = {
  [K in keyof S]: IsMutation<S[K], K>
}[keyof S];

export type MutationKeysWithPayload<S> = {
  [K in keyof S]: IsMutation<S[K], MutationPayload<S[K]> extends never ? never : K>
}[keyof S];

export type MutationKeysNoPayload<S> = {
  [K in keyof S]: IsMutation<S[K], MutationPayload<S[K]> extends never ? K : never>
}[keyof S];

export type MutationKeysRoot<R> = MutationKeys<R> | {
  [P in keyof R]: P extends 'modules'
    ? { [K in keyof R[P]]: MutationKeys<R[P][K]> }[keyof R[P]]
    : never;
}[keyof R];

export type ActionKeys<S> = {
  [K in keyof S]: IsAction<S[K], K, never>
}[keyof S];

export type ActionKeysWithPayload<S> = {
  [K in keyof S]: IsAction<S[K], ActionPayload<S[K]> extends never ? never : K>
}[keyof S];

export type ActionKeysNoPayload<S> = {
  [K in keyof S]: IsAction<S[K], ActionPayload<S[K]> extends never ? K : never>
}[keyof S];

export type ActionKeysRoot<R> = ActionKeys<R> | {
  [P in keyof R]: P extends 'modules'
    ? { [K in keyof R[P]]: ActionKeys<R[P][K]> }[keyof R[P]]
    : never;
}[keyof R];

export type ModuleKeys<T> = {
  [P in keyof T]: P extends 'modules'
    ? (T[P] extends object ? keyof T[P] : never )
    : never
}[keyof T];

export type MergedModuleKeys<T> = {
  [P in keyof T]: P extends 'modules'
  ? (T[P] extends object
    ? { [M in keyof T[P]]: IsNamespacedModule<T[P][M]> extends never ? M : never}[keyof T[P]]
    : never
  )
  : never
}[keyof T];

export type NamespacedModuleKeys<T> = {
  [P in keyof T]: P extends 'modules'
  ? (T[P] extends object
    ? { [M in keyof T[P]]: IsNamespacedModule<T[P][M]> extends never ? never : M}[keyof T[P]]
    : never
  )
  : never
}[keyof T];

export type GetModule<T, M extends NamespacedModuleKeys<T>> = 
  T extends { modules: { [K in M]: infer E } } ? E : never;

export type IsNamespacedModule<M> =
  M extends object
  ? { [P in keyof M]: P extends 'namespaced'
      ? (M[P] extends true ? P : never)
      : never
    }[keyof M]
  : never;

export type GetNamespacedFor<M> = {
  [P in keyof M]: P extends 'namespaced'
    ? M[P] extends true
      ? { namespaced: true }
      : never
    : never;
};


export type StateInputFor<T> = {
  [K in StateKeys<T>]: T[K];
};

export type StateInput<T> = Resolvable<StateInputFor<T>>;

export type MergedStateFor<T> = {
  [M in ModuleKeys<T>]: 
    T extends { modules: { [P in M]: infer E } } 
      ? StateFor<E>
      : never;
};

export type StateFor<T> = StateInputFor<T> & MergedStateFor<T>;


export type GetterInputFor<T> = {
  [K in GetterKeys<T>]: T[K];
};

export type MergedGettersFor<T> = {
  [M in MergedModuleKeys<T>]: 
    T extends { modules: { [P in M]: infer E } } 
      ? GettersFor<E> 
      : never;
};

export type GettersFor<T> = 
  GetterInputFor<T> & 
  Flatten<MergedGettersFor<T>>;

export type GetterTree<T, R = T> = {
  [K in GetterKeys<T>]: (state: StateFor<T>, getters: GettersFor<T>, rootState: StateFor<R>, rootGetters: GettersFor<R>) => T[K];
};

export type MutationHandler<T, P> = [P] extends [never]
  ? (state: StateFor<T>) => void
  : (state: StateFor<T>, payload: P) => void;

export type MutationTree<T> = {
  [K in MutationKeys<T>]: T[K] extends Mutation<infer P>
    ? MutationHandler<T, P>
    : never;
};

export type ActionHandler<T, R, P, X> = [P] extends [never]
  ? (this: Store<T>, injectee: ActionContext<T, R>) => Promise<X>
  : (this: Store<T>, injectee: ActionContext<T, R>, payload: P) => Promise<X>;

export type ActionTree<T, R = T> = {
  [K in ActionKeys<T>]: T[K] extends Action<infer P, infer X>
    ? ( ActionHandler<T, R, P, X> | { root?: boolean; handler: ActionHandler<T, R, P, X> } )
    : never;
};


export type StoreOptions<T, R = T> = 
{
  plugins?: Plugin<T>[];
  strict?: boolean;
  devtools?: boolean;
} & OptionalProperties<ModuleTree<T, R>, {
  modules: ModuleTree<T, R>
}> & OptionalProperties<StateInputFor<T>, { 
  state: StateInput<T> 
}> & OptionalProperties<GetterTree<T, R>, { 
  getters: GetterTree<T, R> 
}> & OptionalProperties<MutationTree<T>, { 
  mutations: MutationTree<T> 
}> & OptionalProperties<ActionTree<T, R>, { 
  actions: ActionTree<T, R> 
}>;

export declare class Store<T>
{
  constructor(options: StoreOptions<T>);

  readonly state: StateFor<T>;
  readonly getters: GettersFor<T>;

  replaceState(state: StateFor<T>): void;

  commit: Commit<T, T>;
  dispatch: Dispatch<T, T>;

  subscribe (subscriber: MutationSubscriber<T>): () => void;
  subscribeAction (subscriber: ActionSubscriber<T> | ActionSubscribersObject<T>): () => void;
  watch<W> (getter: (state: StateFor<T>, getters: GettersFor<T>) => W, cb: (value: W, oldValue: W) => void, options?: WatchOptions): () => void;

  registerModule<N> (path: string, module: Module<N, T>, options?: ModuleOptions): void;
  registerModule<N> (path: string[], module: Module<N, T>, options?: ModuleOptions): void;

  unregisterModule (path: string): void;
  unregisterModule (path: string[]): void;

  hotUpdate (update: HotUpdate<T>): void;
}

export type HotUpdate<T> = {
  modules?: Partial<ModuleTree<T>>
} & OptionalProperties<GetterTree<T, T>, { 
  getters: Partial<GetterTree<T, T>>
}> & OptionalProperties<MutationTree<T>, { 
  mutations: Partial<MutationTree<T>>
}> & OptionalProperties<ActionTree<T, T>, { 
  actions: Partial<ActionTree<T, T>>
}>;

export interface ActionContext<T, R = T> 
{
  state: StateFor<T>;
  getters: GettersFor<T>;
  commit: Commit<T, R>;
  dispatch: Dispatch<T, R>;
  rootState: StateFor<R>;
  rootGetters: GettersFor<R>;
}


export type Plugin<T> = (store: Store<T>) => any;


export type MergedCommitFor<T, R = T> = {
  [M in MergedModuleKeys<T>]: 
    T extends { modules: { [P in M]: infer E } } 
      ? Commit<E, R> 
      : never;
};

export type CommitFor<T> = {
  <K extends MutationKeysNoPayload<T>> (type: K): void;
  <K extends MutationKeysWithPayload<T>> (type: K, payload: MutationPayload<T[K]>): void;
  <K extends MutationKeys<T>> (type: K, payload: MutationPayload<T[K]>, options: CommitOptionsThis): void;  
  <K extends MutationKeys<T>> (payloadWithType: { type: K, payload: MutationPayload<T[K]> }): void;
  <K extends MutationKeys<T>> (payloadWithType: { type: K, payload: MutationPayload<T[K]> }, options: CommitOptionsThis): void;

  <M, K, P> (type: MutationPath<M, T, K, P>, payload?: P): void;
  <M, K, P> (type: MutationPath<M, T, K, P>, payload: P | undefined, options: CommitOptionsThis): void;
  <M, K, P> (payloadWithType: { type: MutationPath<M, T, K, P>, payload: P }): void;
  <M, K, P> (payloadWithType: { type: MutationPath<M, T, K, P>, payload: P }, options: CommitOptionsThis): void;
};

export type MergedRootCommitFor<R> = {
  [M in MergedModuleKeys<R>]: 
    R extends { modules: { [P in M]: infer E } } 
      ? RootCommit<E> 
      : never;
};

export type RootCommitFor<R> = {
  <K extends MutationKeysRoot<R>> (type: K, payload: MutationPayloadRoot<R, K>, options: CommitOptionsRoot): void;
  <K extends MutationKeysRoot<R>> (payloadWithType: { type: K, payload: MutationPayload<R, K> }, options: CommitOptionsRoot): void;

  <M, K, P> (type: MutationPath<M, R, K, P>, payload: P | undefined, options: CommitOptionsRoot): void;
  <M, K, P> (payloadWithType: { type: MutationPath<M, R, K, P>, payload: P }, options: CommitOptionsRoot): void;
};

export type RootCommit<R> = RootCommitFor<R> & Intersect<MergedRootCommitFor<R>>;

export type Commit<T, R = T> = 
  CommitFor<T> &
  Intersect<MergedCommitFor<T, R>> &
  RootCommit<R>;


export interface CommitOptionsThis { silent?: boolean; root?: false }

export interface CommitOptionsRoot { silent?: boolean; root: true }


export type MergedDispatchFor<T, R = T> = {
  [M in MergedModuleKeys<T>]: 
    T extends { modules: { [P in M]: infer E } } 
      ? Dispatch<E, R> 
      : never;
};

export interface DispatchFor<T, R = T>
{
  <K extends ActionKeysNoPayload<T>> (type: K): Promise<ActionResult<T[K]>>;
  <K extends ActionKeysWithPayload<T>> (type: K, payload: ActionPayload<T[K]>): Promise<ActionResult<T[K]>>;
  <K extends ActionKeys<T>> (type: K, payload: ActionPayload<T[K]>, options: DispatchOptionsThis): Promise<ActionResult<T[K]>>;
  <K extends ActionKeysRoot<R>> (type: K, payload: ActionPayloadRoot<R, K>, options: DispatchOptionsRoot): Promise<ActionResultRoot<R, K>>;

  <M, K, P, V> (type: ActionPath<M, T, K, P, V>, payload?: P): Promise<V>;
  <M, K, P, V> (type: ActionPath<M, T, K, P, V>, payload: P | undefined, options: DispatchOptionsThis): Promise<V>;
  <M, K, P, V> (payloadWithType: { type: ActionPath<M, T, K, P, V>, payload: P }): Promise<V>;
  <M, K, P, V> (payloadWithType: { type: ActionPath<M, T, K, P, V>, payload: P }, options: DispatchOptionsThis): Promise<V>;
} 

export type RootDispatchFor<R> = {
  <K extends ActionKeysRoot<R>> (type: K, payload: ActionPayload<R[K]> | undefined, options: DispatchOptionsRoot): Promise<ActionResultRoot<R, K>>;
  <K extends ActionKeysRoot<R>> (payloadWithType: { type: K, payload: ActionPayload<R[K]> }, options: DispatchOptionsRoot): Promise<ActionResultRoot<R, K>>;

  <M, K, P, V> (type: ActionPath<M, R, K, P, V>, payload: P | undefined, options: DispatchOptionsRoot): Promise<V>;
  <M, K, P, V> (payloadWithType: { type: ActionPath<M, R, K, P, V>, payload: P }, options: DispatchOptionsRoot): Promise<V>;
};

export type Dispatch<T, R = T> = 
  DispatchFor<T, R> & 
  Intersect<MergedDispatchFor<T, R>> &
  RootDispatchFor<R>;

export interface DispatchOptionsThis { root?: false; }

export interface DispatchOptionsRoot { root: true; }


export type MutationSubscriber<T> = <K extends MutationKeys<T>> (mutation: { type: K, payload: MutationPayload<T[K]> }, state: StateFor<T>) => void;

export type ActionSubscriber<T> = <K extends ActionKeys<T>> (action: { type: K, payload: ActionPayload<T[K]> }, state: StateFor<T>) => void;

export interface ActionSubscribersObject<T> 
{
  before?: ActionSubscriber<T>;
  after?: ActionSubscriber<T>;
}

export type Module<T, R = T> =
     OptionalProperties<ModuleTree<T, R>, {
  modules: ModuleTree<T, R>;
}> & OptionalProperties<StateInputFor<T>, { 
  state: StateInput<T>
}> & OptionalProperties<GetterTree<T, R>, { 
  getters: GetterTree<T, R> 
}> & OptionalProperties<MutationTree<T>, { 
  mutations: MutationTree<T> 
}> & OptionalProperties<ActionTree<T, R>, { 
  actions: ActionTree<T, R> 
}> & OptionalProperties<GetNamespacedFor<T>, {
  namespaced: true
}>;

export interface ModuleOptions 
{
  preserveState?: boolean;
}

export type ModuleTree<T, R = T> = {
  [M in ModuleKeys<T>]: 
    T extends { modules: { [K in M]: infer E } }
      ? Module<E, R>
      : never;
}


export function path<T>(): Path<T, T>;

export class Path<T, S>
{
  module<M extends NamespacedModuleKeys<T>>(module: M): Path<GetModule<T, M>, S>;

  state<K extends StateKeys<T>>(name: K): { get(): StatePath<T, S, K, T[K]> };

  getter<K extends GetterKeys<T>>(name: K): { get(): GetterPath<T, S, K, T[K]> };

  mutation<K extends MutationKeys<T>>(name: K): { get(): MutationPath<T, S, K, MutationPayload<T[K]>> };

  action<K extends ActionKeys<T>>(name: K): { get(): ActionPath<T, S, K, ActionPayload<T[K]>, ActionResult<T[K]>> };

  get(): ModulePath<T, S>
}

export class StatePath<T, S, K, V> { faux: string }

export class GetterPath<T, S, K, V> { faux: string }

export class MutationPath<T, S, K, P> { faux: string }

export class ActionPath<T, S, K, P, R> { faux: string }

export class ModulePath<T, S> { faux: string }


export type StateGetter<T, R = any> = (this: CustomVue, state: StateFor<T>, getters: GettersFor<T>) => R; 

export type MutationIn<A extends any[], X, T, R = T> = (this: CustomVue, commit: Commit<T, R>, ...args: A) => X;

export type MutationOut<A extends any[], X> = (...args: A) => X;

export type ActionIn<A extends any[], X, T, R = T> = (this: CustomVue, dispatch: Dispatch<T, R>, ...args: A) => Promise<X>;

export type ActionOut<A extends any[], X> = (...args: A) => Promise<X>;

export declare function createHelpers<T, R = T>(): MappersWithNamespace<T, R>;

export declare function createNamespacedHelpers<T, R = T> (namespace: ModulePath<T, R>): Mappers<T, R>;

export interface Mappers<T, R> 
{
  mapState: MapperForState<T>
  mapGetters: MapperForGetters<T>
  mapMutations: MapperForMutations<T, R>
  mapActions: MapperForActions<T, R>
}

export interface MapperForGetters<T> 
{
  <K extends GetterKeys<T>>(keys: K[]): { [P in K]: () => T[P] };

  <K extends GetterKeys<T>, M extends { [key: string]: K }>(map: M): { 
    [P in keyof M]: () => M[P] extends K ? T[M[P]] : never 
  };
}

export interface MapperForState<T> 
{
  <K extends StateKeys<T>>(keys: K[]): { [P in K]: () => T[P] };

  <K extends StateKeys<T>, M extends { [key: string]: K | StateGetter<T> }>(map: M): {
    [P in keyof M]: () => M[P] extends K ? T[M[P]] : (
      M[P] extends StateGetter<T, infer R> ? R : never
    )
  }
}

export interface MapperForMutations<T, R = T> 
{
  <K extends MutationKeys<T>>(keys: K[]): { [P in K]: (payload: MutationPayload<T[P]>) => void };

  <K extends MutationKeys<T>, M extends { [key: string]: K | MutationIn<any[], any, T, R> }>(map: M): {
    [P in keyof M]: M[P] extends keyof T
      ? (payload: MutationPayload<T[M[P]]>) => void
      : (M[P] extends MutationIn<infer A, infer X, T, R> ? MutationOut<A, X> : never)
  };
}

export interface MapperForActions<T, R = T> 
{
  <K extends ActionKeys<T>>(keys: K[]): { [P in K]: (payload: ActionPayload<T[P]>) => Promise<ActionResult<T[P]>> };

  <K extends ActionKeys<T>, M extends { [key: string]: K | ActionIn<any[], any, T, R> }>(map: M): {
    [P in keyof M]: M[P] extends keyof T 
      ? (payload: ActionPayload<T[M[P]]>) => Promise<ActionResult<T[M[P]]>>
      : (M[P] extends ActionIn<infer A, infer X, T, R> ? ActionOut<A, X> : never)
  };
}

export interface MappersWithNamespace<T, R> 
{
  mapState: MapperForState<T> & MapperForStateWithNamespace<T>
  mapGetters: MapperForGetters<T> & MapperForGettersWithNamespace<T>
  mapMutations: MapperForMutations<T, R> & MapperForMutationsWithNamespace<T, R>
  mapActions: MapperForActions<T, R> & MapperForActionsWithNamespace<T, R>
}

export interface MapperForGettersWithNamespace<T> 
{
  <M, K extends GetterKeys<M>>(namespace: ModulePath<M, T>, keys: K[]): { [P in K]: () => M[P] };

  <M, K extends GetterKeys<M>, N extends { [key: string]: K }>(namespace: ModulePath<M, T>, map: N): { 
    [P in keyof N]: () => N[P] extends K ? M[N[P]] : never 
  };
}

export interface MapperForStateWithNamespace<T> 
{
  <M, K extends StateKeys<M>>(namespace: ModulePath<M, T>, keys: K[]): { [P in K]: () => M[P] };

  <M, K extends StateKeys<M>, N extends { [key: string]: K | StateGetter<M> }>(namespace: ModulePath<M, T>, map: N): {
    [P in keyof N]: () => N[P] extends K ? M[N[P]] : (
      N[P] extends StateGetter<T, infer R> ? R : never
    )
  }
}

export interface MapperForMutationsWithNamespace<T, R = T> 
{
  <K extends MutationKeys<T>>(namespace: string, keys: K[]): { [P in K]: (payload: MutationPayload<T[P]>) => void };
                     
  <K extends MutationKeys<T>, M extends { [key: string]: K | MutationIn<any[], any, T, R> }>(namespace: string, map: M): {
    [P in keyof M]: M[P] extends keyof T
      ? (payload: MutationPayload<T[M[P]]>) => void
      : (M[P] extends MutationIn<infer A, infer X, T, R> ? MutationOut<A, X> : never)
  };
}

export interface MapperForActionsWithNamespace<T, R = T> 
{
  <K extends ActionKeys<T>>(namespace: string, keys: K[]): { [P in K]: (payload: ActionPayload<T[P]>) => Promise<ActionResult<T[P]>> };
                     
  <K extends ActionKeys<T>, M extends { [key: string]: K | ActionIn<any[], any, T, R> }>(namespace: string, map: M): {
    [P in keyof M]: M[P] extends keyof T 
      ? (payload: ActionPayload<T[M[P]]>) => Promise<ActionResult<T[M[P]]>>
      : (M[P] extends ActionIn<infer A, infer X, T, R> ? ActionOut<A, X> : never)
  };
}

export const mapState: MapperForState<any> & MapperForStateWithNamespace<any>;

export const mapGetters: MapperForGetters<any> & MapperForGettersWithNamespace<any>;

export const mapMutations: MapperForMutations<any> & MapperForMutationsWithNamespace<any>;

export const mapActions: MapperForActions<any, any> & MapperForActionsWithNamespace<any, any>;

declare const _default: {
  Store: typeof Store,
  install: typeof install,
  mapState: typeof mapState,
  mapGetters: typeof mapGetters,
  mapMutations: typeof mapMutations,
  mapActions: typeof mapActions,
  createHelpers: typeof createHelpers,
  createNamespacedHelpers: typeof createNamespacedHelpers
};

export default _default;

import { WatchOptions } from 'vue';

export * from 'vuex';


export type Mutation<P, R = void> = (payload: P) => R;

export type Action<P, R> = (payload: P) => Promise<R>;

export type IfEquals<X, Y, A = X, B = never> =
  (<T>() => T extends X ? 1 : 2) extends
  (<T>() => T extends Y ? 1 : 2) ? A : B;

export type StateKeys<T> = {
  [P in keyof T]-?: T[P] extends Function ? never : IfEquals<{ [Q in P]: T[P] }, { -readonly [Q in P]: T[P] }, P>
}[keyof T];

export type GetterKeys<T> = {
  [P in keyof T]-?: IfEquals<{ [Q in P]: T[P] }, { -readonly [Q in P]: T[P] }, never, P>
}[keyof T];

export type MutationKeys<S> = {
  [K in keyof S]: S[K] extends Mutation<infer P, infer R> ? (R extends void ? K : never) : never;
}[keyof S];

export type ActionKeys<S> = {
  [K in keyof S]: S[K] extends Action<infer P, infer R> ? K : never;
}[keyof S];

export type StateFor<T> = {
  [K in StateKeys<T>]: T[K];
}

export type GettersFor<T> = {
  [K in GetterKeys<T>]: T[K];
};

export type GetterTree<T, R, S = StateFor<T>, G = GettersFor<T>, SR = StateFor<R>, GR = GettersFor<R>> = {
  [K in GetterKeys<T>]: (state: S, getters: G, rootState: SR, rootGetters: GR) => T[K];
}

export type MutationTree<T, S = StateFor<T>> = {
  [K in MutationKeys<T>]: T[K] extends Mutation<infer P>
    ? (state: S, payload: P) => void
    : never;
};

export type ActionHandler<T, R, P, X> = (injectee: ActionContext<T, R>, payload?: P) => Promise<X>;

export type ActionTree<T, R> = {
  [K in ActionKeys<T>]: T[K] extends Action<infer P, infer X>
    ? ( ActionHandler<T, R, P, X> | { root?: boolean; handler: ActionHandler<T, R, P, X> } )
    : never;
}

export type EmptyObject = { [key: string]: never };

export type OptionalProperties<T, R> = T extends EmptyObject ? {} : R;


export type StoreOptions<T, R, S = StateFor<T>> = 
{
  modules?: ModuleTree<R>;
  plugins?: Plugin<T>[];
  strict?: boolean;
  devtools?: boolean;
} & OptionalProperties<S, { 
  state: S | (() => S) 
}> & OptionalProperties<GetterTree<T, R>, { 
  getters: GetterTree<T, R> 
}> & OptionalProperties<MutationTree<T>, { 
  mutations: MutationTree<T> 
}> & OptionalProperties<ActionTree<T, R>, { 
  actions: ActionTree<T, R> 
}>;

export declare class Store<T, R = T, S = StateFor<T>, G = GettersFor<T>>
{
  constructor(options: StoreOptions<T, R>);

  readonly state: S;
  readonly getters: G;

  replaceState(state: S): void;

  commit: Commit<T, R>;
  dispatch: Dispatch<T, R>;

  subscribe (subscriber: MutationSubscriber<T>): () => void;
  subscribeAction (subscriber: ActionSubscriber<T> | ActionSubscribersObject<T>): () => void;
  watch<W> (getter: (state: S, getters: G) => W, cb: (value: W, oldValue: W) => void, options?: WatchOptions): () => void;

  registerModule<N> (path: string, module: Module<N, R>, options?: ModuleOptions): void;
  registerModule<N> (path: string[], module: Module<N, R>, options?: ModuleOptions): void;

  unregisterModule (path: string): void;
  unregisterModule (path: string[]): void;

  hotUpdate (options: {
    actions?: ActionTree<T, R>;
    mutations?: MutationTree<T>;
    getters?: GetterTree<T, R>;
    modules?: ModuleTree<R>;
  }): void;
}

export interface ActionContext<T, R> 
{
  state: StateFor<T>;
  getters: GettersFor<T>;
  commit: Commit<T, R>;
  dispatch: Dispatch<T, R>;
  rootState: StateFor<R>;
  rootGetters: GettersFor<R>;
}

export type Plugin<T> = (store: Store<T>) => any;

export type MutationPayload<M> = M extends Mutation<infer P> ? P : never;

export interface Commit<T, R> 
{
  <K extends MutationKeys<T>, P = MutationPayload<T[K]>> (type: K, payload?: P): void;
  <K extends MutationKeys<T>, P = MutationPayload<T[K]>> (type: K, payload: P | undefined, options: CommitOptionsThis): void;
  <K extends MutationKeys<R>, P = MutationPayload<R[K]>> (type: K, payload: P | undefined, options: CommitOptionsRoot): void;

  <K extends MutationKeys<T>, P = MutationPayload<T[K]>> (payloadWithType: { type: K, payload: P }): void;
  <K extends MutationKeys<T>, P = MutationPayload<T[K]>> (payloadWithType: { type: K, payload: P }, options: CommitOptionsThis): void;
  <K extends MutationKeys<R>, P = MutationPayload<R[K]>> (payloadWithType: { type: K, payload: P }, options: CommitOptionsRoot): void;
}

export interface CommitOptionsThis { silent?: boolean; root?: false }

export interface CommitOptionsRoot { silent?: boolean; root: true }

export type ActionPayload<A> = A extends Action<infer P, infer R> ? P : never;

export type ActionResult<A> = A extends Action<infer P, infer R> ? R : never;

export interface Dispatch<T, R>
{
  <K extends ActionKeys<T>, P = ActionPayload<T[K]>, R = ActionResult<T[K]>> (type: K, payload?: P): Promise<R>;
  <K extends ActionKeys<T>, P = ActionPayload<T[K]>, R = ActionResult<T[K]>> (type: K, payload: P | undefined, options: DispatchOptionsThis): Promise<R>;
  <K extends ActionKeys<R>, P = ActionPayload<R[K]>, X = ActionResult<R[K]>> (type: K, payload: P | undefined, options: DispatchOptionsRoot): Promise<X>;
  
  <K extends ActionKeys<T>, P = ActionPayload<T[K]>, R = ActionResult<T[K]>> (payloadWithType: { type: K, payload: P }): Promise<R>;
  <K extends ActionKeys<T>, P = ActionPayload<T[K]>, R = ActionResult<T[K]>> (payloadWithType: { type: K, payload: P }, options: DispatchOptionsThis): Promise<R>;
  <K extends ActionKeys<R>, P = ActionPayload<R[K]>, X = ActionResult<R[K]>> (payloadWithType: { type: K, payload: P }, options: DispatchOptionsRoot): Promise<X>;
} 

export interface DispatchOptionsThis { root?: false; }

export interface DispatchOptionsRoot { root: true; }

export type MutationSubscriber<T, S = StateFor<T>> = <K extends MutationKeys<T>, P = MutationPayload<T[K]>> (mutation: { type: K, payload?: P }, state: S) => void;

export type ActionSubscriber<T, S = StateFor<T>> = <K extends ActionKeys<T>, P = ActionPayload<T[K]>> (action: { type: K, payload?: P }, state: S) => void;

export interface ActionSubscribersObject<T> 
{
  before?: ActionSubscriber<T>;
  after?: ActionSubscriber<T>;
}

export interface Module<T, R, S = StateFor<T>> 
{
  namespaced?: boolean;
  state?: S | (() => S);
  getters?: GetterTree<T, R>;
  actions?: ActionTree<T, R>;
  mutations?: MutationTree<T>;
  modules?: ModuleTree<R>;
}

export interface ModuleOptions 
{
  preserveState?: boolean;
}

export interface ModuleTree<R> 
{
  [key: string]: Module<any, R>;
}

declare const _default: {
  Store: typeof Store;
};

export default _default;
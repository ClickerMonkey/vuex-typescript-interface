
import { Module, Store, path, createNamespacedHelpers, createHelpers, mapState, MergedCommitFor, StripNever, ObjKeyof, Lookup, Flatten, Commit, ActionPayload, ActionKeysNoPayload, MutationKeysNoPayload, MutationKeysWithPayload, MutationPayload, IsMutation, ActionTree, ActionKeys, ActionKeysRoot, ActionPayloadRoot, MutationKeysRoot, MutationPayloadRoot, IsNever } from './index';

interface MergedModule {
  merged: number;
  readonly mergedGetter: string;
  mergedMutation (merged: number): void;
  mergedAction (payload: boolean): Promise<void>;
  modules: {
    mergedmerged: MergedMergedModule
  }
}

interface MergedMergedModule {
  mergedmerged: number;
  readonly mergedmergedGetter: [number];
  mergedmergedMutation (mergedmerged: number): void;
}

interface SubModule {
  namespaced: true,
  sub: string;
  readonly subGetter: boolean;
  subMutation (sub: string): void;
  subAction (payload: string): Promise<boolean>;
  modules: {
    subsub: SubSubModule
  }
}

interface SubSubModule {
  namespaced: true,
  subsub: number[];
  readonly subsubGetter: number[];
  subsubMutation (subsub: number[]): void;
  subsubAction (payload: number[]): Promise<number>;
}

interface RootStore {
  root: string;
  readonly rootGetter: [string, string];
  rootMutation (payload: [string, string]): void;
  rootAction (): Promise<string>;
  rootActionExplodePayload (payload: {x: number, y: number}): Promise<boolean>;
  modules: {
    sub: SubModule;
    merged: MergedModule;
  };
}

const merged: Module<MergedModule, RootStore> = {
  state: () => ({
    merged: 42
  }),
  getters: {
    mergedGetter (state, getter, rootState, rootGetters) {
      state.merged;
      getter.mergedGetter;
      rootState.merged.merged;
      rootState.sub.sub;
      rootState.sub.subsub.subsub;
      rootState.root;
      rootGetters.mergedGetter;
      rootGetters.rootGetter;
      rootGetters.mergedmergedGetter;
      return state.merged + 's';
    }
  },
  mutations: {
    mergedMutation (state, merged: number) {
      state.merged = merged;
    }
  },
  actions: {
    async mergedAction (context, payload: boolean): Promise<void> {
      context.commit('mergedMutation', context.state.merged * 2);
      context.commit('rootMutation', ['x', 'a'], { root: true });
    }
  },
  modules: {
    mergedmerged: {
      state: {
        mergedmerged: 21
      },
      getters: {
        mergedmergedGetter (state, getter, rootState, rootGetter) {
          return [state.mergedmerged]
        }
      },
      mutations: {
        mergedmergedMutation (state, mergedmerged) {
          state.mergedmerged = mergedmerged;
        }
      }
    }
  }
};

const sub: Module<SubModule, RootStore> = {
  namespaced: true,
  state: {
    sub: 'Hello World!'
  },
  getters: {
    subGetter (state, getter, rootState, rootGetters): boolean {
      return state.sub.length > rootState.root.length;
    }
  },
  mutations: {
    subMutation (state, sub: string): void {
      state.sub = sub;
    }
  },
  actions: {
    async subAction (context, payload: string): Promise<boolean> {
      return true;
    }
  },
  modules: {
    subsub: {
      namespaced: true,
      state: {
        subsub: [1, 2]
      },
      getters: {
        subsubGetter (state, getter, rootState, rootGetter) {
          return state.subsub.map(x => x * 2);
        }
      },
      mutations: {
        subsubMutation(state, payload) {
          state.subsub = payload;
        }
      },
      actions: {
        async subsubAction(context): Promise<number> {
          return context.state.subsub.length;
        }
      }
    }
  }
};

const root = new Store<RootStore>({
  state: {
    root: 'Root'
  },
  getters: {
    rootGetter (state, getters): [string, string] {
      state.root;
      state.merged.merged;
      state.sub.sub;
      getters.mergedGetter;
      getters.mergedmergedGetter;
      return [state.root + state.merged.merged.toFixed(1), state.sub.sub];
    }
  },
  mutations: {
    rootMutation(state, [root, sub]): void {
      state.root = root;
      state.sub.sub = sub;
    }
  },
  actions: {
    async rootAction (context, payload): Promise<string> {
      context.commit('mergedMutation', 33);
      context.commit('mergedmergedMutation', 33);
      return context.state.root.toUpperCase();
    },
    async rootActionExplodePayload (context, { x, y }): Promise<boolean> {
      return x === y;
    }
  },
  modules: {
    sub,
    merged
  }
});


interface IAuthModule {
  logout (): Promise<void>;
  login (creds: {username: string, password: string}): Promise<boolean>;
}

interface IProfileModule {
  email: string | null;
  created_at: Date | null;
  readonly age: number;
  setProfile (profile?: { email: string, created_at: Date }): void;
}

interface IFullStore {
  user: string | null;
  setUser (user: string | null): void;
  modules: {
    auth: IAuthModule,
    profile: IProfileModule,
    named: {
      namespaced: true;
      variable: string;
      readonly length: number;
      setVariable (variable: string): void;
      unsetVariables (): void;
      loadVariable (from: boolean): Promise<string>;
      clearVariable (): Promise<void>;
    }
  }
};

const full = new Store<IFullStore>({
  state: {
    user: null
  },
  mutations: {
    setUser (state, user) {
      state.user = user;
      if (!user) {
        state.profile.email = null;
        state.profile.created_at = null;
      }
    }
  },
  modules: {
    auth: {
      actions: {
        async logout ({ commit }) {
          commit('setUser', null, { root: true });
          commit('setProfile', undefined, { root: true });
        },
        async login ({ commit }, creds) {
          // get user from API
          const user = { id: 'id', email: 'email', created_at: new Date() };

          commit('setUser', user.id, { root: true });
          commit('setProfile', user, { root: true });
          return true;
        }
      }
    },
    profile: {
      state: {
        email: null,
        created_at: null
      },
      getters: {
        age (state) {
          return state.created_at ? new Date().getFullYear() - state.created_at.getFullYear() : 0;
        }
      },
      mutations: {
        setProfile (state, profile) {
          state.email = profile ? profile.email : null;
          state.created_at = profile ? profile.created_at : null;
        }
      }
    },
    named: {
      namespaced: true,
      state: {
        variable: ''
      },
      getters: {
        length (state, getters) {
          return state.variable.length;
        }
      },
      mutations: {
        setVariable (state, value) {
          state.variable = value;
        },
        unsetVariables (state) {
          state.variable = '';
        }
      },
      actions: {
        async loadVariable (context, from) {
          return context.state.variable;
        },
        async clearVariable (context) {
          context.commit('setVariable', '');
        }
      }
    }
  }
});

type A = MutationKeysNoPayload<IProfileModule>; // none
type B = MutationKeysWithPayload<IProfileModule>; // setProfile
type C = MutationPayload<(profile?: { email: string, created_at: Date }) => void>;
type C2 = MutationPayload<(profile: { email: string, created_at: Date }) => void>;
type C3 = MutationPayload<() => void>;
type E = MutationPayload<() => void>;
type D = ActionPayload<(profile?: { email: string, created_at: Date }) => Promise<void>>;

type F1 = ((x: number) => void) extends (() => void) ? true : false; // false
type F2 = ((x?: number) => void) extends (() => void) ? true : false; // true
type F3 = ((x?: number) => void) extends ((x?: any) => void) ? true : false; // true
type F4 = ((x: number) => void) extends ((x?: any) => void) ? true : false; // true
type F5 = ((x: number) => void) extends ((x: any) => void) ? true : false; // true
type F6 = ((x?: number) => void) extends ((x: any) => void) ? true : false; // true
type F7 = (() => void) extends ((x: any) => void) ? true : false; // true
type F8 = (() => void) extends ((x: never) => void) ? true : false; // true
type F9 = [() => void] extends [(x: any) => void] ? true : false; // true
type FA = (() => void) extends ((x: number) => void) ? true : false; // true

type G1 = IsMutation<false, true, false>; // false
type G2 = IsMutation<() => void, true, false>; // true
type G3 = IsMutation<(x: any) => void, true, false>; // true
type G4 = IsMutation<(x?: any) => void, true, false>; // true
type G5 = IsMutation<(x?: any) => Promise<any>, true, false>; // false
type G6 = IsMutation<(x?: any) => Promise<any>, true, false>; // false

type H1 = ((x?: number) => void) extends ((p: infer P) => void) ? P : [never]; // number | undefined
type H2 = (() => void) extends ((p: infer P) => void) ? P : [never]; // unknown
type H3 = H2 extends unknown ? true : false; // true
type H4 = unknown extends 43 ? true : false; // false
type H5 = unknown extends H2 ? true : false; // true
type H6 = unknown extends any ? true : false; // true NO!
type HB = unknown extends null ? true : false; // false
type HC = unknown extends {} ? true : false; // false
type HD = unknown extends object ? true : false; // false
type H9 = any extends unknown ? true : false; // true
type H7 = unknown extends unknown ? true : false; // true
type H8 = unknown extends null ? true : false; // false
type HA = [unknown] extends [any] ? true : false; // true NO!
type GetArgs<T> = T extends (...args: infer A) => infer R ? A : never;
type HE = GetArgs<() => void>;
type HF = GetArgs<(x?: number, y?: boolean) => string>;
type HG = [] extends [] ? true : false; // true
type HH = [3] extends [] ? true : false; // false
type HI = [] extends [3] ? true : false; // false

type SingleItem<T, N = never> = T extends [infer E] ? E : N;
type HJ = SingleItem<[]>; // never
type HK = SingleItem<[3]>; // 3
type HL = SingleItem<[3, true]>; // never
type GetArg<T> = T extends (...any: infer A) => void ? (A extends ([infer E] | [(infer E)?]) ? E : never) : never;
type HM = GetArg<(x?: number) => void>;
type HN = GetArgs<(x?: number) => void>;
type HO = HN extends [(infer E)?] ? E : never;

type I0 = 42 extends never ? true : false; // false
type I1 = number extends never ? true : false; // false
type I2 = any extends never ? true : false; // boolean
type I3 = undefined extends never ? true : false; // false
type I4 = unknown extends never ? true : false; // false
type I5 = never extends never ? true : false; // true
type I6 = {} extends never ? true : false; // false
type I7 = null extends never ? true : false; // false

type J0 = never extends 42 ? true : false; // true
type J1 = never extends number ? true : false; // true
type J2 = never extends any ? true : false; // true
type J3 = never extends undefined ? true : false; // true
type J4 = never extends unknown ? true : false; // true
type J5 = never extends never ? true : false; // true
type J6 = never extends {} ? true : false; // true
type J7 = never extends null ? true : false; // true

type K4 = [undefined] extends [] ? true : false; // false


full.dispatch('login', undefined); // ERROR!
full.dispatch('login', { username: 'A', password: 'B'} );
full.dispatch('logout', 34); // ERROR!
full.dispatch('logout', undefined); // ERROR!
full.dispatch('logout');

full.commit('setUser', '543');
full.commit('setUser', undefined); // ERROR!
full.commit('setUser', 23); // ERROR!
full.commit('setUser', null);
full.commit('setProfile', undefined); 
full.commit('setProfile', { email: 'C', created_at: new Date() })
full.commit('setProfile'); // ERROR! 

                
const p = path<IFullStore>();
const m = p.module('named');
const mp = m.get()
const s = m.state('variable').get();
const g = m.getter('length').get();
const u = m.mutation('setVariable').get();
const a = m.action('loadVariable').get();

full.commit(u, 'newValue!');

const rr = full.dispatch(a, true);

const maps1 = createNamespacedHelpers(mp);
const m1 = maps1.mapState(['variable']);
const m2 = maps1.mapActions(['loadVariable', 'clearVariable']);
const m3 = maps1.mapGetters(['length']);
const m4 = maps1.mapMutations(['setVariable', 'unsetVariables']);

const maps2 = createHelpers<IFullStore>();
const n1 = maps2.mapState(['user']);
const n2 = maps2.mapState(mp, ['variable']);
const n3 = maps2.mapActions(mp, ['loadVariable']);
const n4 = mapState(mp, ['variable']);


import { Module, Store, path, createNamespacedHelpers, createHelpers, mapState } from './index';

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
        async subsubAction(context, payload): Promise<number> {
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
    async rootAction (context): Promise<string> {
      context.commit('mergedMutation', 33);
      context.commit('mergedmergedMutation', 33);
      return context.state.root.toUpperCase();
    }
  },
  modules: {
    sub,
    merged
  }
});



interface IFullStore {
  user: string | null;
  setUser (user: string | null): void;
  modules: {
    auth: {
      logout (): Promise<void>;
      login (creds: {username: string, password: string}): Promise<boolean>;
    },
    profile: {
      email: string | null;
      created_at: Date | null;
      readonly age: number;
      setProfile (profile?: { email: string, created_at: Date }): void;
    },
    named: {
      namespaced: true;
      variable: string;
      readonly length: number;
      setVariable (variable: string): void;
      loadVariable (from: boolean): Promise<string>;
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
        }
      },
      actions: {
        async loadVariable (context, from) {
          return context.state.variable;
        }
      }
    }
  }
});

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
const m2 = maps1.mapActions(['loadVariable']);
const m3 = maps1.mapGetters(['length']);
const m4 = maps1.mapMutations(['setVariable']);

const maps2 = createHelpers<IFullStore>();
const n1 = maps2.mapState(['user']);
const n2 = maps2.mapState(mp, ['variable']);
const n3 = maps2.mapActions(mp, ['loadVariable']);
const n4 = mapState(mp, ['variable']);
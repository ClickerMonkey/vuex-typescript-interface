## vuex-typescript-interface

Through the magic of Typescript, this library makes Vuex as typesafe as currently possible through a slightly new syntax. This library overrides the types that come with Vuex and provides a slightly altered version.

### Usage

```typescript
import Vuex from 'vuex-typescript-interface';

// store = new Vuex.Store like normal

Vue.use(Vuex); // works

new Vue({
  i18n,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
```

Normally you can pass a state to `new Vuex.Store<State>`. That has very limited use. With this library you can pass an interface like this to `Vuex.Store`:

```typescript
interface IStore
{
  // State (are non-function properties not marked readonly)
  firstName: string;
  lastName: string;
  // Getters (are non-function properties marked readonly)
  readonly fullName: string;
  // Mutations (functions return void and optionally accept payload)
  clearNames (): void;
  setFirstName (firstName: string): void;
  setLastName (lastName: string): void;
  // Actions (functions return Promise and optionally accept payload)
  loadName (url: string): Promise<{firstName: string, lastName: string}>
}

const store = new Vuex.Store<IStore>({
  // if state detected on IStore, this will be required and all state defined
  state: {
    firstName: '',
    lastName: '',
  },
  // if getters detected on IStore, this will be required and all getters defined
  getters: {
     // all arguments here are type safe, and the return type matches what was in IStore (string)
    fullName (state, getters, rootState, rootGetters) {
      return state.firstName + ' ' + state.lastName;
    }
  },
  // if mutations detected on IStore, this will be required and all mutations defined
  mutations: {
    // all arguments are type safe here as well
    clearNames (state) {
      state.firstName = state.lastName = '';
    },
    setFirstName (state, firstName) {
      state.firstName = firstName;
    },
    setLastName (state, lastName) {
      state.lastName = lastName
    }
  },
  // if actions detected on IStore, this will be required and all actions defined
  actions: {
    // all arguments are type safe here as well
    async loadName ({ commit }, url: string) {
      const response = await fetch(url);
      if (response.ok) {
        const names = await response.json();
        commit('setFirstName', names.firstName);
        commit('setLastName', names.lastName);
        return names;
      } else {
        throw 'Invalid URL';
      }
    }
  }
});

store.commit('clearNames'); // TS won't allow you to enter incorrect mutation names
store.commit('setFirstName', 'Phil'); // TS will only allow a string payload

// all types here as well!
const { firstName, lastName } = await store.dispatch('loadName', 'http://myname.com');
```

## Modules

It works with modules as well! (just not namespaced ones)

```typescript
import Vue, { Module } from 'vuex-typescript-interface';

interface IRoot {
  name: string;
  setName (name: string): void;
  modules: {
    child: IChild
  }
}
interface IChild {
  readonly lowerName: string;
  clearName (): Promise<void>
}

const child: Module<IChild, IRoot> = {
  getters: {
    lowerName (state, getters, rootState) { // talking to rootState is type safe
      return rootState.name.toLowerCase();
    }
  },
  actions: {
    async clearName ({ commit }) {
      commit('setName', '', { root: true }); // talking to root is type safe
    }
  }
};

const root = new Vuex.Store<IRoot>({
  state: {
    name: ''
  },
  mutations: {
    setName (state, name) {
      state.name = name;
    }
  },
  modules: { child } // you could pass objects here like normal
})
```

## Advanced Modules

When you add modules, you add a property to the state of the store. If you add sub modules, you add a property to the state of that module. All of this is accessible and type safe.

```typescript
// In this example we can use one big interface if we want.
interface IStore {
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
    }
  }
};

// Mmmm, delicious type safety everywhere.
// The new types require options when applicable, with the required properties and types.
const store = new Vuex.Store<IStore>({
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
    }
  }
});

```

## Mapping

To take advantage of that sweet type safety for mapping you can use `createNamespacedHelpers` or `createHelpers` (which is the only code this library adds to your code base, just a few bytes).

You should use `createHelpers` instead of `mapState`, `mapGetters`, `mapActions`, and `mapMutations` since propery types cannot be added to them at this time.

```typescript
// These functions are type safe (require valid state/getter/mutations/actions)
const { mapState, mapGetters, mapMutations, mapActions } = createNamespacedHelpers<IStore>('moduleNamespace');
const { mapState, mapGetters, mapMutations, mapActions } = createHelpers<IStore>();

mapState(['firstName'])
// { firstName (): string }

mapState({
  first: 'firstName',
  hasFullName (state, getters): boolean {
    return state.lastName && state.firstName;
  }
})
// { first (): string, hasFullName (): boolean }

mapGetters(['fullName'])
// { fullName (): string }

mapGetters({
  full: 'fullName'
})
// { full (): string }

mapMutations(['clearNames', 'setLastName'])
// { clearNames (): void, setLastName (string): void }

mapMutations({
  setFirst: 'setFirstName',
  setFirstLower (commit, name: string, lower: boolean = false): void {
    commit('setFirstName', lower ? name.toLowerCase() : name);
  }
})
// { setFirst (first): void, setFirstLower (name, lower?): void }

mapActions(['loadName'])
// { loadName (url): Promise<{firstName: string, lastName: string}> }

mapActions({
  load: 'loadName',
  async getFirst (dispatch, url: string, upper: boolean = false): Promise<string> {
    const { firstName } = await dispatch('loadName', url);
    return upper ? firstName.toUpperCase() : firstName;
  }
})
// { 
//   load (url): Promise<{firstName: string, lastName: string}>
//   getFirst (url, upper): Promise<string>
// }
```


### Restrictions
- Namespaced modules don't work.

## vuex-typescript-interface

Through the magic of Typescript, this library makes Vuex as typesafe as currently possible through a slightly new syntax. This library overrides the types that come with Vuex and provides a slightly altered version.

### Usage

```typescript
import Vuex from 'vuex-typescript-interface';

// new Vuex.Store like normal
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

It will work with modules as well!

```typescript
interface IRoot {
  name: string;
  setName (name: string): void;
}
interface IChild {
  readonly lowerName: string;
  clearName (): Promise<void>
}

const child: StoreOptions<IChild, IRoot> = {
  namespaced: false, // namespacing doesn't work however... 
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
  modules: { child } // you could pass objects here like normal, but it won't be able to detect types
})
```

### Possible Improvements
 - if mutation has an argument on T, try to enforce that argument always being passed to commit
 - if action has an argument on T, try to enforce that argument always being passed to dispatch
 - Namespacing doesn't work. Not sure we can do anything about this.
 - Need to work on mapX functions

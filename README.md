## vuex-typescript-interface

Through the magic of Typescript, this library makes Vuex as typesafe as currently possible through a slightly new syntax. This library overrides the types that come with Vuex and provides a slightly altered version.

[Test it out here in a Playground](https://www.typescriptlang.org/play/#src=%2F%2F%20Hover%20over%20the%20variables%20to%20see%20how%20the%20types%20are%20detected.%0D%0A%0D%0Ainterface%20IStore%0D%0A%7B%0D%0A%20%20%2F%2F%20State%20(are%20non-function%20properties%20not%20marked%20readonly)%0D%0A%20%20firstName%3A%20string%3B%0D%0A%20%20lastName%3A%20string%3B%0D%0A%20%20count%3A%20number%3B%0D%0A%20%20random%3A%20any%3B%0D%0A%20%20%2F%2F%20Getters%20(are%20non-function%20properties%20marked%20readonly)%0D%0A%20%20readonly%20fullName%3A%20string%3B%0D%0A%20%20readonly%20nameLength%3A%20number%3B%0D%0A%20%20%2F%2F%20Mutations%20(functions%20return%20void%20and%20optionally%20accept%20payload)%0D%0A%20%20clearNames%20()%3A%20void%3B%0D%0A%20%20setFirstName%20(firstName%3A%20string)%3A%20void%3B%0D%0A%20%20setLastName%20(lastName%3A%20string)%3A%20void%3B%0D%0A%20%20%2F%2F%20Actions%20(functions%20return%20Promise%20and%20optionally%20accept%20payload)%0D%0A%20%20loadName%20(url%3A%20string)%3A%20Promise%3C%7BfirstName%3A%20string%2C%20lastName%3A%20string%7D%3E%0D%0A%7D%0D%0A%0D%0A%2F%2F%20%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%0D%0A%2F%2F%20STORE%0D%0A%2F%2F%20%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%0D%0A%0D%0Aconst%20store%20%3D%20new%20Store%3CIStore%3E(%7B%0D%0A%20%20%2F%2F%20if%20state%20detected%20on%20IStore%2C%20this%20will%20be%20required%20and%20all%20state%20defined%0D%0A%20%20state%3A%20%7B%0D%0A%20%20%20%20firstName%3A%20''%2C%0D%0A%20%20%20%20lastName%3A%20''%2C%0D%0A%20%20%20%20count%3A%200%2C%0D%0A%20%20%20%20random%3A%20'meow'%0D%0A%20%20%7D%2C%0D%0A%20%20%2F%2F%20if%20getters%20detected%20on%20IStore%2C%20this%20will%20be%20required%20and%20all%20getters%20defined%0D%0A%20%20getters%3A%20%7B%0D%0A%20%20%20%20%20%2F%2F%20all%20arguments%20here%20are%20type%20safe%2C%20and%20the%20return%20type%20matches%20what%20was%20in%20IStore%20(string)%0D%0A%20%20%20%20fullName%20(state%2C%20getters%2C%20rootState%2C%20rootGetters)%20%7B%0D%0A%20%20%20%20%20%20return%20state.firstName%20%2B%20'%20'%20%2B%20state.lastName%3B%0D%0A%20%20%20%20%7D%2C%0D%0A%20%20%20%20nameLength(state%2C%20getters)%20%7B%0D%0A%20%20%20%20%20%20return%20getters.fullName.length%3B%0D%0A%20%20%20%20%7D%0D%0A%20%20%7D%2C%0D%0A%20%20%2F%2F%20if%20mutations%20detected%20on%20IStore%2C%20this%20will%20be%20required%20and%20all%20mutations%20defined%0D%0A%20%20mutations%3A%20%7B%0D%0A%20%20%20%20%2F%2F%20all%20arguments%20are%20type%20safe%20here%20as%20well%0D%0A%20%20%20%20clearNames%20(state)%20%7B%0D%0A%20%20%20%20%20%20state.firstName%20%3D%20state.lastName%20%3D%20''%3B%0D%0A%20%20%20%20%7D%2C%0D%0A%20%20%20%20setFirstName%20(state%2C%20firstName)%20%7B%0D%0A%20%20%20%20%20%20state.firstName%20%3D%20firstName%3B%0D%0A%20%20%20%20%7D%2C%0D%0A%20%20%20%20setLastName%20(state%2C%20lastName)%20%7B%0D%0A%20%20%20%20%20%20state.lastName%20%3D%20lastName%0D%0A%20%20%20%20%7D%0D%0A%20%20%7D%2C%0D%0A%20%20%2F%2F%20if%20actions%20detected%20on%20IStore%2C%20this%20will%20be%20required%20and%20all%20actions%20defined%0D%0A%20%20actions%3A%20%7B%0D%0A%20%20%20%20%2F%2F%20all%20arguments%20are%20type%20safe%20here%20as%20well%0D%0A%20%20%20%20async%20loadName%20(%7B%20commit%20%7D%2C%20url%3A%20string)%20%7B%0D%0A%20%20%20%20%20%20const%20response%20%3D%20await%20fetch(url)%3B%0D%0A%20%20%20%20%20%20if%20(response.ok)%20%7B%0D%0A%20%20%20%20%20%20%20%20const%20names%20%3D%20await%20response.json()%3B%0D%0A%20%20%20%20%20%20%20%20commit('setFirstName'%2C%20names.firstName)%3B%0D%0A%20%20%20%20%20%20%20%20commit('setLastName'%2C%20names.lastName)%3B%0D%0A%20%20%20%20%20%20%20%20return%20names%3B%0D%0A%20%20%20%20%20%20%7D%20else%20%7B%0D%0A%20%20%20%20%20%20%20%20throw%20'Invalid%20URL'%3B%0D%0A%20%20%20%20%20%20%7D%0D%0A%20%20%20%20%7D%0D%0A%20%20%7D%0D%0A%7D)%3B%0D%0A%0D%0Astore.commit('clearNames')%3B%20%2F%2F%20TS%20won't%20allow%20you%20to%20enter%20incorrect%20mutation%20names%0D%0Astore.commit('setFirstName'%2C%20'Phil')%3B%20%2F%2F%20TS%20will%20only%20allow%20a%20string%20payload%0D%0A%0D%0A%2F%2F%20all%20types%20here%20as%20well!%0D%0A(async%20()%20%3D%3E%20%7B%0D%0A%20%20const%20%7B%20firstName%2C%20lastName%20%7D%20%3D%20await%20store.dispatch('loadName'%2C%20'http%3A%2F%2Fmyname.com')%3B%0D%0A%7D)()%3B%0D%0A%0D%0A%2F%2F%20%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%0D%0A%2F%2F%20MAPPINGS%0D%0A%2F%2F%20%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%0D%0A%0D%0Aconst%20a%20%3D%20createNamespacedHelpers%3CIStore%3E('store')%3B%0D%0Aconst%20%7B%20mapState%2C%20mapGetters%2C%20mapMutations%2C%20mapActions%20%7D%20%3D%20a%3B%0D%0A%0D%0A%2F%2F%20STATE%0D%0Aconst%20d%20%3D%20mapState(%5B'firstName'%2C%20'count'%5D)%0D%0Aconst%20c%20%3D%20mapState(%7B%0D%0A%20%20alias%3A%20'firstName'%2C%0D%0A%20%20myCount%3A%20'count'%2C%0D%0A%20%20custom(state%2C%20getters)%3A%20boolean%20%7B%0D%0A%20%20%20%20return%20true%3B%0D%0A%20%20%7D%0D%0A%7D)%3B%0D%0A%0D%0Aconst%20cc%20%3D%20c.alias()%3B%0D%0Aconst%20cd%20%3D%20c.custom()%3B%0D%0Aconst%20ce%20%3D%20c.myCount()%3B%0D%0A%0D%0A%2F%2F%20GETTERS%0D%0Aconst%20e%20%3D%20mapGetters(%5B'fullName'%5D)%3B%0D%0Aconst%20f%20%3D%20mapGetters(%7B%0D%0A%20%20myFullname%3A%20'fullName'%2C%0D%0A%20%20myNameLength%3A%20'nameLength'%0D%0A%7D)%3B%0D%0A%0D%0Aconst%20fa%20%3D%20f.myFullname()%0D%0Aconst%20fb%20%3D%20f.myNameLength()%3B%0D%0A%0D%0A%2F%2F%20MUTATIONS%0D%0Aconst%20g%20%3D%20mapMutations(%5B'clearNames'%2C%20'setLastName'%5D)%3B%0D%0Aconst%20h%20%3D%20mapMutations(%7B%0D%0A%20%20mySetFirstName%3A%20'setFirstName'%2C%0D%0A%20%20custom(commit%2C%20a%3A%20number%2C%20b%3A%20string)%3A%20void%20%7B%0D%0A%20%20%20%20commit('setFirstName'%2C%20b)%3B%0D%0A%20%20%7D%0D%0A%7D)%3B%0D%0A%0D%0Ag.clearNames(%7B%7D)%3B%0D%0Ag.setLastName('lastName')%3B%0D%0Ah.mySetFirstName('hello%20world!')%3B%0D%0Ah.custom(4%2C%20'4')%3B%0D%0A%0D%0A%2F%2F%20ACTIONS%0D%0Aconst%20i%20%3D%20mapActions(%5B'loadName'%5D)%3B%0D%0Aconst%20j%20%3D%20mapActions(%7B%0D%0A%20%20myLoad%3A%20'loadName'%2C%0D%0A%20%20async%20customLoad(dispatch%2C%20url%3A%20string)%3A%20Promise%3Cstring%3E%20%7B%0D%0A%20%20%20%20const%20%7B%20firstName%20%7D%20%3D%20await%20dispatch('loadName'%2C%20url)%3B%0D%0A%20%20%20%20return%20firstName%3B%0D%0A%20%20%7D%0D%0A%7D)%0D%0A%0D%0Aconst%20ja%20%3D%20i.loadName('hello%20world')%3B%0D%0Aconst%20jb%20%3D%20j.myLoad('google.com')%3B%0D%0Aconst%20jc%20%3D%20j.customLoad('www.google.com')%3B%0D%0A%0D%0A%0D%0A%2F%2F%20Definitions%20from%20vuex-typescript-interface%0D%0A%0D%0A%0D%0Aimport%20Vue%2C%20%7B%20WatchOptions%20%7D%20from%20'vue'%3B%0D%0A%0D%0Aimport%20%7B%20install%2C%20mapState%2C%20mapMutations%2C%20mapGetters%2C%20mapActions%20%7D%20from%20'vuex'%3B%0D%0A%0D%0Aexport%20*%20from%20'vuex'%3B%0D%0A%0D%0A%0D%0A%0D%0Aexport%20type%20CustomVue%20%3D%20Vue%20%26%20%7B%20%5Bkey%3A%20string%5D%3A%20any%20%7D%3B%0D%0A%0D%0Aexport%20type%20Mutation%3CP%2C%20R%20%3D%20void%3E%20%3D%20(payload%3A%20P)%20%3D%3E%20R%3B%0D%0A%0D%0Aexport%20type%20MutationPayload%3CM%3E%20%3D%20M%20extends%20Mutation%3Cinfer%20P%3E%20%3F%20P%20%3A%20never%3B%0D%0A%0D%0Aexport%20type%20Action%3CP%2C%20R%2C%20I%20%3D%20Promise%3CR%3E%3E%20%3D%20(payload%3A%20P)%20%3D%3E%20I%3B%0D%0A%0D%0Aexport%20type%20ActionPayload%3CA%3E%20%3D%20A%20extends%20Action%3Cinfer%20P%2C%20infer%20R%3E%20%3F%20P%20%3A%20never%3B%0D%0A%0D%0Aexport%20type%20ActionResult%3CA%3E%20%3D%20A%20extends%20Action%3Cinfer%20P%2C%20infer%20R%3E%20%3F%20R%20%3A%20never%3B%0D%0A%0D%0A%0D%0A%0D%0Aexport%20type%20EmptyObject%20%3D%20%7B%20%5Bkey%3A%20string%5D%3A%20never%20%7D%3B%0D%0A%0D%0Aexport%20type%20OptionalProperties%3CT%2C%20R%3E%20%3D%20T%20extends%20EmptyObject%20%3F%20%7B%7D%20%3A%20R%3B%0D%0A%0D%0Aexport%20type%20IfEquals%3CX%2C%20Y%2C%20A%20%3D%20X%2C%20B%20%3D%20never%3E%20%3D%0D%0A%20%20(%3CT%3E()%20%3D%3E%20T%20extends%20X%20%3F%201%20%3A%202)%20extends%0D%0A%20%20(%3CT%3E()%20%3D%3E%20T%20extends%20Y%20%3F%201%20%3A%202)%20%3F%20A%20%3A%20B%3B%0D%0A%0D%0Aexport%20type%20Resolvable%3CT%3E%20%3D%20T%20%7C%20(()%20%3D%3E%20T)%3B%0D%0A%0D%0A%0D%0A%0D%0Aexport%20type%20StateKeys%3CT%3E%20%3D%20%7B%0D%0A%20%20%5BP%20in%20keyof%20T%5D-%3F%3A%20T%5BP%5D%20extends%20Function%20%3F%20never%20%3A%20IfEquals%3C%7B%20%5BQ%20in%20P%5D%3A%20T%5BP%5D%20%7D%2C%20%7B%20-readonly%20%5BQ%20in%20P%5D%3A%20T%5BP%5D%20%7D%2C%20P%3E%0D%0A%7D%5Bkeyof%20T%5D%3B%0D%0A%0D%0Aexport%20type%20GetterKeys%3CT%3E%20%3D%20%7B%0D%0A%20%20%5BP%20in%20keyof%20T%5D-%3F%3A%20IfEquals%3C%7B%20%5BQ%20in%20P%5D%3A%20T%5BP%5D%20%7D%2C%20%7B%20-readonly%20%5BQ%20in%20P%5D%3A%20T%5BP%5D%20%7D%2C%20never%2C%20P%3E%0D%0A%7D%5Bkeyof%20T%5D%3B%0D%0A%0D%0Aexport%20type%20MutationKeys%3CS%3E%20%3D%20%7B%0D%0A%20%20%5BK%20in%20keyof%20S%5D%3A%20S%5BK%5D%20extends%20Mutation%3Cinfer%20P%2C%20infer%20R%3E%20%3F%20(R%20extends%20void%20%3F%20K%20%3A%20never)%20%3A%20never%3B%0D%0A%7D%5Bkeyof%20S%5D%3B%0D%0A%0D%0Aexport%20type%20ActionKeys%3CS%3E%20%3D%20%7B%0D%0A%20%20%5BK%20in%20keyof%20S%5D%3A%20S%5BK%5D%20extends%20Action%3Cinfer%20P%2C%20infer%20R%2C%20infer%20I%3E%20%3F%20(I%20extends%20Promise%3Cany%3E%20%3F%20%20K%20%3A%20never)%20%3A%20never%3B%0D%0A%7D%5Bkeyof%20S%5D%3B%0D%0A%0D%0Aexport%20type%20StateFor%3CT%3E%20%3D%20%7B%0D%0A%20%20%5BK%20in%20StateKeys%3CT%3E%5D%3A%20T%5BK%5D%3B%0D%0A%7D%0D%0A%0D%0Aexport%20type%20GettersFor%3CT%3E%20%3D%20%7B%0D%0A%20%20%5BK%20in%20GetterKeys%3CT%3E%5D%3A%20T%5BK%5D%3B%0D%0A%7D%3B%0D%0A%0D%0Aexport%20type%20GetterTree%3CT%2C%20R%20%3D%20T%3E%20%3D%20%7B%0D%0A%20%20%5BK%20in%20GetterKeys%3CT%3E%5D%3A%20(state%3A%20StateFor%3CT%3E%2C%20getters%3A%20GettersFor%3CT%3E%2C%20rootState%3A%20StateFor%3CR%3E%2C%20rootGetters%3A%20GettersFor%3CR%3E)%20%3D%3E%20T%5BK%5D%3B%0D%0A%7D%0D%0A%0D%0Aexport%20type%20MutationTree%3CT%3E%20%3D%20%7B%0D%0A%20%20%5BK%20in%20MutationKeys%3CT%3E%5D%3A%20T%5BK%5D%20extends%20Mutation%3Cinfer%20P%3E%0D%0A%20%20%20%20%3F%20(state%3A%20StateFor%3CT%3E%2C%20payload%3A%20P)%20%3D%3E%20void%0D%0A%20%20%20%20%3A%20never%3B%0D%0A%7D%3B%0D%0A%0D%0Aexport%20type%20ActionHandler%3CT%2C%20R%2C%20P%2C%20X%3E%20%3D%20(injectee%3A%20ActionContext%3CT%2C%20R%3E%2C%20payload%3F%3A%20P)%20%3D%3E%20Promise%3CX%3E%3B%0D%0A%0D%0Aexport%20type%20ActionTree%3CT%2C%20R%20%3D%20T%3E%20%3D%20%7B%0D%0A%20%20%5BK%20in%20ActionKeys%3CT%3E%5D%3A%20T%5BK%5D%20extends%20Action%3Cinfer%20P%2C%20infer%20X%3E%0D%0A%20%20%20%20%3F%20(%20ActionHandler%3CT%2C%20R%2C%20P%2C%20X%3E%20%7C%20%7B%20root%3F%3A%20boolean%3B%20handler%3A%20ActionHandler%3CT%2C%20R%2C%20P%2C%20X%3E%20%7D%20)%0D%0A%20%20%20%20%3A%20never%3B%0D%0A%7D%0D%0A%0D%0A%0D%0Aexport%20type%20StoreOptions%3CT%2C%20R%20%3D%20T%3E%20%3D%20%0D%0A%7B%0D%0A%20%20modules%3F%3A%20ModuleTree%3CR%3E%3B%0D%0A%20%20plugins%3F%3A%20Plugin%3CT%3E%5B%5D%3B%0D%0A%20%20strict%3F%3A%20boolean%3B%0D%0A%20%20devtools%3F%3A%20boolean%3B%0D%0A%7D%20%26%20OptionalProperties%3CStateFor%3CT%3E%2C%20%7B%20%0D%0A%20%20state%3A%20Resolvable%3CStateFor%3CT%3E%3E%20%0D%0A%7D%3E%20%26%20OptionalProperties%3CGetterTree%3CT%2C%20R%3E%2C%20%7B%20%0D%0A%20%20getters%3A%20GetterTree%3CT%2C%20R%3E%20%0D%0A%7D%3E%20%26%20OptionalProperties%3CMutationTree%3CT%3E%2C%20%7B%20%0D%0A%20%20mutations%3A%20MutationTree%3CT%3E%20%0D%0A%7D%3E%20%26%20OptionalProperties%3CActionTree%3CT%2C%20R%3E%2C%20%7B%20%0D%0A%20%20actions%3A%20ActionTree%3CT%2C%20R%3E%20%0D%0A%7D%3E%3B%0D%0A%0D%0Aexport%20declare%20class%20Store%3CT%2C%20R%20%3D%20T%3E%0D%0A%7B%0D%0A%20%20constructor(options%3A%20StoreOptions%3CT%2C%20R%3E)%3B%0D%0A%0D%0A%20%20readonly%20state%3A%20StateFor%3CT%3E%3B%0D%0A%20%20readonly%20getters%3A%20GettersFor%3CT%3E%3B%0D%0A%0D%0A%20%20replaceState(state%3A%20StateFor%3CT%3E)%3A%20void%3B%0D%0A%0D%0A%20%20commit%3A%20Commit%3CT%2C%20R%3E%3B%0D%0A%20%20dispatch%3A%20Dispatch%3CT%2C%20R%3E%3B%0D%0A%0D%0A%20%20subscribe%20(subscriber%3A%20MutationSubscriber%3CT%3E)%3A%20()%20%3D%3E%20void%3B%0D%0A%20%20subscribeAction%20(subscriber%3A%20ActionSubscriber%3CT%3E%20%7C%20ActionSubscribersObject%3CT%3E)%3A%20()%20%3D%3E%20void%3B%0D%0A%20%20watch%3CW%3E%20(getter%3A%20(state%3A%20StateFor%3CT%3E%2C%20getters%3A%20GettersFor%3CT%3E)%20%3D%3E%20W%2C%20cb%3A%20(value%3A%20W%2C%20oldValue%3A%20W)%20%3D%3E%20void%2C%20options%3F%3A%20WatchOptions)%3A%20()%20%3D%3E%20void%3B%0D%0A%0D%0A%20%20registerModule%3CN%3E%20(path%3A%20string%2C%20module%3A%20Module%3CN%2C%20R%3E%2C%20options%3F%3A%20ModuleOptions)%3A%20void%3B%0D%0A%20%20registerModule%3CN%3E%20(path%3A%20string%5B%5D%2C%20module%3A%20Module%3CN%2C%20R%3E%2C%20options%3F%3A%20ModuleOptions)%3A%20void%3B%0D%0A%0D%0A%20%20unregisterModule%20(path%3A%20string)%3A%20void%3B%0D%0A%20%20unregisterModule%20(path%3A%20string%5B%5D)%3A%20void%3B%0D%0A%0D%0A%20%20hotUpdate%20(update%3A%20HotUpdate%3CT%2C%20R%3E)%3A%20void%3B%0D%0A%7D%0D%0A%0D%0Aexport%20type%20HotUpdate%3CT%2C%20R%20%3D%20T%3E%20%3D%0D%0A%7B%0D%0A%20%20modules%3F%3A%20ModuleTree%3CR%3E%3B%0D%0A%7D%20%26%20OptionalProperties%3CGetterTree%3CT%2C%20R%3E%2C%20%7B%20%0D%0A%20%20getters%3A%20Partial%3CGetterTree%3CT%2C%20R%3E%3E%0D%0A%7D%3E%20%26%20OptionalProperties%3CMutationTree%3CT%3E%2C%20%7B%20%0D%0A%20%20mutations%3A%20Partial%3CMutationTree%3CT%3E%3E%0D%0A%7D%3E%20%26%20OptionalProperties%3CActionTree%3CT%2C%20R%3E%2C%20%7B%20%0D%0A%20%20actions%3A%20Partial%3CActionTree%3CT%2C%20R%3E%3E%0D%0A%7D%3E%3B%0D%0A%0D%0Aexport%20interface%20ActionContext%3CT%2C%20R%20%3D%20T%3E%20%0D%0A%7B%0D%0A%20%20state%3A%20StateFor%3CT%3E%3B%0D%0A%20%20getters%3A%20GettersFor%3CT%3E%3B%0D%0A%20%20commit%3A%20Commit%3CT%2C%20R%3E%3B%0D%0A%20%20dispatch%3A%20Dispatch%3CT%2C%20R%3E%3B%0D%0A%20%20rootState%3A%20StateFor%3CR%3E%3B%0D%0A%20%20rootGetters%3A%20GettersFor%3CR%3E%3B%0D%0A%7D%0D%0A%0D%0Aexport%20type%20Plugin%3CT%3E%20%3D%20(store%3A%20Store%3CT%3E)%20%3D%3E%20any%3B%0D%0A%0D%0Aexport%20interface%20Commit%3CT%2C%20R%20%3D%20T%3E%20%0D%0A%7B%0D%0A%20%20%3CK%20extends%20MutationKeys%3CT%3E%3E%20(type%3A%20K%2C%20payload%3F%3A%20MutationPayload%3CT%5BK%5D%3E)%3A%20void%3B%0D%0A%20%20%3CK%20extends%20MutationKeys%3CT%3E%3E%20(type%3A%20K%2C%20payload%3A%20MutationPayload%3CT%5BK%5D%3E%20%7C%20undefined%2C%20options%3A%20CommitOptionsThis)%3A%20void%3B%0D%0A%20%20%3CK%20extends%20MutationKeys%3CR%3E%3E%20(type%3A%20K%2C%20payload%3A%20MutationPayload%3CR%5BK%5D%3E%20%7C%20undefined%2C%20options%3A%20CommitOptionsRoot)%3A%20void%3B%0D%0A%0D%0A%20%20%3CK%20extends%20MutationKeys%3CT%3E%3E%20(payloadWithType%3A%20%7B%20type%3A%20K%2C%20payload%3A%20MutationPayload%3CT%5BK%5D%3E%20%7D)%3A%20void%3B%0D%0A%20%20%3CK%20extends%20MutationKeys%3CT%3E%3E%20(payloadWithType%3A%20%7B%20type%3A%20K%2C%20payload%3A%20MutationPayload%3CT%5BK%5D%3E%20%7D%2C%20options%3A%20CommitOptionsThis)%3A%20void%3B%0D%0A%20%20%3CK%20extends%20MutationKeys%3CR%3E%3E%20(payloadWithType%3A%20%7B%20type%3A%20K%2C%20payload%3A%20MutationPayload%3CR%5BK%5D%3E%20%7D%2C%20options%3A%20CommitOptionsRoot)%3A%20void%3B%0D%0A%7D%0D%0A%0D%0Aexport%20interface%20CommitOptionsThis%20%7B%20silent%3F%3A%20boolean%3B%20root%3F%3A%20false%20%7D%0D%0A%0D%0Aexport%20interface%20CommitOptionsRoot%20%7B%20silent%3F%3A%20boolean%3B%20root%3A%20true%20%7D%0D%0A%0D%0Aexport%20interface%20Dispatch%3CT%2C%20R%20%3D%20T%3E%0D%0A%7B%0D%0A%20%20%3CK%20extends%20ActionKeys%3CT%3E%3E%20(type%3A%20K%2C%20payload%3F%3A%20ActionPayload%3CT%5BK%5D%3E)%3A%20Promise%3CActionResult%3CT%5BK%5D%3E%3E%3B%0D%0A%20%20%3CK%20extends%20ActionKeys%3CT%3E%3E%20(type%3A%20K%2C%20payload%3A%20ActionPayload%3CT%5BK%5D%3E%20%7C%20undefined%2C%20options%3A%20DispatchOptionsThis)%3A%20Promise%3CActionResult%3CT%5BK%5D%3E%3E%3B%0D%0A%20%20%3CK%20extends%20ActionKeys%3CR%3E%3E%20(type%3A%20K%2C%20payload%3A%20ActionPayload%3CR%5BK%5D%3E%20%7C%20undefined%2C%20options%3A%20DispatchOptionsRoot)%3A%20Promise%3CActionResult%3CR%5BK%5D%3E%3E%3B%0D%0A%20%20%0D%0A%20%20%3CK%20extends%20ActionKeys%3CT%3E%3E%20(payloadWithType%3A%20%7B%20type%3A%20K%2C%20payload%3A%20ActionPayload%3CT%5BK%5D%3E%20%7D)%3A%20Promise%3CActionResult%3CT%5BK%5D%3E%3E%3B%0D%0A%20%20%3CK%20extends%20ActionKeys%3CT%3E%3E%20(payloadWithType%3A%20%7B%20type%3A%20K%2C%20payload%3A%20ActionPayload%3CT%5BK%5D%3E%20%7D%2C%20options%3A%20DispatchOptionsThis)%3A%20Promise%3CActionResult%3CT%5BK%5D%3E%3E%3B%0D%0A%20%20%3CK%20extends%20ActionKeys%3CR%3E%3E%20(payloadWithType%3A%20%7B%20type%3A%20K%2C%20payload%3A%20ActionPayload%3CR%5BK%5D%3E%20%7D%2C%20options%3A%20DispatchOptionsRoot)%3A%20Promise%3CActionResult%3CR%5BK%5D%3E%3E%3B%0D%0A%7D%20%0D%0A%0D%0Aexport%20interface%20DispatchOptionsThis%20%7B%20root%3F%3A%20false%3B%20%7D%0D%0A%0D%0Aexport%20interface%20DispatchOptionsRoot%20%7B%20root%3A%20true%3B%20%7D%0D%0A%0D%0Aexport%20type%20MutationSubscriber%3CT%3E%20%3D%20%3CK%20extends%20MutationKeys%3CT%3E%3E%20(mutation%3A%20%7B%20type%3A%20K%2C%20payload%3F%3A%20MutationPayload%3CT%5BK%5D%3E%20%7D%2C%20state%3A%20StateFor%3CT%3E)%20%3D%3E%20void%3B%0D%0A%0D%0Aexport%20type%20ActionSubscriber%3CT%3E%20%3D%20%3CK%20extends%20ActionKeys%3CT%3E%3E%20(action%3A%20%7B%20type%3A%20K%2C%20payload%3F%3A%20ActionPayload%3CT%5BK%5D%3E%20%7D%2C%20state%3A%20StateFor%3CT%3E)%20%3D%3E%20void%3B%0D%0A%0D%0Aexport%20interface%20ActionSubscribersObject%3CT%3E%20%0D%0A%7B%0D%0A%20%20before%3F%3A%20ActionSubscriber%3CT%3E%3B%0D%0A%20%20after%3F%3A%20ActionSubscriber%3CT%3E%3B%0D%0A%7D%0D%0A%0D%0Aexport%20type%20Module%3CT%2C%20R%20%3D%20T%3E%20%3D%0D%0A%7B%0D%0A%20%20namespaced%3F%3A%20boolean%3B%0D%0A%20%20modules%3F%3A%20ModuleTree%3CR%3E%3B%0D%0A%7D%20%26%20OptionalProperties%3CStateFor%3CT%3E%2C%20%7B%20%0D%0A%20%20state%3A%20Resolvable%3CStateFor%3CT%3E%3E%0D%0A%7D%3E%20%26%20OptionalProperties%3CGetterTree%3CT%2C%20R%3E%2C%20%7B%20%0D%0A%20%20getters%3A%20GetterTree%3CT%2C%20R%3E%20%0D%0A%7D%3E%20%26%20OptionalProperties%3CMutationTree%3CT%3E%2C%20%7B%20%0D%0A%20%20mutations%3A%20MutationTree%3CT%3E%20%0D%0A%7D%3E%20%26%20OptionalProperties%3CActionTree%3CT%2C%20R%3E%2C%20%7B%20%0D%0A%20%20actions%3A%20ActionTree%3CT%2C%20R%3E%20%0D%0A%7D%3E%3B%0D%0A%0D%0Aexport%20interface%20ModuleOptions%20%0D%0A%7B%0D%0A%20%20preserveState%3F%3A%20boolean%3B%0D%0A%7D%0D%0A%0D%0Aexport%20interface%20ModuleTree%3CR%3E%20%0D%0A%7B%0D%0A%20%20%5Bkey%3A%20string%5D%3A%20Module%3Cany%2C%20R%3E%3B%0D%0A%7D%0D%0A%0D%0A%0D%0Aexport%20type%20StateGetter%3CT%2C%20R%20%3D%20any%3E%20%3D%20(this%3A%20CustomVue%2C%20state%3A%20StateFor%3CT%3E%2C%20getters%3A%20GettersFor%3CT%3E)%20%3D%3E%20R%3B%20%0D%0A%0D%0Aexport%20type%20MutationIn%3CA%20extends%20any%5B%5D%2C%20X%2C%20T%2C%20R%20%3D%20T%3E%20%3D%20(this%3A%20CustomVue%2C%20commit%3A%20Commit%3CT%2C%20R%3E%2C%20...args%3A%20A)%20%3D%3E%20X%3B%0D%0A%0D%0Aexport%20type%20MutationOut%3CA%20extends%20any%5B%5D%2C%20X%3E%20%3D%20(...args%3A%20A)%20%3D%3E%20X%3B%0D%0A%0D%0Aexport%20type%20ActionIn%3CA%20extends%20any%5B%5D%2C%20X%2C%20T%2C%20R%20%3D%20T%3E%20%3D%20(this%3A%20CustomVue%2C%20dispatch%3A%20Dispatch%3CT%2C%20R%3E%2C%20...args%3A%20A)%20%3D%3E%20Promise%3CX%3E%3B%0D%0A%0D%0Aexport%20type%20ActionOut%3CA%20extends%20any%5B%5D%2C%20X%3E%20%3D%20(...args%3A%20A)%20%3D%3E%20Promise%3CX%3E%3B%0D%0A%0D%0A%0D%0A%0D%0Aexport%20declare%20function%20createNamespacedHelpers%3CT%2C%20R%20%3D%20T%3E%20(namespace%3A%20string)%3A%20Mappers%3CT%2C%20R%3E%3B%0D%0A%0D%0Aexport%20interface%20Mappers%3CT%2C%20R%3E%20%0D%0A%7B%0D%0A%20%20mapState%3A%20MapperForState%3CT%3E%0D%0A%20%20mapGetters%3A%20MapperForGetters%3CT%3E%0D%0A%20%20mapMutations%3A%20MapperForMutations%3CT%2C%20R%3E%0D%0A%20%20mapActions%3A%20MapperForActions%3CT%2C%20R%3E%0D%0A%7D%0D%0A%0D%0Aexport%20interface%20MapperForGetters%3CT%3E%20%0D%0A%7B%0D%0A%20%20%3CK%20extends%20GetterKeys%3CT%3E%2C%20U%20%3D%20%7B%20%5BP%20in%20K%5D%3A%20()%20%3D%3E%20T%5BP%5D%20%7D%3E(keys%3A%20K%5B%5D)%3A%20U%3B%0D%0A%20%20%3CK%20extends%20GetterKeys%3CT%3E%2C%20M%20extends%20%7B%20%5Bkey%3A%20string%5D%3A%20K%20%7D%3E(map%3A%20M)%3A%20%7B%20%5BP%20in%20keyof%20M%5D%3A%20()%20%3D%3E%20M%5BP%5D%20extends%20K%20%3F%20T%5BM%5BP%5D%5D%20%3A%20never%20%7D%3B%0D%0A%7D%0D%0A%0D%0Aexport%20interface%20MapperForState%3CT%3E%20%0D%0A%7B%0D%0A%20%20%3CK%20extends%20StateKeys%3CT%3E%2C%20U%20%3D%20%7B%20%5BP%20in%20K%5D%3A%20()%20%3D%3E%20T%5BP%5D%20%7D%3E(keys%3A%20K%5B%5D)%3A%20U%3B%0D%0A%20%20%3CK%20extends%20StateKeys%3CT%3E%2C%20M%20extends%20%7B%20%5Bkey%3A%20string%5D%3A%20K%20%7C%20StateGetter%3CT%3E%20%7D%3E(map%3A%20M)%3A%20%7B%0D%0A%20%20%20%20%5BP%20in%20keyof%20M%5D%3A%20()%20%3D%3E%20M%5BP%5D%20extends%20K%20%3F%20T%5BM%5BP%5D%5D%20%3A%20(%0D%0A%20%20%20%20%20%20M%5BP%5D%20extends%20StateGetter%3CT%2C%20infer%20R%3E%20%3F%20R%20%3A%20never%0D%0A%20%20%20%20)%0D%0A%20%20%7D%0D%0A%7D%0D%0A%0D%0Aexport%20interface%20MapperForMutations%3CT%2C%20R%20%3D%20T%3E%20%0D%0A%7B%0D%0A%20%20%3CK%20extends%20MutationKeys%3CT%3E%2C%20U%20%3D%20%7B%20%5BP%20in%20K%5D%3A%20(payload%3F%3A%20MutationPayload%3CT%5BP%5D%3E)%20%3D%3E%20void%20%7D%3E(keys%3A%20K%5B%5D)%3A%20U%3B%0D%0A%20%20%3CK%20extends%20MutationKeys%3CT%3E%2C%20M%20extends%20%7B%20%5Bkey%3A%20string%5D%3A%20K%20%7C%20MutationIn%3Cany%5B%5D%2C%20any%2C%20T%2C%20R%3E%20%7D%3E(map%3A%20M)%3A%20%7B%0D%0A%20%20%20%20%5BP%20in%20keyof%20M%5D%3A%20M%5BP%5D%20extends%20keyof%20T%0D%0A%20%20%20%20%20%20%3F%20(payload%3F%3A%20MutationPayload%3CT%5BM%5BP%5D%5D%3E)%20%3D%3E%20void%0D%0A%20%20%20%20%20%20%3A%20(M%5BP%5D%20extends%20MutationIn%3Cinfer%20A%2C%20infer%20X%2C%20T%2C%20R%3E%20%3F%20MutationOut%3CA%2C%20X%3E%20%3A%20never)%0D%0A%20%20%7D%3B%0D%0A%7D%0D%0A%0D%0Aexport%20interface%20MapperForActions%3CT%2C%20R%20%3D%20T%3E%20%0D%0A%7B%0D%0A%20%20%3CK%20extends%20ActionKeys%3CT%3E%2C%20U%20%3D%20%7B%20%5BP%20in%20K%5D%3A%20(payload%3F%3A%20ActionPayload%3CT%5BP%5D%3E)%20%3D%3E%20Promise%3CActionResult%3CT%5BP%5D%3E%3E%20%7D%3E(keys%3A%20K%5B%5D)%3A%20U%3B%0D%0A%20%20%3CK%20extends%20ActionKeys%3CT%3E%2C%20M%20extends%20%7B%20%5Bkey%3A%20string%5D%3A%20K%20%7C%20ActionIn%3Cany%5B%5D%2C%20any%2C%20T%2C%20R%3E%20%7D%3E(map%3A%20M)%3A%20%7B%0D%0A%20%20%20%20%5BP%20in%20keyof%20M%5D%3A%20M%5BP%5D%20extends%20keyof%20T%20%0D%0A%20%20%20%20%20%20%3F%20(payload%3F%3A%20ActionPayload%3CT%5BM%5BP%5D%5D%3E)%20%3D%3E%20Promise%3CActionResult%3CT%5BM%5BP%5D%5D%3E%3E%0D%0A%20%20%20%20%20%20%3A%20(M%5BP%5D%20extends%20ActionIn%3Cinfer%20A%2C%20infer%20X%2C%20T%2C%20R%3E%20%3F%20ActionOut%3CA%2C%20X%3E%20%3A%20never)%0D%0A%20%20%7D%3B%0D%0A%7D%0D%0A%0D%0A%2F%2F%20This%20function%20is%20defined%20in%20index.js%20and%20is%20needed%20for%20typesafe%20mappers.%0D%0Aexport%20declare%20function%20createHelpers%3CT%2C%20R%20%3D%20T%3E()%3A%20MappersWithNamespace%3CT%2C%20R%3E%3B%0D%0A%0D%0Aexport%20interface%20MappersWithNamespace%3CT%2C%20R%3E%20%0D%0A%7B%0D%0A%20%20mapState%3A%20MapperForState%3CT%3E%20%26%20MapperForStateWithNamespace%3CT%3E%0D%0A%20%20mapGetters%3A%20MapperForGetters%3CT%3E%20%26%20MapperForGettersWithNamespace%3CT%3E%0D%0A%20%20mapMutations%3A%20MapperForMutations%3CT%2C%20R%3E%20%26%20MapperForMutationsWithNamespace%3CT%2C%20R%3E%0D%0A%20%20mapActions%3A%20MapperForActions%3CT%2C%20R%3E%20%26%20MapperForActionsWithNamespace%3CT%2C%20R%3E%0D%0A%7D%0D%0A%0D%0Aexport%20interface%20MapperForGettersWithNamespace%3CT%3E%20%0D%0A%7B%0D%0A%20%20%3CK%20extends%20GetterKeys%3CT%3E%2C%20U%20%3D%20%7B%20%5BP%20in%20K%5D%3A%20()%20%3D%3E%20T%5BP%5D%20%7D%3E(namespace%3A%20string%2C%20keys%3A%20K%5B%5D)%3A%20U%3B%0D%0A%20%20%3CK%20extends%20GetterKeys%3CT%3E%2C%20M%20extends%20%7B%20%5Bkey%3A%20string%5D%3A%20K%20%7D%3E(namespace%3A%20string%2C%20map%3A%20M)%3A%20%7B%20%5BP%20in%20keyof%20M%5D%3A%20()%20%3D%3E%20M%5BP%5D%20extends%20K%20%3F%20T%5BM%5BP%5D%5D%20%3A%20never%20%7D%3B%0D%0A%7D%0D%0A%0D%0Aexport%20interface%20MapperForStateWithNamespace%3CT%3E%20%0D%0A%7B%0D%0A%20%20%3CK%20extends%20StateKeys%3CT%3E%2C%20U%20%3D%20%7B%20%5BP%20in%20K%5D%3A%20()%20%3D%3E%20T%5BP%5D%20%7D%3E(namespace%3A%20string%2C%20keys%3A%20K%5B%5D)%3A%20U%3B%0D%0A%20%20%3CK%20extends%20StateKeys%3CT%3E%2C%20M%20extends%20%7B%20%5Bkey%3A%20string%5D%3A%20K%20%7C%20StateGetter%3CT%3E%20%7D%3E(namespace%3A%20string%2C%20map%3A%20M)%3A%20%7B%0D%0A%20%20%20%20%5BP%20in%20keyof%20M%5D%3A%20()%20%3D%3E%20M%5BP%5D%20extends%20K%20%3F%20T%5BM%5BP%5D%5D%20%3A%20(%0D%0A%20%20%20%20%20%20M%5BP%5D%20extends%20StateGetter%3CT%2C%20infer%20R%3E%20%3F%20R%20%3A%20never%0D%0A%20%20%20%20)%0D%0A%20%20%7D%0D%0A%7D%0D%0A%0D%0Aexport%20interface%20MapperForMutationsWithNamespace%3CT%2C%20R%20%3D%20T%3E%20%0D%0A%7B%0D%0A%20%20%3CK%20extends%20MutationKeys%3CT%3E%2C%20U%20%3D%20%7B%20%5BP%20in%20K%5D%3A%20(payload%3F%3A%20MutationPayload%3CT%5BP%5D%3E)%20%3D%3E%20void%20%7D%3E(namespace%3A%20string%2C%20keys%3A%20K%5B%5D)%3A%20U%3B%0D%0A%20%20%3CK%20extends%20MutationKeys%3CT%3E%2C%20M%20extends%20%7B%20%5Bkey%3A%20string%5D%3A%20K%20%7C%20MutationIn%3Cany%5B%5D%2C%20any%2C%20T%2C%20R%3E%20%7D%3E(namespace%3A%20string%2C%20map%3A%20M)%3A%20%7B%0D%0A%20%20%20%20%5BP%20in%20keyof%20M%5D%3A%20M%5BP%5D%20extends%20keyof%20T%0D%0A%20%20%20%20%20%20%3F%20(payload%3F%3A%20MutationPayload%3CT%5BM%5BP%5D%5D%3E)%20%3D%3E%20void%0D%0A%20%20%20%20%20%20%3A%20(M%5BP%5D%20extends%20MutationIn%3Cinfer%20A%2C%20infer%20X%2C%20T%2C%20R%3E%20%3F%20MutationOut%3CA%2C%20X%3E%20%3A%20never)%0D%0A%20%20%7D%3B%0D%0A%7D%0D%0A%0D%0Aexport%20interface%20MapperForActionsWithNamespace%3CT%2C%20R%20%3D%20T%3E%20%0D%0A%7B%0D%0A%20%20%3CK%20extends%20ActionKeys%3CT%3E%2C%20U%20%3D%20%7B%20%5BP%20in%20K%5D%3A%20(payload%3F%3A%20ActionPayload%3CT%5BP%5D%3E)%20%3D%3E%20Promise%3CActionResult%3CT%5BP%5D%3E%3E%20%7D%3E(namespace%3A%20string%2C%20keys%3A%20K%5B%5D)%3A%20U%3B%0D%0A%20%20%3CK%20extends%20ActionKeys%3CT%3E%2C%20M%20extends%20%7B%20%5Bkey%3A%20string%5D%3A%20K%20%7C%20ActionIn%3Cany%5B%5D%2C%20any%2C%20T%2C%20R%3E%20%7D%3E(namespace%3A%20string%2C%20map%3A%20M)%3A%20%7B%0D%0A%20%20%20%20%5BP%20in%20keyof%20M%5D%3A%20M%5BP%5D%20extends%20keyof%20T%20%0D%0A%20%20%20%20%20%20%3F%20(payload%3F%3A%20ActionPayload%3CT%5BM%5BP%5D%5D%3E)%20%3D%3E%20Promise%3CActionResult%3CT%5BM%5BP%5D%5D%3E%3E%0D%0A%20%20%20%20%20%20%3A%20(M%5BP%5D%20extends%20ActionIn%3Cinfer%20A%2C%20infer%20X%2C%20T%2C%20R%3E%20%3F%20ActionOut%3CA%2C%20X%3E%20%3A%20never)%0D%0A%20%20%7D%3B%0D%0A%7D%0D%0A%0D%0A%0D%0Adeclare%20const%20_default%3A%20%7B%0D%0A%20%20Store%3A%20typeof%20Store%3B%0D%0A%20%20install%3A%20typeof%20install%3B%0D%0A%20%20mapState%3A%20typeof%20mapState%2C%0D%0A%20%20mapMutations%3A%20typeof%20mapMutations%2C%0D%0A%20%20mapGetters%3A%20typeof%20mapGetters%2C%0D%0A%20%20mapActions%3A%20typeof%20mapActions%2C%0D%0A%20%20createNamespacedHelpers%3A%20typeof%20createNamespacedHelpers%2C%0D%0A%7D%3B%0D%0A%0D%0Aexport%20default%20_default%3B)

### Usage

```typescript
import Vuex from 'vuex-typescript-interface';

// new Vuex.Store like normal

Vue.use(Vuex); // works

// ONLY GOTCHA
new Vue({
  i18n,
  router,
  store: store as any, // you have to cast it as any here, since the Vuex store is not compatible with mine - and it can't be overriden.
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

## Mapping

To take advantage of that sweet type safety for mapping you can use `createNamespacedHelpers` or `createHelpers` (which is the only code this library adds to your code base, just a few bytes).

You should use `createHelpers` instead of `mapState`, `mapGetters`, `mapActions`, and `mapMutations` since propery types cannot be added to them at this time.

```typescript
// These functions require valid state/getter/mutations/actions.
const { mapState, mapGetters, mapMutations, mapActions } = createNamespacedHelpers<IStore>('storeNamespace');
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
- A mutation/action could require an argument, but at the moment it will appear optional.
- Namespaced mutations/actions/mappings don't work on root state.

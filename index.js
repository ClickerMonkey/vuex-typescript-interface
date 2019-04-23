
import { Store, install, mapState, mapActions, mapGetters, mapMutations, createNamespacedHelpers } from 'vuex';

export { mapState, mapActions, mapGetters, mapMutations, createNamespacedHelpers };

export function createHelpers() 
{
  return { mapState, mapActions, mapGetters, mapMutations };
}

export default {
  Store,
  install,
  mapState,
  mapMutations,
  mapGetters,
  mapActions,
  createHelpers,
  createNamespacedHelpers
};
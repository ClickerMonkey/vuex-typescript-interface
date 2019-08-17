
import { 
  Store, 
  install, 
  mapState as originalMapState, 
  mapActions as originalMapActions, 
  mapGetters as originalMapGetters, 
  mapMutations as originalMapMutations, 
  createNamespacedHelpers 
} from 'vuex';


function remap(mapper)
{
  return function(namespaceOrMappings, mappings) {
    return namespaceOrMappings instanceof Path 
      ? mapper(namespaceOrMappings.get(), mappings)
      : mapper(namespaceOrMappings, mappings);
  };
}

const mapState = remap(originalMapState);

const mapGetters = remap(originalMapGetters);

const mapMutations = remap(originalMapMutations);

const mapActions = remap(originalMapActions);


export { mapState, mapActions, mapGetters, mapMutations, createNamespacedHelpers };


export function createHelpers() 
{
  return { mapState, mapActions, mapGetters, mapMutations };
}


export class Path
{
  parent;
  section;

  constructor(parent = null, section = '') {
    this.parent = parent;
    this.section = section;
  }
  
  get() {
    return this.parent ? this.parent.get() + '/' + this.section : this.section;
  }
}

export class ModulePath extends Path
{
  module(name) {
    return new ModulePath(this, name);
  }

  state(name) {
    return new EndPath(this, name).get();
  }

  getter(name) {
    return new EndPath(this, name).get();
  }

  mutation(name) {
    return new EndPath(this, name).get();
  }

  action(name) {
    return new EndPath(this, name).get();
  }
}

class EndPath extends Path
{
  
}

export function path()
{
  return new ModulePath();
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
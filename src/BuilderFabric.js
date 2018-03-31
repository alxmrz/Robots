define(['../src/Builder'], function(Builder){
  class BuilderFabric {
    getBuilder(x,y, ctx) {
      return new Builder(x,y,ctx);
    }
  }
  return BuilderFabric;
});

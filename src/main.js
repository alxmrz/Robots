requirejs(['../src/Application', '../src/Scene', '../src/BuilderFabric'], function(Application, Scene, BuilderFabric){
  (new Application(new Scene(new BuilderFabric))).main();
})

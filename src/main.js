requirejs(['../src/Application', '../src/Scene', '../src/SuperFabric', '../src/EventRegister'],
function(Application, Scene, SuperFabric, EventRegister){
  (new Application(new Scene(new SuperFabric), new EventRegister())).main();
})

requirejs(['../src/Application', '../src/Scene', '../src/ObjectFactory', '../src/EventRegister'],
function(Application, Scene, ObjectFactory, EventRegister){
  (new Application(new Scene(new ObjectFactory), new EventRegister())).main();
})

 QUnit.config.autostart = false;
  requirejs([
    "ApplicationTest",
    "SceneTest",
    "BuilderFabricTest"
  ], function(){
    QUnit.start();
  });

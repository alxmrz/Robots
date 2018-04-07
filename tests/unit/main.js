 QUnit.config.autostart = false;
  requirejs([
    "ApplicationTest",
    "SceneTest",
    "SuperFabricTest"
  ], function(){
    QUnit.start();
  });

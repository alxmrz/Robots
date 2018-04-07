 QUnit.config.autostart = false;
  requirejs([
    "ApplicationTest",
    "SceneTest",
    "SuperFabricTest",
    "PointTest"
  ], function(){
    QUnit.start();
  });

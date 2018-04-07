 QUnit.config.autostart = false;
  requirejs([
    "ApplicationTest",
    "SceneTest",
    "SuperFabricTest",
    "PointTest",
    "WallTest"
  ], function(){
    QUnit.start();
  });

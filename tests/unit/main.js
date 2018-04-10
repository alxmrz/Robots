 QUnit.config.autostart = false;
  requirejs([
    "ApplicationTest",
    "SceneTest",
    "ObjectFactoryTest",
    "PointTest",
    "WallTest",
    "LevelTest"
  ], function(){
    QUnit.start();
  });

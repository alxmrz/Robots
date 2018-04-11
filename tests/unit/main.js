 QUnit.config.autostart = false;
  requirejs([
    "ApplicationTest",
    "SceneTest",
    "ObjectFactoryTest",
    "PointTest",
    "WallTest",
    "LevelTest",
    "BuilderTest"
  ], function(){
    QUnit.start();
  });

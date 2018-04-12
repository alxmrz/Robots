 QUnit.config.autostart = false;
  requirejs([
    "ApplicationTest",
    "SceneTest",
    "ObjectFactoryTest",
    "PointTest",
    "WallTest",
    "LevelTest",
    "BuilderTest",
    "SceneObjectTest"
  ], function(){
    QUnit.start();
  });

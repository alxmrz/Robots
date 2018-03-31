
   QUnit.config.autostart = false;
    requirejs([
      "ApplicationTest",
      "SceneTest"
    ], function(){
      QUnit.start();
    });

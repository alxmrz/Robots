<template>
  <div>
        <div style="float:right;">
        <p>Actions:</p>
        <div>
            <input type="button" id="buildWall" value="Строить стену" onclick="alert('Недоступно!')"/>
        </div>
        <div>
            <pre>
            <p id="objectInfo"></p>
        </pre>
        </div>
        </div>
        <div>
        mouseX<input type="text" id="mouseX"> mouseY<input type="text" id="mouseY">
        </div>
        <canvas id="canvasGrid" width="1075" height="625" style="position:absolute;z-index:1">
        Your browser does not support canvas technology!
        </canvas>
        <canvas id="canvas" width="1075" height="625" style="position:absolute;z-index:2">
        Your browser does not support canvas technology!
        </canvas>

        <div style="display:none;">
            <img src="images/warcraft2orcs.png" alt="orcs" id="sourceOrcs"/>
            <img src="images/warcraft2humans.png" alt="humans" id="source"/>
            <img src="images/partwall.png" alt="humans" id="wall"/>
            <img src="images/gatesFront.png" alt="humans" id="gate"/>
            <img src="images/warcraft2unithuman.png" alt="humans" id="unit"/>
        </div>
    </div>
</template>

<script>
import Application from "../Application";
import Scene from "../Scene";
import ObjectFactory from "../ObjectFactory";
import EventRegister from "../EventRegister";

export default {
    mounted: function() {
        this.game = (new Application( new Scene( new ObjectFactory ), new EventRegister() ) )
        this.game.main();
    }
}
</script>

<style>

</style>
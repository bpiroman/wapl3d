var canvas = document.getElementById("renderCanvas");

var startRenderLoop = function (engine, canvas) {
    engine.runRenderLoop(function () {
        if (sceneToRender && sceneToRender.activeCamera) {
            sceneToRender.render();
        }
    });
}

var engine = null;
var scene = null;
var sceneToRender = null;
var createDefaultEngine = function() { return new BABYLON.Engine(canvas, true, { preserveDrawingBuffer: true, stencil: true,  disableWebGL2Support: false}); };
const createScene = function () {
const scene = new BABYLON.Scene(engine);

const camera = new BABYLON.ArcRotateCamera("Camera", BABYLON.Tools.ToRadians(-90), BABYLON.Tools.ToRadians(0), 1000, BABYLON.Vector3.Zero());
camera.attachControl(canvas, true);
const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(1, 1, 0));

// Ground
const groundMaterial = new BABYLON.StandardMaterial("ground");
groundMaterial.diffuseTexture = new BABYLON.Texture("./textures/WAPL_2022_1m.jpg");

const ground = BABYLON.MeshBuilder.CreateGroundFromHeightMap("ground", "textures/dem_2022_trial9.png", {width:785, height:576, subdivisions: 500, maxHeight: 100});

ground.material = new BABYLON.StandardMaterial('mat', scene);
ground.material.specularColor = new BABYLON.Color3(0.2, 0.2, 0.2);
ground.material = groundMaterial;

return scene;
}
        window.initFunction = async function() {
            
            
            var asyncEngineCreation = async function() {
                try {
                return createDefaultEngine();
                } catch(e) {
                console.log("the available createEngine function failed. Creating the default engine instead");
                return createDefaultEngine();
                }
            }

            window.engine = await asyncEngineCreation();
if (!engine) throw 'engine should not be null.';
startRenderLoop(engine, canvas);
window.scene = createScene();};
initFunction().then(() => {sceneToRender = scene                    
});

// Resize
window.addEventListener("resize", function () {
    engine.resize();
});


/* ###################################### GLOBAL VARIABLES ######################################*/

//var startTime, object, mouse;
//var objects = []

//Three.js rendering variables
var renderer, scene, camera;

var ambientLight, ground, dirLight;

// Drawing variables
// If a line is currently being drawn this variable tracks it
var currentLine;
// The current animation queue
var animationQueue;
// If a arc is currently being drawn this variable tracks it
var currentArc;
// This variable maintains the amount of segments drawn of a currently drawing line or arc
var drawCount;
//The drawing heads most recent position
var currentPosition;
//The drawing heads destination at any given time
var updatedPosition;
// If the printing head is in drawing mode or not
var isDrawing;

//Colors
var lineColor =  0xff0000; //red, for now everything is red but we will begin to use color to better effect later on

// The mouse object
var mouse;

var isAnimating; // Set to true if we want each line to be drawn animatedly

var points = []; // List of lists of lists - determines points of current visualization

// CUBE PATH EXAMPLE
points.push([[0,0,0], [10,0,0], [10,10,0], [0,10,0], [0,0,0], [0,0,10], [10,0,10], [10,0,0]]);
points.push([[0,0,10], [0,10,10], [0,10,0], [10,10,0], [10,10,10], [0,10,10]]);
points.push([[10,10,10], [10,0,10]]);
for (var t = 0; t <= 10; ){
    var side = [];
    for (var c = 0; c <= 10; ){
        side.push([t,c,0]);
        side.push([t,c,10]);
        c += 0.5;
    }
    points.push(side);
    t += 0.5;
}


/* ########################################## FUNCTIONS ##########################################*/

/* Low Level Functions */

// Start drawing.
// All movements of the drawing head will generate lines
function startDrawing(){
    isDrawing = true;
}

// Stop drawing.
// No movements of the drawing head will generate lines
function stopDrawing(){
    isDrawing = false;
}

// This function draws a line from currentPosition to point.
// The drawing of the line is animated
function queueAnimatedLine(point) {
    if (isDrawing) {
        // geometry
        var geometry = new THREE.BufferGeometry();

        // attributes
        var positions = new Float32Array(MAX_POINTS * 3); // 3 vertices per point

        geometry.addAttribute( 'position', new THREE.BufferAttribute(positions, 3));
        geometry.setDrawRange(0, drawCount);

        // material
        var material = new THREE.LineBasicMaterial( { color: lineColor, linewidth: 20 } );

        // currentLine
        animationQueue.push([QUEUE_MEMBERS.LINE, new THREE.Line(geometry,  material), point]);
    } else {
        queueMoveHead(point);
    }

}

// This function moves the drawing head from currentPosition to point without drawing anything as it moves
function queueMoveHead(point){
    animationQueue.push([QUEUE_MEMBERS.MOVE, point]);
}

// This function draws a line from currentPosition to point.
// The drawing of the line is not animated
function queueInstantLine(point){
    if (DEBUG_PRINT) console.log('Drawing Permanent Line');

    if (isDrawing){
        var material = new THREE.LineBasicMaterial({ color: lineColor, linewidth: 50 });
        var geometry = new THREE.Geometry();
        animationQueue.push([QUEUE_MEMBERS.INSTANT_LINE, new THREE.Line(geometry,  material), point]);
    } else {
        queueMoveHead(point);
    }

}

//This function takes in a list of lists, where each list is a path
//It draws lines along each point on an individual path
//It starts its next drawing at the beginning of a point in a given point list
function path(pointList, animated){
    //pointList : the parent list of all subpaths
    for (var i = 0; i < pointList.length; i++){
        //currentPath: the currentPath starting at the first point on this path
        for (var p = 0; p < pointList[i].length; p++){
            if (p == 1){
                startDrawing();
            }
            if (animated) queueAnimatedLine({x: pointList[i][p][0], y: pointList[i][p][1],
                z: pointList[i][p][2]})
            else queueInstantLine({x: pointList[i][p][0], y: pointList[i][p][1],
                z: pointList[i][p][2]})
        }
        stopDrawing();
    }
}

//Clear the visualization of any lines.
//Reset the set of points.
function clear(){
    points = [];
    while (scene.children.length > 0) {
        scene.children.forEach(function(object){
            scene.remove(object);
        });
    }
    scene.add(ground);
    scene.add(ambientLight);
    scene.add(dirLight);
}

/* Three.js functions */
function render() {
    renderer.render(scene, camera);
}

// animate
function animate() {
    //begin animation loop
    requestAnimationFrame(animate);

    //update current position on display
    $("#curr_x").html(currentPosition.x);
    $("#curr_y").html(currentPosition.y);
    $("#curr_z").html(currentPosition.z);

    if (isAnimating){
        //console.log('isAnimating, drawCount: ', drawCount);
        drawCount ++;
        try{
            currentLine.geometry.setDrawRange(0, drawCount);
        } catch (err) {
        }
    }
    if (drawCount == MAX_POINTS || !isAnimating) {
        drawCount = 1;
        copyPoint(currentPosition, updatedPosition);
        if (animationQueue.length != 0){
            var nextAnimation = animationQueue.shift();
            if (nextAnimation[0] == QUEUE_MEMBERS.LINE){
                console.log('starting line');
                currentLine = nextAnimation[1];
                scene.add(currentLine);
                isAnimating = true;
                updatePositions(nextAnimation[2]);
            } else if (nextAnimation[0] == QUEUE_MEMBERS.INSTANT_LINE){
                currentLine = nextAnimation[1];
                var origin = new THREE.Vector3();
                copyPoint(origin, currentPosition)
                currentLine.geometry.vertices.push(origin);
                if (DEBUG_PRINT) console.log('origin: ', currentPosition);
                currentLine.geometry.vertices.push(nextAnimation[2]);
                if (DEBUG_PRINT) console.log('destination: ', nextAnimation[2]);
                scene.add(currentLine);
                isAnimating = false;
                copyPoint(currentPosition, nextAnimation[2]);
                copyPoint(updatedPosition, currentPosition);
            } else if (nextAnimation[0] == QUEUE_MEMBERS.MOVE){
                copyPoint(currentPosition, nextAnimation[1]);
                copyPoint(updatedPosition, currentPosition);
            }

        } else {
            currentLine = null;
            isAnimating = false;
        }

    }
    render();
}


/* Helpers */

// Helper to queueAnimatedLine
function updatePositions(point) {
    try {
        var positions = currentLine.geometry.attributes.position.array;
    } catch (err){
        return;
    }

    updatedPosition.x = currentPosition.x;
    updatedPosition.y = currentPosition.y;
    updatedPosition.z = currentPosition.z;
    var index = 0;

    var x_step = (point.x - currentPosition.x)/MAX_POINTS;
    var y_step = (point.y - currentPosition.y)/MAX_POINTS;
    var z_step = (point.z - currentPosition.z)/MAX_POINTS;


    for (var i = 0;i < MAX_POINTS;i++) {

        updatedPosition.x += x_step;
        updatedPosition.y += y_step;
        updatedPosition.z += z_step;

        positions[index++] = updatedPosition.x;
        positions[index++] = updatedPosition.y;
        positions[index++] = updatedPosition.z;

    }

    positions[0] = currentPosition.x;
    positions[1] = currentPosition.y;
    positions[2] = currentPosition.z; //hack
}

// Helper to animate
function copyPoint(p1, p2){
    p1.x = p2.x;
    p1.y = p2.y;
    p1.z = p2.z;
}



/* Environment set-up functions*/

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize($('#top-half').width(), $('#top-half').height());
}

function drawTestPathFunction(){
    var x = parseInt($("#line_x").attr("value"));
    var y = parseInt($("#line_y").attr("value"));
    var z = parseInt($("#line_z").attr("value"));
    //startDrawing();
    //queueAnimatedLine({x: x, y: y, z: z});
    path(points, true);
}

// Currently not used for anything. Listens for mouse clicks.
function onMouseClick(event) {
    event.preventDefault();
    mouse.x = ( event.clientX / renderer.domElement.clientWidth ) * 2 - 1;
    mouse.y = -( event.clientY / renderer.domElement.clientHeight ) * 2 + 1;
}

function init() {
    if (DEBUG_PRINT) console.log('beginning init');

    // scene
    scene = new THREE.Scene();
    // camera
    camera = new THREE.PerspectiveCamera(FOV, window.innerWidth / window.innerHeight, NEAR, FAR);
    camera.position.set(60, 40, 0);

    // Lights
    ambientLight = new THREE.AmbientLight(0x505050);
    scene.add(ambientLight);
    dirLight = new THREE.DirectionalLight(0x55505a, 2.5);
    dirLight.position.set(0, 3, 0);
    dirLight.castShadow = true;
    dirLight.shadow.camera.near = 1;
    dirLight.shadow.camera.far = 10;
    dirLight.shadow.camera.right = 1;
    dirLight.shadow.camera.left = -1;
    dirLight.shadow.camera.top = 1;
    dirLight.shadow.camera.bottom = -1;
    dirLight.shadow.mapSize.width = 1024;
    dirLight.shadow.mapSize.height = 1024; //figure these numbers out
    scene.add(dirLight);

    // Platform on which to 3d print
    ground = new THREE.Mesh( new THREE.PlaneBufferGeometry(50, 50, 1, 1),
        new THREE.MeshPhongMaterial({
            color: 0xa0adaf, shininess: 150
        }));
    ground.rotation.x = -Math.PI / 2; // rotates X/Y to X/Z
    ground.receiveShadow = true;
    scene.add(ground);

    // Renderer
    renderer = new THREE.WebGLRenderer();
    renderer.shadowMap.enabled = true;
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize($('#top-half').width(), $('#top-half').height());
    window.addEventListener('resize', onWindowResize, false);
    document.getElementById("visualization").appendChild(renderer.domElement);

    // state
    currentPosition = new THREE.Vector3(0,0,0);
    updatedPosition = new THREE.Vector3(0,0,0);
    isAnimating = false;
    animationQueue = [];
    isDrawing = false;

    // mouse
    mouse = new THREE.Vector2();
    document.addEventListener('mousedown', onMouseClick, false);

    // Controls
    var controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.target.set(0, 1, 0);
    controls.update();

    //Button Controls
    var drawTestPathButton = $("#drawTestPath");
    drawTestPathButton.click(drawTestPathFunction);

    var clearButton = $("#clear");
    clearButton.click(clear);

    if (DEBUG_PRINT) console.log('finished init');
}

/* ###################################### SCRIPT ######################################*/

$(document).ready(function () {
    init();
    animate();
});

/* ###################################### NOTES ######################################*/
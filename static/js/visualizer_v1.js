/* ###################################### GLOBAL VARIABLES ######################################*/

//var startTime, object, mouse;
//var objects = []

//Three.js rendering variables
var renderer, scene, camera, WIDTH, HEIGHT;

var ambientLight, ground, dirLight;

// Drawing variables
// If a line is currently being drawn this variable tracks it
var currentLine;
// The current animation queue
var animationQueue;
// This variable maintains the amount of segments drawn of a currently drawing line
var drawCount;
//The drawing heads most recent position
var currentPosition;
//The drawing heads destination at any given time
var updatedPosition;
// If the printing head is in drawing mode or not
var isDrawing;

//Colors
var red, blue;

// The mouse object
var raycaster, projector, mouse;

var isAnimating; // Set to true if we want each line to be drawn animatedly

var points = []; // List of lists of lists - determines points of current visualization

var onScreenObjects = []; // as we draw lines add them to this

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

// points = [[[0, 0, 0], [50, 0, 0]]];

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
function queueAnimatedLine(point, color) {
    if (isDrawing) {
        // geometry
        var geometry = new THREE.BufferGeometry();

        // attributes
        var positions = new Float32Array(MAX_POINTS * 3); // 3 vertices per point

        geometry.addAttribute( 'position', new THREE.BufferAttribute(positions, 3));
        geometry.setDrawRange(0, drawCount);

        // material
        var material = new THREE.LineBasicMaterial( { color: color, linewidth: 20 } );

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
function queueInstantLine(point, color, lineWidth){
    if (DEBUG_PRINT) console.log('Drawing Permanent Line');

    if (isDrawing){
        var material = new THREE.LineBasicMaterial({ color: color, linewidth: lineWidth });
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
    // console.log('beginning points, pointList.length: ');
    // console.log(pointList);
    //pointList : the parent list of all subpaths
    for (var i = 0; i < pointList.length; i++){
        //currentPath: the currentPath starting at the first point on this path
        for (var p = 0; p < pointList[i].length; p++){
            if (p == 1){
                startDrawing();
            }
            if (animated) queueAnimatedLine({x: pointList[i][p][0], y: pointList[i][p][1],
                z: pointList[i][p][2]}, red);
            else queueInstantLine({x: pointList[i][p][0], y: pointList[i][p][1],
                z: pointList[i][p][2]}, red, 60);
        }
        stopDrawing();
    }
    // console.log('ending points, animationQueue.length: ');
    // console.log(animationQueue.length);
}

function pathSegment(pointList, animated){
    //pointList : the parent list of all subpaths
    for (var i = 0; i < pointList.length; i++){
        //currentPath: the currentPath starting at the first point on this path
        for (var p = 0; p < pointList[i].length; p++){
            if (p == 1){
                startDrawing();
            }
        }
    }
}

//Clear the visualization of any lines.
//Reset the set of points.
function clear(){
    points = [];
    animationQueue = [];
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
        if (animationQueue.length !== 0){
            var nextAnimation = animationQueue.shift();
            if (nextAnimation[0] == QUEUE_MEMBERS.LINE){
                console.log('starting line');
                currentLine = nextAnimation[1];
                scene.add(currentLine);
                onScreenObjects.push(currentLine);
                isAnimating = true;
                updatePositions(nextAnimation[2]);
            } else if (nextAnimation[0] == QUEUE_MEMBERS.INSTANT_LINE){
                currentLine = nextAnimation[1];
                var origin = new THREE.Vector3();
                copyPoint(origin, currentPosition);
                currentLine.geometry.vertices.push(origin);
                if (DEBUG_PRINT) console.log('origin: ', currentPosition);
                currentLine.geometry.vertices.push(nextAnimation[2]);
                if (DEBUG_PRINT) console.log('destination: ', nextAnimation[2]);
                scene.add(currentLine);
                onScreenObjects.push(currentLine);
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
    var positions;
    try {
      positions = currentLine.geometry.attributes.position.array;
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
    path(points, false);
}

// Mouse clicks to highlight segments of code
function onMouseClick(event) {
    // the following line would stop any other event handler from firing
    event.preventDefault();

    // update the mouse variable
    mouse.x = ( event.clientX / WIDTH ) * 2 - 1;
    mouse.y = - ( event.clientY / HEIGHT ) * 2 + 1;
    // console.log(mouse.x, mouse.y);

    var highlight_range = [10000000,0];
    var lineNum;

    // look for intersections
    raycaster.setFromCamera(mouse, camera);
    var intersects = raycaster.intersectObjects(onScreenObjects);
    if (intersects.length > 0) {
        addLine(intersects[0]);
        // intersects.forEach(function (workingLine){
          // addLine(workingLine);
          // lineNum = addLine(workingLine);
        //   if (lineNum < highlight_range[0]){
        //     highlight_range[0] = lineNum;
        //   } else if (lineNum > highlight_range[1]){
        //     highlight_range[1] = lineNum;
        //   }
        // });
        // var r = codeEditor.leftEditor.selection.getRange();
        // r.start.row = highlight_range[0];
        // r.end.row = highlight_range[1];
        // codeEditor.leftEditor.selection.setSelectionRange(r, false);
    } else {
        // console.log("No intersections");
    }
}

function addLine(workingLine){
    if (workingLine.object.material.color.equals(red)){
        workingLine.object.material.color = blue;
        two_points = [[workingLine.object.geometry.vertices[0].x,
          workingLine.object.geometry.vertices[0].y,
          workingLine.object.geometry.vertices[0].z],
          [workingLine.object.geometry.vertices[1].x,
          workingLine.object.geometry.vertices[1].y,
          workingLine.object.geometry.vertices[1].z]];
        // console.log(two_points);

          $.ajax({
              type: 'POST',
              url: '/lineNumber',
              data: JSON.stringify(two_points),
              contentType: false,
              cache: false,
              processData: false,
              success: function (data) {
                  lineNum = JSON.parse(data).lineNum;
                  var r = codeEditor.leftEditor.selection.getRange();
                  r.start.row = lineNum;
                  r.end.row = lineNum;
                  codeEditor.leftEditor.selection.setSelectionRange(r, false);
              },
          });

    } else {
        workingLine.object.material.color = red;
    }

    renderer.render(scene, camera);
}

function init() {
    if (DEBUG_PRINT) console.log('beginning init');

    // scene
    scene = new THREE.Scene();
    // camera
    WIDTH = $('#top-half').width();
    HEIGHT = $('#top-half').height();
    camera = new THREE.PerspectiveCamera(FOV, WIDTH / HEIGHT, NEAR, FAR);
    camera.position.set(0, 0, 400);
    // camera.position.set(0,150,400);

    // Lights
    ambientLight = new THREE.AmbientLight(0x505050);
    scene.add(ambientLight);
    dirLight = new THREE.DirectionalLight(0x55505a, 2.5);
    dirLight.position.set(0, 0, 3);
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
    ground = new THREE.Mesh( new THREE.PlaneBufferGeometry(500, 500, 1, 1),
        new THREE.MeshPhongMaterial({
            color: 0xa0adaf, shininess: 150
        }));
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
    raycaster = new THREE.Raycaster();
    mouse = { x: 0, y: 0 };
    document.addEventListener('mousedown', onMouseClick, false);

    red = new THREE.Color('red');
    blue = new THREE.Color('skyblue');

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
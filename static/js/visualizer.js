
// Obsolete Functions
////function drawMeshLine(p1, p2) {
////    var MeshLine = require('three.meshline');
////    var material = new MeshLineMaterial({linewidth: 300});
////    var geometry = new THREE.Geometry()
////    geometry.vertices.push(new THREE.Vector3(p1.x,p1.y,p1.z))
////    geometry.vertices.push(new THREE.Vector3(p2.x,p2.y,p2.z))
////    var currentLine = new MeshLine();
////    currentLine.setGeometry(geometry, function( p ) { return 2; } ); // makes width 2 * lineWidth;
////    var mesh = new THREE.Mesh( currentLine.geometry, material ); // this syntax could definitely be improved!
////    scene.add(mesh);
////    renderer.render(scene, camera);
////}
//
//

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

// Helper Variables
var isAnimating;


/* ########################################## FUNCTIONS ##########################################*/

/* Low Level Functions */
function startDrawing(){
    isDrawing = true;
}

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

    var material = new THREE.LineBasicMaterial({ color: lineColor, linewidth: 50 });
    var geometry = new THREE.Geometry();
    animationQueue.push([QUEUE_MEMBERS.INSTANT_LINE, new THREE.Line(geometry,  material), point]);
}


function queueFill(path){
    console.log(path.vertices);
    //make a currentLine from the first two vertices and treat that as the direction of the currentLine to fill everything

}


// This function draws an arc from currentPosition to x,y,z
// cx/cy/cz - center of circle that arc is a part of
// x/y/z - end position
// dir - ARC_CW or ARC_CCW to control direction of arc
function queueArc(cx, cy, cz, x, y, z, dir){
    animationQueue.push([QUEUE_MEMBERS.ARC, cx, cy, cz, x, y, z, dir]);
}

function clear(){
    scene.children.forEach(function(object){
        scene.remove(object);
    });
    scene.children.forEach(function(object){
        scene.remove(object);
    });
    scene.children.forEach(function(object){
        scene.remove(object);
    });
    scene.children.forEach(function(object){
        scene.remove(object);
    });
    scene.children.forEach(function(object){
        scene.remove(object);
    });
    scene.children.forEach(function(object){
        scene.remove(object);
    });
    scene.children.forEach(function(object){
        scene.remove(object);
    });
    scene.add(ground);
    scene.add(ambientLight);
    scene.add(dirLight);
}

/* Three.js functions */
function render() {
    renderer.render( scene, camera );
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
            } else if (nextAnimation[0] == QUEUE_MEMBERS.ARC){
                console.log('starting arc');
                currentLine = null;
                isAnimating = true;
                drawArc(nextAnimation[1], nextAnimation[2], nextAnimation[3],
                    nextAnimation[4], nextAnimation[5], nextAnimation[6], nextAnimation[7]);
            } else if (nextAnimation[0] == QUEUE_MEMBERS.INSTANT_LINE){
                console.log('starting instant line');
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

// Helper to queueArc
function atan3(dy, dx) {
    var a = Math.atan2(dy,dx);
    if(a<0) a = (Math.PI*2.0)+a;
    return a;
}

// Helper to animate
function copyPoint(p1, p2){
    p1.x = p2.x;
    p1.y = p2.y;
    p1.z = p2.z;
}

//Helper to queueArc
function drawArc(cx, cy, cz, x, y, z, dir){
    // get radius
    var dx = currentPosition.x - cx; if (DEBUG_PRINT) console.log('dx', dx);
    var dy = currentPosition.y - cy; if (DEBUG_PRINT) console.log('dy', dy);
    var dz = currentPosition.z - cz; if (DEBUG_PRINT) console.log('dz', dz);
    var radius = Math.sqrt(dx*dx + dy*dy); if (DEBUG_PRINT) console.log('radius', radius);

    // find angle of arc (sweep)
    var angle1 = atan3(dy,dx); if (DEBUG_PRINT) console.log('angle1', angle1);
    var angle2 = atan3(y-cy,x-cx); if (DEBUG_PRINT) console.log('angle2', angle2);
    var theta = angle2-angle1;

    if (dir > 0 && theta < 0) angle2 += 2*Math.PI;
    else if(dir < 0 && theta > 0) angle1 += 2*Math.PI;

    theta = (angle2-angle1);//%(2*Math.PI);

    var len = Math.abs(theta) * radius;

    var segments = Math.ceil(len*MM_PER_SEGMENT);

    var nx, ny, angle3, scale;
    for(var i = 0;i < segments; ++i) {
        // interpolate around the arc
        scale = i/segments;

        angle3 = (theta * scale) + angle1;
        nx = cx + Math.cos(angle3) * radius;
        ny = cy + Math.sin(angle3) * radius;

        // send it to the planner
        queueInstantLine({x: 0, y: ny, z: nx});
    }
    isAnimating = false;
}

/* Environment set-up functions*/

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function drawLineFunction(){
    var x = parseInt($("#line_x").attr("value"));
    var y = parseInt($("#line_y").attr("value"));
    var z = parseInt($("#line_z").attr("value"));
    startDrawing();
    queueAnimatedLine({x: x, y: y, z: z});
}

function moveHeadFunction(){
    var x = parseInt($("#move_x").attr("value"));
    var y = parseInt($("#move_y").attr("value"));
    var z = parseInt($("#move_z").attr("value"));
    stopDrawing();
    queueMoveHead({x: x, y: y, z: z});
}

function drawArcFunction(){
    startDrawing();
    queueMoveHead({x: 0, y: 0, z: 0});
    queueAnimatedLine({x: 10, y: 0, z: 0});
    queueAnimatedLine({x: 10, y: 10, z: 0});
    queueAnimatedLine({x: 0, y: 10, z: 0});
    queueAnimatedLine({x: 0, y: 0, z: 0});
    queueAnimatedLine({x: 0, y: 0, z: 10});
    queueAnimatedLine({x: 10, y: 0, z: 10});
    queueAnimatedLine({x: 10, y: 0, z: 0});
    queueMoveHead({x: 0, y: 0, z: 10});
    queueAnimatedLine({x: 0, y: 10, z: 10});
    queueAnimatedLine({x: 0, y: 10, z: 0});
    queueAnimatedLine({x: 10, y: 10, z: 0});
    queueAnimatedLine({x: 10, y: 10, z: 10});
    queueAnimatedLine({x: 0, y: 10, z: 10});
    queueMoveHead({x: 10, y: 10, z: 10});
    queueAnimatedLine({x: 10, y: 0, z: 10});
}

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
    renderer.setSize(window.innerWidth, window.innerHeight);
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
    var drawLineButton = $("#drawLine");
    drawLineButton.click(drawLineFunction);

    var moveHeadButton = $("#moveHead");
    moveHeadButton.click(moveHeadFunction);

    var drawArcButton = $("#drawArc");
    drawArcButton.click(drawArcFunction);

    var clearButton = $("#clear");
    clearButton.click(clear);

    var lineExampleButton = $("#lineExample");
    lineExampleButton.click(lineExampleFunction);


    var arcExampleButton = $("#arcExample");
    arcExampleButton.click(arcExampleFunction);

    var fillExampleButton = $("#fillExample");
    fillExampleButton.click(fillExampleFunction);




    if (DEBUG_PRINT) console.log('finished init');
}

/* Examples - only for demo*/

function lineExampleFunction(){
    startDrawing();
    queueMoveHead({x: 0, y: 0, z: 0});
    queueAnimatedLine({x: 0, y: 10, z: 10});
    queueMoveHead({x: 0, y: 0, z: 0});
    queueAnimatedLine({x: 0, y: 10, z: -10});
    queueMoveHead({x: 0, y: 0, z: 0});
    queueAnimatedLine({x: 0, y: 12, z: 1});
    queueMoveHead({x: 0, y: 0, z: 0});
    queueAnimatedLine({x: -5, y: 1, z: -5});
    queueMoveHead({x: 0, y: 0, z: 0});
    queueAnimatedLine({x: 5, y: 1, z: -5});
}

function arcExampleFunction(){
    startDrawing();
    queueMoveHead({x: 0, y: 0, z: 0});
    drawArc(0,10,0,5,5,0,1);
    queueMoveHead({x: 0, y: 0, z: 0});
    drawArc(0,10,0,5,5,0,-1);
    stopDrawing();
}

function fillExampleFunction(){
    startDrawing();
    queueMoveHead({x: 0, y: 0, z: 0});
    queueInstantLine({x: 0, y: 10, z: 0});
    queueInstantLine({x: 0, y: 10, z: 10});
    queueInstantLine({x: 0, y: 0, z: 10});
    for (var c = 0; c <= 10; ){
        queueInstantLine({x: 0, y: c, z: 0});
        queueInstantLine({x: 0, y: c, z: 10});
        c += 0.1
    }
}

/* ###################################### SCRIPT ######################################*/

$(document).ready(function () {
    init();
    animate();
});

/* ###################################### NOTES ######################################*/

//Line and arc are exactly as they were in Gbot

//Figure out fill

//asynchrony

//make drawpermanent line only in terms of destination, source should be filled by animate

//for fill https://threejs.org/examples/#webgl_geometry_shapes

//for 3d arcs http://xboxforums.create.msdn.com/forums/t/97112.aspx


/// <summary>
/// and atan 3 would just be two floats for y/x and z/x and return
/// a vector 2 bering or two angles
///
/// ok so this would be atan4 i guess
/// ...
/// messed up thing is the vector3 you get back xyz is angle wise opposite
/// logically like for example
/// e.g.
/// q = atan4(..)  then result would be q.X is the z Axis angle and q.Y is the Y axis angle and q.Z would be the X axis angle
/// but i guess that would be atan4
/// </summary>
/// <param name="x"></param>
/// <param name="y"></param>
/// <param name="z"></param>
/// <returns></returns>
//public static Vector3   atan4(float x,float y,float z)
//{
//    return new Vector3(
//        (float)Math.Atan2(y, x) , // z axis from x //y/x forms z angle
//    (float)Math.Atan2(z, x) , // y axis from x //? forms y angle
//    (float)Math.Atan2(z, y) // x axis from y  //? forms x angle
//);
//    // now if this was standardized already i would know what the standard order is
//    // for the part were you read z from y you could instead by like Y from Z and still get the x axis angle just reversed
//    // so how would i base the standardization i guess on proper quadrants but i dunno
//    // i guess as long as the method defines the operation its ok
//}

//var inp = document.createElement("input");
//inp.setAttribute("type", "number");
//inp.setAttribute("value", "40");
//document.getElementById("controls").appendChild(inp);
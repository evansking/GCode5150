/* ###################################### GLOBAL VARIABLES ######################################*/

//var startTime, object, mouse;
//var objects = []

var count_false = 0;

var axisLength;

var highlightGeometry, highlightBeam;

//Three.js rendering variables
var renderer, scene, camera, WIDTH, HEIGHT, object, controls;

var prevX = 0, prevY = 0, prevZ = 0;

var camToSave;

var ambientLight, ground, front, right;

// Drawing variables
// If a line is currently being drawn this variable tracks it
var currentLine;
// The current animation queue
var animationQueue;
//The drawing heads most recent position
var currentPosition;
//The drawing heads destination at any given time
var updatedPosition;

//Colors
var origin_color, dest_color, color_one, color_two, current_color;

// The mouse object
var raycaster, projector, mouse;

var points = []; // List of lists of lists - determines points of current visualization

var onScreenObjects = []; // as we draw lines add them to this

var progress, mode;

var object, lineGeometry;

/* ########################################## FUNCTIONS ##########################################*/

/* Low Level Functions */

// This function moves the drawing head from currentPosition to point without drawing anything as it moves
function queueMoveHead(point){
    animationQueue.push([QUEUE_MEMBERS.MOVE,
      new THREE.Vector3(point[0], point[1], point[2])]);

      // var material = new THREE.LineBasicMaterial({ color: red, linewidth: 1 });
      // var geometry = new THREE.Geometry();
      // animationQueue.push([QUEUE_MEMBERS.INSTANT_LINE, new THREE.Line(geometry,  material),
      //   new THREE.Vector3(point[0], point[1], point[2])]);
}

function drawSegmentedShape(points, index){
  progress.html('Drawing...');
  var lineSegmentGeometry = new THREE.Geometry();
  var len = points.length;
  for (var i = 1; i < len; i++){
    if (points[i][3] == true){
      lineSegmentGeometry.vertices.push(new THREE.Vector3(prevX, prevY, prevZ));
      lineSegmentGeometry.vertices.push(new THREE.Vector3(points[i][0], points[i][1], points[i][2]));
      lineGeometry.vertices.push(new THREE.Vector3(prevX, prevY, prevZ));
      lineGeometry.vertices.push(new THREE.Vector3(points[i][0], points[i][1], points[i][2]));
      // console.log(prevX,prevY,prevZ,points[i][0], points[i][1], points[i][2]);
    } else {
      count_false += 1;
    }
    prevX = points[i][0];
    prevY = points[i][1];
    prevZ = points[i][2];
  } 

  animationQueue.push([QUEUE_MEMBERS.LINE_SEGMENTS,
    lineSegmentGeometry, new THREE.Vector3(points[len-1][0],
      points[len-1][1], points[len-1][2]), index]);
}

//This function takes in a list of lists, where each list is a path
//It draws lines along each point on an individual path
//It starts its next drawing at the beginning of a point in a given point list
function path(pointList){
    // console.log('beginning points, pointList.length: ');
    // console.log(pointList);
    //pointList : the parent list of all subpaths
    for (var i = 0; i < pointList.length; i++){
      drawSegmentedShape(pointList[i], i);
    }

}

//Clear the visualization of any lines.
//Reset the set of points.
function clear(){
    points = [];
    animationQueue = [];
    while (scene.children.length > 0) {
        scene.children.forEach(function(child){
            scene.remove(child);
        });
    }
    object = new THREE.Object3D();
    lineGeometry = new THREE.Geometry();
    object.castShadow = true;

    scene.add(ground);
    scene.add(ambientLight);
    scene.add(front);
    scene.add(right);
    scene.add(object);
    createAxis(new THREE.Vector3(-axisLength, 0, 0), new THREE.Vector3(axisLength, 0, 0), 0xff0000);
    createAxis(new THREE.Vector3(0, -axisLength, 0), new THREE.Vector3(0, axisLength, 0), 0x00ff00);
    createAxis(new THREE.Vector3(0, 0, -axisLength), new THREE.Vector3(0, 0, axisLength), 0xffffff);
}

/* Three.js functions */
function render() {
    if (modeSlider.checked) controls.enabled = false;
    else controls.enabled = true;
    controls.update();
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

    copyPoint(currentPosition, updatedPosition);
    if (animationQueue.length !== 0){
        var nextAnimation = animationQueue.shift();
        if (nextAnimation[0] == QUEUE_MEMBERS.LINE){
            console.log('starting line');
            currentLine = nextAnimation[1];
            scene.add(currentLine);
            onScreenObjects.push(currentLine);
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
            copyPoint(currentPosition, nextAnimation[2]);
            copyPoint(updatedPosition, currentPosition);
        } else if (nextAnimation[0] == QUEUE_MEMBERS.MOVE){
            if (DEBUG_PRINT) console.log('origin: ', currentPosition);
            if (DEBUG_PRINT) console.log('destination: ', nextAnimation[1]);
            copyPoint(currentPosition, nextAnimation[1]);
            copyPoint(updatedPosition, currentPosition);
            if (DEBUG_PRINT) console.log('current position: ', currentPosition);
        } else if (nextAnimation[0] == QUEUE_MEMBERS.LINE_SEGMENTS){
          // return;
          if (current_color == color_one) current_color = color_two;
          else current_color = color_one;
          var lineMaterial = new THREE.LineBasicMaterial({color: current_color, opacity: 0.6, fog: false});
          var lineSegmentGeometry = nextAnimation[1];
          lineGeometry.computeBoundingBox();
          var segmentedLine = new THREE.LineSegments(lineSegmentGeometry, lineMaterial);
          segmentedLine.castShadow = true;
          object.add(segmentedLine);
          onScreenObjects.push(segmentedLine);
          var center = new THREE.Vector3().addVectors(lineGeometry.boundingBox.min,
            lineGeometry.boundingBox.max).divideScalar(2);
          copyPoint(currentPosition, nextAnimation[2]);
          copyPoint(updatedPosition, currentPosition);
          // console.log('center: ', center.x.toFixed(1), ',', center.y.toFixed(1), ',', center.z.toFixed(1));
          object.position.set(-center.x, 0, center.y);
          object.rotation.x = -Math.PI/2;
          // object.position.set(-center.x, -center.y, object.position.z);
        }

} else {
  if (progress.html()[0] == 'D') progress.html('Ready!');
}
  render();
}


/* Helpers */


// Helper to animate
function copyPoint(p1, p2){
    p1.x = p2.x;
    p1.y = p2.y;
    p1.z = p2.z;
}



/* Environment set-up functions*/

function onWindowResize() {
    camera.aspect = $('#top-half').width() / $('#top-half').height();
    camera.updateProjectionMatrix();
    renderer.setSize($('#top-half').width(), $('#top-half').height());
}

function resetViewFunction(){
  camera.position.set(camToSave.position.x, camToSave.position.y,
    camToSave.position.z);
  camera.rotation.set(camToSave.rotation.x, camToSave.rotation.y,
    camToSave.rotation.z);
  controls.target.set(camToSave.controlCenter.x,
    camToSave.controlCenter.y, camToSave.controlCenter.z);
  controls.update();
  render();
}

function update(){
  $('#draw-upload').click();
  clear();
}

function rotateUp(){
  if (object.children.length > 0) {
    object.rotation.z = 0;
    lineGeometry.computeBoundingBox();
    var center = new THREE.Vector3().addVectors(lineGeometry.boundingBox.min, 
      lineGeometry.boundingBox.max).divideScalar(2);
    object.rotation.x -= Math.PI/2;
    var rotateState = object.rotation.x/(Math.PI/2);
    rotateState %= 4;
    rotateState = rotateState.toFixed(1);
    console.log(rotateState);
    if (rotateState == -2.0) {
      object.position.set(-center.x, lineGeometry.boundingBox.max.y, 0);
      console.log('rotated up 1');
    } else if (rotateState == -3.0){
      object.position.set(-center.x, lineGeometry.boundingBox.max.z, -center.y);
      console.log('rotated up 2');
    } else if (rotateState == 0.0){
      object.position.set(-center.x, -lineGeometry.boundingBox.min.y, 0);
      console.log('rotated up 3'); 
    } else {
      object.position.set(-center.x, 0, center.y);
      console.log(center);
      console.log(lineGeometry.boundingBox.min);
      console.log(lineGeometry.boundingBox.max);
      console.log('rotated up 4');
    }
  }
}

function rotateRight(){
  if (object.children.length > 0) {
    object.rotation.x = -Math.PI/2;
    lineGeometry.computeBoundingBox();
    var center = new THREE.Vector3().addVectors(lineGeometry.boundingBox.min, 
      lineGeometry.boundingBox.max).divideScalar(2);
    object.rotation.z -= Math.PI/2;
    var rotateState = object.rotation.z/(Math.PI/2);
    rotateState %= 4;
    rotateState = rotateState.toFixed(1);
    if (rotateState == -1.0) {
      object.position.set(-center.x, 0, -center.y);
      console.log('rotated right 1');
    } else if (rotateState == -2.0){
      object.position.set(center.x, 0, -center.y);
      console.log('rotated right 2');
    } else if (rotateState == -3.0){
      object.position.set(center.x, 0, center.y);
      console.log('rotated right 3');      
    } else {
      object.position.set(-center.x, 0, center.y);
      console.log('rotated right 4');
    }
  }
}

function modeChange(){
  if (modeSlider.checked) mode.html('Mode: Highlight');
  else mode.html('Mode: Pan/Zoom');

}

// Mouse clicks to highlight segments of code
//This section of code is a little buggy, and so for now has been left commented out.
//We address this in the report
function onMouseClick(event) {
    // the following line would stop any other event handler from firing
    // event.preventDefault();

    // update the mouse variable
    mouse.x = ( event.clientX / WIDTH ) * 2 - 1;
    mouse.y = - ( event.clientY / HEIGHT ) * 2 + 1;
    console.log(mouse.x, mouse.y);
    
    // var lineNum;

    // look for intersections
    // raycaster.setFromCamera(mouse, camera);
    // var intersects = raycaster.intersectObjects(onScreenObjects);
    // if (intersects.length > 0) {
      // console.log(intersects);
        // addLine(intersects[0]);
        // console.log(intersects[0]);
        // intersects.forEach(function (workingLine){
          // addLine(workingLine);
          // lineNum = addLine(workingLine);
          // if (lineNum < highlight_range[0]){
            // highlight_range[0] = lineNum;
          // } else if (lineNum > highlight_range[1]){
            // highlight_range[1] = lineNum;
          // }
        // });
        // var r = codeEditor.leftEditor.selection.getRange();
        // r.start.row = lineNum;
        // r.end.row = lineNum;
        // codeEditor.leftEditor.selection.setSelectionRange(r, false);
    // } else {
        // console.log("No intersections");
    // }
}

//This section of code is a little buggy, and so for now has been left commented out.
//We address this in the report

// function addLine(workingLine){
//   // console.log(workingLine);
//   makeHighlightCube(workingLine.point);
//   $('#x_coord').html(workingLine.point.x.toFixed(2));
//   $('#y_coord').html(workingLine.point.y.toFixed(2));
//   $('#z_coord').html(workingLine.point.z.toFixed(2));

//   var r = codeEditor.leftEditor.selection.getRange();
//   r.start.row = workingLine.index;
//   r.end.row = workingLine.index;
//   r.start.column = 0;
//   r.end.column = 100;
//   codeEditor.leftEditor.selection.setSelectionRange(r, true);
//   codeEditor.leftEditor.getSession().setScrollTop(16*workingLine.index);


//   // $.ajax({
//   //     type: 'POST',
//   //     url: '/lineNumber',
//   //     data: JSON.stringify(two_points),
//   //     contentType: false,
//   //     cache: false,
//   //     processData: false,
//   //     success: function (data) {
//   //         lineNum = JSON.parse(data).lineNum;
//   //         var r = codeEditor.leftEditor.selection.getRange();
//   //         r.start.row = lineNum;
//   //         r.end.row = lineNum;
//   //         codeEditor.leftEditor.selection.setSelectionRange(r, false);
//   //     },
//   // });
//     // if (workingLine.object.material.color.equals(color_one)){
//     //     workingLine.object.material.color = red;
//     //     two_points = [[workingLine.object.geometry.vertices[0].x,
//     //       workingLine.object.geometry.vertices[0].y,
//     //       workingLine.object.geometry.vertices[0].z],
//     //       [workingLine.object.geometry.vertices[1].x,
//     //       workingLine.object.geometry.vertices[1].y,
//     //       workingLine.object.geometry.vertices[1].z]];
//     //     console.log(two_points);
//     //
//     //
//     //
//     // } else {
//     //     workingLine.object.material.color = color_one;
//     // }

//     renderer.render(scene, camera);
// }

function init() {
    if (DEBUG_PRINT) console.log('beginning init');

    // scene
    scene = new THREE.Scene();
    // camera
    WIDTH = $('#top-half').width();
    HEIGHT = $('#top-half').height();
    camera = new THREE.PerspectiveCamera(FOV, WIDTH / HEIGHT, NEAR, FAR);
    scene.add(camera);

    // Lights
    ambientLight = new THREE.AmbientLight(0x505050, 2.5);
    scene.add(ambientLight);

    // Platform on which to 3d print
    ground = new THREE.Mesh( new THREE.PlaneBufferGeometry(150, 150, 1, 1),
        new THREE.MeshPhongMaterial({
            color: 0x3292F1, shininess: 150
        }));
    ground.receiveShadow = true;
    ground.rotation.x = -Math.PI/2;
    scene.add(ground);


    front = new THREE.Mesh( new THREE.PlaneBufferGeometry(150, 150, 1, 1),
        new THREE.MeshPhongMaterial({
            color: 0x7AB8F6, shininess: 150
        }));
    front.receiveShadow = true;
    front.position.y = 75;
    front.position.z = -75;
    scene.add(front);

    right = new THREE.Mesh( new THREE.PlaneBufferGeometry(150, 150, 1, 1),
        new THREE.MeshPhongMaterial({
            color: 0x0E6CC9, shininess: 150
        }));
    right.receiveShadow = true;
    right.position.x = 75;
    right.position.y = 75;
    right.rotation.y = -Math.PI/2;
    scene.add(right);

    //axes
    axisLength = 75;
    createAxis(new THREE.Vector3(-axisLength, 0, 0), new THREE.Vector3(axisLength, 0, 0), 0xFF0000);
    createAxis(new THREE.Vector3(0, -axisLength, 0), new THREE.Vector3(0, axisLength, 0), 0x00FF00);
    createAxis(new THREE.Vector3(0, 0, -axisLength), new THREE.Vector3(0, 0, axisLength), 0xFFFFFF);

    // Renderer
    renderer = new THREE.WebGLRenderer({clearColor:0xffffff, clearAlpha: 1, antialias: true});
    // renderer.shadowMap.enabled = true;
    renderer.setSize($('#top-half').width(), $('#top-half').height());
    window.addEventListener('resize', onWindowResize, false);
    document.getElementById("visualization").appendChild(renderer.domElement);

    // state
    currentPosition = new THREE.Vector3(0,0,0);
    updatedPosition = new THREE.Vector3(0,0,0);
    animationQueue = [];

    // mouse
    raycaster = new THREE.Raycaster();
    mouse = { x: 0, y: 0 };
    document.addEventListener('mousedown', onMouseClick, false);

    origin_color = new THREE.Color('red');
    dest_color = new THREE.Color('orange');
    color_one = new THREE.Color('#5b5959');
    color_two = new THREE.Color('#2b2727');
    current_color = color_one;

    // Controls
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    // controls = new THREE.TrackballControls(camera, renderer.domElement);
    // controls.target.set(0, 1, 0);
    controls.update();

    //Button Controls
    var resetViewButton = $("#resetView");
    resetViewButton.click(resetViewFunction);

    var updateButton = $("#update");
    updateButton.click(update);

    var rotateRightButton = $("#rotate_right");
    rotateRightButton.click(rotateRight);

    var rotateUpButton = $("#rotate_up");
    rotateUpButton.click(rotateUp);

    var clearButton = $("#clear");
    clearButton.click(clear);

    var modeSlider = $("#modeSlider")[0];

    object = new THREE.Object3D();
    lineGeometry = new THREE.Geometry();
    scene.add(object);

    //position
    controls.target.set(0, 0, 0);
    // camera.position.set(0.8411331463429106, 14.303142467093837, 28.461376836191707);
    // camera.rotation.set(-0.4656820927094852, 0.026400369392629096, 0.013265073299480094);
    camera.position.set(-2.103831035351104, 53.65318572991317, 130.3430329819223);
    camera.rotation.set(-0.24539539345521694, 0.00008969377825654345, 0.000022463162163918027);
    camToSave = {};
    camToSave.position = camera.position.clone();
    camToSave.rotation = camera.rotation.clone();
    camToSave.controlCenter = controls.target.clone();

    progress = jQuery('#progress');
    mode = jQuery('#mode');

    highlightGeometry = new THREE.BoxGeometry(0.15, 0.15, 0.15, 0.01, 0.01, 0.01);
    highlightBeam = new THREE.Object3D();


    if (DEBUG_PRINT) console.log('finished init');
}

//Create axis (point1, point2, colour)
function createAxis(p1, p2, color){
  var line, axisGeometry = new THREE.Geometry(),
    lineMat = new THREE.LineBasicMaterial({color: color});
  axisGeometry.vertices.push(p1, p2);
  line = new THREE.Line(axisGeometry, lineMat);
  scene.add(line);
}

function makeHighlightCube(two_points){
  object.remove(highlightBeam);

  highlightBeam = new THREE.Object3D();

  var highlightColor, highlightMaterial, highlightCube;
  var current_point = two_points[0];
  var g = 0, b = 0;
  var step = 0.1;
  var x_up = two_points[1][0] > two_points[0][0];
  var y_up = two_points[1][1] > two_points[0][1];
  var z_up = two_points[1][2] > two_points[0][2];
  while (current_point[0].toFixed(1) != two_points[1][0].toFixed(1) || 
    current_point[1].toFixed(1) != two_points[1][1].toFixed(1) || 
    current_point[2].toFixed(1) != two_points[1][2].toFixed(1)){

    highlightMaterial = new THREE.MeshBasicMaterial({color: new THREE.Color(1,g,b), wireframe: true});
    highlightCube = new THREE.Mesh(highlightGeometry, highlightMaterial);

    highlightCube.position.set(current_point[0], current_point[1], current_point[2]);

    g += step;
    b += step;

    if (current_point[0].toFixed(1) != two_points[1][0].toFixed(1)) {
      if (x_up) current_point[0] += step;
      else current_point[0] -= step;
    }
    
    if (current_point[1].toFixed(1) != two_points[1][1].toFixed(1)){
      if (y_up) current_point[1] += step;
      else current_point[1] -= step;
    }

    if (current_point[2].toFixed(1) != two_points[1][2].toFixed(1)) {
      if (z_up) current_point[2] += step;
      else current_point[2] -= step;      
    }

    highlightBeam.add(highlightCube);

  }

  object.add(highlightBeam);

}

/* ###################################### SCRIPT ######################################*/

$(document).ready(function () {
    init();
    animate();
});

/* ###################################### NOTES ######################################*/

//Always put points onto queue as THREE.Vector3's

//WHITE - Z
//RED - X
//GREEN - Y

// positive Z becomes negative Y
// positive Y becomes positive Z

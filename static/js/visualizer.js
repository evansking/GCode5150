/* ###################################### GLOBAL VARIABLES ######################################*/

// Three.js rendering variables
var renderer, scene, camera, width, height, controls;

// Visualization variables
var ambient_light, ground, front, right;

// State
var correct_object_position, view_state, prev_x, prev_y, prev_z;

// State - current objects on screen
var lineGeometry, object, onScreenObjects; 

// The current animation queue maintains currently drawing visualization
var animation_queue;

// Colors
var origin_color, dest_color, color_one, color_two, current_color;

// Mouse helper variables
var raycaster, projector, mouse;

// HTML elements that provide the user with information
var progress, mode;

// Highlighting helper variables
var highlight_position, is_current_highlight_shown, highlight_geometry, highlight_beam;


/* ########################################## FUNCTIONS ##########################################*/

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
  if (animation_queue.length !== 0){
    var nextAnimation = animation_queue.shift();
    if (current_color == color_one) current_color = color_two;
    else current_color = color_one;
    var lineMaterial = new THREE.LineBasicMaterial({color: current_color, opacity: 0.6, fog: false});
    var lineSegmentGeometry = nextAnimation[0];
    lineGeometry.computeBoundingBox();
    var segmentedLine = new THREE.LineSegments(lineSegmentGeometry, lineMaterial);
    segmentedLine.castShadow = true;
    object.add(segmentedLine);
    onScreenObjects.push(segmentedLine);
    var center = new THREE.Vector3().addVectors(lineGeometry.boundingBox.min,
      lineGeometry.boundingBox.max).divideScalar(2);
    setObjectPosition(-center.x, 0, center.y);
    object.rotation.x = -Math.PI/2;
  } else {
    if (progress.html()[0] == 'D') progress.html('Ready!');
  }
  render();
}

/* Environment set-up functions*/

// Deals with resizing the objects in accordance with the changing size of the visualization
function onWindowResize() {
    camera.aspect = $('#top-half').width() / $('#top-half').height();
    camera.updateProjectionMatrix();
    renderer.setSize($('#top-half').width(), $('#top-half').height());
}

/* Button Functions */

// Helper to path.
// Takes in a list of points and creates a segmented line from them
// Appends the line onto the animation queue so it can be drawn when the renderer is ready
function drawSegmentedShape(points){
  progress.html('Drawing...');
  var lineSegmentGeometry = new THREE.Geometry();
  var len = points.length;
  for (var i = 1; i < len; i++){
    if (points[i][3] == true){
      lineSegmentGeometry.vertices.push(new THREE.Vector3(prev_x, prev_y, prev_z));
      lineSegmentGeometry.vertices.push(new THREE.Vector3(points[i][0], points[i][1], points[i][2]));
      lineGeometry.vertices.push(new THREE.Vector3(prev_x, prev_y, prev_z));
      lineGeometry.vertices.push(new THREE.Vector3(points[i][0], points[i][1], points[i][2]));
    }
    prev_x = points[i][0];
    prev_y = points[i][1];
    prev_z = points[i][2];
  } 

  animation_queue.push([lineSegmentGeometry, new THREE.Vector3(points[len-1][0],
      points[len-1][1], points[len-1][2])]);
}


//This function takes in a list of lists, where each list is a path
//It draws lines along each point on an individual path
function path(pointList){
    for (var i = 0; i < pointList.length; i++){
      drawSegmentedShape(pointList[i]);
    }
}

//Clear the visualization of any lines.
function clear(){
    animation_queue = [];
    while (scene.children.length > 0) {
        scene.children.forEach(function(child){
            scene.remove(child);
        });
    }
    object = new THREE.Object3D();
    lineGeometry = new THREE.Geometry();
    object.castShadow = true;

    scene.add(ground);
    scene.add(ambient_light);
    scene.add(front);
    scene.add(right);
    scene.add(object);
    createAxis(new THREE.Vector3(-AXIS_LENGTH, 0, 0), new THREE.Vector3(AXIS_LENGTH, 0, 0), 0xff0000);
    createAxis(new THREE.Vector3(0, -AXIS_LENGTH, 0), new THREE.Vector3(0, AXIS_LENGTH, 0), 0x00ff00);
    createAxis(new THREE.Vector3(0, 0, -AXIS_LENGTH), new THREE.Vector3(0, 0, AXIS_LENGTH), 0xffffff);
}

// Repositions object to focus screen on currently highlighted segment
function focusCurrentHighlight(){
  if (is_current_highlight_shown){
    object.position.set(correct_object_position[0], correct_object_position[1], correct_object_position[2]);
  } else {
    object.position.set(-highlight_position[0], 0, highlight_position[1]);
  }
  is_current_highlight_shown = !is_current_highlight_shown;
}

//Mouse clicks to highlight segments of code
//This section of code is a little buggy, and so for now has been left commented out.
//We address this in the report
function onMouseClick(event) {
    // the following line would stop any other event handler from firing
    // event.preventDefault();

    // update the mouse variable
    mouse.x = ( event.clientX / width ) * 2 - 1;
    mouse.y = - ( event.clientY / height ) * 2 + 1;
    // console.log(mouse.x, mouse.y);
    
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

//Recenters the view to the original orientation
// Doesn't affect the position or orientation of the object at all
function resetViewFunction(){
  camera.position.set(view_state.position.x, view_state.position.y,
    view_state.position.z);
  camera.rotation.set(view_state.rotation.x, view_state.rotation.y,
    view_state.rotation.z);
  controls.target.set(view_state.controlCenter.x,
    view_state.controlCenter.y, view_state.controlCenter.z);
  controls.update();
  render();
}

//Wrapper to clear and redraw the visualization
function update(){
  clear();
  $('#draw-upload').click();
}

// Rotates the object 90 degrees in the y direction
// Doesn't affect the view
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
    if (rotateState == -2.0) {
      setObjectPosition(-center.x, lineGeometry.boundingBox.max.y, 0);
    } else if (rotateState == -3.0){
      setObjectPosition(-center.x, lineGeometry.boundingBox.max.z, -center.y);
    } else if (rotateState == 0.0){
      setObjectPosition(-center.x, -lineGeometry.boundingBox.min.y, 0);
    } else {
      setObjectPosition(-center.x, 0, center.y);
    }
  }
}

// Rotates the object 90 degrees in the x direction
// Doesn't affect the view
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
      setObjectPosition(-center.x, 0, -center.y);
    } else if (rotateState == -2.0){
      setObjectPosition(center.x, 0, -center.y);
    } else if (rotateState == -3.0){
      setObjectPosition(center.x, 0, center.y);
    } else {
      setObjectPosition(-center.x, 0, center.y);
    }
  }
}

// Enables or disables the zoom mode
function modeChange(){
  if (modeSlider.checked) mode.html('Mode: Highlight');
  else mode.html('Mode: Pan/Zoom');
}

/* Button Helpers */

// Makes the highlight beam over the appropriate lines that must be highlighted
function makeHighlightBeam(two_points){
  object.remove(highlight_beam);

  highlight_beam = new THREE.Object3D();

  var highlightColor, highlightMaterial, highlightCube;
  var current_point = two_points[0];
  var g = 0, b = 0;
  var step = 0.1;
  var x_up = two_points[1][0] > two_points[0][0];
  var y_up = two_points[1][1] > two_points[0][1];
  var z_up = two_points[1][2] > two_points[0][2];

  highlight_position[0] = two_points[0][0];
  highlight_position[1] = two_points[0][1];
  highlight_position[2] = two_points[0][2];

  $('#x_coord').html(two_points[0][0].toFixed(2));
  $('#y_coord').html(two_points[0][1].toFixed(2));
  $('#z_coord').html(two_points[0][2].toFixed(2));

  while (current_point[0].toFixed(1) != two_points[1][0].toFixed(1) || 
    current_point[1].toFixed(1) != two_points[1][1].toFixed(1) || 
    current_point[2].toFixed(1) != two_points[1][2].toFixed(1)){

    highlightMaterial = new THREE.MeshBasicMaterial({color: new THREE.Color(1,g,b), wireframe: true});
    highlightCube = new THREE.Mesh(highlight_geometry, highlightMaterial);

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
    highlight_beam.add(highlightCube);
  }
  object.add(highlight_beam);

  if (is_current_highlight_shown) focusCurrentHighlight();
}

// Updates the object's position for optimal visibility
function setObjectPosition(x,y,z){
  object.position.set(x,y,z);
  correct_object_position = [x,y,z];
}

/* Initialization Helpers */

//Creates an axis from p1 to p2 of color color
//p1, p2 are THREE.Vector3's
//color is a THREE.Color
function createAxis(p1, p2, color){
  var line, axisGeometry = new THREE.Geometry(),
    lineMat = new THREE.LineBasicMaterial({color: color});
  axisGeometry.vertices.push(p1, p2);
  line = new THREE.Line(axisGeometry, lineMat);
  scene.add(line);
}

// This function initializes the state variables
function init() {
    // Renderer
    renderer = new THREE.WebGLRenderer({clearColor:0xffffff, clearAlpha: 1, antialias: true});
    // renderer.shadowMap.enabled = true;
    renderer.setSize($('#top-half').width(), $('#top-half').height());
    window.addEventListener('resize', onWindowResize, false);
    document.getElementById("visualization").appendChild(renderer.domElement);

    // Scene
    scene = new THREE.Scene();
    
    // Camera
    width = $('#top-half').width();
    height = $('#top-half').height();
    camera = new THREE.PerspectiveCamera(FOV, width / height, NEAR, FAR);
    scene.add(camera);

    // Controls
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.update();

    // Lights
    ambient_light = new THREE.AmbientLight(0x505050, 2.5);
    scene.add(ambient_light);

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

    // Axes
    createAxis(new THREE.Vector3(-AXIS_LENGTH, 0, 0), new THREE.Vector3(AXIS_LENGTH, 0, 0), 0xFF0000);
    createAxis(new THREE.Vector3(0, -AXIS_LENGTH, 0), new THREE.Vector3(0, AXIS_LENGTH, 0), 0x00FF00);
    createAxis(new THREE.Vector3(0, 0, -AXIS_LENGTH), new THREE.Vector3(0, 0, AXIS_LENGTH), 0xFFFFFF);

    // State
    correct_object_position = [0,0,0];
    view_state = {};
    prev_x = 0;
    prev_y = 0;
    prev_z = 0;
    object = new THREE.Object3D();
    lineGeometry = new THREE.Geometry();
    onScreenObjects = [];
    animation_queue = [];
    scene.add(object);

    // Colors
    origin_color = new THREE.Color('red');
    dest_color = new THREE.Color('orange');
    color_one = new THREE.Color('#5b5959');
    color_two = new THREE.Color('#2b2727');
    current_color = color_one;

    // Mouse
    raycaster = new THREE.Raycaster();
    mouse = { x: 0, y: 0 };
    document.addEventListener('mousedown', onMouseClick, false);

    // HTML elements
    progress = jQuery('#progress');
    mode = jQuery('#mode');

    // Highlighting
    highlight_position = [0,0,0];
    is_current_highlight_shown = false;
    highlight_geometry = new THREE.BoxGeometry(0.5, 0.5, 0.5, 0.01, 0.01, 0.01);
    highlight_beam = new THREE.Object3D();

    // Button Controls
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

    var currentHighlightButton = $("#current_highlight");
    currentHighlightButton.click(focusCurrentHighlight);

    // Position
    controls.target.set(0, 0, 0);
    camera.position.set(-2.103831035351104, 53.65318572991317, 130.3430329819223);
    camera.rotation.set(-0.24539539345521694, 0.00008969377825654345, 0.000022463162163918027);
    view_state.position = camera.position.clone();
    view_state.rotation = camera.rotation.clone();
    view_state.controlCenter = controls.target.clone();
}


/* ###################################### SCRIPT ######################################*/

$(document).ready(function () {
    init();
    animate();
});

/* ###################################### NOTES ######################################*/

// X-AXIS is red
// Y-AXIS is green, rotated so that positive Y appears as positive Z on screen
// Z-AXIS is white, rotated so that positive Z appears as negative Y on screen

//This section of code is a little buggy, and so for now has been left commented out.
//We address this in the report. This section helps the mouse with highlighting.

// function addLine(workingLine){
//   // console.log(workingLine);
//   makeHighlightBeam(workingLine.point);
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



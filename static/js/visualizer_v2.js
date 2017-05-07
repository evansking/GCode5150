/* ###################################### GLOBAL VARIABLES ######################################*/
var modelLoaded=false;
var model;
var prevX=0, prevY= 0, prevZ=0;
var sliderHor, sliderVer;
var object;
var geometry;
var WIDTH = $('#top-half').width();
var HEIGHT = $('#top-half').height();
var renderer;
var scene;
var camera = new THREE.PerspectiveCamera(FOV, WIDTH/HEIGHT, NEAR, FAR);
var controls;
var halfWidth = $('#top-half').width() / 2;
var halfHeight = $('#top-half').height() / 2;
var mouseX = 0, mouseY = 0;

var renderOptions = {
  showMoves: true,
  colorLine: 0xff0000,
  colorMove: 0x00ff00,
  rendererType: "webgl"
};

function render(){
  // controls.update();
  renderer.render(scene, camera);
  requestAnimationFrame(render);
}

function buildModelIteration(point){
  geometry.vertices.push( new THREE.Vector3(prevX, prevY, prevZ));
  geometry.vertices.push( new THREE.Vector3(point[0], point[1], point[2]));
  prevX = point[0];
  prevY = point[1];
  prevZ = point[2];
}

//This function takes in a list of lists, where each list is a path
//It draws lines along each point on an individual path
//It starts its next drawing at the beginning of a point in a given point list
function path(pointList, animated){
    console.log('beginning points, pointList.length: ');
    console.log(pointList.length);
    prevX=0;
    prevY=0;
    prevZ=0;
    object = new THREE.Object3D();
    geometry = new THREE.Geometry();
    init();
    var i,j;
    for(i=0;i<pointList.length;i+=1){
      prevX = pointList[i][0][0];
      prevY = pointList[i][0][1];
      prevZ = pointList[i][0][2];
      for(j=0;j<pointList[i].length;j++){
        buildModelIteration(pointList[i][j]);
      }
      var lineMaterial = new THREE.LineBasicMaterial({color: renderOptions.colorLine, opacity: 0.6, fog: false});
      geometry.computeBoundingBox();
      object.add(new THREE.Line(geometry, lineMaterial, THREE.LineSegments));
      scene.add(new THREE.Line(geometry, lineMaterial, THREE.LineSegments));
      var center = new THREE.Vector3().addVectors(geometry.boundingBox.min, geometry.boundingBox.max).divideScalar(2);
      object.position = center.multiplyScalar(-1);
    }
    console.log(geometry);
    render();
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

function debugAxis(axisLength){
        //Shorten the vertex function
        function v(x,y,z){
            return new THREE.Vector3(x,y,z);
        }

        //Create axis (point1, point2, colour)
        function createAxis(p1, p2, color){
            var line, lineGeometry = new THREE.Geometry(),
                lineMat = new THREE.LineBasicMaterial({color: color, lineWidth: 1});
            lineGeometry.vertices.push(p1, p2);
            line = new THREE.Line(lineGeometry, lineMat);
            scene.add(line);
        }

        createAxis(v(-axisLength, 0, 0), v(axisLength, 0, 0), 0xFF0000);
        createAxis(v(0, -axisLength, 0), v(0, axisLength, 0), 0x00FF00);
        createAxis(v(0, 0, -axisLength), v(0, 0, axisLength), 0x0000FF);
}


function init(){
  modelLoaded = false;
  if(renderOptions.rendererType == "webgl") renderer = new THREE.WebGLRenderer({clearColor:0xffffff, clearAlpha: 1});
  else if(renderOptions.rendererType == "canvas") renderer = new THREE.CanvasRenderer({clearColor:0xffffff, clearAlpha: 1});
  else { console.log("unknown rendererType"); return;}

  scene = new THREE.Scene();
  var $container = $('#visualization');
  camera.position.z = 200;
  scene.add(camera);
  renderer.setSize(WIDTH, HEIGHT);
  $container.empty();
  $container.append(renderer.domElement);

  controls = new THREE.TrackballControls(camera, renderer.domElement);
  // controls = new THREE.OrbitControls(camera, renderer.domElement);
  controls.rotateSpeed = 1.0;
  controls.zoomSpeed = 1.2;
  controls.panSpeed = 0.8;

  controls.noZoom = false;
  controls.noPan = false;

  controls.staticMoving = true;
  controls.dynamicDampingFactor = 0.3;

  controls.keys = [ 65, 83, 68 ];

}

function isModelReady(){
  return modelLoaded;
}

function setOption(options){
  for(var opt in options){
    if(options.hasOwnProperty(opt))renderOptions[opt] = options[opt];
  }
}

function setModel(mdl){
  model = mdl;
  modelLoaded=false;
}

function doRender(){
  //            model = mdl;
  prevX=0;
  prevY=0;
  prevZ=0;
  object = new THREE.Object3D();
  geometry = new THREE.Geometry();
  this.init();
  if (model) modelLoaded=true;
  else return;
  //   buildModel();
  buildModelIteratively();
  scene.add(object);
  debugAxis(100);

  var mousemove = function(e){
    mouseX = e.clientX - halfWidth;
    mouseY = e.clientY - halfHeight;
  };
  // Action!
  render();
}
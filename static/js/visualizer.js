// Add documentation
var SCREEN_WIDTH = window.innerWidth;
var SCREEN_HEIGHT = window.innerHeight;
var FLOOR = -250;

var container;

var camera, scene;

var material, geometry;
var renderer;

var raycaster;
var mouse;

var objects = [];

var red, blue;


function init() {

    container = document.getElementById('visualization');

    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 500);
    camera.position.set(0, 0, 100);
    camera.lookAt(new THREE.Vector3(0, 0, 0));

    scene = new THREE.Scene();

    material = new THREE.LineBasicMaterial({color: 0xaaaaaa});

    geometry = new THREE.Geometry();

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

}

function onDocumentMouseDown(event) {
    event.preventDefault();

    mouse.x = ( event.clientX / renderer.domElement.clientWidth ) * 2 - 1;
    mouse.y = -( event.clientY / renderer.domElement.clientHeight ) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);

    var intersects = raycaster.intersectObjects(objects);

    //Do something with intersecting objects.
}


$(document).ready(function () {
    init();
    document.addEventListener('mousedown', onDocumentMouseDown, false);
});
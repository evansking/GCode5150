var camera, scene, renderer, startTime, object;
var objects = []

function init() {
    camera = new THREE.PerspectiveCamera(
        FOV, window.innerWidth / window.innerHeight, NEAR, FAR);
    camera.position.set(0, 2.7, 4);
    scene = new THREE.Scene();
    // Lights
    scene.add(new THREE.AmbientLight(0x505050));
    var dirLight = new THREE.DirectionalLight(0x55505a, 2.5);
    dirLight.position.set(0, 3, 0);
    dirLight.castShadow = true;
    dirLight.shadow.camera.near = 1;
    dirLight.shadow.camera.far = 10;
    dirLight.shadow.camera.right = 1;
    dirLight.shadow.camera.left = -1;
    dirLight.shadow.camera.top = 1;
    dirLight.shadow.camera.bottom = -1;
    dirLight.shadow.mapSize.width = 1024;
    dirLight.shadow.mapSize.height = 1024;
    scene.add(dirLight);
    // ***** Clipping planes: *****
    var localPlane = new THREE.Plane(new THREE.Vector3(0, -1, 0), 0.8),
        globalPlane = new THREE.Plane(new THREE.Vector3(-1, 0, 0), 0.1);

    var ground = new THREE.Mesh(
        new THREE.PlaneBufferGeometry(9, 9, 1, 1),
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
    document.body.appendChild(renderer.domElement);
    // ***** Clipping setup (renderer): *****
    var globalPlanes = [globalPlane],
        Empty = Object.freeze([]);
    renderer.clippingPlanes = Empty; // GUI sets it to globalPlanes
    renderer.localClippingEnabled = true;
    // Controls
    var controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.target.set(0, 1, 0);
    controls.update();

}
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}



$(document).ready(function () {
    init();
    animate();
});


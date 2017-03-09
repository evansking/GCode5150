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

function draw(p1, p2) {
    var material = new THREE.LineBasicMaterial({color: 0x80ee10, linewidth: 10})
    var geometry = new THREE.Geometry()
    geometry.vertices.push(new THREE.Vector3(p1.x,p1.y,p1.z))
    geometry.vertices.push(new THREE.Vector3(p2.x,p2.y,p2.z))
    var line = new THREE.Line(geometry, material)
    scene.add(line)
    renderer.render(scene, camera);
    return line
}

$(document).ready(function () {
    init();
    animate();
    draw({x: -5, y: -5, z: 0}, {x: 5, y: 5, z: 0})
});


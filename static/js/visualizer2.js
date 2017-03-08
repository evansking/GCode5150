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


    init();

    function init() {

        container = document.getElementById( 'container' );

        camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 500);
        camera.position.set(0, 0, 100);
        camera.lookAt(new THREE.Vector3(0, 0, 0));

        scene = new THREE.Scene();

        material = new THREE.LineBasicMaterial({ color: 0xaaaaaa });

        geometry = new THREE.Geometry();
        geometry.vertices.push(new THREE.Vector3(-10, 0, 0));
        geometry.vertices.push(new THREE.Vector3(0, 10, 0));
        geometry.vertices.push(new THREE.Vector3(10, 0, 0));

        renderer = new THREE.WebGLRenderer();
        renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(renderer.domElement);

        var line = new THREE.Line(geometry, material);

        objects.push(line);

        scene.add(line);
        renderer.render(scene, camera);

        raycaster = new THREE.Raycaster();
        mouse = new THREE.Vector2();

        red = new THREE.Color('red');
        blue = new THREE.Color('skyblue');

        document.addEventListener( 'mousedown', onDocumentMouseDown, false );

    }

    function onDocumentMouseDown( event ) {
        console.log('stuff');
        event.preventDefault();

        mouse.x = ( event.clientX / renderer.domElement.clientWidth ) * 2 - 1;
        mouse.y = - ( event.clientY / renderer.domElement.clientHeight ) * 2 + 1;

        console.log(mouse.x, mouse.y);
        raycaster.setFromCamera( mouse, camera );

        var intersects = raycaster.intersectObjects( objects );

        if (intersects.length > 0) {

            addLine(intersects[0]);
        } else {
            console.log('suck me');
        }

    }

    function addLine(workingLine){
        if (workingLine.object.material.color.equals(red)){
            workingLine.object.material.color = blue;
        } else {
            workingLine.object.material.color = red;
        }

        renderer.render(scene, camera);
    }
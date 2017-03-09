// Add documentation

function init() {

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
/**
 * Created by EvanKing on 4/8/17.
 *
 * This file defines the Javascipt functions necessary to construct the IDE style GCode editors at the bottom of the index page
 */

// Function to allow for the IDE to be split into two divs and have width adjusted by drag
// Adapted from http://jsfiddle.net/gaby/Bek9L/1779/
function IDESetDragHorizontal() {
    var isResizing = false,
        lastDownX = 0;

    $(function () {
        var container = $('#container'),
            left = $('#left_panel'),
            right = $('#right_panel'),
            handle = $('#drag');

        handle.on('mousedown', function (e) {
            isResizing = true;
            lastDownX = e.clientX;
        });

        $(document).on('mousemove', function (e) {
            // we don't want to do anything if we aren't resizing.
            if (!isResizing)
                return;

            var offsetRight = container.width() - (e.clientX - container.offset().left);

            left.css('right', offsetRight);
            right.css('width', offsetRight);
        }).on('mouseup', function (e) {
            // stop resizing
            isResizing = false;
        });
    });
}

// TODO
function IDESetDragVertical() {
    var isResizing = false,
        lastDownY = 0;
}

function disableBodyScroll() {
    $('html, body').css({
        overflow: 'hidden',
        height: '100%'
    });
}


function uploadFile() {
    $('#upload-file').change(function () {
        var reader = new FileReader();
        reader.addEventListener('load', function () {
            codeEditor.leftEditor.setValue(this.result);
            codeEditor.leftEditor.clearSelection();
            codeEditor.leftEditor.resize(true);
            codeEditor.leftEditor.moveCursorTo(0, 0);
            codeEditor.leftEditor.getSession().setScrollTop(0);
        });
        file = document.querySelector('#upload-file').files[0];
        reader.readAsText(file);
    });
}

function uploadDraw() {
    $('#draw-upload').click(function (e) {
        data = codeEditor.leftEditor.getValue();
        console.log('draw clicked');
        // console.log(data);
        $.ajax({
            type: 'POST',
            url: '/draw',
            data: data,
            contentType: false,
            cache: false,
            processData: false,
        });
        e.stopImmediatePropagation();
        return false;
    });
}

function disableBodyScroll() {
    $('html, body').css({
        overflow: 'hidden',
        height: '100%'
    });
}

function getLineNumber() {
    $('body').click(function (e) {
        if ($(e.target).hasClass('ace_gutter-cell')) {
            lineNum = $(e.target).text();
            $.ajax({
                type: 'POST',
                url: '/points',
                data: lineNum,
                contentType: false,
                cache: false,
                processData: false,
                success: function (data) {
                    var two_points = JSON.parse(data).points;
                    if (two_points.length > 0) {
                        // var material = new THREE.LineBasicMaterial({color: white, linewidth: 100});
                        // var geometry = new THREE.Geometry();
                        // var currentLine = new THREE.Line(geometry, material);
                        //
                        // var origin = new THREE.Vector3(two_points[0][0], two_points[0][1], two_points[0][2]);
                        // var destination = new THREE.Vector3(two_points[1][0], two_points[1][1], two_points[1][2]);
                        // currentLine.geometry.vertices.push(origin);
                        // currentLine.geometry.vertices.push(destination);
                        makeHighlightCube(new THREE.Vector3(two_points[0][0], two_points[0][1], two_points[0][2]));
                        // camera.position.x = two_points[0][0];
                        // camera.position.y = two_points[0][1];
                        // camera.position.z = two_points[0][2];
                        // camera.rotation.set(1.4, 0, 0);
                        // console.log(camera.position);
                        // scene.add(currentLine);
                        // renderer.render(scene, camera);
                    }
                },
            });
        }
    });
}

function download() {
    $('#download-file').click(function (e) {
        console.log("Downloading File")
        data = codeEditor.leftEditor.getValue();
        $.ajax({
            type: 'POST',
            url: '/download',
            data: data,
            contentType: false,
            cache: false,
            processData: false,
            success: function (location) {
                window.location = window.location.href + location
            },
        });
    });
}


$(document).ready(function () {
    $('.hor-half').height(($(window).height() / 2) - ($('nav').height() / 2));
    $('#left_panel').height($('.hor-half').height() - $('#left_toolbar').height());
    codeEditor.init();
    disableBodyScroll();
    uploadDraw();
    uploadFile();
    getLineNumber();
    download();
});



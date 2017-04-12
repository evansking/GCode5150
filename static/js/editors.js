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

//function to add and editor with a default value to a div basse din by id
function addEditor(id, value) {
    left_editor = $(id)
    var codemirror = CodeMirror(function (elt) {
        left_editor.append(elt);
    }, {
        value: value,
        mode: "javascript",
        lineNumbers: true,
        styleActiveLine: true,
        lineWrapping: true,
        theme: "cobalt"
    });
    return codemirror;
}

//upload a file to the server
function uploadFile(leftCodemirror) {
    $('#upload-file').change(function () {
        //no bot selected
        var form_data = new FormData($('#upload-file')[0]);
        $.ajax({
            type: 'POST',
            url: '/uploader',
            data: form_data,
            contentType: false,
            cache: false,
            processData: false,
            success: function (data) {
                content = JSON.parse(data)['content']
                leftCodemirror.setValue(content);
            },
        });
    });
};

// uploads the GCode commands to the server which responds with the necessary points
function uploadDraw() {
    $('#draw-upload').click(function () {
        $.ajax({
            type: 'POST',
            url: '/draw',
            data: data,
            contentType: false,
            cache: false,
            processData: false,
            success: function (data) {
                content = JSON.parse(data)['content']
                console.log(content)
                //draw that shit
            },
        });
    });
};

function disableBodyScroll(){
      $('html, body').css({
        overflow: 'hidden',
        height: '100%'
    });
}

$(document).ready(function () {
    $('.hor-half').height(($(window).height() / 2) - ($('nav').height() / 2));
    $('#left_panel').height($('.hor-half').height() - $('#left_toolbar').height())
    IDESetDragHorizontal();
    var leftCodemirror = addEditor('#left_panel', "X10\nMove X axis to 10\nX0\nMove X axis to 0\n");
    uploadFile(leftCodemirror);
    disableBodyScroll();
    uploadDraw();
    var rightCodemirror = addEditor('#right_panel', "")
});
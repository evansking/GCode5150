/**
 * Created by EvanKing on 4/8/17.
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

function IDESetDragVertical() {
    var isResizing = false,
        lastDownY = 0;

}

//function to add the left editor
function addLeftEditor() {
    left_editor = $('#left_panel')
    var leftCodemirror = CodeMirror(function (elt) {
        left_editor.append(elt);
    }, {
        value: "X10\nMove X axis to 10\nX0\nMove X axis to 0\n",
        mode: "javascript",
        lineNumbers: true,
        styleActiveLine: true,
        lineWrapping: true,
        theme: "cobalt"
    });
    return leftCodemirror;
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


$(document).ready(function () {
    $('.hor-half').height(($(window).height() / 2) - ($('nav').height() / 2));
    IDESetDragHorizontal();
    var leftCodemirror = addLeftEditor()
    uploadFile(leftCodemirror)
});
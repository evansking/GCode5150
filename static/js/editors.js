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

function disableBodyScroll(){
      $('html, body').css({
        overflow: 'hidden',
        height: '100%'
    });
}

//upload a file to the server
function uploadFile(leftEditor) {
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
                console.log(data)
            },
        });
    });
}

function uploadDraw() {
    $('#draw-upload').click(function () {
        data = codeEditor.leftEditor.getValue();
        console.log('draw clicked');
        $.ajax({
            type: 'POST',
            url: '/draw',
            data: data,
            contentType: false,
            cache: false,
            processData: false,
            success: draw,
        });
    });
}

function draw (data) {
    var nextPoints = $.parseJSON(JSON.parse(data).points);
    path(nextPoints, false);
    var requestAgain = $.parseJSON(JSON.parse(data).again);
    if (requestAgain){
      $.ajax({
          type: 'POST',
          url: '/draw',
          data: 'drawAgain',
          contentType: false,
          cache: false,
          processData: false,
          success: draw,
      });
    }
}


function disableBodyScroll(){
      $('html, body').css({
        overflow: 'hidden',
        height: '100%'
    });
}

$(document).ready(function () {
    $('.hor-half').height(($(window).height() / 2) - ($('nav').height() / 2));
    $('#left_panel').height($('.hor-half').height() - $('#left_toolbar').height());
    codeEditor.init();
    disableBodyScroll();
    uploadDraw();
    uploadFile(codeEditor.leftEditor);
});
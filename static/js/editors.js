/**
 * Created by EvanKing on 4/8/17.
 *
 * This file defines the Javascript functions necessary to construct the IDE style GCode editors at the bottom of the index page as well as
 * send the appropriate POST back to the server per button editor button click.
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

function disableBodyScroll() {
    $('html, body').css({
        overflow: 'hidden',
        height: '100%'
    });
}

// Function triggered when a user clicks the upload file button.
// The file is read in chunks and rendered by the editor
function uploadFile() {
    $('#upload-file').change(function () {
        var file = document.getElementById('upload-file').files[0];
        var progress = jQuery('#progress');

        if (file) {
            var reader = new FileReader();
            var size = file.size;
            var chunk_size = Math.pow(2, 13);
            var chunks = [];

            var offset = 0;
            var bytes = 0;


            reader.onloadend = function (e) {
                if (e.target.readyState == FileReader.DONE) {
                    var chunk = e.target.result;
                    bytes += chunk.length;

                    // concatenate each chunk to chunks list
                    chunks.push(chunk);

                    progress.html("Uploading: " + bytes + ' bytes...');

                    if ((offset < size)) {
                        offset += chunk_size;
                        var blob = file.slice(offset, offset + chunk_size);

                        reader.readAsText(blob);

                    } else {
                        var content = chunks.join("");

                        console.log("content is ready!");
                        progress.html("Hang tight, displaying file...");

                        // add content to editor
                        codeEditor.leftEditor.setValue(content);

                        //adjust editor for usabilitu
                        codeEditor.leftEditor.clearSelection();
                        codeEditor.leftEditor.resize(true);
                        codeEditor.leftEditor.moveCursorTo(0, 0);
                        codeEditor.leftEditor.getSession().setScrollTop(0);
                        progress.html("");
                    }
                    ;
                }


            };

            var blob = file.slice(offset, offset + chunk_size);
            reader.readAsText(blob);
        }
    });
}

// function triggered upon user clicking the upload button
// the content of the GCode in the editor is uploaded to the server
function uploadDraw() {
    $('#draw-upload').click(function (e) {
        data = codeEditor.leftEditor.getValue();
        console.log('draw clicked');
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

// returns the points associated with the line clicked on in the editor
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
                    console.log(two_points);
                    if (two_points.length > 0) {
                        makeHighlightCube(two_points);
                    }
                },
            });
        }
    });
}

// Save the current contents of the G-Code editor by writing them to a file and downloading
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


// Run the above functions when document is ready
$(document).ready(function () {
    $('.hor-half').height(($(window).height() / 2) - ($('nav').height() / 2));
    $('#left_panel').height($('.hor-half').height() - $('#left_toolbar').height());
    codeEditor.init();
    gCodeCompleter.init(codeEditor.leftEditor);
    disableBodyScroll();
    uploadDraw();
    uploadFile();
    getLineNumber();
    download();
});



/**
 * Created by EvanKing on 3/2/17.
 *
 * Socket.io client side example
 */
sid = "session cookie";

var socket = io.connect('http://' + document.domain + ':' + location.port);

socket.on('connect', function () {
    socket.emit("join", {room: io().id});
});

socket.on('test', function (next) {
    current = codeEditor.leftEditor.getValue();
    codeEditor.leftEditor.setValue(current + next);
    codeEditor.leftEditor.clearSelection();
    codeEditor.leftEditor.resize(true);
    codeEditor.leftEditor.moveCursorTo(0,0);
    codeEditor.leftEditor.getSession().setScrollTop(0);
});

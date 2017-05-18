/**
 * Created by EvanKing on 3/2/17.
 *
 * Socket.io initialization and handler for draw requests. When the server sends a draw request over the socket
 * it is caught by the .on(draw) handler below and draws the path
 */

var socket = io.connect('http://' + document.domain + ':' + location.port);

socket.on('connect', function () {
    socket.emit("join", {room: io().id});
});

socket.on('draw', function (points) {
    var parsedPoints = $.parseJSON(points);
    path(parsedPoints);
});

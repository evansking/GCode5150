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

socket.on('draw', function (points) {
    // append points to global queue here and then have path pull from that global queue
    path(points, false)
});

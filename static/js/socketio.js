/**
 * Created by EvanKing on 3/2/17.
 *
 * Socket.io client side example
 */
sid = "session cookie";

namespace = '';

var socket = io.connect('http://' + document.domain + ':' + location.port);

socket.on('connect', function () {
    socket.emit("join", {room: sid});
});

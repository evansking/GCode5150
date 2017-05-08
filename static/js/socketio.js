/**
 * Created by EvanKing on 3/2/17.
 *
 * Socket.io client side example
 */
sid = "session cookie";
num_calls = 0;

var socket = io.connect('http://' + document.domain + ':' + location.port);

socket.on('connect', function () {
    socket.emit("join", {room: io().id});
});

socket.on('draw', function (points) {
    // append points to global queue here and then have path pull from that global queue
    var parsedPoints = $.parseJSON(points);
    path(parsedPoints);
    // num_calls += 1;
    // console.log('call number: ', num_calls);
});

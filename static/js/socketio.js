/**
 * Created by EvanKing on 3/2/17.
 *
 * Socket.io client side example
 */
sid = "session cookie"

namespace = '/gcode';
socket = io.connect(location.protocol + '//' + document.domain + ':' + location.port + namespace, sid);

//new connection received
socket.on('event', function (msg) {
    console.log("event triggered")
});

import flask
from flask import request, Flask, render_template, url_for
from flask_socketio import SocketIO, send, emit

app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret!'
app.config['SECURITY_PASSWORD_SALT'] = 'secret'
socketio = SocketIO(app)

######################################################################
#                        User Authentication                         #
######################################################################


######################################################################
#                        Routing Logic                               #
######################################################################

@app.route('/')
def index():
    return flask.make_response(flask.render_template('index.html'))


######################################################################
#                        SocketIO Logic                              #
#   Documentation @ https://flask-socketio.readthedocs.io/en/latest/ #
######################################################################

#Socket IO handler example
@socketio.on('event')
def handle_event(message):
    print('received message: ' + message)

#Socket IO send example
@socketio.on('other_event')
def send_message(message):
    send(message, namespace='/other_event')

#Socket IO emit example
@socketio.on('another_event')
def emit_message(message):
    emit('my response', message, namespace='/another_event')


if __name__ == '__main__':
    socketio.run(app)

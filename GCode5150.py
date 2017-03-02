import flask
from flask import request, Flask, render_template, url_for
from flask_socketio import SocketIO, send, emit

app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret!'
app.config['SECURITY_PASSWORD_SALT'] = 'secret'
app.debug = True

# Set this variable to "threading", "eventlet" or "gevent" to test the
# different async modes, or leave it set to None for the application to choose
# the best option based on installed packages.
async_mode = None

socketio = SocketIO(app, async_mode=async_mode)

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

#Socket IO connection handler
@socketio.on('connect', namespace='/gcode')
def connect(sid):
    print("connected: ", sid)

#Socket IO send example
@socketio.on('other_event')
def send_message(message):
    send(message, namespace='/gcode')

#Socket IO emit example
@socketio.on('another_event')
def emit_message(message):
    emit('my response', message, namespace='/another_event')


if __name__ == '__main__':
    socketio.run(app)

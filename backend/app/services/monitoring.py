import time
from threading import Thread
from .mininet_simulation import net
from flask_socketio import emit

def start_monitoring():
    while True:
        monitoring_data = {'node1': {'bandwidth': 500}, 'node2': {'bandwidth': 300}}
        emit('monitoring_data', monitoring_data)
        time.sleep(2)
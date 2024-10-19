from flask import Blueprint, jsonify
from .models import (NetworkTopology, NodeConnections, TrafficFlow, AttackEvents, IDSAlerts, AnomalyDetection) 
from . import db, socketio
from flask_socketio import emit
import random

# Define the Blueprint 
main = Blueprint('main', __name__) 

# Helper function for serializing SQLAlchemy objects to dictionaries 
def serialize_instance(instance): 
    return instance.serialize() 

# ----------- Network Topology APIs ----------- 
@main.route('/api/network_overview', methods=['GET']) 
def get_network_overview():
    """
    Get network nodes, their connections, and real-time traffic data for visualisation
    """ 
    # Get all nodes
    nodes =  NetworkTopology.query.all()

    # Get connections between nodes
    connections = NodeConnections.query.all()

    # Get real-time traffic
    traffic_flows = TrafficFlow.query.all()

    # Response data
    network_data = {
        'nodes': [node.serialize() for node in nodes],
        'connections': [connection.serialize() for connection in connections],
        'traffic_flow': [flow.serialize() for flow in traffic_flows]
    }
    return jsonify(network_data) 

# -------WebSocket: Real-Time Traffic Flow Simulation-------
@socketio.on('start_simulation')
def start_real_time_traffic_simulation():
    """
    Emit real-time traffic flow data over Websockets.
    """
    for _ in range(10):
        # Randomly simulate traffic flow
        new_flow = {'source_node': f"Node-{random.randint(1,5)}",
                    'destination_node': f"Node-{random.randint(1,5)}",
                    'protocol': random.choice(['TCP', 'UCP', 'ICMP']),
                    'packet_size': random.randint(64, 1500),
                    'latency': round(random.uniform(0.1, 50.0,), 2),
                    'flow_status': "Active"
        }
        emit('traffic_update', new_flow.serialize(), broadcast=True) # Emit real-time data to frontend

# # ----------- Traffic Flow APIs ----------- 
# @main.route('/api/traffic_flow', methods=['GET']) 
# def get_traffic_flow(): 
#     """Fetch all traffic flow data.""" 
#     traffic = TrafficFlow.query.all() 
#     return jsonify([serialize_instance(flow) for flow in traffic]) 
  
# ----------- Attack Events APIs ----------- 
@main.route('/api/attack_events', methods=['GET']) 
def get_attack_events(): 
    """Fetch all attack events data.""" 
    events = AttackEvents.query.all() 
    return jsonify([serialize_instance(event) for event in events]) 

# ----------- IDS Alerts APIs ----------- 
@main.route('/api/ids_alerts', methods=['GET']) 
def get_ids_alerts(): 
    """Fetch all IDS alerts data.""" 
    alerts = IDSAlerts.query.all() 
    return jsonify([serialize_instance(alert) for alert in alerts]) 

# ----------- Anomaly Detection APIs ----------- 
@main.route('/api/anomaly_detection', methods=['GET']) 
def get_anomaly_detections(): 
    """Fetch all anomaly detection data.""" 
    anomalies = AnomalyDetection.query.all() 
    return jsonify([serialize_instance(anomaly) for anomaly in anomalies]) 
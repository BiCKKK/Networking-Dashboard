from flask import Blueprint, jsonify, request
from . import db, socketio
from .models import Node, NetworkFunction, Connection
from flask_socketio import emit
from .services.mininet_simulation import start_mininet_topology
from .services.ebpf_control import install_function_on_node

# Define the Blueprint 
main = Blueprint('main', __name__) 

@main.route('/api/connect', methods=['POST']) 
def connect_network(): 
    """Start the Mininet network simulation.""" 
    start_mininet_topology() 
    return jsonify({"status": "Network simulation started"}) 

@main.route('/api/nodes', methods=['GET']) 
def get_nodes(): 
    """Fetch all nodes with details.""" 
    nodes = Node.query.all() 
    return jsonify([node.serialize() for node in nodes]) 
 
@main.route('/api/functions/install', methods=['POST']) 
def install_function(): 
    """Install eBPF function on a specified node.""" 
    data = request.get_json() 
    node_id = data.get('node_id') 
    function_type = data.get('function_type') 

    # Call the function to install eBPF function 
    success = install_function_on_node(node_id, function_type) 
    if success: 
        return jsonify({"status": "Function installed successfully"}) 
    else: 
        return jsonify({"error": "Failed to install function"}), 500 



 
 
from flask import Blueprint, jsonify, request, current_app 
from . import db, socketio 
from .models import Node, NetworkFunction, Connection 
from flask_socketio import emit 
import subprocess 
import os 

# Define the Blueprint 
main = Blueprint('main', __name__) 

@main.route('/', methods=['GET']) 
def home(): 
    return jsonify({"message": "Welcome to the network dashboard API"}) 

@main.route('/api/connect', methods=['POST', 'GET']) 
def connect_network(): 
    """Start the Mininet network simulation.""" 
    try: 
        bp_path = os.path.join(current_app.config['BPFABRIC_PATH'], "controller", "service_broker.py") 
        result = subprocess.run(["python3", bp_path], capture_output=True, text=True) 
        return jsonify({"status": "Network simulation started", "output": result.stdout, "error": result.stderr}) 
    except Exception as e: 
        return jsonify({"error": str(e)}), 500 
  
@main.route('/api/start_sg_simulation', methods=['POST', 'GET']) 
def start_sg_simulation(): 
    """Start the SmartGrid simulation network defined in sgfabric.py.""" 
    try: 
        sg_path = current_app.config['SMARTGRIDSIM_PATH'] 
        result = subprocess.run(["python3", sg_path], capture_output=True, text=True) 
        return jsonify({"status": "SG Simulation started", "output": result.stdout, "error": result.stderr}) 
    except Exception as e: 
        return jsonify({"error": str(e)}), 500 

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

    # Construct the path to the function script 
    bp_script = os.path.join(current_app.config['BPFABRIC_PATH'], "functions", f"{function_type}.c") 
    if not os.path.exists(bp_script): 
        return jsonify({"error": "Function script not found"}), 404 

    # Compile and install the function (placeholder logic) 
    result = subprocess.run(["gcc", bp_script, "-o", "/tmp/function.o"], capture_output=True, text=True) 
    if result.returncode == 0: 
        return jsonify({"status": "Function installed successfully"}) 
    else: 
        return jsonify({"error": "Failed to install function", "details": result.stderr}), 500 
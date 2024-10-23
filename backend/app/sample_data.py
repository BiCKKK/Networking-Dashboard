from faker import Faker 
from datetime import datetime 
import random 
from . import db 
from .models import (NetworkTopology, NodeConnections, TrafficFlow) 

fake = Faker() 

def generate_sample_data(): 
    # Clear existing data 
    try: 
        db.session.query(NodeConnections).delete() 
        db.session.query(NetworkTopology).delete() 
        db.session.query(TrafficFlow).delete() 
    except Exception as e: 
        db.session.rollback() 
        print(f"Error clearing existing data: {e}") 
        return 
    
    # Real Network Topology Data (from your shared diagram) 
    real_network_data = [ 
        {"node_name": "CONTROL SW", "node_type": "Control Switch", "status": "Active"}, 
        {"node_name": "CONTROL SCADA", "node_type": "SCADA", "status": "Active"}, 
        {"node_name": "WAN R1", "node_type": "WAN", "status": "Active"}, 
        {"node_name": "WAN R2", "node_type": "WAN", "status": "Active"}, 
        {"node_name": "DPS GW", "node_type": "Gateway", "status": "Active"}, 
        {"node_name": "DPS RS", "node_type": "Router", "status": "Active"}, 
        {"node_name": "DPS HV", "node_type": "HighVoltageSystem", "status": "Active"}, 
        {"node_name": "IED1", "node_type": "IED", "status": "Active"}, 
        {"node_name": "IED2", "node_type": "IED", "status": "Active"}, 
        {"node_name": "DPS MV", "node_type": "MediumVoltageSystem", "status": "Active"}, 
        {"node_name": "IED3", "node_type": "IED", "status": "Active"}, 
        {"node_name": "IED4", "node_type": "IED", "status": "Active"}, 
        {"node_name": "DPS HMI", "node_type": "HMI", "status": "Active"}, 
        {"node_name": "DSS1 GW", "node_type": "Gateway", "status": "Active"}, 
        {"node_name": "IDS", "node_type": "IDS", "status": "Active"}, 
        {"node_name": "DSS1 RTU", "node_type": "RTU", "status": "Active"}, 
        {"node_name": "DSS2 GW", "node_type": "Gateway", "status": "Active"}, 
        {"node_name": "DSS2 RTU", "node_type": "RTU", "status": "Active"}  
    ] 
    # Insert real NetworkTopology data 
    network_topology_data = [NetworkTopology( 
        node_name=node["node_name"], 
        node_type=node["node_type"], 
        status=node["status"] 
    ) for node in real_network_data] 

    # Commit NetworkTopology data 
    try: 
        db.session.bulk_save_objects(network_topology_data) 
        db.session.commit() 
    except Exception as e: 
        db.session.rollback() 
        print(f"Error committing NetworkTopology data: {e}") 

    # Retrieve the saved nodes to use their IDs for connections 
    saved_nodes = NetworkTopology.query.all() 
    node_id_map = {node.node_name: node.id for node in saved_nodes} 

    # Real Node Connections Data (from your shared diagram) 
    real_connections_data = [ 
        {"source_node": "CONTROL SW", "destination_node": "CONTROL SCADA", "connection_type": "LAN", "connection_properties": ""}, 
        {"source_node": "CONTROL SW", "destination_node": "WAN R1", "connection_type": "WAN", "connection_properties": ""}, 
        {"source_node": "CONTROL SW", "destination_node": "WAN R2", "connection_type": "WAN", "connection_properties": ""},
        {"source_node": "CONTROL SW", "destination_node": "DPS GW", "connection_type": "LAN", "connection_properties": ""}, 
        {"source_node": "DPS GW", "destination_node": "DPS RS", "connection_type": "LAN", "connection_properties": ""}, 
        {"source_node": "DPS RS", "destination_node": "DPS HV", "connection_type": "LAN", "connection_properties": ""}, 
        {"source_node": "DPS HV", "destination_node": "IED1", "connection_type": "LAN", "connection_properties": ""}, 
        {"source_node": "DPS HV", "destination_node": "IED2", "connection_type": "LAN", "connection_properties": ""}, 
        {"source_node": "DPS RS", "destination_node": "DPS MV", "connection_type": "LAN", "connection_properties": ""}, 
        {"source_node": "DPS MV", "destination_node": "IED3", "connection_type": "LAN", "connection_properties": ""},
        {"source_node": "DPS MV", "destination_node": "IED4", "connection_type": "LAN", "connection_properties": ""}, 
        {"source_node": "DPS RS", "destination_node": "DPS HMI", "connection_type": "LAN", "connection_properties": ""}, 
        {"source_node": "WAN R1", "destination_node": "DSS1 GW", "connection_type": "WAN", "connection_properties": ""}, 
        {"source_node": "DSS1 GW", "destination_node": "IDS", "connection_type": "Security", "connection_properties": ""}, 
        {"source_node": "DSS1 GW", "destination_node": "DSS1 RTU", "connection_type": "IEC104", "connection_properties": ""}, 
        {"source_node": "WAN R2", "destination_node": "DSS2 GW", "connection_type": "WAN", "connection_properties": ""}, 
        {"source_node": "DSS2 GW", "destination_node": "DSS2 RTU", "connection_type": "IEC104", "connection_properties": ""} 
    ] 

    # Insert real NodeConnections data 
    node_connections_data = [ 
        NodeConnections( 
            source_node_id=node_id_map[connection["source_node"]], 
            destination_node_id=node_id_map[connection["destination_node"]], 
            connection_type=connection["connection_type"], 
            connection_properties=connection["connection_properties"] 
        ) 
        for connection in real_connections_data 
    ] 

    # Commit NodeConnections data 
    try: 
        db.session.bulk_save_objects(node_connections_data) 
        db.session.commit() 
        print("Real network topology and connections data inserted successfully.") 
    except Exception as e: 
        db.session.rollback() 
        print(f"Error committing NodeConnections data: {e}") 

    # Sample data for TrafficFlow (reduce to 20 flows) 
    traffic_flow_data = [] 
    for _ in range(20): 
        traffic = TrafficFlow( 
            source_node=fake.hostname(), 
            destination_node=fake.hostname(), 
            protocol=random.choice(['TCP', 'UDP', 'ICMP']), 
            packet_size=random.randint(64, 1500), 
            timestamp=fake.date_time_between(start_date='-5d', end_date='now'), 
            latency=round(random.uniform(0.1, 50.0), 2), 
            flow_status=random.choice(['Active', 'Closed']) 
        ) 
        traffic_flow_data.append(traffic) 

    # Commit TrafficFlow data 
    try: 
        db.session.bulk_save_objects(traffic_flow_data) 
        db.session.commit() 
        print("Sample traffic flow data generated successfully.") 
    except Exception as e: 
        db.session.rollback() 
        print(f"Error committing TrafficFlow data: {e}") 
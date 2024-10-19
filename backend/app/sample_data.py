from faker import Faker
from datetime import datetime, timedelta
import random
from . import db
from .models import (
    NetworkTopology, NodeConnections, TrafficFlow, PacketInspection, AttackEvents,
    IDSAlerts, AnomalyDetection
)

fake = Faker()

def generate_sample_data():
    # Clear existing data
    try:
        db.session.query(NodeConnections).delete()
        db.session.query(NetworkTopology).delete()
        db.session.query(TrafficFlow).delete()
        db.session.query(PacketInspection).delete()
        db.session.query(AttackEvents).delete()
        db.session.query(IDSAlerts).delete()
        db.session.query(AnomalyDetection).delete()
        db.session.commit()
    except Exception as e:
        db.session.rollback()
        print(f"Error clearing existing data: {e}")
        return

    # Lists to hold all generated objects for batch insertion
    network_topology_data = []
    node_connections_data = []
    traffic_flow_data = []
    packet_inspection_data = []
    attack_events_data = []
    ids_alerts_data = []
    anomaly_detection_data = []

    # Sample data for NetworkTopology (reduce to 10 nodes) 
    for _ in range(10): 
        topology = NetworkTopology( 
            node_name=fake.hostname(), 
            node_type=random.choice(['Switch', 'Router', 'Host']), 
            status=random.choice(['Active', 'Inactive']) 
        ) 
        network_topology_data.append(topology) 

    # Commit NetworkTopology data first (so we have node IDs for connections)
    try:
        db.session.bulk_save_objects(network_topology_data)
        db.session.commit()
    except Exception as e:
        db.session.rollback()
        print(f"Error committing NetworkTopology data: {e}")

    # Retrieve the saved nodes to use their IDs for connections
    saved_nodes = NetworkTopology.query.all()
    node_ids = [node.id for node in saved_nodes]

    # Sample data for NodeConnections (create 1-3 connections per node)
    for node in saved_nodes:
        connected_nodes = random.sample(node_ids, random.randint(1, 3)) # Pick 1-3 random nodes to connect
        for connected_node_id in connected_nodes:
            if connected_node_id != node.id: # Avoid self-connections
                connection = NodeConnections(
                    source_node_id = node.id,
                    destination_node_id = connected_node_id
                )
                node_connections_data.append(connection)
    
    # Sample data for TrafficFlow (reduce to 20 flows) 
    for _ in range(20): 
        traffic = TrafficFlow( 
            source_node=fake.hostname(), 
            destination_node=fake.hostname(), 
            protocol=random.choice(['TCP', 'UDP']), 
            packet_size=random.randint(64, 1500), 
            timestamp=fake.date_time_between(start_date='-5d', end_date='now'), 
            latency=round(random.uniform(0.1, 50.0), 2), 
            flow_status=random.choice(['Active', 'Closed']) 
        ) 
        traffic_flow_data.append(traffic) 

    # Sample data for PacketInspection (reduce to 15 packets) 
    for _ in range(15): 
        packet = PacketInspection( 
            source_ip=fake.ipv4(), 
            destination_ip=fake.ipv4(), 
            protocol=random.choice(['TCP', 'UDP']), 
            packet_size=random.randint(64, 1500), 
            timestamp=fake.date_time_between(start_date='-5d', end_date='now') 
        ) 
        packet_inspection_data.append(packet) 

    # Sample data for AttackEvents (reduce to 5 attacks) 
    for _ in range(5): 
        attack = AttackEvents( 
            attack_type=random.choice(['DoS', 'MITM']), 
            source_node=fake.hostname(), 
            target_node=fake.hostname(), 
            impact=random.choice(['Low', 'Medium', 'High']), 
            timestamp=fake.date_time_between(start_date='-5d', end_date='now'), 
            status=random.choice(['Detected', 'Mitigated']) 
        ) 
        attack_events_data.append(attack) 

    # Sample data for IDSAlerts (reduce to 7 alerts) 
    for _ in range(7): 
        ids_alert = IDSAlerts( 
            alert_message=fake.sentence(), 
            severity=random.choice(['Low', 'Medium', 'High']), 
            related_flow=random.randint(1, 20), 
            timestamp=fake.date_time_between(start_date='-5d', end_date='now') 
        ) 
        ids_alerts_data.append(ids_alert) 

    # Commit all changes in one batch
    try:
        db.session.bulk_save_objects(node_connections_data)
        db.session.bulk_save_objects(traffic_flow_data)
        db.session.bulk_save_objects(packet_inspection_data)
        db.session.bulk_save_objects(attack_events_data)
        db.session.bulk_save_objects(ids_alerts_data)
        db.session.bulk_save_objects(anomaly_detection_data)

        db.session.commit()
        print("Sample data generated successfully.")
    except Exception as e:
        db.session.rollback()
        print(f"Error committing sample data: {e}")

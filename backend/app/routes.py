# app/routes.py 

from flask import Blueprint, jsonify, request 
from .models import (NetworkTopology, TrafficFlow, DNSLog, RemoteAccessLog, SSLLog, 
                     FileIntegrityLog, SyslogEvent, AttackEvents, IDSAlerts,  
                     AnomalyDetection, Users, UserSessions) 
from . import db 
from datetime import datetime, timedelta

# Define the Blueprint 
main = Blueprint('main', __name__) 

# Helper function for serializing SQLAlchemy objects to dictionaries 
def serialize_instance(instance): 
    return {column.name: getattr(instance, column.name) for column in instance.__table__.columns} 

# ----------- Network Topology APIs ----------- 
@main.route('/api/network_topology', methods=['GET']) 
def get_network_topology(): 
    topology = NetworkTopology.query.all() 
    return jsonify([serialize_instance(node) for node in topology]) 

@main.route('/api/network_topology', methods=['POST']) 
def add_network_topology(): 
    data = request.get_json() 
    new_node = NetworkTopology( 
        node_name=data['node_name'], 
        node_type=data['node_type'], 
        status=data['status'], 
        location=data['location'], 
        connected_nodes=data['connected_nodes'] 
    ) 
    db.session.add(new_node) 
    db.session.commit() 
    return jsonify({"message": "Network node added successfully"}), 201 

# ----------- Traffic Flow APIs ----------- 
@main.route('/api/traffic_flow', methods=['GET']) 
def get_traffic_flow(): 
    traffic = TrafficFlow.query.all() 
    return jsonify([serialize_instance(flow) for flow in traffic]) 

@main.route('/api/traffic_flow', methods=['POST']) 
def add_traffic_flow(): 
    data = request.get_json() 
    new_flow = TrafficFlow( 
        source_node=data['source_node'], 
        destination_node=data['destination_node'], 
        protocol=data['protocol'], 
        packet_size=data['packet_size'], 
        timestamp=datetime.datetime.now(), 
        latency=data['latency'], 
        flow_status=data['flow_status'] 
    ) 
    db.session.add(new_flow) 
    db.session.commit() 
    return jsonify({"message": "Traffic flow added successfully"}), 201 

# ----------- DNS Log APIs ----------- 
@main.route('/api/dns_logs', methods=['GET']) 
def get_dns_logs(): 
    dns_logs = DNSLog.query.all() 
    return jsonify([serialize_instance(log) for log in dns_logs]) 

@main.route('/api/dns_logs', methods=['POST']) 
def add_dns_log(): 
    data = request.get_json() 
    new_dns_log = DNSLog( 
        query_name=data['query_name'], 
        query_type=data['query_type'], 
        response_code=data['response_code'], 
        source_ip=data['source_ip'], 
        destination_ip=data['destination_ip'], 
        timestamp=datetime.datetime.now() 
    ) 
    db.session.add(new_dns_log) 
    db.session.commit() 
    return jsonify({"message": "DNS log added successfully"}), 201 

# ----------- Remote Access Log APIs ----------- 
@main.route('/api/remote_access_logs', methods=['GET']) 
def get_remote_access_logs(): 
    remote_logs = RemoteAccessLog.query.all() 
    return jsonify([serialize_instance(log) for log in remote_logs]) 

@main.route('/api/remote_access_logs', methods=['POST'])
def add_remote_access_log(): 
    data = request.get_json() 
    new_remote_log = RemoteAccessLog( 
        user_name=data['user_name'], 
        source_ip=data['source_ip'], 
        destination_ip=data['destination_ip'], 
        access_type=data['access_type'], 
        access_result=data['access_result'], 
        timestamp=datetime.datetime.now() 
    ) 
    db.session.add(new_remote_log) 
    db.session.commit() 
    return jsonify({"message": "Remote access log added successfully"}), 201 

# ----------- SSL Log APIs ----------- 
@main.route('/api/ssl_logs', methods=['GET']) 
def get_ssl_logs(): 
    ssl_logs = SSLLog.query.all() 
    return jsonify([serialize_instance(log) for log in ssl_logs]) 

@main.route('/api/ssl_logs', methods=['POST']) 
def add_ssl_log(): 
    data = request.get_json() 
    new_ssl_log = SSLLog( 
        source_ip=data['source_ip'], 
        destination_ip=data['destination_ip'], 
        ssl_version=data['ssl_version'], 
        cipher_suite=data['cipher_suite'], 
        certificate_issuer=data['certificate_issuer'], 
        certificate_subject=data['certificate_subject'], 
        timestamp=datetime.datetime.now() 
    ) 
    db.session.add(new_ssl_log) 
    db.session.commit() 
    return jsonify({"message": "SSL log added successfully"}), 201 

# ----------- File Integrity Log APIs ----------- 
@main.route('/api/file_integrity_logs', methods=['GET']) 
def get_file_integrity_logs(): 
    logs = FileIntegrityLog.query.all() 
    return jsonify([serialize_instance(log) for log in logs]) 
  
@main.route('/api/file_integrity_logs', methods=['POST']) 
def add_file_integrity_log(): 
    data = request.get_json() 
    new_log = FileIntegrityLog( 
        file_path=data['file_path'], 
        status=data['status'], 
        modification_time=datetime.now() 
    ) 
    db.session.add(new_log) 
    db.session.commit() 
    return jsonify({"message": "File integrity log added successfully"}), 201 

# ----------- Syslog Event APIs ----------- 
@main.route('/api/syslog_events', methods=['GET']) 
def get_syslog_events(): 
    events = SyslogEvent.query.all() 
    return jsonify([serialize_instance(event) for event in events]) 

@main.route('/api/syslog_events', methods=['POST'])
def add_syslog_event(): 
    data = request.get_json() 
    new_event = SyslogEvent( 
        message=data['message'], 
        severity=data['severity'], 
        timestamp=datetime.now() 
    ) 
    db.session.add(new_event) 
    db.session.commit() 
    return jsonify({"message": "Syslog event added successfully"}), 201 

# ----------- Attack Events APIs ----------- 
@main.route('/api/attack_events', methods=['GET']) 
def get_attack_events(): 
    events = AttackEvents.query.all() 
    return jsonify([serialize_instance(event) for event in events]) 
  
@main.route('/api/attack_events', methods=['POST']) 
def add_attack_event(): 
    data = request.get_json() 
    new_event = AttackEvents( 
        event_type=data['event_type'], 
        description=data['description'], 
        timestamp=datetime.now() 
    ) 
    db.session.add(new_event) 
    db.session.commit() 
    return jsonify({"message": "Attack event added successfully"}), 201 

# ----------- IDS Alerts APIs ----------- 
@main.route('/api/ids_alerts', methods=['GET']) 
def get_ids_alerts(): 
    alerts = IDSAlerts.query.all() 

    return jsonify([serialize_instance(alert) for alert in alerts]) 

@main.route('/api/ids_alerts', methods=['POST']) 
def add_ids_alert(): 
    data = request.get_json() 
    new_alert = IDSAlerts( 
        alert_type=data['alert_type'], 
        source_ip=data['source_ip'], 
        destination_ip=data['destination_ip'], 
        timestamp=datetime.now() 
    ) 
    db.session.add(new_alert) 
    db.session.commit() 
    return jsonify({"message": "IDS alert added successfully"}), 201 

# ----------- Anomaly Detection APIs ----------- 
@main.route('/api/anomaly_detection', methods=['GET']) 
def get_anomaly_detections(): 
    anomalies = AnomalyDetection.query.all() 
    return jsonify([serialize_instance(anomaly) for anomaly in anomalies]) 

@main.route('/api/anomaly_detection', methods=['POST']) 
def add_anomaly_detection(): 
    data = request.get_json() 
    new_anomaly = AnomalyDetection( 
        anomaly_type=data['anomaly_type'], 
        description=data['description'], 
        timestamp=datetime.now() 
    ) 
    db.session.add(new_anomaly) 
    db.session.commit() 
    return jsonify({"message": "Anomaly detection added successfully"}), 201 

# ----------- User APIs ----------- 
@main.route('/api/users', methods=['GET']) 
def get_users(): 
    users = Users.query.all() 
    return jsonify([serialize_instance(user) for user in users]) 

@main.route('/api/users', methods=['POST']) 
def add_user(): 
    data = request.get_json() 
    new_user = Users( 
        username=data['username'], 
        password=data['password'],  # Ideally, hash the password before storing 
        role=data['role'], 
        created_at=datetime.now() 
    ) 
    db.session.add(new_user) 
    db.session.commit() 
    return jsonify({"message": "User added successfully"}), 201 

# ----------- User Session APIs ----------- 
@main.route('/api/user_sessions', methods=['GET']) 
def get_user_sessions(): 
    sessions = UserSessions.query.all() 
    return jsonify([serialize_instance(session) for session in sessions]) 
  
@main.route('/api/user_sessions', methods=['POST']) 
def add_user_session(): 
    data = request.get_json() 
    new_session = UserSessions( 
        user_id=data['user_id'], 
        login_time=datetime.now(), 
        logout_time=None 
    ) 
    db.session.add(new_session) 
    db.session.commit() 
    return jsonify({"message": "User session added successfully"}), 201 

# from flask import Blueprint, jsonify, request 
# from .models import (NetworkTopology, TrafficFlow, DNSLog, RemoteAccessLog, SSLLog, 
#                      FileIntegrityLog, SyslogEvent, AttackEvents, IDSAlerts,  
#                      AnomalyDetection, Users, UserSessions) 
# from . import db 
# from datetime import datetime, timedelta

# 

# # Define the Blueprint 
# main = Blueprint('main', __name__) 

# # Helper function for serializing SQLAlchemy objects to dictionaries 
# def serialize_instance(instance): 
#     return instance.serialize()

# # ----------- Network Topology APIs ----------- 
# @main.route('/api/network_topology', methods=['GET'])
# def get_network_topology():
#     page = request.args.get('page', 1, type=int)
#     per_page = 10
#     topology = NetworkTopology.query.paginate(page=page, per_page=per_page)
#     return jsonify([serialize_instance(node) for node in topology.items])

# @main.route('/api/network_topology', methods=['POST'])
# def add_network_topology():
#     data = request.get_json()

#     if not data.get('node_name') or not data.get('node_type'):
#         return jsonify({"error": "Missing required fields"}), 400

#     new_node = NetworkTopology(
#         node_name=data['node_name'],
#         node_type=data['node_type'],
#         status=data.get['status'],  # Default value if not provided
#         location=data.get['location'],         # Optional field
#         connected_nodes=data.get['connected_nodes']  # Optional field
#     )

#     try:
#         db.session.add(new_node)
#         db.session.commit()
#         return jsonify(serialize_instance(new_node)), 201
#     except Exception as e:
#         db.session.rollback()
#         return jsonify({"error": "Database error: " + str(e)}), 500

# # ----------- Traffic Flow APIs ----------- 
# @main.route('/api/traffic_flow', methods=['GET']) 
# def get_traffic_flow(): 
#     traffic = TrafficFlow.query.all() 
#     return jsonify([serialize_instance(flow) for flow in traffic]) 

# @main.route('/api/traffic_flow', methods=['POST'])
# def add_traffic_flow():
#     data = request.get_json()
#     new_flow = TrafficFlow(
#         source_node=data['source_node'],
#         destination_node=data['destination_node'],
#         packet_count=data['packet_count'],
#         byte_count=data['byte_count'],
#         packet_size=data['packet_size'], 
#         timestamp=datetime.now(), 
#         latency=data['latency'], 
#         flow_status=data['flow_status']
#     )

#     try:
#         db.session.add(new_flow)
#         db.session.commit()
#         return jsonify(serialize_instance(new_flow)), 201
#     except Exception as e:
#         db.session.rollback()
#         return jsonify({"error": "Database error: " + str(e)}), 500


# # ----------- DNS Log APIs ----------- 
# @main.route('/api/dns_logs', methods=['GET']) 
# def get_dns_logs(): 
#     dns_logs = DNSLog.query.all() 
#     return jsonify([serialize_instance(log) for log in dns_logs]) 

# @main.route('/api/dns_logs', methods=['POST']) 
# def add_dns_log(): 
#     data = request.get_json() 
#     new_dns_log = DNSLog( 
#         query_name=data['query_name'], 
#         query_type=data['query_type'], 
#         response_code=data['response_code'], 
#         source_ip=data['source_ip'], 
#         destination_ip=data['destination_ip'], 
#         timestamp=datetime.datetime.now() 
#     ) 
#     db.session.add(new_dns_log) 
#     db.session.commit() 
#     return jsonify({"message": "DNS log added successfully"}), 201 

# # ----------- Remote Access Log APIs ----------- 
# @main.route('/api/remote_access_logs', methods=['GET']) 
# def get_remote_access_logs(): 
#     remote_logs = RemoteAccessLog.query.all() 
#     return jsonify([serialize_instance(log) for log in remote_logs]) 

# @main.route('/api/remote_access_logs', methods=['POST'])
# def add_remote_access_log(): 
#     data = request.get_json() 
#     new_remote_log = RemoteAccessLog( 
#         user_name=data['user_name'], 
#         source_ip=data['source_ip'], 
#         destination_ip=data['destination_ip'], 
#         access_type=data['access_type'], 
#         access_result=data['access_result'], 
#         timestamp=datetime.datetime.now() 
#     ) 
#     db.session.add(new_remote_log) 
#     db.session.commit() 
#     return jsonify({"message": "Remote access log added successfully"}), 201 

# # ----------- SSL Log APIs ----------- 
# @main.route('/api/ssl_logs', methods=['GET']) 
# def get_ssl_logs(): 
#     ssl_logs = SSLLog.query.all() 
#     return jsonify([serialize_instance(log) for log in ssl_logs]) 

# @main.route('/api/ssl_logs', methods=['POST']) 
# def add_ssl_log(): 
#     data = request.get_json() 
#     new_ssl_log = SSLLog( 
#         source_ip=data['source_ip'], 
#         destination_ip=data['destination_ip'], 
#         ssl_version=data['ssl_version'], 
#         cipher_suite=data['cipher_suite'], 
#         certificate_issuer=data['certificate_issuer'], 
#         certificate_subject=data['certificate_subject'], 
#         timestamp=datetime.datetime.now() 
#     ) 
#     db.session.add(new_ssl_log) 
#     db.session.commit() 
#     return jsonify({"message": "SSL log added successfully"}), 201 

# # ----------- File Integrity Log APIs ----------- 
# @main.route('/api/file_integrity_logs', methods=['GET']) 
# def get_file_integrity_logs(): 
#     logs = FileIntegrityLog.query.all() 
#     return jsonify([serialize_instance(log) for log in logs]) 
  
# @main.route('/api/file_integrity_logs', methods=['POST']) 
# def add_file_integrity_log(): 
#     data = request.get_json() 
#     new_log = FileIntegrityLog( 
#         file_path=data['file_path'], 
#         status=data['status'], 
#         modification_time=datetime.now() 
#     ) 
#     db.session.add(new_log) 
#     db.session.commit() 
#     return jsonify({"message": "File integrity log added successfully"}), 201 

# # ----------- Syslog Event APIs ----------- 
# @main.route('/api/syslog_events', methods=['GET']) 
# def get_syslog_events(): 
#     events = SyslogEvent.query.all() 
#     return jsonify([serialize_instance(event) for event in events]) 

# @main.route('/api/syslog_events', methods=['POST'])
# def add_syslog_event(): 
#     data = request.get_json() 
#     new_event = SyslogEvent( 
#         message=data['message'], 
#         severity=data['severity'], 
#         timestamp=datetime.now() 
#     ) 
#     db.session.add(new_event) 
#     db.session.commit() 
#     return jsonify({"message": "Syslog event added successfully"}), 201 

# # ----------- Attack Events APIs ----------- 
# @main.route('/api/attack_events', methods=['GET']) 
# def get_attack_events(): 
#     events = AttackEvents.query.all() 
#     return jsonify([serialize_instance(event) for event in events]) 
  
# @main.route('/api/attack_events', methods=['POST']) 
# def add_attack_event(): 
#     data = request.get_json() 
#     new_event = AttackEvents( 
#         event_type=data['event_type'], 
#         description=data['description'], 
#         timestamp=datetime.now() 
#     ) 
#     db.session.add(new_event) 
#     db.session.commit() 
#     return jsonify({"message": "Attack event added successfully"}), 201 

# # ----------- IDS Alerts APIs ----------- 
# @main.route('/api/ids_alerts', methods=['GET']) 
# def get_ids_alerts(): 
#     alerts = IDSAlerts.query.all() 

#     return jsonify([serialize_instance(alert) for alert in alerts]) 

# @main.route('/api/ids_alerts', methods=['POST'])
# def add_ids_alert():
#     data = request.get_json()
#     new_alert = IDSAlerts(
#         alert_type=data['alert_type'], 
#         source_ip=data['source_ip'], 
#         destination_ip=data['destination_ip'], 
#         timestamp=datetime.now()
#     )

#     try:
#         db.session.add(new_alert)
#         db.session.commit()
#         return jsonify(serialize_instance(new_alert)), 201
#     except Exception as e:
#         db.session.rollback()
#         return jsonify({"error": "Database error: " + str(e)}), 500

# # ----------- Anomaly Detection APIs ----------- 
# @main.route('/api/anomaly_detection', methods=['GET']) 
# def get_anomaly_detections(): 
#     anomalies = AnomalyDetection.query.all() 
#     return jsonify([serialize_instance(anomaly) for anomaly in anomalies]) 

# @main.route('/api/anomaly_detection', methods=['POST']) 
# def add_anomaly_detection(): 
#     data = request.get_json() 
#     new_anomaly = AnomalyDetection( 
#         anomaly_type=data['anomaly_type'], 
#         description=data['description'], 
#         timestamp=datetime.now() 
#     ) 
#     db.session.add(new_anomaly) 
#     db.session.commit() 
#     return jsonify({"message": "Anomaly detection added successfully"}), 201 

# # ----------- User APIs ----------- 
# @main.route('/api/users', methods=['GET']) 
# def get_users(): 
#     users = Users.query.all() 
#     return jsonify([serialize_instance(user) for user in users]) 

# @main.route('/api/users', methods=['POST']) 
# def add_user(): 
#     data = request.get_json() 
#     new_user = Users( 
#         username=data['username'], 
#         password=data['password'],  # Ideally, hash the password before storing 
#         role=data['role'], 
#         created_at=datetime.now() 
#     ) 
#     db.session.add(new_user) 
#     db.session.commit() 
#     return jsonify({"message": "User added successfully"}), 201 

# # ----------- User Session APIs ----------- 
# @main.route('/api/user_sessions', methods=['GET']) 
# def get_user_sessions(): 
#     sessions = UserSessions.query.all() 
#     return jsonify([serialize_instance(session) for session in sessions]) 
  
# @main.route('/api/user_sessions', methods=['POST']) 
# def add_user_session(): 
#     data = request.get_json() 
#     new_session = UserSessions( 
#         user_id=data['user_id'], 
#         login_time=datetime.now(), 
#         logout_time=None 
#     ) 
#     db.session.add(new_session) 
#     db.session.commit() 
#     return jsonify({"message": "User session added successfully"}), 201 

from flask import Blueprint, jsonify, request
from .models import (
    NetworkTopology, TrafficFlow, DNSLog, RemoteAccessLog, SSLLog,
    FileIntegrityLog, SyslogEvent, AttackEvents, IDSAlerts,
    AnomalyDetection, Users, UserSessions
)
from . import db
from datetime import datetime
from werkzeug.security import generate_password_hash, check_password_hash

# Define the Blueprint
main = Blueprint('main', __name__)

# Helper function for serializing SQLAlchemy objects to dictionaries
def serialize_instance(instance):
    return instance.serialize()

# ----------- Network Topology APIs ----------- 
@main.route('/api/network_topology', methods=['GET'])
def get_network_topology():
    page = request.args.get('page', 1, type=int)
    per_page = 10
    topology = NetworkTopology.query.paginate(page=page, per_page=per_page)
    return jsonify([serialize_instance(node) for node in topology.items])

@main.route('/api/network_topology', methods=['POST'])
def add_network_topology():
    data = request.get_json()

    # Validate required fields
    node_name = data.get('node_name')
    node_type = data.get('node_type')

    if not node_name or not node_type:
        return jsonify({"error": "Missing required fields"}), 400

    # Optional fields
    status = data.get('status', 'active')
    location = data.get('location')
    connected_nodes = data.get('connected_nodes')

    # Create new NetworkTopology object
    try:
        new_node = NetworkTopology(
            node_name=node_name,
            node_type=node_type,
            status=status,
            location=location,
            connected_nodes=connected_nodes
        )
        db.session.add(new_node)
        db.session.commit()
        return jsonify(new_node.serialize()), 201
    except Exception as e:
        db.session.rollback()  # Rollback transaction on error
        return jsonify({'error': str(e)}), 500

# ----------- Traffic Flow APIs ----------- 
@main.route('/api/traffic_flow', methods=['GET']) 
def get_traffic_flow(): 
    traffic = TrafficFlow.query.all() 
    return jsonify([serialize_instance(flow) for flow in traffic]) 

@main.route('/api/traffic_flow', methods=['POST'])
def add_traffic_flow():
    data = request.get_json()
    
    # Validate required fields
    required_fields = ['source_node', 'destination_node', 'packet_count', 'byte_count', 'packet_size', 'latency', 'flow_status']
    if not all(field in data for field in required_fields):
        return jsonify({"error": "Missing required fields"}), 400

    new_flow = TrafficFlow(
        source_node=data['source_node'],
        destination_node=data['destination_node'],
        packet_count=data['packet_count'],
        byte_count=data['byte_count'],
        packet_size=data['packet_size'],
        timestamp=datetime.now(), 
        latency=data['latency'],
        flow_status=data['flow_status']
    )

    try:
        db.session.add(new_flow)
        db.session.commit()
        return jsonify(serialize_instance(new_flow)), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": f"Database error: {str(e)}"}), 500

# ----------- DNS Log APIs ----------- 
@main.route('/api/dns_logs', methods=['GET']) 
def get_dns_logs(): 
    dns_logs = DNSLog.query.all() 
    return jsonify([serialize_instance(log) for log in dns_logs]) 

@main.route('/api/dns_logs', methods=['POST']) 
def add_dns_log(): 
    data = request.get_json()
    
    # Validate required fields
    required_fields = ['query_name', 'query_type', 'response_code', 'source_ip', 'destination_ip']
    if not all(field in data for field in required_fields):
        return jsonify({"error": "Missing required fields"}), 400

    new_dns_log = DNSLog( 
        query_name=data['query_name'], 
        query_type=data['query_type'], 
        response_code=data['response_code'], 
        source_ip=data['source_ip'], 
        destination_ip=data['destination_ip'], 
        timestamp=datetime.now()  # Fixed usage of datetime
    ) 

    try:
        db.session.add(new_dns_log) 
        db.session.commit() 
        return jsonify({"message": "DNS log added successfully"}), 201 
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": f"Database error: {str(e)}"}), 500 

# ----------- Remote Access Log APIs ----------- 
@main.route('/api/remote_access_logs', methods=['GET']) 
def get_remote_access_logs(): 
    remote_logs = RemoteAccessLog.query.all() 
    return jsonify([serialize_instance(log) for log in remote_logs]) 

@main.route('/api/remote_access_logs', methods=['POST'])
def add_remote_access_log(): 
    data = request.get_json() 

    # Validate required fields
    required_fields = ['user_name', 'source_ip', 'destination_ip', 'access_type', 'access_result']
    if not all(field in data for field in required_fields):
        return jsonify({"error": "Missing required fields"}), 400

    new_remote_log = RemoteAccessLog( 
        user_name=data['user_name'], 
        source_ip=data['source_ip'], 
        destination_ip=data['destination_ip'], 
        access_type=data['access_type'], 
        access_result=data['access_result'], 
        timestamp=datetime.now() 
    ) 

    try:
        db.session.add(new_remote_log) 
        db.session.commit() 
        return jsonify({"message": "Remote access log added successfully"}), 201 
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": f"Database error: {str(e)}"}), 500 

# ----------- SSL Log APIs ----------- 
@main.route('/api/ssl_logs', methods=['GET']) 
def get_ssl_logs(): 
    ssl_logs = SSLLog.query.all() 
    return jsonify([serialize_instance(log) for log in ssl_logs]) 

@main.route('/api/ssl_logs', methods=['POST']) 
def add_ssl_log(): 
    data = request.get_json() 
    
    # Validate required fields
    required_fields = ['source_ip', 'destination_ip', 'ssl_version', 'cipher_suite', 'certificate_issuer', 'certificate_subject']
    if not all(field in data for field in required_fields):
        return jsonify({"error": "Missing required fields"}), 400

    new_ssl_log = SSLLog( 
        source_ip=data['source_ip'], 
        destination_ip=data['destination_ip'], 
        ssl_version=data['ssl_version'], 
        cipher_suite=data['cipher_suite'], 
        certificate_issuer=data['certificate_issuer'], 
        certificate_subject=data['certificate_subject'], 
        timestamp=datetime.now() 
    ) 

    try:
        db.session.add(new_ssl_log) 
        db.session.commit() 
        return jsonify({"message": "SSL log added successfully"}), 201 
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": f"Database error: {str(e)}"}), 500 

# ----------- File Integrity Log APIs ----------- 
@main.route('/api/file_integrity_logs', methods=['GET']) 
def get_file_integrity_logs(): 
    logs = FileIntegrityLog.query.all() 
    return jsonify([serialize_instance(log) for log in logs]) 
  
@main.route('/api/file_integrity_logs', methods=['POST']) 
def add_file_integrity_log(): 
    data = request.get_json() 
    
    required_fields = ['file_path', 'change_type']
    if not all(field in data for field in required_fields):
        return jsonify({"error": "Missing required fields"}), 400

    # Optional fields: hash_before and hash_after
    hash_before = data.get('hash_before', None)
    hash_after = data.get('hash_after', None)

    # Create new FileIntegrityLog entry
    new_log = FileIntegrityLog(
        file_path=data['file_path'], 
        hash_before=hash_before, 
        hash_after=hash_after, 
        change_type=data['change_type'],
        timestamp=datetime.now()  # Assign the current timestamp
    )

    try:
        db.session.add(new_log)
        db.session.commit()
        return jsonify({"message": "File integrity log added successfully", "log": new_log.serialize()}), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": f"Database error: {str(e)}"}), 500

# ----------- Syslog Event APIs ----------- 
@main.route('/api/syslog_events', methods=['GET']) 
def get_syslog_events(): 
    events = SyslogEvent.query.all() 
    return jsonify([serialize_instance(event) for event in events]) 

@main.route('/api/syslog_events', methods=['POST'])
def add_syslog_event(): 
    data = request.get_json() 
    
    # Validate required fields
    required_fields = ['message', 'severity']
    missing_fields = [field for field in required_fields if field not in data]
    
    if missing_fields:
        return jsonify({"error": f"Missing required fields: {', '.join(missing_fields)}"}), 400

    # Handle optional fields
    source = data.get('source', None)

    # Create a new SyslogEvent entry
    new_event = SyslogEvent( 
        message=data['message'], 
        severity=data['severity'], 
        source=source,  # Optional field
        timestamp=datetime.now()  # Assign the current timestamp
    ) 

    try:
        db.session.add(new_event)
        db.session.commit()
        return jsonify({"message": "Syslog event added successfully", "event": new_event.serialize()}), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": f"Database error: {str(e)}"}), 500
    

# ----------- Attack Events APIs ----------- 
@main.route('/api/attack_events', methods=['GET']) 
def get_attack_events(): 
    events = AttackEvents.query.all() 
    return jsonify([serialize_instance(event) for event in events]) 
  
@main.route('/api/attack_events', methods=['POST']) 
def add_attack_event(): 
    data = request.get_json() 
    
    # Validate required fields
    required_fields = ['attack_type', 'source_node', 'target_node']
    missing_fields = [field for field in required_fields if field not in data]
    
    if missing_fields:
        return jsonify({"error": f"Missing required fields: {', '.join(missing_fields)}"}), 400

    # Optional fields with default None
    impact = data.get('impact', None)
    status = data.get('status', None)

    # Create a new AttackEvent entry
    new_event = AttackEvents(
        attack_type=data['attack_type'], 
        source_node=data['source_node'], 
        target_node=data['target_node'], 
        impact=impact,  # Optional field
        status=status,  # Optional field
        timestamp=datetime.now()  # Current timestamp
    )

    try:
        db.session.add(new_event)
        db.session.commit()
        return jsonify({"message": "Attack event added successfully", "event": new_event.serialize()}), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": f"Database error: {str(e)}"}), 500

# ----------- IDS Alerts APIs ----------- 
@main.route('/api/ids_alerts', methods=['GET'])
def get_ids_alerts():
    alerts = IDSAlerts.query.all() 
    return jsonify([serialize_instance(alert) for alert in alerts])

@main.route('/api/ids_alerts', methods=['POST'])
def add_ids_alert():
    data = request.get_json()

    # Validate required fields
    required_fields = ['alert_message', 'severity']
    if not all(field in data for field in required_fields):
        return jsonify({"error": "Missing required fields"}), 400

    new_alert = IDSAlerts(
        alert_message=data['alert_message'],  # From model
        severity=data['severity'],            # From model
        related_attack=data.get('related_attack'),  # Foreign key, optional
        timestamp=datetime.now()              # Default value for timestamp
    )

    try:
        db.session.add(new_alert)
        db.session.commit()
        return jsonify(new_alert.serialize()), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": f"Database error: {str(e)}"}), 500

# ----------- Anomaly Detection APIs ----------- 
@main.route('/api/anomaly_detection', methods=['GET']) 
def get_anomaly_detections(): 
    anomalies = AnomalyDetection.query.all() 
    return jsonify([serialize_instance(anomaly) for anomaly in anomalies]) 

@main.route('/api/anomaly_detection', methods=['POST']) 
def add_anomaly_detection(): 
    data = request.get_json() 
    
    # Validate required fields
    required_fields = ['anomaly_type', 'description']
    missing_fields = [field for field in required_fields if field not in data]

    if missing_fields:
        return jsonify({"error": f"Missing required fields: {', '.join(missing_fields)}"}), 400

    # Optional field related_flow (Foreign Key)
    related_flow = data.get('related_flow', None)

    # If related_flow is provided, check if the corresponding TrafficFlow exists
    if related_flow:
        flow = TrafficFlow.query.get(related_flow)
        if not flow:
            return jsonify({"error": f"Traffic flow with id {related_flow} not found"}), 404

    # Create a new AnomalyDetection entry
    new_anomaly = AnomalyDetection(
        anomaly_type=data['anomaly_type'],
        description=data['description'],
        related_flow=related_flow,  # Optional field
        timestamp=datetime.now()
    )

    try:
        db.session.add(new_anomaly)
        db.session.commit()
        return jsonify({"message": "Anomaly detection added successfully", "anomaly": new_anomaly.serialize()}), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": f"Database error: {str(e)}"}), 500 

# ----------- User APIs ----------- 
@main.route('/api/users', methods=['GET']) 
def get_users(): 
    users = Users.query.all() 
    return jsonify([serialize_instance(user) for user in users]) 

@main.route('/api/users', methods=['POST']) 
def add_user(): 
    data = request.get_json() 
    
    # Validate required fields
    required_fields = ['username', 'password', 'role']
    missing_fields = [field for field in required_fields if field not in data]

    if missing_fields:
        return jsonify({"error": f"Missing required fields: {', '.join(missing_fields)}"}), 400

    # Validate username length and characters
    username = data['username']
    if len(username) < 3 or len(username) > 50:
        return jsonify({"error": "Username must be between 3 and 50 characters."}), 400

    # Hash the password before storing it
    hashed_password = generate_password_hash(data['password'], method='sha256')

    # Create a new user instance
    new_user = Users(
        username=username,
        password_hash=hashed_password,  # Use the hashed password
        role=data['role'],
        last_login=datetime.now()  # This can be set to None initially if preferred
    )

    try:
        db.session.add(new_user)
        db.session.commit()
        # Return the serialized user data, omitting the password hash
        return jsonify({"message": "User added successfully", "user": new_user.serialize()}), 201
    except Exception as e:
        db.session.rollback()
        # Check if the error is due to a unique constraint violation
        if "unique constraint" in str(e).lower():
            return jsonify({"error": f"Username '{username}' already exists."}), 409
        return jsonify({"error": f"Database error: {str(e)}"}), 500 

# ----------- User Session APIs ----------- 
@main.route('/api/user_sessions', methods=['GET']) 
def get_user_sessions(): 
    sessions = UserSessions.query.all() 
    return jsonify([serialize_instance(session) for session in sessions]) 
  
@main.route('/api/user_sessions', methods=['POST']) 
def add_user_session(): 
    data = request.get_json() 
    
# Validate required fields
    required_fields = ['user_id']
    if not all(field in data for field in required_fields):
        return jsonify({"error": "Missing required fields"}), 400

    # Check if the user exists
    user_exists = Users.query.filter_by(id=data['user_id']).first()
    if not user_exists:
        return jsonify({"error": "User does not exist"}), 404

    # Create a new user session
    new_session = UserSessions(
        user_id=data['user_id'],
        login_time=datetime.utcnow(),  # Store as UTC
        logout_time=None
    )

    try:
        db.session.add(new_session)
        db.session.commit()
        return jsonify({"message": "User session added successfully", "session": new_session.serialize()}), 201
    except Exception as e:
        db.session.rollback()
        # Check for foreign key constraint violation
        if "foreign key constraint" in str(e).lower():
            return jsonify({"error": "User ID does not exist in the users table."}), 400
        return jsonify({"error": f"Database error: {str(e)}"}), 500 

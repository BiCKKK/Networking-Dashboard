from app import db

class NetworkTopology(db.Model):
    __tablename__ = 'network_topology'
    id = db.Column(db.Integer, primary_key=True)
    node_name = db.Column(db.String(50), nullable=False)
    node_type = db.Column(db.String(20), nullable=False)
    status = db.Column(db.String(10), nullable=False)
    location = db.Column(db.String(100))
    connected_nodes = db.Column(db.String(200))

class TrafficFlow(db.Model):
    __tablename__ = 'traffic_flow'
    id = db.Column(db.Integer, primary_key=True)
    source_node = db.Column(db.String(50), nullable=False)
    destination_node = db.Column(db.String(50), nullable=False)
    protocol = db.Column(db.String(10))
    packet_size = db.Column(db.Integer)
    timestamp = db.Column(db.DateTime)
    latency = db.Column(db.Float)
    flow_status = db.Column(db.String(20))

class PacketInspection(db.Model):
    __tablename__ = 'packet_inspection'
    id = db.Column(db.Integer, primary_key=True)
    source_ip = db.Column(db.String(50), nullable=False)
    destination_ip = db.Column(db.String(20), nullable=False)
    protocol = db.Column(db.String(10))
    paylaod = db.Column(db.Text)
    timestamp = db.Column(db.DateTime)

class AttackEvents(db.Model):
    __tablename__ = 'attack_events'
    id = db.Column(db.Integer, primary_key=True)
    attack_type = db.Column(db.String(50), nullable=False)
    source_node = db.Column(db.String(50), nullable=False)
    target_node = db.Column(db.String(50), nullable=False)
    impact = db.Column(db.String(100))
    timestamp = db.Column(db.DateTime)
    status = db.Column(db.String(20))

class IDSAlerts(db.Model):
    __tablename__ = 'ids_alerts'
    id = db.Column(db.Integer, primary_key=True)
    alert_message = db.Column(db.String(200), nullable=False)
    severity = db.Column(db.String(10))
    related_attack = db.Column(db.Integer, db.ForeignKey('traffic_flow.id'))
    timestamp = db.Column(db.DateTime)

class AnomalyDetection(db.Model):
    __tablename__ = 'anomaly_detection'
    id = db.Column(db.Integer, primary_key=True)
    anomaly_type = db.Column(db.String(50), nullable=False)
    description = db.Column(db.String(200))
    related_flow = db.Column(db.Integer, db.ForeignKey('traffic_flow.id'))
    timestamp = db.Column(db.DateTime)

class Users(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), nullable=False, unique=True)
    password_hash = db.Column(db.String(128), nullable=False)
    role = db.Column(db.String(20))
    last_login = db.Column(db.DateTime)

class UserSessions(db.Model):
    __tablename__ = 'user_sessions'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    login_time = db.Column(db.DateTime)
    logout_time = db.Column(db.DateTime)

# Optional (Could have's)
class DNSLog(db.Model):
    __tablename__ = 'dns_logs'
    id = db.Column(db.Integer, primary_key=True)
    query_name = db.Column(db.String(100), nullable=False)
    query_type = db.Column(db.String(20))
    response_code = db.Column(db.String(10))
    source_ip = db.Column(db.String(50))
    destination_ip = db.Column(db.String(50))
    timestamp = db.Column(db.DateTime)

class RemoteAccessLog(db.Model):
    __tablename__ = 'renote_access_logs'
    id = db.Column(db.Integer, primary_key=True)
    user_name = db.Column(db.String(50), nullable=False)
    source_ip = db.Column(db.String(50))
    destination_ip = db.Column(db.String(50))
    access_type = db.Column(db.String(20)) # e.g., SSH, RDP
    access_result = db.Column(db.String(20)) # Success or Failure
    timestamp = db.Column(db.DateTime)

class SSLLog(db.Model):
    __tablename__ = 'ssl_logs'
    id = db.Column(db.Integer, primary_key=True)
    source_ip = db.Column(db.String(50), nullable=False)
    destination_ip = db.Column(db.String(50), nullable=False)
    ssl_version = db.Column(db.String(10))
    cipher_suite = db.Column(db.String(50))
    certificate_issuer = db.Column(db.String(100))
    certificate_subject = db.Column(db.String(100))
    timestamp = db.Column(db.DateTime)

class FileIntegrityLog(db.Model):
    __tablename__ = 'file_integrity_logs'
    id = db.Column(db.Integer, primary_key=True)
    file_path = db.Column(db.String(200), nullable=False)
    hash_before = db.Column(db.String(64)) # SHA-256 before hash
    hash_after = db.Column(db.String(64)) # SHA-256 after hash
    change_type = db.Column(db.String(20)) # e.g., Modified, Deleted, Created
    timestamp = db.Column(db.DateTime)

class SyslogEvent(db.Model):
    __tablename__ = 'syslog_events'
    id = db.Column(db.Integer, primary_key=True)
    severity = db.Column(db.String(10), nullable=False)
    message = db.Column(db.String(255), nullable=False)
    source = db.Column(db.String(50))
    timestamp = db.Column(db.DateTime)


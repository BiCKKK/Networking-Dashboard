from . import db
# from sqlalchemy.sql import func

class NetworkTopology(db.Model):
    __tablename__ = 'network_topology'
    id = db.Column(db.Integer, primary_key=True)
    node_name = db.Column(db.String(50), nullable=False)
    node_type = db.Column(db.String(20), nullable=False)
    status = db.Column(db.String(10), nullable=False)
    location = db.Column(db.String(100))
    connected_nodes = db.Column(db.String(200))

    def serialize(self):
        return {
            'id': self.id,
            'node_name': self.node_name,
            'node_type': self.node_type,
            'status': self.status,
            'location': self.location,
            'connected_nodes': self.connected_nodes
        }
    
    def __repr__(self):
        return f"<NetworkTopology {self.node_name}>"


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
    # timestamp = db.Column(db.DateTime, default=func.now())
    
    # Relationship to IDSAlerts
    ids_alerts = db.relationship('IDSAlerts', backref='traffic_flow', lazy=True, cascade='all, delete-orphan')
    
    # Relationship to AnomalyDetection
    anomaly_detection = db.relationship('AnomalyDetection', backref='traffic_flow', lazy=True, cascade='all, delete-orphan')

    def serialize(self):
        return {
            'id': self.id,
            'source_node': self.source_node,
            'destination_node': self.destination_node,
            'protocol': self.protocol,
            'packet_size': self.packet_size,
            'timestamp': self.timestamp,
            'latency': self.latency,
            'flow_status': self.flow_status
        }
    
    def __repr__(self):
        return f"<TrafficFlow {self.source_node} -> {self.destination_node}>"


class PacketInspection(db.Model):
    __tablename__ = 'packet_inspection'
    id = db.Column(db.Integer, primary_key=True)
    source_ip = db.Column(db.String(50), nullable=False)
    destination_ip = db.Column(db.String(20), nullable=False)
    protocol = db.Column(db.String(10))
    payload = db.Column(db.Text)
    timestamp = db.Column(db.DateTime)

    def serialize(self):
        return {
            'id': self.id,
            'source_ip': self.source_ip,
            'destination_ip': self.destination_ip,
            'protocol': self.protocol,
            'payload': self.payload,
            'timestamp': self.timestamp
        }
    
    def __repr__(self):
        return f"<PacketInspection {self.source_ip} -> {self.destination_ip}>"


class AttackEvents(db.Model):
    __tablename__ = 'attack_events'
    id = db.Column(db.Integer, primary_key=True)
    attack_type = db.Column(db.String(50), nullable=False)
    source_node = db.Column(db.String(50), nullable=False)
    target_node = db.Column(db.String(50), nullable=False)
    impact = db.Column(db.String(100))
    timestamp = db.Column(db.DateTime)
    status = db.Column(db.String(20))

    def serialize(self):
        return {
            'id': self.id,
            'attack_type': self.attack_type,
            'source_node': self.source_node,
            'target_node': self.target_node,
            'impact': self.impact,
            'timestamp': self.timestamp,
            'status': self.status
        }
    
    def __repr__(self):
        return f"<AttackEvent {self.attack_type}>"
    

class IDSAlerts(db.Model):
    __tablename__ = 'ids_alerts'
    id = db.Column(db.Integer, primary_key=True)
    alert_message = db.Column(db.String(200), nullable=False)
    severity = db.Column(db.String(10))
    related_attack = db.Column(db.Integer, db.ForeignKey('traffic_flow.id', ondelete='CASCADE'))  # Foreign key with cascading delete
    timestamp = db.Column(db.DateTime)

    def serialize(self):
        return {
            'id': self.id,
            'alert_message': self.alert_message,
            'severity': self.severity,
            'related_attack': self.related_attack,
            'timestamp': self.timestamp
        }
    
    def __repr__(self):
        return f"<IDSAlert {self.alert_message}>"
    

class AnomalyDetection(db.Model):
    __tablename__ = 'anomaly_detection'
    id = db.Column(db.Integer, primary_key=True)
    anomaly_type = db.Column(db.String(50), nullable=False)
    description = db.Column(db.String(200))
    related_flow = db.Column(db.Integer, db.ForeignKey('traffic_flow.id', ondelete='CASCADE'))  # Foreign key with cascading delete
    timestamp = db.Column(db.DateTime)

    def serialize(self):
        return {
            'id': self.id,
            'anomaly_type': self.anomaly_type,
            'description': self.description,
            'related_flow': self.related_flow,
            'timestamp': self.timestamp
        }
    
    def __repr__(self):
        return f"<AnomalyDetection {self.anomaly_type}>"

class Users(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), nullable=False, unique=True)
    password_hash = db.Column(db.String(128), nullable=False)
    role = db.Column(db.String(20))
    last_login = db.Column(db.DateTime)

    def serialize(self):
        return {
            'id': self.id,
            'username': self.username,
            'password_hash': self.password_hash,
            'role': self.role,
            'last_login': self.last_login
        }
    
    def __repr__(self):
        return f"<User {self.username}>"


class UserSessions(db.Model):
    __tablename__ = 'user_sessions'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    login_time = db.Column(db.DateTime)
    logout_time = db.Column(db.DateTime)

    def serialize(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'login_time': self.login_time,
            'logout_time': self.logout_time
        }
    
    def __repr__(self):
        return f"<UserSession user_id={self.user_id}>"
    

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

    def serialize(self):
        return {
            'id': self.id,
            'query_name': self.query_name,
            'query_type': self.query_type,
            'response_code': self.response_code,
            'source_ip': self.source_ip,
            'destination_ip': self.destination_ip,
            'timestamp': self.timestamp
        }
    
    def __repr__(self):
        return f"<DNSLog query_name={self.query_name}>"
    

class RemoteAccessLog(db.Model):
    __tablename__ = 'remote_access_logs'
    id = db.Column(db.Integer, primary_key=True)
    user_name = db.Column(db.String(50), nullable=False)
    source_ip = db.Column(db.String(50))
    destination_ip = db.Column(db.String(50))
    access_type = db.Column(db.String(20)) # e.g., SSH, RDP
    access_result = db.Column(db.String(20)) # Success or Failure
    timestamp = db.Column(db.DateTime)

    def serialize(self):
        return {
            'id': self.id,
            'user_name': self.user_name,
            'source_ip': self.source_ip,
            'destination_ip': self.destination_ip,
            'access_type': self.access_type,
            'access_result': self.access_result,
            'timestamp': self.timestamp
        }
    
    def __repr__(self):
        return f"<RemoteAccessLog user_name={self.user_name}>"

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

    def serialize(self):
        return {
            'id': self.id,
            'source_ip': self.source_ip,
            'destination_ip': self.destination_ip,
            'ssl_version': self.ssl_version,
            'cipher_suite': self.cipher_suite,
            'certificate_issuer': self.certificate_issuer,
            'certificate_subject': self.certificate_subject,
            'timestamp': self.timestamp
        }
    
    def __repr__(self):
        return f"<SSLLog src_ip={self.source_ip} dst_ip={self.destination_ip}>"


class FileIntegrityLog(db.Model):
    __tablename__ = 'file_integrity_logs'
    id = db.Column(db.Integer, primary_key=True)
    file_path = db.Column(db.String(200), nullable=False)
    hash_before = db.Column(db.String(64)) # SHA-256 before hash
    hash_after = db.Column(db.String(64)) # SHA-256 after hash
    change_type = db.Column(db.String(20)) # e.g., Modified, Deleted, Created
    timestamp = db.Column(db.DateTime)

    def serialize(self):
        return {
            'id': self.id,
            'file_path': self.file_path,
            'hash_before': self.hash_before,
            'hash_after': self.hash_after,
            'change_type': self.change_type,
            'timestamp': self.timestamp
        }
    
    def __repr__(self):
        return f"<FileIntegrityLog file_path={self.file_path}>"
    

class SyslogEvent(db.Model):
    __tablename__ = 'syslog_events'
    id = db.Column(db.Integer, primary_key=True)
    severity = db.Column(db.String(10), nullable=False)
    message = db.Column(db.String(255), nullable=False)
    source = db.Column(db.String(50))
    timestamp = db.Column(db.DateTime)

    def serialize(self):
        return {
            'id': self.id,
            'severity': self.severity,
            'message': self.message,
            'source': self.source,
            'timestamp': self.timestamp
        }
    
    def __repr__(self):
        return f"<SyslogEvent severity={self.severity}>"


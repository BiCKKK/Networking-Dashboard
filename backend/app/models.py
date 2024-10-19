from . import db

class NetworkTopology(db.Model):
    __tablename__ = 'network_topology'
    id = db.Column(db.Integer, primary_key=True)
    node_name = db.Column(db.String(50), nullable=False)
    node_type = db.Column(db.String(20), nullable=False)
    status = db.Column(db.String(10), nullable=False)
    # Relationship to NodeConnections
    # connections = db.relationship('NodeConnections', backref='network_topology', lazy=True, cascade='all, delete-orphan')
    source_connections = db.relationship('NodeConnections', foreign_keys='NodeConnections.source_node_id',
        backref='source_node', lazy=True, cascade='all, delete-orphan'
    )
    destination_connections = db.relationship('NodeConnections', foreign_keys='NodeConnections.destination_node_id',
        backref='destination_node', lazy=True, cascade='all, delete-orphan'
    )

    def serialize(self):
        return {
            'id': self.id,
            'node_name': self.node_name,
            'node_type': self.node_type,
            'status': self.status,
            'source_connections': [connection.serialize() for connection in self.source_connections],
            'destination_connections': [connection.serialize() for connection in self.destination_connections]
        }
    
    def __repr__(self):
        return f"<NetworkTopology {self.node_name}>"
    
class NodeConnections(db.Model):
    __tabelname__ = 'node_connections'
    id = db.Column(db.Integer, primary_key=True)
    source_node_id = db.Column(db.Integer, db.ForeignKey('network_topology.id', ondelete='CASCADE'))
    destination_node_id = db.Column(db.Integer, db.ForeignKey('network_topology.id', ondelete='CASCADE'))
    connection_type = db.Column(db.String(20)) # Optional

    def serialize(self):
        return {
            'id': self.id,
            'source_node': self.source_node_id,
            'destination_node': self.destination_node_id,
            'connection_type': self.connection_type
        }

    def __repr__(self):
        return f"<NodeConnection {self.source_node_id} -> {self.destination_node_id}>"

class TrafficFlow(db.Model):
    __tablename__ = 'traffic_flow'
    id = db.Column(db.Integer, primary_key=True)
    source_node = db.Column(db.String(50), nullable=False)
    destination_node = db.Column(db.String(50), nullable=False)
    protocol = db.Column(db.String(10))
    packet_size = db.Column(db.Integer)
    timestamp = db.Column(db.DateTime, nullable=False)
    latency = db.Column(db.Float)
    flow_status = db.Column(db.String(20))
    
    # Relationship to IDSAlerts
    # ids_alerts = db.relationship('IDSAlerts', backref='traffic_flow', lazy=True, cascade='all, delete-orphan')
    
    # Relationship to AnomalyDetection
    # anomaly_detection = db.relationship('AnomalyDetection', backref='traffic_flow', lazy=True, cascade='all, delete-orphan')

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
    packet_size = db.Column(db.Integer)
    timestamp = db.Column(db.DateTime, nullable=False)

    def serialize(self):
        return {
            'id': self.id,
            'source_ip': self.source_ip,
            'destination_ip': self.destination_ip,
            'protocol': self.protocol,
            'packet_size': self.packet_size,
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
    timestamp = db.Column(db.DateTime, nullable=False)
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
    related_flow = db.Column(db.Integer)
    # related_flow = db.Column(db.Integer, db.ForeignKey('traffic_flow.id', ondelete='CASCADE'))  # Foreign key with cascading delete
    timestamp = db.Column(db.DateTime, nullable=False)

    def serialize(self):
        return {
            'id': self.id,
            'alert_message': self.alert_message,
            'severity': self.severity,
            'related_flow': self.related_flow,
            'timestamp': self.timestamp
        }
    
    def __repr__(self):
        return f"<IDSAlert {self.alert_message}>"
    

class AnomalyDetection(db.Model):
    __tablename__ = 'anomaly_detection'
    id = db.Column(db.Integer, primary_key=True)
    anomaly_type = db.Column(db.String(50), nullable=False)
    description = db.Column(db.String(200))
    related_flow = db.Column(db.Integer)
    # related_flow = db.Column(db.Integer, db.ForeignKey('traffic_flow.id', ondelete='CASCADE'))  # Foreign key with cascading delete
    timestamp = db.Column(db.DateTime, nullable=False)

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


    
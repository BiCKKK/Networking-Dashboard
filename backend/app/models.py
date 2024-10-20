from . import db

class NetworkTopology(db.Model):
    __tablename__ = 'network_topology'
    id = db.Column(db.Integer, primary_key=True)
    node_name = db.Column(db.String(50), nullable=False)
    node_type = db.Column(db.String(20), nullable=False)
    status = db.Column(db.String(10), nullable=False)
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
    connection_properties = db.Column(db.String(100), nullable=True)

    def serialize(self):
        return {
            'id': self.id,
            'source_node': self.source_node_id,
            'destination_node': self.destination_node_id,
            'connection_type': self.connection_type,
            'connection_properties': self.connection_properties
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

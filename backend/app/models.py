from . import db

class Node(db.Model): 
    __tablename__ = 'node'
    id = db.Column(db.Integer, primary_key=True) 
    label = db.Column(db.String(50), nullable=False) 
    ip_address = db.Column(db.String(20)) 
    mac_address = db.Column(db.String(20)) 
    functions = db.Column(db.JSON, default={})

class NetworkFunction(db.Model): 
    __tablename__ = 'network_fuctions'
    id = db.Column(db.Integer, primary_key=True) 
    name = db.Column(db.String(50), nullable=False) 
    color = db.Column(db.String(20), nullable=False) 
 
class Connection(db.Model): 
    __tablename__ = 'connections'
    id = db.Column(db.Integer, primary_key=True) 
    source_id = db.Column(db.Integer, db.ForeignKey('node.id')) 
    target_id = db.Column(db.Integer, db.ForeignKey('node.id'))
    status = db.Column(db.String(10), default="active")

 
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from .config import DevConfig
from flask_cors import CORS
from flask_migrate import Migrate
from flask_socketio import SocketIO

db = SQLAlchemy()
migrate = Migrate()
socketio = SocketIO()

def create_app(config_class=DevConfig):
    app = Flask(__name__)
    app.config.from_object(config_class)

    db.init_app(app)
    migrate.init_app(app, db)

    socketio.init_app(app, cors_allowed_origins="http://localhost:5173")

    CORS(app, resources={r"/*": {"origins": "*"}})

    # Register Blueprints
    from .routes import main
    app.register_blueprint(main)
    
    return app

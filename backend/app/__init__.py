from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from config import DevConfig
from flask_cors import CORS

db = SQLAlchemy()

def create_app():
    app = Flask(__name__)
    app.config.from_object(DevConfig)

    db.init_app(app)
    CORS(app)

    with app.app_context():
        # Import routes to register them
        from .routes import main
        # Create the tables in the database
        db.create_all()

    return app

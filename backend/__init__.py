from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from config import DevConfig

db = SQLAlchemy()

def create_app():
    app = Flask(__name__)
    app.config.from_object(DevConfig)

    db.init_app(app)

    with app.app_context():
        # Import routes to register them
        from . import routes
        # Create the tables in the database
        db.create_all()

    return app

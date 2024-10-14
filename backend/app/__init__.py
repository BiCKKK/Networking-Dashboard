from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from .config import DevConfig
from flask_cors import CORS
from flask_migrate import Migrate
import logging

db = SQLAlchemy()
migrate = Migrate()

def create_app(config_class=DevConfig):
    app = Flask(__name__)
    app.config.from_object(config_class)

    db.init_app(app)
    migrate.init_app(app, db)

    CORS(app)

    logging.getLogger(__name__).info("Flask application instance created with configuration: %s", 
                                     config_class.__name__)

    # Register Blueprints
    from .routes import main
    app.register_blueprint(main)
    
    return app

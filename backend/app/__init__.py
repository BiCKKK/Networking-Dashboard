from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from .config import DevConfig
from flask_cors import CORS
from flask_migrate import Migrate

db = SQLAlchemy()
migrate = Migrate()

def create_app():
    app = Flask(__name__)
    app.config.from_object(DevConfig)

    db.init_app(app)
    migrate.init_app(app, db)

    CORS(app)

    # Register Blueprints
    from .routes import main
    app.register_blueprint(main)
    
    return app

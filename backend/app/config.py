import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

class Config(object):
    """Base configuration with default settings."""
    SECRET_KEY = os.getenv('SECRET_KEY', 'mysecretkey')  # Fallback for development
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SQLALCHEMY_DATABASE_URI = os.getenv('DEV_DATABASE_URI', 'sqlite:///data.db')  # Database URI or Fallback to SQLite
    CORS_HEADERS = 'Content-Type'
    BPFABRIC_PATH = os.path.join(os.path.dirname(__file__), 'BPFabric')
    SMARTGRIDSIM_PATH = os.path.join(os.path.dirname(__file__), 'SmartGridSim', 'topologies', 'SGFabric.py')

class DevConfig(Config):
    """Development-specific configuration."""
    DEBUG = os.getenv('FLASK_DEBUG', 'false').lower() == 'true'
    # Add any other development-specific settings here

# class ProdConfig(Config):
#     """Production-specific configuration."""
#     DEBUG = False
#     SQLALCHEMY_DATABASE_URI = os.getenv('PROD_DATABASE_URI')  # Database URI for production
#     # Production environment specific settings

# class TestConfig(Config):
#     """Testing-specific configuration."""
#     TESTING = True
#     SQLALCHEMY_DATABASE_URI = os.getenv('TEST_DATABASE_URI')  # Database URI for testing
#     # Testing environment specific settings

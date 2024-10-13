import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

class Config:
    """Base configuration with default settings."""
    SECRET_KEY = os.getenv('SECRET_KEY', 'default_secret_key')  # Fallback for development
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SQLALCHEMY_DATABASE_URI = os.getenv('DEV_DATABASE_URI')  # Database URI for development environment

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


import os
from datetime import timedelta

class Config:
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'interview-app-secret-key'
    
    # Database configuration (for future use)
    DATABASE_URL = os.environ.get('DATABASE_URL') or 'sqlite:///interview.db'
    
    # CORS settings
    CORS_ORIGINS = ["http://localhost:8080", "http://localhost:3000"]
    
    # Session settings
    PERMANENT_SESSION_LIFETIME = timedelta(hours=2)

class DevelopmentConfig(Config):
    DEBUG = True

class ProductionConfig(Config):
    DEBUG = False

# Configuration dictionary
config = {
    'development': DevelopmentConfig,
    'production': ProductionConfig,
    'default': DevelopmentConfig
}

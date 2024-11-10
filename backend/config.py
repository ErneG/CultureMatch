import os

class Config:
    SQLALCHEMY_DATABASE_URI = os.getenv('DATABASE_MAIN_URL', 'postgresql://user:password@localhost:5400/yourdb')
    SQLALCHEMY_BINDS = {
        'secondary_db': os.getenv('DATABASE_AI_URL', 'postgresql://user:password@localhost:5401/secondarydb')
    }
    SQLALCHEMY_TRACK_MODIFICATIONS = False

    SECRET_KEY = os.getenv('SECRET_KEY')

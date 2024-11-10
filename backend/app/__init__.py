from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from config import Config

# Main database instance
db = SQLAlchemy()


def create_app():
    app = Flask(__name__)

    # Load the configuration from the config.py Config class
    app.config.from_object(Config)

    # Initialize the database with the app
    db.init_app(app)

    with app.app_context():
        # Import your models here to ensure they are registered with SQLAlchemy
        from . import (
            models,
        )  # Ensure models are in a separate models.py or defined in this module
        from . import routes

        app.register_blueprint(routes.bp)

        # Create tables if they do not exist
        db.create_all(bind_key="secondary_db")

    return app

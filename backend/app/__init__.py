from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_mail import Mail
from config import config
from .graph import Graph
from .forge import Forge

# extension attribute references here
db = SQLAlchemy()
mail = Mail()
graph = Graph()
forge = Forge()


def create_app(config_name):
    app = Flask(__name__)
    app.config.from_object(config[config_name])
    config[config_name].init_app(app)

    # initialise extensions and modules here
    db.init_app(app)
    mail.init_app(app)
    graph.init_app(app)
    forge.init_app(app)

    # register app blueprints here

    from .api import api_bp as api_blueprint
    app.register_blueprint(api_blueprint, url_prefix='/api')

    return app

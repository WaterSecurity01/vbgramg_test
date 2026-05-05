from flask import Flask

from app.routes.routes import blp as blpRoutes

def create_app():
    app = Flask(__name__)
    app.register_blueprint(blpRoutes)
    return app


app = create_app()
from fastapi import FastAPI

from app.routes.ldap_routes import ldap_routes

def create_app() -> FastAPI:
    app = FastAPI(
        title="Secrets Rotation Security Lab",
        description="Educational Secrets Rotation Security Lab",
        version="1.0.0",
    )

    app.include_router(ldap_routes)

    return app

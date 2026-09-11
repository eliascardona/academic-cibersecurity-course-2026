from fastapi import FastAPI

from app.database import initialize_database
from app.routes.customer_routes import customer_routes

from app.config import API_KEY, DATABASE_PATH, KEY_DIR, PUBLIC_KEY_PATH, PRIVATE_KEY_PATH


def create_app() -> FastAPI:
    app = FastAPI(
        title="Secrets Rotation Security Lab",
        description="Educational Secrets Rotation Security Lab",
        version="1.0.0",
    )

    print(f"The variables are ready {API_KEY}, {DATABASE_PATH}, {KEY_DIR}, {PUBLIC_KEY_PATH}, {PRIVATE_KEY_PATH}")
    print(
        f"The variables are ready "
        f"{API_KEY}, {DATABASE_PATH}, {KEY_DIR}, "
        f"{PUBLIC_KEY_PATH}, {PRIVATE_KEY_PATH}",
        flush=True
    )
    initialize_database()

    app.include_router(customer_routes)

    return app

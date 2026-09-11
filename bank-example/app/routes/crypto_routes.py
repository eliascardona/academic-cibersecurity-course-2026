from fastapi import APIRouter

from app.controllers.crypto_controller import CryptoController
from app.schemas.crypto import HashDemoRequest, CustomerResponse


crypto_routes = APIRouter(
    prefix="/crypto",
    tags=["Cryptography"],
)

controller = CryptoController()


@crypto_routes.get(
    "/",
    response_model=CustomerResponse,
)
def hash_demo(data: HashDemoRequest):
    return controller.hash_demo(data)

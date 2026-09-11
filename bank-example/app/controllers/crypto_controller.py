from app.schemas.crypto import HashDemoRequest, CustomerResponse
from app.services.crypto_service import CryptoService


class CryptoController:

    def __init__(self):
        self.crypto = CryptoService()

    def hash_demo(self, customer_id: str) -> CustomerResponse:
        return CustomerResponse(
        )

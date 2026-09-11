from app.repositories.customer_repository import CustomerRepository
from app.services.crypto_service import CryptoService
from app.models.customer import Customer


class CustomerService:

    def __init__(self):
        self.repository = CustomerRepository()
        self.cryptoService = CryptoService()

    def create_customer(
        self,
        name: str,
    ):

        customer = Customer(
            id=None,
            name=self.cryptoService.encrypt(name),
        )

        row = self.repository.create(customer)

        return {
            "id": row["id"],
            "name": row["name"],
        }

    def get_customer(self, customer_id: int):
        row = self.repository.find_by_id(customer_id)

        if not row:
            return None

        return {
            "id": row["id"],
            "name": self.cryptoService.decrypt(row["name"]),
        }

from pydantic import BaseModel, Field
from app.models.customer import Customer

class CustomerResponse(BaseModel):
    input: str
    customer: Customer

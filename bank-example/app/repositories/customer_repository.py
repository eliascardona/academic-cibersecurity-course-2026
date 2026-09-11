from app.database.connection import get_connection
from app.models.customer import Customer


class CustomerRepository:

    def create(self, customer: Customer):
        connection = get_connection()

        try:
            cursor = connection.execute(
                """
                INSERT INTO customers (
                    name,
                )
                VALUES (?)
                """,
                (
                    customer.name,
                ),
            )

            connection.commit()
            return cursor.fetchone()
        finally:
            connection.close()

    def find_by_id(self, customer_id: int):
        connection = get_connection()

        try:
            return connection.execute(
                """
                SELECT
                    id,
                    name,
                FROM customers
                WHERE id = ?
                """,
                (customer_id,),
            ).fetchone()
        finally:
            connection.close()

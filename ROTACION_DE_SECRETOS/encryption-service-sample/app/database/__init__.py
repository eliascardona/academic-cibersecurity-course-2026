from app.database.connection import get_connection


def initialize_database():
    connection = get_connection()

    connection.execute("""
        CREATE TABLE IF NOT EXISTS customers (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name NOT NULL
        )
    """)

    connection.commit()
    connection.close()

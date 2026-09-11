import os
from pathlib import Path

KEY_DIR = Path("/app/keys")

PRIVATE_KEY_PATH = KEY_DIR / os.environ["PRIVATE_KEY_LOCATION"]
PUBLIC_KEY_PATH = KEY_DIR / os.environ["PUBLIC_KEY_LOCATION"]
DATABASE_PATH = os.environ["DATABASE_PATH"]
API_KEY = os.environ["API_KEY"]

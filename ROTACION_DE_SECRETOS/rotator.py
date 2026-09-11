import secrets
from pathlib import Path

ENV_FILE = Path(".env")


def rotate_secret():
    new_key = secrets.token_urlsafe(32)

    lines = []

    if ENV_FILE.exists():
        lines = ENV_FILE.read_text(encoding="utf-8").splitlines()

    found = False

    for i, line in enumerate(lines):
        if line.startswith("API_KEY="):
            lines[i] = f"API_KEY={new_key}"
            found = True
            break

    if not found:
        lines.append(f"API_KEY={new_key}")

    ENV_FILE.write_text(
        "\n".join(lines) + "\n",
        encoding="utf-8"
    )

    print("[PYTHON ROTATOR LOGS] - API_KEY rotated")

import secrets
from pathlib import Path

ENV_FILE = Path(".env")


def rotate_secret():
    new_key = secrets.token_urlsafe(64)

    lines = []

    if ENV_FILE.exists():
        lines = ENV_FILE.read_text(encoding="utf-8").splitlines()

    found = False

    for i, line in enumerate(lines):
        if line.startswith("API_KEY="):
            print(f"[PYTHON ROTATOR LOGS] -> (API_KEY has been found) -> Current value: {line}")
            lines[i] = f"API_KEY={new_key}"
            found = True
            break

    if not found:
        lines.append(f"API_KEY={new_key}")

    ENV_FILE.write_text(
        "\n".join(lines) + "\n",
        encoding="utf-8"
    )

    new_lines = ENV_FILE.read_text(encoding="utf-8").splitlines()

    for i, new_line in enumerate(new_lines):
        if new_line.startswith("API_KEY="):
            print(f"[PYTHON ROTATOR LOGS] -> (API_KEY rotated) -> New value: {new_line}")
            new_lines[i] = f"API_KEY={new_key}"
            found = True
            break

    print("[PYTHON ROTATOR LOGS] - API_KEY rotated times")

rotate_secret()

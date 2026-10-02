from fastapi import Request
from fastapi.responses import JSONResponse
from app import create_app
from app.config import API_KEY

PUBLIC_PATHS = {
    "/api/ldap/health",
}

app = create_app()

@app.middleware("http")
async def log_request(request: Request, call_next):

    if request.url.path in PUBLIC_PATHS:
        return await call_next(request)

    x_api_key = request.headers.get("x-api-key")

    if not x_api_key or x_api_key != API_KEY:
        return JSONResponse(
            status_code=401,
            content={"detail": "Invalid or missing API Key"}
        )

    headers = "; ".join(
        f"{key}={value}"
        for key, value in request.headers.items()
    )

    body = await request.body()

    print(f"HEADERS: {headers}")
    print(f"BODY: {body.decode('utf-8', errors='replace')}")

    response = await call_next(request)

    return response
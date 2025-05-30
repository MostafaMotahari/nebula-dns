from starlette.applications import Starlette
from starlette.middleware import Middleware
from starlette.requests import Request
from starlette.responses import JSONResponse
from starlette.routing import Route
from ipaddress import ip_address
from typing import Optional
from starlette.types import ASGIApp, Scope, Receive, Send


app = Starlette()

class CORSMiddleware:
    def __init__(self, app: ASGIApp) -> None:
        self.app = app

    async def __call__(self, scope: Scope, receive: Receive, send: Send) -> None:
        async def send_wrapper(message):
            # Add CORS headers to all responses
            if message["type"] == "http.response.start":
                headers = dict(message.get("headers", []))
                headers[b"access-control-allow-origin"] = b"*"
                headers[b"access-control-allow-methods"] = b"*"
                headers[b"access-control-allow-headers"] = b"*"
                message["headers"] = [(k, v) for k, v in headers.items()]
                
            await send(message)

        await self.app(scope, receive, send_wrapper)


def get_client_ip(request: Request) -> Optional[str]:
    # Check forwarded headers first
    if "x-forwarded-for" in request.headers:
        # Get the first IP in the X-Forwarded-For header
        return request.headers["x-forwarded-for"].split(",")[0].strip()
    elif "x-real-ip" in request.headers:
        return request.headers["x-real-ip"]
    # Fall back to direct connection IP
    return request.client.host if request.client else None

async def detect_ip_version(request: Request) -> JSONResponse:
    client_ip = get_client_ip(request) or "0.0.0.0"
    
    try:
        ip = ip_address(client_ip)
        version = "ipv6" if ip.version == 6 else "ipv4"
    except ValueError:
        version = "Unknown"
    
    return JSONResponse({
        "client_ip": client_ip,
        "ip_version": version,
        "status": "success"
    })

# Apply OPTIONS handler to all routes
app = Starlette(
    routes=[ Route("/", detect_ip_version), ],
    middleware=[Middleware(CORSMiddleware)]
)

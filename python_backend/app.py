import os
import asyncpg
from fastapi import FastAPI
from prometheus_client import Counter, generate_latest, CONTENT_TYPE_LATEST
from starlette.responses import Response

app = FastAPI()

DB_SETTINGS = {
    "user": os.getenv("DB_USER", "appuser"),
    "password": os.getenv("DB_PASSWORD", "supersecret"),
    "database": os.getenv("DB_NAME", "portfolio"),
    "host": os.getenv("DB_HOST", "postgres"),
    "port": int(os.getenv("DB_PORT", 5432)),
}

request_counter = Counter(
    "admin_requests_total",
    "Total HTTP requests for admin service",
    ["route", "method", "status"]
)

async def get_conn():
    return await asyncpg.connect(**DB_SETTINGS)

@app.middleware("http")
async def count_requests(request, call_next):
    response = await call_next(request)
    request_counter.labels(
        route=request.url.path,
        method=request.method,
        status=response.status_code
    ).inc()
    return response

@app.get("/health")
async def health():
    return {"status": "ok", "service": "backend_python"}

@app.get("/api/admin/stats")
async def stats():
    conn = await get_conn()
    try:
      projects_count = await conn.fetchval("SELECT COUNT(*) FROM projects")
      return {"projects_count": projects_count}
    finally:
      await conn.close()

@app.get("/metrics")
async def metrics():
    data = generate_latest()
    return Response(content=data, media_type=CONTENT_TYPE_LATEST)


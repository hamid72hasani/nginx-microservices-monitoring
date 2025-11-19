# 🚀 Nginx Microservices Monitoring

### *(Node.js Backend • Python FastAPI Backend • PostgreSQL • Nginx Reverse Proxy • Let's Encrypt • Prometheus • Grafana)*

A production-grade **full‑stack microservices platform** built with
Docker Compose.\
This project features two independent backends (Node.js + Python), a
PostgreSQL database, SSL-secured Nginx reverse proxy, and a complete
observability stack (Prometheus + Grafana).

It demonstrates real DevOps skills, including service orchestration, SSL
automation, reverse proxying, monitoring, metrics, alerting, and
multi-service routing.

------------------------------------------------------------------------

## 🌐 Architecture Overview

                          ┌────────────────────────┐
                          │        Clients         │
                          └─────────────┬──────────┘
                                        │
                           HTTPS / Reverse Proxy
                                        │
                          ┌─────────────▼─────────────┐
                          │          NGINX            │
                          └───────┬───────────┬───────┘
                                  │           │
                        Static Web│           │ 
                                  │           │ 
                     ┌────────────▼───┐   ┌──▼────────────────────┐
                     │ Node.js Backend │   │ Python FastAPI Backend│
                     │    (Port 3000)  │   │      (Port 8000)      │
                     └─────────────────┘   └──────────┬────────────┘
                                                      │
                                       ┌──────────────▼────────────┐
                                       │  Nginx Prometheus Exporter │
                                       └──────────────┬────────────┘
                                                      │
                                           ┌──────────▼──────────┐
                                           │      Prometheus      │
                                           └──────────┬──────────┘
                                                      │
                                            ┌─────────▼────────┐
                                            │      Grafana      │
                                            └────────────────────┘

------------------------------------------------------------------------

## 📦 Features

### 🔹 Backends

**Node.js Backend** - Production mode - REST API - PostgreSQL
connection - `/health` endpoint

**Python FastAPI Backend** - Admin analytics endpoint
(`/api/admin/stats`) - Async PostgreSQL access (asyncpg) - Prometheus
metrics (`/metrics`) - Request tracking middleware - `/health` endpoint

------------------------------------------------------------------------

### 🔹 Database

-   PostgreSQL 16 (Alpine)
-   Auto initialization via `init.sql`
-   Shared across microservices

------------------------------------------------------------------------

### 🔹 Nginx Reverse Proxy

-   HTTPS enabled with Let's Encrypt
-   Automatic certificate renewal
-   Redirect HTTP → HTTPS
-   Serves static frontend
-   Reverse proxy for both backends
-   Exposes `/stub_status` for monitoring

------------------------------------------------------------------------

### 🔹 Monitoring & Observability

-   **Prometheus**
    -   Scrapes: Nginx, Python backend
    -   Custom alert rules for:
        -   Nginx down
        -   Exporter down
        -   High 5xx rate
        -   Too many connections
-   **Grafana**
    -   Import-ready minimal dashboard
    -   Real-time visualization

------------------------------------------------------------------------

## 📁 Project Structure

    .
    ├── db/
    │   └── init.sql
    ├── js_backend/
    │   └── Dockerfile
    ├── python_backend/
    │   ├── app.py
    │   └── Dockerfile
    ├── static_web/
    │   ├── index.html
    │   ├── style.css
    │   └── app.js
    ├── nginx_configs/
    │   ├── nginx.conf
    │   ├── conf.d/
    │   └── ssl-dhparams.pem
    ├── monitoring/
    │   ├── prometheus.yml
    │   └── rules.yml
    ├── docker-compose.yml
    └── README.md

------------------------------------------------------------------------

## ⚙️ Running the Project

### 1. Clone the repository

``` bash
git clone <repo-url>
cd session-7
```

### 2. Add environment variables

Create `.env`:

    DOMAIN=your-domain.com
    CERTBOT_EMAIL=your-email@example.com

### 3. Start the stack

``` bash
docker compose up -d
```

------------------------------------------------------------------------

## 🔗 URLs

  Service          URL
  ---------------- -------------------------------
  Web App          https://your-domain.com
  Node Backend     http://localhost:3000
  Python Backend   http://localhost:8000
  Prometheus       http://localhost:9090
  Grafana          http://localhost:3000
  Nginx Metrics    http://localhost:9113/metrics

------------------------------------------------------------------------

## 📊 Monitoring & Metrics

Python backend metrics:

    GET /metrics
    GET /health
    GET /api/admin/stats

Nginx exporter metrics:

    GET http://localhost:9113/metrics

Prometheus alert rules:

    monitoring/rules.yml

------------------------------------------------------------------------

## 🧪 Load Testing

``` bash
for i in {1..200}; do curl -s https://your-domain.com >/dev/null; done
```

Or with ApacheBench:

``` bash
ab -n 2000 -c 50 https://your-domain.com/
```

------------------------------------------------------------------------

## 🛠 Tech Stack

-   Nginx
-   Node.js
-   Python FastAPI
-   PostgreSQL
-   Docker Compose
-   Prometheus
-   Grafana
-   Certbot (Let's Encrypt)

------------------------------------------------------------------------

## 🧹 Cleanup

Stop everything:

``` bash
docker compose down
```

Remove volumes (⚠ irreversible):

``` bash
docker volume rm pgdata letsencrypt certbot-webroot nginx-cache nginx-logs
```

------------------------------------------------------------------------

## ⭐ Contributions

PRs welcome. If you like this project, leave a ⭐ on GitHub!

------------------------------------------------------------------------

## 📜 License

MIT

# 🚀 Nginx Full-Stack Application with SSL, Monitoring & Observability

### *(Node.js Backend • Python Backend • PostgreSQL • Nginx Reverse Proxy • Let's Encrypt • Prometheus • Grafana)*

This project is a fully containerized and multi-service production
environment built with Docker Compose.
It includes:

-   A Node.js backend (REST API)\
-   A Python FastAPI backend\
-   PostgreSQL database** with automatic initialization\
-   Nginx reverse proxy** with HTTPS (Let's Encrypt)\
-   Automatic SSL renewal using Certbot\
-   Nginx dynamic reloader (hot-reload on certificate updates)\
-   Nginx Prometheus Exporter (metrics scraping)\
-   Prometheus** (metrics collection and alerting rules)\
-   Grafana** (dashboards and observability UI)\
-   Static frontend hosting via Nginx

This repository demonstrates **production-grade DevOps practices**,
including reverse proxying, SSL management, service health checks,
monitoring, and observability.

------------------------------------------------------------------------

 🌐 Architecture Overview

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
                  Static Website  │           │  /stub_status
                                  │           │
                  ┌───────────────▼──┐   ┌───▼─────────────────────┐
                  │   Node Backend   │   │ Nginx Prometheus Exporter│
                  └──────────────────┘   └───────┬──────────────────┘
                                                 │
                                    ┌────────────▼────────────┐
                                    │       Prometheus         │
                                    └────────────┬────────────┘
                                                 │
                                       ┌─────────▼────────┐
                                       │     Grafana       │
                                       └────────────────────┘

------------------------------------------------------------------------

## 📦 Features

### 🔹 Backend Stack

-   Node.js REST API**
-   Python FastAPI service**
-   Independent Dockerfiles for each service
-   Health checks for all backends

### 🔹 Database

-   PostgreSQL 16 (Alpine)
-   Schema auto-loading via `init.sql`

### 🔹 Nginx Reverse Proxy

-   Serves static frontend
-   Routes requests to both backends
-   Full HTTPS via Let's Encrypt
-   HTTP → HTTPS redirection
-   Exposes `/stub_status` for metrics
-   Cache + log volumes

### 🔹 Monitoring & Observability

-   Prometheus metrics scraping
-   Alert rules for:
    -   Nginx down
    -   Exporter down
    -   5xx spikes
    -   High active connections
-   Grafana dashboards (import-ready)

### 🔹 SSL Automation

-   Initial certificate generation
-   Scheduled renewal loop
-   Automatic Nginx reload on cert updates

------------------------------------------------------------------------

## 📁 Project Structure

    .
    ├── db/
    │   └── init.sql
    ├── js_backend/
    │   └── Dockerfile
    ├── python_backend/
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
git clone <your-repo-url>
cd session-7
```

### 2. Create `.env` file

    DOMAIN=your-domain.com
    CERTBOT_EMAIL=your@email.com

### 3. Start the stack

``` bash
docker compose up -d
```

------------------------------------------------------------------------

## 🔗 URLs

  Service         URL
  --------------- -------------------------------
  Web App         https://your-domain.com
  Prometheus      http://localhost:9090
  Grafana         http://localhost:3000
  Nginx Metrics   http://localhost:9113/metrics

------------------------------------------------------------------------

## 📊 Monitoring

Prometheus includes alert rules for:

-   Nginx exporter down\
-   Nginx unresponsive\
-   High 5xx error rate\
-   High active connections

Alerts are defined in:

    monitoring/rules.yml

------------------------------------------------------------------------

## 🧪 Load Testing

Generate traffic:

``` bash
for i in {1..200}; do curl -s https://your-domain.com >/dev/null; done
```

Or using `ab`:

``` bash
ab -n 2000 -c 50 https://your-domain.com/
```

------------------------------------------------------------------------

## 🛠 Tech Stack

-   Nginx\
-   Docker Compose\
-   Node.js\
-   Python FastAPI\
-   PostgreSQL\
-   Prometheus\
-   Grafana\
-   Certbot SSL

------------------------------------------------------------------------

## 🧹 Cleanup

Stop containers:

``` bash
docker compose down
```

Remove persistent data (dangerous):

``` bash
docker volume rm pgdata letsencrypt certbot-webroot nginx-cache nginx-logs
```

------------------------------------------------------------------------

## ⭐ Contribution

Pull requests are welcome. If you like this project, consider giving it
a ⭐ on GitHub.

------------------------------------------------------------------------

## 📜 License

MIT

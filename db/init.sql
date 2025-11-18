CREATE TABLE IF NOT EXISTS projects (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  url TEXT
);

INSERT INTO projects (name, description, url) VALUES
('Nginx DevOps Lab', 'Multi-service app with TLS, certbot, Prometheus and Docker', 'https://github.com/72hamidhasani'),
('Portfolio API', 'Node + Python microservices with Postgres backend', 'https://github.com/72hamidhasani');


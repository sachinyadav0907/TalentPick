# TalentPick Deployment Guide

## Tech Stack

- Azure Virtual Machine (Ubuntu)
- Docker
- Docker Compose
- Nginx
- MongoDB Atlas
- DuckDNS
- Let's Encrypt SSL

## Clone Repository

```bash
git clone https://github.com/sachinyadav0907/TalentPick.git
```

## Backend

```bash
cd backend
docker build -t talentpick-backend:latest .
```

## Frontend

```bash
cd frontend
docker build -t talentpick-frontend:latest .
```

## Run Containers

```bash
docker compose up -d
```

## View Running Containers

```bash
docker ps
```

## Stop Containers

```bash
docker compose down
```

## Restart Containers

```bash
docker compose up -d
```

## SSL

Generated using:

```bash
sudo certbot --nginx
```

## Live URL

https://talentpick.duckdns.org
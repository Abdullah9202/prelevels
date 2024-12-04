# Configure Nginx for Frontend

## Step 1: Update the Nginx configuration for the frontend at `/etc/nginx/sites-available/prelevels`

### Note: Add this code below the django configuration

```nginx
# Frontend Configuration (Next.js)
server {
    listen 80;
    server_name yourdomain.com;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

## Updated Nginx Configuration

```bash
# Backend Configuration (Django)
server {
    listen 80;
    server_name api.yourdomain.com;

    # Serve static files
    location /static/ {
        alias /home/projectDir/prelevels/server/static/;
    }

    # Serve media files
    location /media/ {
        alias /home/projectDir/prelevels/server/media/;
    }

    # Proxy requests to Gunicorn
    location / {
        proxy_pass http://unix:/home/projectDir/prelevels/server/gunicorn.sock;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}

# Frontend Configuration (Next.js)
server {
    listen 80;
    server_name yourdomain.com;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

## Test and reload Nginx

```bash
sudo nginx -t
sudo systemctl reload nginx
```

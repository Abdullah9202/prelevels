# Configure Nginx

## Step 1: Create an Nginx configuration file at `/etc/nginx/sites-available/prelevels`

```nginx
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
```

## Step 2: Set File Permissions

```bash
sudo chown -R www-data:www-data /home/projectDir/prelevels/server/static
sudo chown -R www-data:www-data /home/projectDir/prelevels/server/media
```

## Step 3: Enable the configuration

```bash
sudo ln -s /etc/nginx/sites-available/prelevels /etc/nginx/sites-enabled
sudo nginx -t
sudo systemctl restart nginx
```

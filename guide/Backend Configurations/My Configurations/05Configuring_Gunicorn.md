# Configure Gunicorn

## Step 1: Install Gunicorn

```bash
pip install gunicorn
```

## Step 2: Create a Gunicorn service file at `/etc/systemd/system/gunicorn.service`

```ini
[Unit]
Description=gunicorn daemon for Prelevels
Requires=gunicorn.socket
After=network.target

[Service]
User=root
Group=www-data
WorkingDirectory=/home/projectDir/prelevels/server
ExecStart=/home/projectDir/prelevels/server/venv/bin/gunicorn \
    --access-logfile - \
    --workers 3 \
    --bind unix:/home/projectDir/prelevels/server/gunicorn.sock \
    server.wsgi:application

[Install]
WantedBy=multi-user.target
```

## Step 3: Start and enable Gunicorn

```bash
sudo systemctl start gunicorn
sudo systemctl enable gunicorn
```

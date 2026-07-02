# Deployment

## Requirements

- Node.js >= 20.6.0
- A Linux server
- A reverse proxy (Nginx recommended)

## Install

```bash
git clone https://github.com/KarthikeyanKC/discuss.git
cd discuss
npm install --production
npm run setup        # creates your admin account
cp .env.example .env # edit JWT_SECRET and any other vars
```

## systemd service

Create `/etc/systemd/system/discuss.service`:

```ini
[Unit]
Description=Discuss Comment Server
After=network.target

[Service]
Type=simple
User=www-data
WorkingDirectory=/var/www/discuss
ExecStart=/usr/bin/node src/server.js
Restart=on-failure
EnvironmentFile=/var/www/discuss/.env
Environment=NODE_ENV=production PORT=3000

[Install]
WantedBy=multi-user.target
```

```bash
sudo systemctl daemon-reload
sudo systemctl enable discuss
sudo systemctl start discuss
```

## Nginx (recommended)

```nginx
server {
    listen 443 ssl;
    server_name discuss.example.com;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

> **New subdomain with Certbot?** Configure the port 80 block only, then run `certbot --nginx -d discuss.example.com`. Certbot will obtain the certificate and rewrite your config automatically.

## Apache

Enable required modules first: `sudo a2enmod proxy proxy_http headers`

```apache
<VirtualHost *:443>
    ServerName discuss.example.com

    SSLEngine on
    # SSLCertificateFile /path/to/cert.pem
    # SSLCertificateKeyFile /path/to/privkey.pem

    AllowEncodedSlashes NoDecode

    ProxyPreserveHost On
    ProxyPass / http://127.0.0.1:3000/ nocanon
    ProxyPassReverse / http://127.0.0.1:3000/

    RequestHeader set X-Forwarded-Proto "https"
</VirtualHost>
```

Both `AllowEncodedSlashes NoDecode` and `nocanon` are required. Without them, Apache decodes percent-encoded slashes before proxying and breaks deep admin URLs on hard reload.

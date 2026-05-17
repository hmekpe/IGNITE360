SELF-HOSTING GUIDE (Host on your own server/home network)

Goal

Host the Next.js site from your own machine or server without paying for cloud hosting and using your own domain. This guide covers local server setup, DNS, TLS with Let's Encrypt (free), automation for deploys, and options for dynamic IP.

Warnings & requirements

- You must control the domain's DNS (at your registrar).
- You must have a machine to host (Raspberry Pi, VPS you already own, or a spare PC).
- You may need to configure port forwarding on your router and open firewall ports.
- Expose services to the public only when secure (HTTPS) and with proper firewall rules.

High-level options

- Simple (recommended): Host using Node.js + `next start`, reverse-proxied by `nginx`, TLS via `certbot`.
- Containerized: Use `docker` + `docker-compose` and Caddy/Traefik for automatic TLS.
- Fully self-hosted CI/CD: Run a webhook listener or a small Git server on the host to auto-pull and deploy.

1) Prepare the server

Install Node.js and npm (match project's required node version), Git, and a process manager.

On Ubuntu/Debian:

```bash
# NodeSource recommended install (example for Node 18)
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs git build-essential
# Process manager
sudo npm i -g pm2
```

2) Clone the repo and install

```bash
git clone <your-repo-url> /var/www/ignite_360
cd /var/www/ignite_360
npm install
npm run build
```

3) Environment variables

Create a `.env.production` (never commit) and set variables the app expects (check `lib/*.js`). Example:

```
MONGODB_URI=mongodb+srv://user:pass@cluster.example.net/dbname
CLOUDINARY_URL=cloudinary://key:secret@cloudname
NEXT_PUBLIC_SITE_URL=https://example.com
```

4) Run the app with PM2 (or systemd)

Using PM2:

```bash
# start in production
pm run start # or `NODE_ENV=production node server.js` if custom
# or use pm2 to manage
pm i -g pm2
pm2 start npm --name "ignite_360" -- start
pm2 save
pm2 startup # follow printed steps to enable on boot
```

Systemd service example (if using `next start`):

```
# /etc/systemd/system/ignite_360.service
[Unit]
Description=Ignite 360 Next.js app
After=network.target

[Service]
Type=simple
User=www-data
WorkingDirectory=/var/www/ignite_360
Environment=NODE_ENV=production
ExecStart=/usr/bin/npm run start
Restart=on-failure

[Install]
WantedBy=multi-user.target
```

```bash
sudo systemctl daemon-reload
sudo systemctl enable ignite_360
sudo systemctl start ignite_360
```

5) Reverse proxy and TLS

Use `nginx` to proxy ports 80/443 to the Next.js app (which runs on localhost:3000 by default). Obtain certificates with Certbot (Let's Encrypt).

Install nginx and certbot:

```bash
sudo apt-get install -y nginx certbot python3-certbot-nginx
```

Nginx site example:

```
# /etc/nginx/sites-available/ignite_360
server {
    listen 80;
    server_name example.com www.example.com;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Enable and reload:

```bash
sudo ln -s /etc/nginx/sites-available/ignite_360 /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

Get TLS certificate via Certbot:

```bash
sudo certbot --nginx -d example.com -d www.example.com
# certbot will install the certificate and set up auto-renewal.
```

6) Router / Firewall

- Forward port 80 and 443 from your router to the server's LAN IP.
- If you have a dynamic public IP, see Dynamic IP section.
- Ensure firewall allows 80/443 (ufw example):

```bash
sudo ufw allow OpenSSH
sudo ufw allow 'Nginx Full'
sudo ufw enable
```

7) DNS: point your domain to your public IP

- Create an A record at your domain registrar pointing `@` and `www` to your public IPv4 address.
- For IPv6, add AAAA record.
- Set TTL lower (e.g., 300) while testing.

Dynamic IP options

If your ISP gives a dynamic IP:

- Option A: Use your registrar's DNS API to update the A record programmatically from your server. Many registrars (Namecheap, Cloudflare, etc.) provide APIs.
- Option B: Use a dynamic DNS provider (no paid services required if your registrar supports dynamic updates), or run a small script that calls the registrar's API on IP change.

Sample update script (using curl and Cloudflare API as example - cloudflare is a free DNS provider; adapt for your registrar):

```bash
#!/bin/bash
# /usr/local/bin/ddns-update.sh
ZONE_ID="<zone-id>"
RECORD_ID="<record-id>"
API_TOKEN="<api-token>"
IP=$(curl -s https://ipv4.icanhazip.com)
curl -X PUT "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/dns_records/$RECORD_ID" \
     -H "Authorization: Bearer $API_TOKEN" \
     -H "Content-Type: application/json" \
     --data '{"type":"A","name":"example.com","content":"'$IP'","ttl":120}'
```

Schedule via `cron` every 5 minutes.

Automation: Auto-deploy on push

Option 1: GitHub webhook + simple deploy script on host

- Create a small webhook receiver (node script or use `webhook` binary) on your server that listens for `push` events.
- When a push arrives, verify the signature, `git pull`, `npm ci`, `npm run build`, and `pm2 reload`.

Sample deploy script (`deploy.sh`):

```bash
#!/bin/bash
cd /var/www/ignite_360
git fetch --all
git reset --hard origin/main
npm ci --production
npm run build
pm2 restart ignite_360
```

Secure the webhook receiver:
- Only allow requests from GitHub IP ranges, or require a secret signature.
- Run the webhook listener behind nginx and TLS.

Option 2: Pull-based automation using `cron` or `systemd` timer

- Periodically `git pull` from the server via a cron job and rebuild.

Option 3: Use a self-hosted Git server (Gitea) and run webhooks locally (no external services required other than DNS)

Persistence and backups

- Back up database (MongoDB) regularly; you can run MongoDB locally or use an external DB that you already run.
- Back up uploaded assets if you aren't using a CDN/store like Cloudinary.

Optional: Docker + Caddy (automatic TLS)

Docker-compose snippet with Caddy (Caddy gets free TLS automatically):

```yaml
version: '3.7'
services:
  app:
    image: node:18
    working_dir: /app
    volumes:
      - ./:/app
    command: sh -c "npm ci && npm run build && npm run start"
    expose:
      - "3000"

  caddy:
    image: caddy:2
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./Caddyfile:/etc/caddy/Caddyfile
      - caddy_data:/data
      - caddy_config:/config

volumes:
  caddy_data:
  caddy_config:
```

Caddyfile example:

```
example.com {
    reverse_proxy app:3000
}
```

Caddy will obtain and renew TLS certs automatically.

Security notes

- Keep OS and Node updated.
- Use strong passwords and SSH keys for server access.
- Use a firewall and minimize open ports.
- Monitor logs and set up basic alerts if possible.

What I can do next

- Extract exact env var names from this repo and add a `.env.example`.
- Generate a sample `systemd` service, `nginx` site file, and the `deploy.sh` webhook listener code filled with your repo details.

Tell me which next step you want and I will generate the files.

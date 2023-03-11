---
description: Setup-Instructions for running a public blockchain node
---

# Setup Public Node

Install instructions are for `CentOS`

```bash
sudo yum install epel-release
sudo yum update -y
sudo yum install -y git golang
sudo useradd thor -g users
sudo su - thor
git clone https://github.com/vechain/thor.git
cd thor
make
```

### Setup VechainThor Node

```bash
sudo vi /etc/systemd/system/thor.service
```

Adjust placeholders in `<>:`

{% code title="/etc/systemd/system/thor.service" %}
```systemd
[Unit]
Description=Vechain-Thor-Node

Wants=network.target
After=syslog.target network-online.target

[Service]
Type=simple
User=thor
Group=users
ExecStart=/home/thor/thor/bin/thor --network main --data-dir <DATA_DIR> --api-cors --api-addr 127.0.0.1:8669
Restart=on-failure
RestartSec=10
KillMode=process

[Install]
WantedBy=multi-user.target
```
{% endcode %}

Enable and auto start on boot:

```bash
sudo chmod 644 /etc/systemd/system/thor.service
sudo systemctl daemon-reload
sudo systemctl enable thor
```

Test with reboot and status check:

```bash
sudo reboot
sudo systemctl status thor
```

### Setup Web-Server

Access via `nginx`&#x20;

```bash
sudo yum install -y nginx
```

Example configuration: [https://gist.github.com/libotony/851b09f9a1a3da935b419e6fe636f9aa](https://gist.github.com/libotony/851b09f9a1a3da935b419e6fe636f9aa)

```bash
sudo vi /etc/nginx/conf.d/node.conf
```

{% code title="/etc/nginx/conf.d/node.conf" %}
```nginx
map $http_upgrade $connection_upgrade {
    default upgrade;
    "" close;
}

upstream BACKEND {
    server    127.0.0.1:8669;
    keepalive 64;
}

server {
    listen 80;
    server_name <DOMAIN>;

    add_header "Access-Control-Allow-Origin"    $http_origin always;
    add_header "Access-Control-Allow-Methods"   "GET, POST, OPTIONS, HEAD" always;
    add_header "Access-Control-Allow-Headers"   "DNT,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Range,x-genesis-id" always;
    add_header "Access-Control-Expose-Headers"  "x-genesis-id,x-thorest-ver" always;
    add_header "Access-Control-Max-Age"         86400 always;

    if ($request_method = "OPTIONS" ) {
        return 204 no-content;
    }

    location ^~ /subscriptions {
        proxy_redirect              off;
        proxy_read_timeout          1m;
        proxy_connect_timeout       1m;
        proxy_pass                  http://BACKEND;
        proxy_http_version          1.1;
        proxy_set_header Host       $host;
        proxy_set_header Upgrade    $http_upgrade;
        proxy_set_header Connection $connection_upgrade;
        proxy_set_header Origin     "";
    }

    location / {
        proxy_redirect              off;
        proxy_read_timeout          1m;
        proxy_connect_timeout       1m;
        proxy_pass                  http://BACKEND;
        proxy_http_version          1.1;
        proxy_set_header Host       $host;
        proxy_set_header Upgrade    $http_upgrade;
        proxy_set_header Connection "";
    }
}
```
{% endcode %}

enable nginx as system service

```bash
sudo systemctl enable nginx
sudo systemctl start nginx
```

### Setup SSL encryption

based on [https://linuxize.com/post/secure-nginx-with-let-s-encrypt-on-centos-7/](https://linuxize.com/post/secure-nginx-with-let-s-encrypt-on-centos-7/)

```bash
sudo yum install -y certbot
sudo openssl dhparam -out /etc/ssl/certs/dhparam.pem 2048
sudo mkdir -p /var/lib/letsencrypt/.well-known
sudo chgrp nginx /var/lib/letsencrypt
sudo chmod g+s /var/lib/letsencrypt
```

{% code title="/etc/nginx/snippets/letsencrypt.conf" %}
```nginx
location ^~ /.well-known/acme-challenge/ {
  allow all;
  root /var/lib/letsencrypt/;
  default_type "text/plain";
  try_files $uri =404;
}
```
{% endcode %}

{% code title="/etc/nginx/snippets/ssl.conf" %}
```nginx
ssl_dhparam /etc/ssl/certs/dhparam.pem;

ssl_session_timeout 1d;
ssl_session_cache shared:SSL:50m;
ssl_session_tickets off;

ssl_protocols TLSv1 TLSv1.1 TLSv1.2;
ssl_ciphers 'ECDHE-ECDSA-CHACHA20-POLY1305:ECDHE-RSA-CHACHA20-POLY1305:ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384:DHE-RSA-AES128-GCM-SHA256:DHE-RSA-AES256-GCM-SHA384:ECDHE-ECDSA-AES128-SHA256:ECDHE-RSA-AES128-SHA256:ECDHE-ECDSA-AES128-SHA:ECDHE-RSA-AES256-SHA384:ECDHE-RSA-AES128-SHA:ECDHE-ECDSA-AES256-SHA384:ECDHE-ECDSA-AES256-SHA:ECDHE-RSA-AES256-SHA:DHE-RSA-AES128-SHA256:DHE-RSA-AES128-SHA:DHE-RSA-AES256-SHA256:DHE-RSA-AES256-SHA:ECDHE-ECDSA-DES-CBC3-SHA:ECDHE-RSA-DES-CBC3-SHA:EDH-RSA-DES-CBC3-SHA:AES128-GCM-SHA256:AES256-GCM-SHA384:AES128-SHA256:AES256-SHA256:AES128-SHA:AES256-SHA:DES-CBC3-SHA:!DSS';
ssl_prefer_server_ciphers on;

ssl_stapling on;
ssl_stapling_verify on;
resolver 8.8.8.8 8.8.4.4 valid=300s;
resolver_timeout 30s;

add_header Strict-Transport-Security "max-age=15768000; includeSubdomains; preload";
add_header X-Frame-Options SAMEORIGIN;
add_header X-Content-Type-Options nosniff;
```
{% endcode %}

adjust nginx configuration:

{% code title="/etc/nginx/conf.d/node.conf" %}
```nginx
map $http_upgrade $connection_upgrade {
    default upgrade;
    "" close;
}

upstream BACKEND {
    server    127.0.0.1:8669;
    keepalive 64;
}

server {
    listen 80;
    server_name <DOMAIN>;

    include snippets/letsencrypt.conf;
    return 301 https://$host$request_uri;
}

server {
    listen 443 ssl http2;
    server_name <DOMAIN>;

    ssl_certificate /etc/letsencrypt/live/<DOMAIN>/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/<DOMAIN>/privkey.pem;
    ssl_trusted_certificate /etc/letsencrypt/live/<DOMAIN>/chain.pem;
    include snippets/ssl.conf;
    include snippets/letsencrypt.conf;

    add_header "Access-Control-Allow-Origin"    $http_origin always;
    add_header "Access-Control-Allow-Methods"   "GET, POST, OPTIONS, HEAD" always;
    add_header "Access-Control-Allow-Headers"   "DNT,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Range,x-genesis-id" always;
    add_header "Access-Control-Expose-Headers"  "x-genesis-id,x-thorest-ver" always;
    add_header "Access-Control-Max-Age"         86400 always;

    if ($request_method = "OPTIONS" ) {
        return 204 no-content;
    }

    location ^~ /subscriptions {
        proxy_redirect              off;
        proxy_read_timeout          1m;
        proxy_connect_timeout       1m;
        proxy_pass                  http://BACKEND;
        proxy_http_version          1.1;
        proxy_set_header Host       $host;
        proxy_set_header Upgrade    $http_upgrade;
        proxy_set_header Connection $connection_upgrade;
        proxy_set_header Origin     "";
    }

    location / {
        proxy_redirect              off;
        proxy_read_timeout          1m;
        proxy_connect_timeout       1m;
        proxy_pass                  http://BACKEND;
        proxy_http_version          1.1;
        proxy_set_header Host       $host;
        proxy_set_header Upgrade    $http_upgrade;
        proxy_set_header Connection "";
    }
}
```
{% endcode %}

request certificate:

```
sudo certbot certonly --agree-tos --email <YOUR_EMAIL> --webroot -w /var/lib/letsencrypt/ -d <DOMAIN>
```

auto renew with cronjob:

```bash
sudo crontab -e
```

```systemd
0 */12 * * * root test -x /usr/bin/certbot -a \! -d /run/systemd/system && perl -e 'sleep int(rand(3600))' && certbot -q renew --renew-hook "systemctl reload nginx"
```

### Update Node

```bash
su - thor
cd thor
git pull
make
# confirm version
./bin/thor -v
logout

sudo systemctl restart thor
```

### Recommended Hardware

|           | Minimum Specification         | Recommended Specification                             |
| --------- | ----------------------------- | ----------------------------------------------------- |
| CPU       | 8 Core                        | 16 Core                                               |
| RAM       | 16 GB                         | 64 GB                                                 |
| Disk      | 500 GB SSD                    | 2 TB SSD                                              |
| Bandwidth | 10 Mbit                       | 20 Mbit                                               |
| Security  | Hardened secure configuration | Hardened secure configuration DDOS and IDS protection |

### Links

* [Installscript for Debian by MiRei](https://github.com/mirei83/vechain-deploy)

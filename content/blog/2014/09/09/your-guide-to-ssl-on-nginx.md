---
title: "Your Guide to SSL on Nginx"
excerpt: "Everyone is moving to add SSL support on their site. If you're using Nginx and looking to do the same then this post is for you, walking you through from start to finish on how to add SSL support."
mainImage: "/images/blog/2014/09/09/10248675643-d5ab02a636-o.jpg"
primaryColor: "#c4ac44"
date: "2014-09-09T18:41:00-07:00"
updatedOn: "2014-09-09T18:41:00-07:00"
slug: "your-guide-to-ssl-on-nginx"
---

# Your Guide to SSL on Nginx

Looking to set up SSL on your site? Using Nginx to host? Then come on it.

# 7 Steps to SSL Bliss

## 1.) Get a Certificate

Go over to [namecheap.com](https://www.namecheap.com/security/ssl-certificates/domain-validation.aspx) and pick yourself up a nice little cert. The cheapest is about $9.00 (~£5.58)

## 2.) Activate your Certificate

Once you've bought your SSL Certificate, you need to activate it. [This page has all the info you need](https://www.namecheap.com/support/knowledgebase/article.aspx/794/67/how-to-activate-ssl-certificate). Ultimately, it's squirrelled away here.

![NameCheap SSL Activation](/images/blog/2014/09/09/ssl-menu-access.png "630")

The wizard will ask you to paste in a *Certificate Signing Request (CSR)*, which you'll either get from your host or if you are self-hosted, you can make one yourself with the following command:

```bash
openssl req -nodes -newkey rsa:2048 -keyout private.key -out server.csr

    Country Name (2 letter code) [AU]: GB
    State or Province Name (full name) [Some-State]: London
    Locality Name (eg, city) []: London
    Organization Name (eg, company) [Internet Widgits Pty Ltd]: Gauntface
    Organizational Unit Name (eg, section) []:
    Common Name (eg, YOUR name) []: subdomain.gauntface.com
    Email Address []:
    Please enter the following 'extra' attributes to be sent with your certificate request
    A challenge password []:
    An optional company name []:
```

This outputs a *server.csr* file as well as a *private.key*. Keep both of these files safe and back-them up.

Copy the contents of the *.csr* file into NameCheap's site. Afterwards you'll be asked to pick an email address linked to your domain (i.e. for me an example would be webmaster@gauntface.com), pick one and move to the next step.

*p.s. if you get message saying the email isn't valid, just double check you can get e-mails to it  and continue - I had to tell NameCheap to ignore this error*

## 3.) Sit Tight

Wait until NameCheap sends you your certificates. For me this was maybe 15 - 30 minutes. [Time to read this](http://xkcd.com/).

## 4.) Generate the Nginx Certificates

In your Nginx config file, there are a few certificates you'll need.

```
ssl_certificate     /etc/ssl/certs/ssl-bundle.crt;
ssl_certificate_key /etc/ssl/private/private.key;

# Diffie-Hellman parameter for DHE ciphersuites, recommended 2048 bits
ssl_dhparam /etc/ssl/certs/dhparam.cert;

# OCSP Stapling
ssl_trusted_certificate /etc/ssl/certs/trusted-ssl-bundle.crt;
```

Let's step through how you make each one. Unzip the certificates you got from NameCheap.

### ssl_certificate > ssl-bundle.crt

*ssl-bundle.crt* is the combination of the following files from your NameCheap zip, in this order:

- domain_com.crt (in my case gauntface_com.crt)
- COMODORSADomainValidationSecureServerCA.crt
- COMODORSAAddTrustCA.crt
- AddTrustExternalCARoot.crt

You can create the *ssl-bundle.crt* by running the following command in the NameCheap directory.

```bash
cat gauntface_com.crt COMODORSADomainValidationSecureServerCA.crt COMODORSAAddTrustCA.crt AddTrustExternalCARoot.crt > ssl-bundle.crt
```

### ssl_certificate_key > private.key

This one is easy. This is the private.key you made in step 1.

### ssl_dhparam > dhparam.cert

The Diffie-Hellman parameter is used to enable [forward secrecy](http://en.wikipedia.org/wiki/Forward_secrecy).

You can create this key with the following command.

```bash
openssl dhparam -out dhparam.cert 2048
```

### ssl_trusted_certificate > trusted-ssl-bundle.crt

To create this certificate, I simply took the root certificate and intermediaries and concatenated them into a single file.

```bash
cat COMODORSADomainValidationSecureServerCA.crt COMODORSAAddTrustCA.crt AddTrustExternalCARoot.crt > trusted-ssl-bundle.crt
```

## 5.) Update Your Nginx Config

The best advice I can give here is to use [Mozilla's Wiki on the best config for your site](https://wiki.mozilla.org/Security/Server_Side_TLS#Apache).

Using the Mozilla config file along with certificate files above, my config file, *at the time of writing*, looks like....

```
server {
    listen       443 ssl spdy;
    server_name gauntface.com;

    # Turn on SSL
    ssl on;
    ssl_certificate     /etc/ssl/certs/ssl-bundle.crt;
    ssl_certificate_key /etc/ssl/private/private.key;

    # Recommended Cipher Suites from Mozilla Wiki
    ssl_protocols TLSv1 TLSv1.1 TLSv1.2;
    ssl_prefer_server_ciphers on;

    # See: https://wiki.mozilla.org/Security/Server_Side_TLS#Non-Backward_Compatible_Ciphersuite
    ssl_ciphers 'ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES256-GCM-SHA384:ECDHE-ECDSA-AES256-GCM-SHA384:DHE-RSA-AES128-GCM-SHA256:DHE-DSS-AES128-GCM-SHA256:kEDH+AESGCM:ECDHE-RSA-AES128-SHA256:ECDHE-ECDSA-AES128-SHA256:ECDHE-RSA-AES128-SHA:ECDHE-ECDSA-AES128-SHA:ECDHE-RSA-AES256-SHA384:ECDHE-ECDSA-AES256-SHA384:ECDHE-RSA-AES256-SHA:ECDHE-ECDSA-AES256-SHA:DHE-RSA-AES128-SHA256:DHE-RSA-AES128-SHA:DHE-DSS-AES128-SHA256:DHE-RSA-AES256-SHA256:DHE-DSS-AES256-SHA:DHE-RSA-AES256-SHA:!aNULL:!eNULL:!EXPORT:!DES:!RC4:!3DES:!MD5:!PSK';

    # Diffie-Hellman parameter for DHE ciphersuites, recommended 2048 bits
    ssl_dhparam /etc/ssl/certs/dhparam.cert;

    # Cache parameters for the SSL session
    ssl_session_timeout 5m;
    ssl_session_cache shared:SSL:50m;

    # OCSP Stapling
    # Fetch OCSP records from URL in ssl_certificate and cache them
    # Using Googles Public DNS 8.8.8.8
    ssl_stapling on;
    ssl_stapling_verify on;
    ssl_trusted_certificate /etc/ssl/certs/trusted-ssl-bundle.crt;
    resolver 8.8.8.8;

    # Switch on Keep Alive
    keepalive_timeout   70;

    # HSTS Header for SSL
    # add_header Strict-Transport-Security "max-age=31536000; includeSubdomains";
    add_header Strict-Transport-Security "max-age=31536000;";

    # Include gzip - text/html isn't in the types as it in by default
    gzip on;
    gzip_comp_level 2;
    gzip_http_version 1.0;
    gzip_proxied any;
    gzip_min_length 1100;
    gzip_buffers 16 8k;
    gzip_types text/plain text/css application/x-javascript application/javascript text/xml application/xml application/xml+rss text/javascript;

    # Disable for IE < 6 because there are some known problems
    gzip_disable "MSIE [1-6].(?!.*SV1)";

    # Add a vary header for downstream proxies to avoid sending cached gzipped files to IE6
    gzip_vary on;

    .........
```

*Don't Forget!* to move all the SSL files into the right directories OR change the config files above.

- /etc/ssl/certs/ssl-bundle.crt
- /etc/ssl/private/private.key
- /etc/ssl/certs/trusted-ssl-bundle.crt
- /etc/ssl/certs/dhparam.cert

Things to note:
- I'm using [Spdy](http://en.wikipedia.org/wiki/SPDY), new versions of Nginx have this on by default. If you run into trouble, then delete the *spdy* keyword, or even better, update Nginx by [using one of the official Nginx repos](http://wiki.nginx.org/Install).
- I don't include subdomains in the HSTS header since I don't have a wildcard SSL certificate. If you do, then add subdomains.

## 6.) Redirect Traffic

Once you have SSL working (i.e. https://yoursite.com) is working, you'll want to redirect people from HTTP to HTTPS.

For my config, I've wanted to redirect .co.uk and .uk domains to my .com domain as well as handle the subdomain for my blog being from HTTP to HTTPS to a different URL structure.

The config is as follows.

```
# Redirect http://gauntface.com to https://gauntface.com
server {
    listen       80;
    server_name gauntface.com;
    return 301 "https://gauntface.com${uri}";
}

# Redirect other domains and www
server {
    server_name www.gauntface.co.uk gauntface.co.uk www.gauntface.uk gauntface.uk www.gauntface.com;
    return 301 "https://gauntface.com${uri}";
}

# Redirect blog sub domains
server {
    server_name blog.gauntface.com blog.gauntface.co.uk blog.gauntface.uk;
    return 301 "https://gauntface.com/blog${uri}";
}
```

This is just for inspiration, you'll need to change this for your site.

## 7.) Test

There are a few tests you need to run on your site to make sure everything is A-Okay.

###[SSLLabs](https://www.ssllabs.com/ssltest/)

This checks for a tonne of features that you should have on your site now that you've enabled SSL.

![SSLLabs Test Results for Gauntface.com](/images/blog/2014/09/09/ssl-labs-test-results.png "600")

### [shaaaaaaaaaaaaa.com](https://shaaaaaaaaaaaaa.com/)

This nifty little site checks that your site is using an SHA256 certificate. I believe this is sorted in step 1 where we create our private key and CSR file. The *-newkey rsa:2048* parameter is the bit which does it (or at least I think it does).

![shaaaaaaa Test Results for Gauntface.com](/images/blog/2014/09/25/shaaaaa.png "600")

### [spdycheck.org](http://spdycheck.org/)

If you use spdy, then you'll want to run your site through this, just to be sure everything is ok.

![SPDY Check Test Results for Gauntface.com](/images/blog/2014/09/09/spdycheck-test.png "600")

# Final Comments

I've gone out of my way to avoid explaining what each part of the above config does for two reasons.

1. I only have a base level understanding of what each piece is for and I'm learning how wrong that understanding is every day.
2. I want you to focus on the sources to update your config and test your site.

I hope this has been useful and if you find any issues, please let me know via [twitter or email](https://gauntface.com/contact).

Orig. Photo: [https://flic.kr/p/gBD9dc](https://flic.kr/p/gBD9dc)
---
title: "Installing SSL Certs..."
excerpt: "You get more and more perks in terms of API access when you have SSL on your site and ServiceWorker is enough for me to bite the bullet and go SSL. Here are the notes from my experience with gauntface.com."
mainImage: "/images/blog/2014/07/04/nsa-smiley-face-fb.jpg"
primaryColor: "#807e61"
date: "2014-07-04T18:10:36-07:00"
updatedOn: "2014-07-04T18:10:36-07:00"
slug: "installing-ssl-certs"
---

# Installing SSL Certs...

The SSL cert is going to come from [startssl.com](http://startssl.com) since they are free and a recommendation from [Mike West](https://mikewest.org/) is more than good enough for me.

# Getting the Certificates

To get an account you have to go through a bit of a dance to get some "login" certificates from [StartSSL](http://startssl.com) to install on your system.

Next time you visit the site, [StartSSL](http://startssl.com) will access these certificates and use them to validate who you are, at least there are no usernames or passwords. It's relatively straight forward when you are going through it. **Just make sure you back up the certificates for signing in**.

Once you're registered, the first step is to go through the _Validations Wizard_ and select _Domain Name Validation_ and prove you own the domain. For this you **need** to have access to a certain set of email addresses which [StartSSL](http://startssl.com) will e-mail with a verification code, i.e. webmaster@mydomainname.com.

Since I've only just bought and set-up gauntface.com to point at my Compute Engine instance, I had to add gauntface.com to my Google Apps account and set up an e-mail addresses to get the verification code.

With that done, I walked through the _Certificates Wizard_ for type _Web Server SSL/TLS Certificate_. When you're going through it you're given the private key, named _ssl.key_, then I had to wait about an hour after finishing the set-up before getting an e-mail to let me know I could sign-in and grab my signed public certificate.

In I went and grabbed my signed public SSL cert, saving it as _ssl.crt_, then came the deployment stage.

# Deploying to Nginx

Initially I followed the StartSSL guide for setting everything up on Nginx [https://www.startssl.com/?app=42](https://www.startssl.com/?app=42), the only difference is that I stashed the certificates somewhere different on the system and pointed the nginx.conf to that directory.

Since I'm on Compute Engine I needed to enable HTTPS traffic on the VM instance's firewall, depending on your set-up you may need to do the same. With that switched on I started to see my site load up.

The padlock was visible - Wahey!!

![The SSL Padlock on Gauntface.com](/images/blog/2014/07/04/ssl-on-gauntface.png "284")

At first I had a rogue Google Font which was loaded over http, a quick CSS change...

```css
url(//themes.googleusercontent.com/static/fonts/opensans/v8/DXI1ORHCpsQm3Vp6mXoaTaRDOzjiPcYnFooOUGCOsRk.woff)
```

...and we're good to go.

The '//' means - use the current protocol for this URL - i.e. use HTTPS:// if the current domain is using HTTPS.

My [Nginx](http://wiki.nginx.org/Main) config ended up redirecting HTTP traffic to HTTPS automatically once I deployed it. This was by accident and chances are I breaked it in the future if I changed anything, so I added the following to my Nginx config file to handle HTTP traffic.

```
# Redirect http://gauntface.com to https://gauntface.com
server {
    listen       80;
    server_name gauntface.com;
    return 301 "https://gauntface.com${uri}";
}
```

I ended up having two instances loaded against my Load Balancer, which I hadn't realised. This lead to occasional 404's on my site since one instance wasn't being maintained and only supported HTTP. Once I killed the second instance, everything was up and running just fine.

# HSTS

After landing SSL I was somewhat upset that by default Chrome will look for the HTTP version of the site rather than HTTPS, meaning the user gets hit by a redirect. However, [Ilya Grigorik](https://www.igvita.com/) pointed out that HSTS solves this by telling the browser to ONLY use HTTPS until an expiration timeout is passed.

A quick google landed me on this site [https://scotthelme.co.uk/setting-up-hsts-in-nginx/](https://scotthelme.co.uk/setting-up-hsts-in-nginx/) which gave me the following line to add to the *server* element in my [Nginx](http://wiki.nginx.org/Main) config.

```
# HSTS Header for SSL
add_header Strict-Transport-Security "max-age=31536000; includeSubdomains";
```

This is basically telling a compliant browser to only use HTTPS for a year and include sub domains as well.

# SSLLabs

After setting up the HSTS header, I started to read through the [HTML5Rocks Article on SSL](http://www.html5rocks.com/en/tutorials/security/transport-layer-security/) and in the links it points to [SSLLabs](https://www.ssllabs.com/) for their [SSL Test](https://www.ssllabs.com/ssltest/index.html).

![SSLLabs A- Test Score for Gauntface.com](/images/blog/2014/07/08/ssl-labs.jpg "800")

The main issue was with "Forward Secrecy", after reading into it a little bit I'd describe "Forward Secrecy" in the following way:

Think of RSA encryption as a way of using the private key to encrypt data, meaning that if you were a third party, hoping to decrypt messages, you'd just need to obtain the private key and you are good to go.

Meaning you *could* stash all the encrypted data and eventually, one day in the future, get the private key somehow and use it to decrypt all the stashed data.

Forward Secrecy uses session keys agreed by both parties to encrypt and decrypt data, destroying those keys once you're done, making it much harder to snoop.

To get this working I grabbed some *more* Nginx config from an [SSLLabs blog post](https://community.qualys.com/blogs/securitylabs/2013/08/05/configuring-apache-nginx-and-openssl-for-forward-secrecy).

```
ssl_protocols SSLv3 TLSv1 TLSv1.1 TLSv1.2;
ssl_prefer_server_ciphers on;
ssl_ciphers "EECDH+ECDSA+AESGCM EECDH+aRSA+AESGCM EECDH+ECDSA+SHA384 EECDH+ECDSA+SHA256 EECDH+aRSA+SHA384 EECDH+aRSA+SHA256 EECDH+aRSA+RC4 EECDH EDH+aRSA RC4 !aNULL !eNULL !LOW !3DES !MD5 !EXP !PSK !SRP !DSS";
```

With this in place, I got my new test score.

![SSLLabs A+ Test Score for Gauntface.com](/images/blog/2014/07/08/ssl-lab-a-plus.jpg "800")

Now this version actually works.

However after talking some more with Ilya, he pointed out that I should be using [Mozilla's Wiki for up to date best practices](https://wiki.mozilla.org/Security/Server_Side_TLS), which had a different recommendation for the SSL Ciphers.

Being the fool that I am, I took the non-backward compatible list of ciphersuite, and made it look similar to the list from SSLLabs.

As far as the browser and SSLLabs were concerned, this was fine and I even got 100/100 for the protocol score.

Woop Woop.

![SSLLabs Test Score after using some of the Mozilla Wiki Nginx Config Recommendations](/images/blog/2014/07/15/ssl-labs-mozilla-wiki-config.jpg "800")

However, Google had issues on WebMaster Tools and PageSpeed Insights when it came to crawling my site and curl failed to get the contents of my site :-S

If I switched to the original ciphers list from the [Mozilla Wiki](https://wiki.mozilla.org/Security/Server_Side_TLS), I fix the issues for curl and the Google bot.

```bash
# Recommended Cipher Suites from Mozilla Wiki
ssl_protocols SSLv3 TLSv1 TLSv1.1 TLSv1.2;
ssl_prefer_server_ciphers on;
ssl_ciphers 'ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES256-GCM-SHA384:ECDHE-ECDSA-AES256-GCM-SHA384:DHE-RSA-AES128-GCM-SHA256:DHE-DSS-AES128-GCM-SHA256:kEDH+AESGCM:ECDHE-RSA-AES128-SHA256:ECDHE-ECDSA-AES128-SHA256:ECDHE-RSA-AES128-SHA:ECDHE-ECDSA-AES128-SHA:ECDHE-RSA-AES256-SHA384:ECDHE-ECDSA-AES256-SHA384:ECDHE-RSA-AES256-SHA:ECDHE-ECDSA-AES256-SHA:DHE-RSA-AES128-SHA256:DHE-RSA-AES128-SHA:DHE-DSS-AES128-SHA256:DHE-RSA-AES256-SHA256:DHE-DSS-AES256-SHA:DHE-RSA-AES256-SHA:!aNULL:!eNULL:!EXPORT:!DES:!RC4:!3DES:!MD5:!PSK';
```

This then bumps my score for protocols back down to 90.....not a [scooby doo](http://www.cockneyrhymingslang.co.uk/slang/scooby_doo_1) as to why.

## ssl_protocols

In the Mozilla Wiki, it recommends the use of SSLv3, there are apparently vulnerabilities with this, so I've dropped its support since SSLv3 support in a browser hopefully includes TLSv1 support.

```
# Recommended Cipher Suite from Mozilla Wiki
ssl_protocols TLSv1 TLSv1.1 TLSv1.2;
ssl_prefer_server_ciphers on;
ssl_ciphers 'ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES256-GCM-SHA384:ECDHE-ECDSA-AES256-GCM-SHA384:DHE-RSA-AES128-GCM-SHA256:DHE-DSS-AES128-GCM-SHA256:kEDH+AESGCM:ECDHE-RSA-AES128-SHA256:ECDHE-ECDSA-AES128-SHA256:ECDHE-RSA-AES128-SHA:ECDHE-ECDSA-AES128-SHA:ECDHE-RSA-AES256-SHA384:ECDHE-ECDSA-AES256-SHA384:ECDHE-RSA-AES256-SHA:ECDHE-ECDSA-AES256-SHA:DHE-RSA-AES128-SHA256:DHE-RSA-AES128-SHA:DHE-DSS-AES128-SHA256:DHE-RSA-AES256-SHA256:DHE-DSS-AES256-SHA:DHE-RSA-AES256-SHA:!aNULL:!eNULL:!EXPORT:!DES:!RC4:!3DES:!MD5:!PSK';
```

#Keep Alive

Most articles on SSL performance will include a reference to Keep Alive to send multiple requests on a single connection.

```
keepalive_timeout   70;
```

## SSL DHParam

The *ssl_dhparam* is a key used for forward secrecy (yes more forward secrecy stuff).

To the best of my understanding the ssl_dhparam creates a prime number which can be used with Diffie Hellman key exchanges and improves the security of the encryption.

The key is generated with the following command.

```
openssl dhparam 2048 -out ssl-dh.pem
```

The 2048 parameter is the bit length of the prime number generated and used in the Diffie-Hellman key exchange. The longer the prime, the better the security, although I imagine this would have a performance cost tied to it. The recommendation in Mozilla's Wiki is 2048, so I've stuck with that.

## SSL Session Timeout and Session Cache (a.k.a. Resumption)

In the Nginx docs, the ssl_session_cache and ssl_session_timeout are paired closely.

Mozilla defines a 5m SSL session timeout, which happens to be the default value for Nginx, but no harm in defining it explicitly.

The SSL Session cache seems to be a way of taking an SSL handshake and share it amongst several connections with a client, avoiding handling handshakes for requests made in parallel.

The timeout will then keep this sessions alive for 5 minutes since their last use.

## OCSP Stapling

Warning: A broken understanding + explanation incoming.

When a browser requests a site's SSL Certificate, it needs to check the validity of the certificate by ensuring it's not on a Certificate Revocation List (CRL).

The problem with CRL's is that they can take some time for a browser to download the entire list and perform the check. This is where OCSP steps in.

OCSP is a record which covers one certificate, meaning the browser can ask for the single record it cares about.

The problem with OCSP is that the service is run by a third party, which means it can fall over or be slow to respond to requests. To get around this you can set up your server to cache the OCSP record and respond to OCSP requests during the TLS Handshake.

To add OCSP support with a StartSSL Certificate, I added the following to my config:

```
# OCSP Stapling
# Using Googles Public DNS 8.8.8.8
ssl_stapling on;
ssl_stapling_verify on;
ssl_trusted_certificate /<Path to Trusted Certs>/ssl-trusted.crt;
resolver 8.8.8.8;
```

For the *resolver* I'm using Google's public DNS (I'm not aware of any other DNS - not really my thang') and for the *ssl_trusted_certificate* I am using a file made up of the sub.class1.server.ca.pem and ca.pem provided by StartSSL, simply concatenating them together.

```
sudo cat /etc/ssl/sub.class1.server.ca.pem /etc/ssl/ca.pem > /etc/ssl/ssl-trusted.crt
```

You can confirm it's on by running the SSLLabs test again and looking in the "OCSP stapling" check.

![SSLLabs test showing OCSP is working](/images/blog/2014/07/15/ssllabs-ocsp-test.jpg "800")

# The Final Nginx Config

The final parts of the config relating to SSL looks like the following:

```
server {
    listen       443;
    server_name gauntface.com;
    keepalive_timeout   70;

    # Turn on SSL
    ssl on;
    ssl_certificate     /<Path to Cert>/ssl-unified.crt;
    ssl_certificate_key /<Path to Key>/ssl.key;

    # Diffie-Hellman parameter for DHE ciphersuites, recommended 2048 bits
    ssl_dhparam /<Path to DH Pem>/ssl-dh.pem;
    ssl_session_timeout 5m;
    ssl_protocols TLSv1 TLSv1.1 TLSv1.2;
    ssl_ciphers 'ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES256-GCM-SHA384:ECDHE-ECDSA-AES256-GCM-SHA384:DHE-RSA-AES128-GCM-SHA256:DHE-DSS-AES128-GCM-SHA256:kEDH+AESGCM:ECDHE-RSA-AES128-SHA256:ECDHE-ECDSA-AES128-SHA256:ECDHE-RSA-AES128-SHA:ECDHE-ECDSA-AES128-SHA:ECDHE-RSA-AES256-SHA384:ECDHE-ECDSA-AES256-SHA384:ECDHE-RSA-AES256-SHA:ECDHE-ECDSA-AES256-SHA:DHE-RSA-AES128-SHA256:DHE-RSA-AES128-SHA:DHE-DSS-AES128-SHA256:DHE-RSA-AES256-SHA256:DHE-DSS-AES256-SHA:DHE-RSA-AES256-SHA:!aNULL:!eNULL:!EXPORT:!DES:!RC4:!3DES:!MD5:!PSK';
    ssl_prefer_server_ciphers on;
    ssl_session_cache shared:SSL:50m;

    # OCSP Stapling ---
    # fetch OCSP records from URL in ssl_certificate and cache them
    # Using Googles Public DNS 8.8.8.8
    ssl_stapling on;
    ssl_stapling_verify on;
    ## verify chain of trust of OCSP response using Root CA and Intermediate certs
    ssl_trusted_certificate /<Path to Cert>/ssl-trusted.crt;
    resolver 8.8.8.8;

    # HSTS Header for SSL
    # add_header Strict-Transport-Security "max-age=31536000; includeSubdomains";
    add_header Strict-Transport-Security "max-age=31536000;";

    ....
}

# Redirect http://gauntface.com to https://gauntface.com
server {
    listen       80;
    server_name gauntface.com;
    return 301 "https://gauntface.com${uri}";
}
```

# SPDY Support

A lot of the guides on line suggest that SPDY can be used with Nginx but since it's a non-stable module, Nginx needs to be built with a flag to include the module (see: [http://nginx.org/en/docs/http/ngx_http_spdy_module.html](http://nginx.org/en/docs/http/ngx_http_spdy_module.html).

My server is running Backports Debian Wheezy and installing Nginx from the projects repos (see here for more details: [http://wiki.nginx.org/Install](http://wiki.nginx.org/Install).

This version of Nginx actually came with the SPDY module enabled, so adding support was a case of extending the *listen* parameters in the config file.

```
server {
    listen       443 ssl spdy;
```

To check it was working I just used [http://spdycheck.org/](http://spdycheck.org/).

![SPDYCheck.org Results for gauntface.com](/images/blog/2014/07/16/spdycheck-results-gauntface.jpg "800")

Big thanks to:

- [Ian Barber](https://plus.google.com/+IanBarber/) for all help in getting this sorted and bug spotting / fixing.
- [Ilya Grigorik](https://www.igvita.com/) for pointing out improvements and things I hadn't spotted.
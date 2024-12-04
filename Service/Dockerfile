FROM nginx:latest

# Install OpenSSH Server and Supervisor
RUN apt-get update && apt-get install -y openssh-server supervisor && \
    mkdir -p /var/run/sshd && mkdir -p /var/log/supervisor

# Add application files
COPY index.html /var/www/html/index.html
COPY style.css /var/www/html/style.css
COPY inf-pump.js /var/www/html/inf-pump.js

# Add flag file to /tmp/flag
RUN echo "CRISIS{example_flag}" > /tmp/flag

# Create a symbolic link to serve the flag file from /var/www/html
RUN ln -s /tmp/flag /var/www/html/flag

# Supervisor configuration
COPY supervisord.conf /etc/supervisor/conf.d/supervisord.conf

# NGINX configuration
COPY nginx-custom.conf /etc/nginx/conf.d/default.conf

# Expose ports
EXPOSE 80 22

# Start Supervisor
CMD ["/usr/bin/supervisord"]
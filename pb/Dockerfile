FROM alpine:latest

ARG PB_VERSION=0.22.11

# Install unzip and ca-certificates
RUN apk add --no-cache \
    unzip \
    ca-certificates

# download and unzip PocketBase
ADD https://github.com/pocketbase/pocketbase/releases/download/v${PB_VERSION}/pocketbase_${PB_VERSION}_linux_amd64.zip /tmp/pb.zip
RUN unzip /tmp/pb.zip -d /pb/

# Copy the local pb_migrations dir into the image
COPY ./pb_migrations /pb/pb_migrations

# Expose the PocketBase port
EXPOSE 8080

# Start PocketBase
CMD ["/pb/pocketbase", "serve", "--http=0.0.0.0:8080"]
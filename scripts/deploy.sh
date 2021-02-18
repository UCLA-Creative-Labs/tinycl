#!/bin/bash

set -e

echo "Starting build..."

IMAGE="creativelabsucla/tinycl"
GIT_VERSION=$(git describe --always --abbrev --tags --long)

docker build --build-arg -t ${IMAGE}:${GIT_VERSION} .
docker tag ${IMAGE}:${GIT_VERSION} ${IMAGE}:latest

echo "${DOCKER_PASSWORD}" | docker login -u "${DOCKER_USERNAME}" --password-stdin
docker push ${IMAGE}:${GIT_VERSION}

ssh -o StrictHostKeyChecking=no\
   ubuntu@${OCI_INSTANCE}\
    "sudo docker stop current-container &&\
     sudo docker rm current-container &&\
     sudo docker run --name=current-container --restart unless-stopped -d -p 80:3000 ${IMAGE}:${GIT_VERSION} &&\
     sudo docker system prune -a -f"

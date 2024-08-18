#!/bin/sh
docker-compose down --rmi all --volumes
docker-compose up

#!/bin/bash
set -e

# Fix ownership (required for npm)
chown -R ec2-user:ec2-user /home/ec2-user/snake_Game || true

# Stop existing app (safe)
pkill node || true

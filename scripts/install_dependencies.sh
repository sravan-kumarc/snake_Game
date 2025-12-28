#!/bin/bash
set -e
cd /home/ec2-user/snake_Game

# Ensure correct ownership every deploy (safe)
chown -R ec2-user:ec2-user .

npm install

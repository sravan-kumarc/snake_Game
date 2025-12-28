#!/bin/bash
cd /home/ec2-user/snake_Game
nohup npm run preview -- --host --port 8080 > app.log 2>&1 &
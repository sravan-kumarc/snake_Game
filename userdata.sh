#!/bin/bash

sudo yum update -y
sudo yum install ruby -y
sudo yum install wget -y
sudo yum install curl -y
cd /home/ec2-user

#running at location ap-south-1(MUMBAI)
wget https://aws-codedeploy-ap-south-1.s3.ap-south-1.amazonaws.com/latest/install

chmod +x ./install
sudo ./install auto

systemctl start codedeploy-agent
systemctl status codedeploy-agent
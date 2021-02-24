#!/bin/bash
# Any installation related commands
wget -qO - https://www.mongodb.org/static/pgp/server-4.2.asc | sudo apt-key add -
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu bionic/mongodb-org/4.2 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-4.2.list
sudo apt update
sudo apt install -y mongodb-org

sudo systemctl start mongod
sudo systemctl enable mongod

sudo apt update
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.34.0/install.sh | bash

# activate nvm
. ~/.nvm/nvm.sh

# install node's latest version
nvm install node

# installing v 13.14.0 which was used to develop the XMeme app
nvm install 12.19.0

# use the required version
nvm use 12.19.0
# sudo apt-get install -y abc


# Any configuration related commands

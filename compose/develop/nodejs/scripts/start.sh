#!/bin/bash
#

[ ! -f "/app/package.json" ] && {
  cat <<EOF > /app/package.json
{
  "name": "app",
  "version": "1.0.0",
  "description": "My demo nodejs api using express",
  "main": "index.js",
  "scripts": {
    "start": "node index.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC",
  "dependencies": {
    "express": "^4.18.2"
  }
}
EOF
}

npm install
npm link express
npm run start-dev

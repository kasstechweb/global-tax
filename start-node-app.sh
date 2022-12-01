#!/bin/bash
PATH=$PATH:/home/sshngvhkq2al/bin/
NPM="`which npm`"

if [ "x" == "x$NPM" ]; then
    (>&2 echo "NPM not installed")
    exit 1
fi

pID=$(pgrep "npm" -f) 

if  [ -n "${pID}" ];
then
    # echo "already running"
    exit 0
else
    # start it 
    # echo "restarting"
    cd /home/sshngvhkq2al/public_html/gtaxapp/payment/ && nohup  $NPM run startsandbox &
fi

# cd /home/sshngvhkq2al/public_html/gtaxapp/payment/ && /home/sshngvhkq2al/bin/npm run startsandbox &
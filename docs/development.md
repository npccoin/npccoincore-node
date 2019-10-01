# Setting up Development Environment

## Install Node.js

Install Node.js by your favorite method, or use Node Version Manager by following directions at https://github.com/creationix/nvm

```bash
nvm install v4
```

## Fork and Download Repositories

To develop npccoincore-node:

```bash
cd ~
git clone git@github.com:<yourusername>/npccoincore-node.git
git clone git@github.com:<yourusername>/npccoincore-lib.git
```

To develop bitcoin or to compile from source:

```bash
git clone git@github.com:<yourusername>/bitcoin.git
git fetch origin <branchname>:<branchname>
git checkout <branchname>
```
**Note**: See bitcoin documentation for building bitcoin on your platform.


## Install Development Dependencies

For Ubuntu:
```bash
sudo apt-get install libzmq3-dev
sudo apt-get install build-essential
```
**Note**: Make sure that libzmq-dev is not installed, it should be removed when installing libzmq3-dev.


For Mac OS X:
```bash
brew install zeromq
```

## Install and Symlink

```bash
cd npccoincore-lib
npm install
cd ../npccoincore-node
npm install
```
**Note**: If you get a message about not being able to download bitcoin distribution, you'll need to compile bitcoind from source, and setup your configuration to use that version.


We now will setup symlinks in `npccoincore-node` *(repeat this for any other modules you're planning on developing)*:
```bash
cd node_modules
rm -rf npccoincore-lib
ln -s ~/npccoincore-lib
rm -rf bitcoind-rpc-npccoin
ln -s ~/bitcoind-rpc-npccoin
```

And if you're compiling or developing bitcoin:
```bash
cd ../bin
ln -sf ~/bitcoin/src/bitcoind
```

## Run Tests

If you do not already have mocha installed:
```bash
npm install mocha -g
```

To run all test suites:
```bash
cd npccoincore-node
npm run regtest
npm run test
```

To run a specific unit test in watch mode:
```bash
mocha -w -R spec test/services/bitcoind.unit.js
```

To run a specific regtest:
```bash
mocha -R spec regtest/bitcoind.js
```

## Running a Development Node

To test running the node, you can setup a configuration that will specify development versions of all of the services:

```bash
cd ~
mkdir devnode
cd devnode
mkdir node_modules
touch npccoincore-node.json
touch package.json
```

Edit `npccoincore-node.json` with something similar to:
```json
{
  "network": "livenet",
  "port": 3001,
  "services": [
    "bitcoind",
    "web",
    "insight-api-npccoin",
    "insight-ui-npccoin",
    "<additional_service>"
  ],
  "servicesConfig": {
    "bitcoind": {
      "spawn": {
        "datadir": "/home/<youruser>/.bitcoin",
        "exec": "/home/<youruser>/bitcoin/src/bitcoind"
      }
    }
  }
}
```

**Note**: To install services [insight-api-npccoin](https://github.com/npccoin/insight-api-npccoin) and [insight-ui-npccoin](https://github.com/npccoin/insight-ui-npccoin) you'll need to clone the repositories locally.

Setup symlinks for all of the services and dependencies:

```bash
cd node_modules
ln -s ~/npccoincore-lib
ln -s ~/npccoincore-node
ln -s ~/insight-api-npccoin
ln -s ~/insight-ui-npccoin
```

Make sure that the `<datadir>/bitcoin.conf` has the necessary settings, for example:
```
server=1
whitelist=127.0.0.1
txindex=1
addressindex=1
timestampindex=1
spentindex=1
zmqpubrawtx=tcp://127.0.0.1:28332
zmqpubhashblock=tcp://127.0.0.1:28332
rpcallowip=127.0.0.1
rpcuser=bitcoin
rpcpassword=local321
```

From within the `devnode` directory with the configuration file, start the node:
```bash
../npccoincore-node/bin/npccoincore-node start
```
NPCcoincore Node
============

A NPCcoin full node for building applications and services with Node.js. A node is extensible and can be configured to run additional services. At the minimum a node has an interface to [NPCcoin Core (npccoind) v0.13.0](https://github.com/npccoinpay/npccoin/tree/v0.13.0.x) for more advanced address queries. Additional services can be enabled to make a node more useful such as exposing new APIs, running a block explorer and wallet service.

## Usages

### As a standalone server

```bash
git clone https://github.com/npccoin/npccoincore-node
cd npccoincore-node
npm install
./bin/npccoincore-node start
```

When running the start command, it will seek for a .npccoincore folder with a npccoincore-node.json conf file.
If it doesn't exist, it will create it, with basic task to connect to npccoind.

Some plugins are available :

- Insight-API : `./bin/npccoincore-node addservice @npccoin/insight-api-npccoin`
- Insight-UI : `./bin/npccoincore-node addservice @npccoin/insight-ui-npccoin`

You also might want to add these index to your npccoin.conf file :
```
-addressindex
-timestampindex
-spentindex
```

### As a library

```bash
npm install @npccoin/npccoincore-node
```

```javascript
const npccoincore = require('@npccoin/npccoincore-node');
const config = require('./npccoincore-node.json');

let node = npccoincore.scaffold.start({ path: "", config: config });
node.on('ready', function() {
    //NPCcoin core started
    npccoind.on('tx', function(txData) {
        let tx = new npccoincore.lib.Transaction(txData);
    });
});
```

## Prerequisites

- NPCcoin Core (npccoind) (v0.13.0) with support for additional indexing *(see above)*
- Node.js v8+
- ZeroMQ *(libzmq3-dev for Ubuntu/Debian or zeromq on OSX)*
- ~20GB of disk storage
- ~1GB of RAM

## Configuration

NPCcoincore includes a Command Line Interface (CLI) for managing, configuring and interfacing with your NPCcoincore Node.

```bash
npccoincore-node create -d <npccoin-data-dir> mynode
cd mynode
npccoincore-node install <service>
npccoincore-node install https://github.com/yourname/helloworld
npccoincore-node start
```

This will create a directory with configuration files for your node and install the necessary dependencies.

Please note that [NPCcoin Core](https://github.com/npccoinpay/npccoin/tree/master) needs to be installed first.

For more information about (and developing) services, please see the [Service Documentation](docs/services.md).

## Add-on Services

There are several add-on services available to extend the functionality of Bitcore:

- [Insight API](https://github.com/npccoin/insight-api-npccoin/tree/master)
- [Insight UI](https://github.com/npccoin/insight-ui-npccoin/tree/master)
- [Bitcore Wallet Service](https://github.com/npccoin/npccoincore-wallet-service/tree/master)

## Documentation

- [Upgrade Notes](docs/upgrade.md)
- [Services](docs/services.md)
  - [NPCcoind](docs/services/npccoind.md) - Interface to NPCcoin Core
  - [Web](docs/services/web.md) - Creates an express application over which services can expose their web/API content
- [Development Environment](docs/development.md) - Guide for setting up a development environment
- [Node](docs/node.md) - Details on the node constructor
- [Bus](docs/bus.md) - Overview of the event bus constructor
- [Release Process](docs/release.md) - Information about verifying a release and the release process.


## Setting up dev environment (with Insight)

Prerequisite : Having a npccoind node already runing `npccoind --daemon`.

NPCcoincore-node : `git clone https://github.com/npccoin/npccoincore-node -b develop`
Insight-api (optional) : `git clone https://github.com/npccoin/insight-api-npccoin -b develop`
Insight-UI (optional) : `git clone https://github.com/npccoin/insight-ui-npccoin -b develop`

Install them :
```
cd npccoincore-node && npm install \
 && cd ../insight-ui-npccoin && npm install \
 && cd ../insight-api-npccoin && npm install && cd ..
```

Symbolic linking in parent folder :
```
npm link ../insight-api-npccoin
npm link ../insight-ui-npccoin
```

Start with `./bin/npccoincore-node start` to first generate a ~/.npccoincore/npccoincore-node.json file.
Append this file with `"@npccoin/insight-ui-npccoin"` and `"@npccoin/insight-api-npccoin"` in the services array.

## Contributing

Please send pull requests for bug fixes, code optimization, and ideas for improvement. For more information on how to contribute, please refer to our [CONTRIBUTING](https://github.com/npccoin/npccoincore/blob/master/CONTRIBUTING.md) file.

## License

Code released under [the MIT license](https://github.com/npccoin/npccoincore-node/blob/master/LICENSE).

Copyright 2016-2018 NPCcoin Core Group, Inc.

- bitcoin: Copyright (c) 2009-2015 Bitcoin Core Developers (MIT License)

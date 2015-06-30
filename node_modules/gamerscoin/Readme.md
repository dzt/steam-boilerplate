# node-gamerscoin

node-gamerscoin is a simple wrapper for the gamerscoin client's JSON-RPC API.

The API is equivalent to the API document [here](http://gamers-coin.org/apihelp).
The methods are exposed as lower camelcase methods on the `gamerscoin.Client`
object, or you may call the API directly using the `cmd` method.

## Install

`npm install gamerscoin`

## Examples

### Create client
```js
// all config options are optional
var client = new gamerscoin.Client({
  host: 'localhost',
  port: 40001,
  user: 'username',
  pass: 'password',
  timeout: 30000
});
```

### Get balance across all accounts with minimum confirmations of 6

```js
client.getBalance('*', 6, function(err, balance, resHeaders) {
  if (err) return console.log(err);
  console.log('Balance:', balance);
});
```
### Getting the balance directly using `cmd`

```js
client.cmd('getbalance', '*', 6, function(err, balance, resHeaders){
  if (err) return console.log(err);
  console.log('Balance:', balance);
});
```

### Batch multiple RPC calls into single HTTP request

```js
var batch = [];
for (var i = 0; i < 10; ++i) {
  batch.push({
    method: 'getnewaddress',
    params: ['myaccount']
  });
}
client.cmd(batch, function(err, address, resHeaders) {
  if (err) return console.log(err);
  console.log('Address:', address);
});
```

## SSL
See [Enabling SSL on original client](http://gamers-coin.org/apihelp).

If you're using this to connect to gamerscoind across a network it is highly
recommended to enable `ssl`, otherwise an attacker may intercept your RPC credentials
resulting in theft of your gamerscoins.

When enabling `ssl` by setting the configuration option to `true`, the `sslStrict`
option (verifies the server certificate) will also be enabled by default. It is
highly recommended to specify the `sslCa` as well, even if your gamerscoind has
a certificate signed by an actual CA, to ensure you are connecting
to your own gamerscoind.

```js
var client = new gamerscoin.Client({
  host: 'localhost',
  port: 40001,
  user: 'username',
  pass: 'password',
  ssl: true,
  sslStrict: true,
  sslCa: fs.readFileSync(__dirname + '/myca.cert')
});
```

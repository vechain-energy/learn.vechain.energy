# call contract with curl

```shell
curl -X POST "https://sync-testnet.vechain.org/accounts/*" --data '{"clauses":[{"to":"<ADDRESS>","value":"0","data":"0x<SigHash>"}]}'
$ curl -X POST "https://sync-testnet.vechain.org/accounts/*" --data '{"clauses":[{"to":"0x29419d7f32073cef35aadc3c64fe0f31571f5686","value":"0","data":"0xf8a8fd6d"}]}'
[{"data":"0x000000000000000000000000000000000000000000000000000000000000007b","events":[],"transfers":[],"gasUsed":447,"reverted":false,"vmError":""}]
```

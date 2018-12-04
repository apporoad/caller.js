# caller.js
get caller info 

## how to use
```shell
npm i --save caller.js
```

```js
const caller = require('caller.js')

// get caller info
caller.getInfo()

// get caller dir path
caller.getDir()

// get caller's caller info
caller.getInfo(1)

//get caller's caller's caller info
caller.getInfo(2)

//todo anyothers

```
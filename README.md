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

var testChain1 = ()=>{
    console.log("chain1")
    testChain2()
}

var testChain2 = ()=>{
    console.log("chain2")
    testChain3()
}
var testChain3 = ()=>{
    console.log("chain3")
    testChain4()
}
var testChain4 = ()=>{
    console.log("chain4")
    // here getInvokeChain 
    var chain = caller.getChain()
    chain.forEach(element => {
        console.log(element.functionName + " | " + element.fileName)
    });
}

testChain1()


//todo anyothers


```
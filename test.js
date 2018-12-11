const caller = require('./index')

var test = ()=>{
    return caller.getInfo()
}

//console.log(test())



//console.log(caller.getDir())

var test2= ()=>{
    console.log(caller.getDir())
}

//test2()


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
    var chain = caller.getChain()
    chain.forEach(element => {
        console.log(element.functionName + " | " + element.fileName)
    });
}

testChain1()


var m1 = require('./others/1.js')
m1.run()
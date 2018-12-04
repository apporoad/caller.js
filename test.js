const caller = require('./index')

var test = ()=>{
    return caller.getInfo()
}

//console.log(test())



console.log(caller.getDir())

var test2= ()=>{
    console.log(caller.getDir())
}

test2()
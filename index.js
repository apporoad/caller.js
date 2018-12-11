var fs = require('fs')
var path = require('path')

var iPrint = callsite =>{
    console.log(callsite + "  ===========================")
    console.log("getFileName():" + callsite.getFileName())
    console.log("getFunctionName() : " + callsite.getFunctionName())

    console.log("getTypeName() : " + callsite.getTypeName())
    console.log("getMethodName() : " + callsite.getMethodName())
    console.log("getLineNumber() : " + callsite.getLineNumber())
    console.log("getColumnNumber() : " + callsite.getColumnNumber())
    console.log("isNative() : " + callsite.isNative())
}

exports.getInfo = (depth) => {
    var pst, stack, file 
    var rightFrame = new Array()

    pst = Error.prepareStackTrace
    Error.prepareStackTrace = function (_, stack) {
        Error.prepareStackTrace = pst
        return stack
    }
    stack = (new Error()).stack
    //console.trace()
    depth = (!depth || isNaN(depth)) ? 2 : 2 + depth
    stack =stack.slice(depth)
    do {
        var frame = stack.shift()
        file = frame && frame.getFileName()
        //iPrint(frame)

        //console.log((frame || "")  + "  | " + frame.getFileName() )
        if(file != 'module.js' && file != 'bootstrap_node.js'){
            rightFrame.push(frame)
            break;
        }
    } while (stack.length)

    if(rightFrame.length > 0){
        rightFrame = rightFrame[0]
        return {
            fileName : rightFrame.getFileName(),
            functionName : rightFrame.getFunctionName(),
            typeName : rightFrame.getTypeName(),
            lineNumber : rightFrame.getLineNumber(),
            cloumnNumber : rightFrame.getColumnNumber(),
            methodName : rightFrame.getMethodName()
        }
    }
    else
        return null
}

exports.getChain = depth =>{
    var pst, stack, file 
    var rightFrame = new Array()

    pst = Error.prepareStackTrace
    Error.prepareStackTrace = function (_, stack) {
        Error.prepareStackTrace = pst
        return stack
    }
    stack = (new Error()).stack
    //console.trace()
    depth = (!depth || isNaN(depth)) ? 2 : 2 + depth
    stack =stack.slice(depth)
    do {
        var frame = stack.shift()
        file = frame && frame.getFileName()
        //iPrint(frame)

        //console.log((frame || "")  + "  | " + frame.getFileName() )
        if(file != 'module.js' && file != 'bootstrap_node.js'){
            rightFrame.push(frame)
        }
    } while (stack.length)

    var chain = new Array()
    rightFrame.forEach(ele=>{
        chain.push({
            fileName : ele.getFileName(),
            functionName : ele.getFunctionName(),
            typeName : ele.getTypeName(),
            lineNumber : ele.getLineNumber(),
            cloumnNumber : ele.getColumnNumber(),
            methodName : ele.getMethodName()
        })
    })
    return chain
}


exports.getDir = (depth)=>{
    depth = (!depth || isNaN(depth)) ? 1 : 1 + depth
    var info = exports.getInfo(depth)
    if(info)
        return path.dirname(info.fileName)
    return null
}

exports.getTopCallerDir = ()=>{
    return path.dirname( exports.getChain().pop().fileName)
}
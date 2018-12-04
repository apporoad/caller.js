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

exports.getInfo = () => {
    var pst, stack, file 
    var rightFrame = new Array()

    pst = Error.prepareStackTrace
    Error.prepareStackTrace = function (_, stack) {
        Error.prepareStackTrace = pst
        return stack
    }
    stack = (new Error()).stack
    //console.trace()
    stack = stack.slice(1)
    do {
        var frame = stack.shift()
        file = frame && frame.getFileName()
        //iPrint(frame)
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


exports.getDir = ()=>{
    var info = exports.getInfo()
    return path.dirname(info.fileName)
}


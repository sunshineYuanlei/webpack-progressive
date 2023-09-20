// 转换ast

const fs = require("fs")
const babel = require("@babel/core")
const traverse = require("@babel/traverse").default

let source = fs.readFileSync("./source.js")

babel.parse(source, (err, ast) => {
  if(err){
    throw new Error(err)
  }
  // let indent = ""
  // traverse(ast, {
  //   // 进入节点
  //   enter(path) {
  //     console.log(indent + "<" + path.node.type + ">")
  //     indent += "  "
  //   },
  //   // 退出节点
  //   exit(path) {
  //     indent = indent.slice(0, -2)
  //     console.log(indent + "<" + "/" + path.node.type + ">")
  //   },
  // })

  // 遍历的时候，我们进入（Enter） 某个节点时会调用对应的enter函数，当退出（Exit） 某个节点时，会调用exit函数。当我们谈及“进入”一个节点，实际上是说我们在访问它们， 之所以使用这样的术语是因为有一个访问者模式（Visitor） 的概念。我们还可以针对某个类型的节点进行遍历，如下面代码：
  const vistors = {
    FunctionDeclaration(path) {
      const param = path.node.params[0]
      paramName = param.name
      param.name = "x"
    },
    Identifier: {
      enter() {
        console.log("Entered!")
      },
      exit() {
        console.log("Exited!")
      },
    },
  }
  traverse(ast, vistors)
})

 

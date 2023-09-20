// 生成新代码

const fs = require('fs');
const babel = require('@babel/core');
const traverse = require('@babel/traverse').default;
const gen = require('@babel/generator').default;

let source = fs.readFileSync('./source.js');

babel.parse(source, (err, ast) => {
    // console.log(err, ast)
    let indent = '';
    traverse(ast, {
        // 一顿操作猛如虎。。
    });
    // 生成新的 ast，然后使用generator生成 code
    console.log(gen(ast).code);
});
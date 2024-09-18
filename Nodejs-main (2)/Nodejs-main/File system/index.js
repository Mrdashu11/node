const fs = require('fs')

fs.writeFileSync("hello.txt","introduction to node js")
fs.appendFileSync("hello.txt","  Hello node")

const a = fs.readFileSync("hello.txt")
console.log(a.toString())

fs.renameSync("hello.txt","ayan.txt")

const fs=require("fs");

fs.writeFileSync("Hello.txt","Intro My Self \n");
fs.appendFileSync("Hello.txt" ,"Append File");
const a = fs.readFileSync("Hello.txt");
console.log(a.toString());
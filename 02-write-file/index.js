const path = require("node:path");
const fs = require("fs");

const file = path.join(__dirname, "yourText.txt");

let readableStream = fs.createWriteStream(file, "utf-8");
console.log("Введите ваше сообщение:");

const readline = require("readline");
const { stdin: input, stdout: output } = require("process");
const rl = readline.createInterface({ input, output });

rl.on("SIGINT", () => {
  console.log("До встречи!");
  rl.close();
});

process.stdin.on("data", data => {
  readableStream.write(`${data.toString()}`);

  if (`${data.toString()}`.trim() == "exit") {
    console.log(`До встречи!`);
    process.exit();
  }

});
const path = require("node:path");
const fs = require("fs");

const file = path.join(__dirname, "yourText.txt");

let readableStream = fs.createWriteStream(file, "utf-8");
console.log(`Введите ваше сообщение:`);

process.stdin.on("data", data => {
    readableStream.write(`${data.toString()}`);

    if (`${data.toString()}`.trim() == "exit") {
        console.log(`До встречи!`);
        process.exit();
    }
});
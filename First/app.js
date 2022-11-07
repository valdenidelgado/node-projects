var http = require("http")

http.createServer((req, res) => res.end("Welcome to my jungle!")).listen(8181)
console.log("Server listening on port 8181")
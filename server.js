var express = require('express')
var app = express()
app.use(express.static('.'))

const PORT = 3000;
const HOST = "localhost";

app.listen(PORT, HOST, () => {
    console.log(`Starting Proxy at ${HOST}:${PORT}`);
 });
const express = require('express');
const path = require('path'); 
const os = require('os');
const osUtils = require('os-utils');

const port = 8080;
const app = express();
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({extended: true})

//console.log(usage.user);
//console.log(usage.system);

console.log(os.totalmem());
console.log(os.freemem())

app.use(express.static(path.join(__dirname, '/frontend')));

app.post('/cpu',urlencodedParser, (req, res) => {
    osUtils.cpuUsage((usage) => {
        res.send(JSON.stringify(usage*100));
        res.end();    
    });
});





app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/frontend'));
});

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
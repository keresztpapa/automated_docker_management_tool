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
        res.send(JSON.stringify(usage*1000));
        res.end();    
    });
});

app.post('/get_containers',urlencodedParser, (req, res) => {
    let data_send = JSON.stringify({
        id:"id_string", image:"image_string", 
        command:"command_string", created:"created_string", 
        status:"status_string", ports:"ports_string", names:"names_string"
        });

    console.log(data_send);
    res.send(data_send);
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/frontend'));
});

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
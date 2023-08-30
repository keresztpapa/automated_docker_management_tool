const express = require('express');
const path = require('path'); 
const os = require('os');
const osUtils = require('os-utils');
const { exec } = require("child_process");

const port = 8080;
const app = express();
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({extended: true});

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
    exec('sudo docker ps', (error, stdout, stderr) => {

        if (error) {
            console.error(`Error executing ls command: ${error}`);
            return;
        }

        let data_send = [];

        const lines = stdout.split('\n');

        for (let i = 1; i < lines.length; i++) {
            const columns = lines[i].split(/\s+/); 
            let ports = columns[5];
            if (ports === '') {
                ports = 'No ports';
            }
    
            const containerData = {
                id: columns[0],
                image: columns[1],
                command: columns[2],
                created: columns[3],
                status: columns[4],
                ports: ports,
                names: columns.slice(6).join(' ')
            };
                data_send.push(containerData);
        }
        
        
        console.log(data_send);
        res.send(data_send);

        console.log(`ls command output:\n${stdout}`);
    });
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/frontend'));
});

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
// Importing Modules
const express = require('express');
const cors = require('cors');
const bodyparser = require('body-parser');
const path = require('path');
const fs = require('fs');
const json = require('json');
const route = require('./routes/route')

const default_template = fs.readFileSync('./static/default.html', 'utf8');

// Initialize
var app = express();

const port = 3000;

/* Start Express WebApp */
function startWebApp(){
    app.use('/api', route)

    // Add middleware
    app.use(cors());

    // Body - parser
    app.use(bodyparser.urlencoded());

    // Static Files
    app.use(express.static(path.join(__dirname, '/public')));

    // Test Serv.
    app.get('/', (req, res)=>{
        res.send(default_template.replace('{{ content }}', fs.readFileSync('./static/report.html', 'utf8')));
    });

    app.get('/report', (req, res)=>{
        res.send(default_template.replace('{{ content }}', fs.readFileSync('./static/report.html', 'utf8')).replace('{{ returndata }}',''));
    }).post('/report',(req, res)=>{
        console.log(JSON.stringify(req.body, null, 4))
        res.send(default_template.replace('{{ content }}', fs.readFileSync('./static/report.html', 'utf8')).replace('{{ returndata }}',req.body.url + ' submitted'));
    });

    app.get('/scams', (req, res)=>{
        res.send(default_template.replace('{{ content }}', fs.readFileSync('./static/scams.html', 'utf8')));
    });

    app.get('/queue', (req, res)=>{
        res.send(default_template.replace('{{ content }}', fs.readFileSync('./static/queue.html', 'utf8')));
    });

    app.get('/about', (req, res)=>{
        res.send(default_template.replace('{{ content }}', fs.readFileSync('./static/about.html', 'utf8')));
    });


    app.get('/(/|index.html)?', function(req, res) { // Serve index.html
        res.send(default_template.replace('{{ content }}', fs.readFileSync('./static/index.html', 'utf8')));
    });

    // app.listen(port,()=>{
    //     console.log('Server started on port: ' + port);
    // });

    app.listen(process.env.PORT || 3000)

}

/* Start WebApp */
startWebApp();

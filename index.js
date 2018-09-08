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
    app.use(bodyparser.json());

    // Static Files
    app.use(express.static(path.join(__dirname, '/public')));

    // Test Serv.
    app.get('/', (req, res)=>{
        res.send(default_template.replace('{{ content }}', fs.readFileSync('./static/index.html', 'utf8')));
    });

    app.get('/about', (req, res)=>{
        res.send(default_template.replace('{{ content }}', fs.readFileSync('./static/about.html', 'utf8')));
    });

    app.get('/report', (req, res)=>{
        res.send(default_template.replace('{{ content }}', fs.readFileSync('./static/report.html', 'utf8')));
    });

    app.get('/(/|index.html)?', function(req, res) { // Serve index.html
        res.send(default_template.replace('{{ content }}', fs.readFileSync('./static/index.html', 'utf8')));
    });

    app.listen(port,()=>{
        console.log('Server started on port: ' + port);
    });
}

/* Start WebApp */
startWebApp();

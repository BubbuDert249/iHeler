// src/iheler.js

const http = require('http');
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');
const url = require('url');

const iHeler = {
  // Function to display HTML content in the browser
  displayHTMLContent: function (htmlFilePath, port = 3000) {
    if (fs.existsSync(htmlFilePath)) {
      const server = http.createServer((req, res) => {
        const ext = path.extname(htmlFilePath);
        res.writeHead(200, { 'Content-Type': 'text/html' });
        fs.createReadStream(htmlFilePath).pipe(res);
      });

      server.listen(port, () => {
        console.log(`Server running at http://localhost:${port}/`);
        exec(`start http://localhost:${port}/`); // Auto opens the URL in browser
      });
    } else {
      console.log('HTML file not found.');
    }
  },

  // Function to create a basic Android/iPhone app via server.js
  createApp: function (appName, platform) {
    const appFolder = path.join(__dirname, appName);
    
    if (!fs.existsSync(appFolder)) {
      fs.mkdirSync(appFolder);
      fs.writeFileSync(`${appFolder}/server.js`, `
const http = require('http');
const fs = require('fs');

http.createServer((req, res) => {
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.write('<h1>Welcome to ${appName}!</h1>');
  res.write('<p>This is a basic ${platform} app served via Node.js</p>');
  res.end();
}).listen(3000, () => console.log('${platform} app server is running on http://localhost:3000'));
      `);
      
      console.log(`${platform} app server generated at ${appFolder}/server.js`);
      exec(`cd ${appFolder} && node server.js`);
    } else {
      console.log(`${appName} app folder already exists.`);
    }
  },

  // Function to fetch HTML from a URL and save it locally
  fetchHTML: function (pageUrl, outputFile) {
    http.get(pageUrl, (res) => {
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      res.on('end', () => {
        fs.writeFileSync(outputFile, data);
        console.log(`HTML content saved to ${outputFile}`);
      });
    }).on('error', (err) => {
      console.log('Error fetching page: ', err.message);
    });
  },

  // Function to create a custom URI server
  createCustomURIServer: function (uriConfig, port = 8000) {
    const server = http.createServer((req, res) => {
      const parsedUrl = url.parse(req.url, true);
      const pathname = parsedUrl.pathname;

      if (uriConfig[pathname]) {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write(`<h1>${uriConfig[pathname]}</h1>`);
        res.end();
      } else {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.write('<h1>404 Not Found</h1>');
        res.end();
      }
    });

    server.listen(port, () => {
      console.log(`Custom URI server running at http://localhost:${port}/`);
    });
  }
};

module.exports = iHeler;

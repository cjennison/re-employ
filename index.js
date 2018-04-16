const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 8080
const NODE_ENV = process.env.NODE_ENV || 'development'

console.log(`Starting ${ NODE_ENV } deploy. Connecting to /dist folder...`);

express()
  .use(express.static(path.join(__dirname, 'dist')))
  .get('*', (req, res) => res.sendFile(__dirname + '/dist/index.html'))
  .listen(PORT, () => console.log(`${ NODE_ENV } Deploy: Listening on ${ PORT }`));

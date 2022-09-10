
const operaciones = require('./operaciones.js');
const os = require('os');
const fs = require('fs')
const http = require('http')
const colors = require('colors')
const express = require('express')

/*
console.log(operaciones); 
console.log(operaciones.add(1, 2))
console.log(operaciones.restract(1, 2))
console.log(operaciones.multiply(1, 2))
console.log(operaciones.divide(1, 0))
console.log(operaciones.divide(2, 2))


const handleServer = function (req, res) {
  res.writeHead(200, { 'Content-type': 'text/html' });
  res.write('<h1>Nodejs</h1>')
  res.end()
}

const server = http.createServer(handleServer)

server.listen(3000, function () {
  console.log('Server on port 3000'.green)
})
*/

const server = express();

server.get('/', function (req, res) {
  res.send('<h2>Hola mundo con express</h2>')
})

server.listen(3000, function () {
  console.log('server on port 3000'.red)
})

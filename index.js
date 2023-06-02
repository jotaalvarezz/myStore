const express = require('express');
const app = express()
const port = 5000
const fruits = require('./fruits.json')

app.get('/', (req,res) => {
  res.send('Bienvenido a mi servidor en express');
})

app.get('/nuevaruta', (req, res) => {
  res.send("Nueva ruta")
})

app.get('/fruits', (req, res) => {
  res.json(fruits)
})

app.get('/fruit/:id', (req,res) => {
  const {id} = req.params
  const fruit = fruits.find(
    (d) => d.id == id
  )
  res.json(fruit)
})

app.listen(port, () => {
  console.log('Mi port: ' + port)
})

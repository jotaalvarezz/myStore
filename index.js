const express = require('express');
const routerApi = require('./routes')

const app = express()
const port = 5000

app.use(express.json())

app.get('/', (req,res) => {
  res.send('Bienvenido a mi servidor en express prueba');
})

app.get('/nuevaruta', (req, res) => {
  res.send("Nueva ruta")
})

routerApi(app)

app.listen(port, () => {
  console.log('Mi port: ' + port)
})

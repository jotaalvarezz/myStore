const express = require('express');
const routerApi = require('./routes')
const {logError, handleError, boomHandleError} = require('./middlewares/error.handler.js')

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

app.use(logError)
app.use(boomHandleError)
app.use(handleError)

app.listen(port, () => {
  console.log('Mi port: ' + port)
})

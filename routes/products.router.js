const express = require('express');
const {faker} = require('@faker-js/faker')

const fruits = require('../fruits.json')
const productsServices = require('../services/products.services.js')
const service = new productsServices()
const router = express.Router();

/* router.get('/fruits', (req, res) =>  {
  res.json(fruits)
}) */

router.get('/:id', (req,res) => {
  service.show(req, res)
})

//query params
router.get('/', (req, res) => {
  service.index(res)
})

router.post('/create', (req, res) => {
  service.store(req, res)
})

router.patch('/update/:id', (req, res) => {
  service.update(req, res)
})

router.delete('/delete/:id', (req, res) => {
  service.destroy(req, res)
})

module.exports = router;

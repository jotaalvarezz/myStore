const { faker } = require('@faker-js/faker');
const boom = require('@hapi/boom')

class productsServices {
  constructor() {
    this.products = [];
    this.generate();
  }

  generate() {
    //const { size } = req.query;
    try {
      for (let i = 0; i < 100; i++) {
        this.products.push({
          id: i + 1,
          name: faker.commerce.productName(),
          price: faker.commerce.price(),
          image: faker.image.imageUrl(),
          isBlock: faker.datatype.boolean()
        });
      }
    } catch (error) {
      console.error('hubo prblemas al treaer los datos ', error);
    }
  }

  async index(res) {
    //return this.products;
    res.json(this.products);
  }

  async show(req, res, next) {
    const { id } = req.params;
    const product = this.products.find((d) => d.id == id);
    try {
      if (!product) {
        res.status(404).json({
          message: 'producto invalido!',
        });
      } else if(product.isBlock){
        throw boom.conflict("product not available")
      } else{
        res.status(200).json(product);
      }
    } catch (error) {
      next(error)
      console.error('hubo prblemas al treaer el registro ', error);
    }
  }

  async store(req, res) {
    const request = req.body;
    const size = this.products.length;
    try {
      request.id = size + 1;
      this.products.push(request);
      res.status(201).json({
        message: 'Created',
        data: this.products[size],
      });
    } catch (error) {
      console.error('hubo prblemas al treaer el crear el registro', error);
    }
  }

  async update(req, res, next) {
    try {
      const { id } = req.params;
      const request = req.body
      request.id = parseInt(id);
      let index = this.products.findIndex((d) => d.id == id);
      if(index === -1){
        //throw new error("producto not found")
        throw boom.notFound("producto not found")
      }
      this.products[index] = request;
      res.status(200).json({
        message: 'Updated',
        data: index,
        id,
      });
    } catch (error) {
      next(error)
      /* console.error('hubo prblemas al treaer el actualizar el registro', error);
      res.status(404).json({
        message: 'error',
        data: error.message,
      }); */
    }
  }

  async destroy(req, res, next) {
    const { id } = req.params;
    try {
      let index = this.products.findIndex((d) => d.id == id);
      if(parseInt(index) === -1){
        throw boom.unauthorized("not autorized")
      }
      this.products.splice(index, 1);
      res.status(200).json({
        message: 'Deleted',
        id,
      });
    } catch (error) {
      console.error('hubo prblemas al eliminar el registro', error);
      next(error)
    }
  }
}

module.exports = productsServices;

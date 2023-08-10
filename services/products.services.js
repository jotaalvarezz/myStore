const { faker } = require('@faker-js/faker');

class productsServices {
  constructor() {
    this.products = [];
    this.generate();
  }

  generate() {
    //const { size } = req.query;
    for (let i = 0; i < 100; i++) {
      this.products.push({
        id: i + 1,
        name: faker.commerce.productName(),
        price: faker.commerce.price(),
        image: faker.image.imageUrl(),
      });
    }
  }

  index(res) {
    //return this.products;
    res.json(this.products);
  }

  show(req, res) {
    const { id } = req.params;
    const product = this.products.find((d) => d.id == id);
    if (!product) {
      res.status(404).json({
        message: 'producto invalido!',
      });
    } else {
      res.status(200).json(product);
    }
  }

  store(req, res) {
    const request = req.body;
    const size = this.products.length
    request.id = (size+1)
    this.products.push(request)
    res.status(201).json({
      message: 'Created',
      data: this.products[size],
    });
  }

  update(req, res) {
    const { id } = req.params;
    const request = req.body;
    request.id = id;
    let index = this.products.findIndex((d) => d.id == id);
    this.products[index] = request
    res.status(200).json({
      message: 'Updated',
      data: this.products[index],
      id,
    });
  }

  destroy(req, res) {
    const { id } = req.params;
    let index = this.products.findIndex((d) => d.id == id);
    this.products.splice(index,1)
    res.status(200).json({
      message: 'Deleted',
      id,
    });
  }
}

module.exports = productsServices;

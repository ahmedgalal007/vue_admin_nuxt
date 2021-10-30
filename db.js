module.exports = function () {
  const faker = require('faker')
  const _ = require('lodash')
  return {
    users: _.times(100, function (i) {
      return {
        id: i,
        name: faker.name.findName(),
        email: faker.internet.email(),
        avatar: faker.internet.avatar(),
      }
    }),
    products: _.times(100, function (i) {
      return {
        id: i,
        name: faker.commerce.productName(),
        image: faker.image.technics(460, 300),
        price: faker.commerce.price(),
        stock: faker.random * 100,
      }
    }),
  }
}

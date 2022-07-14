const express = require('express');
const { Router } = express;

const router = Router();

const products = [
  { title: 'Prpduct', price: '800', thumbnail: 'https://ibb.co/GW3zsy4', id: 1 },
];


class Products {
    constructor(products) {
      this.newId = products.length;
      this.products = products;
  
      router.get('/', this.getAllProducts);
      router.get('/:id', this.getProduct);
      router.post('/', this.setProduct);
      router.put('/:id', this.updateProduct);
      router.delete('/:id', this.deleteProduct);
    };
  
    getAllProducts = (req, res) => {
        console.log('Get all products received OK');
        res.status(201).send(this.products);
      };

      getProduct = (req, res) => {
        console.log('Get product by Id received OK');
        const { id } = req.params;
        if (id >= 1 && id <= this.products.length) {
          res.status(201).send(this.products[id - 1]);
        } else {
          res.status(400).send({ error: 'Not found' });
        }
      };
      setProduct = (req, res) => {
        console.log('Post product received OK');
        const received = req.body;
        this.newId++;
    
        const saveProduct = { ...received, id: this.newId };
        this.products.push(saveProduct);
        res.status(201).send(saveProduct);
      };
    
      updateProduct = (req, res) => {
        console.log('Put product received OK');
        const { id } = req.params;
        const received = req.body;
    
        if (id >= 1 && id <= this.products.length) {
          const saveProduct = { ...received, id: parseInt(id) };
          products.splice(id - 1, 1, saveProduct);
          res.status(201).send(saveProduct);
        } else {
          res.status(400).send({ error: 'not found' });
        }
      };
    
      deleteProduct = (req, res) => {
        console.log('Delete product received OK');
        const { id } = req.params;
    
        if (id >= 1 && id <= this.products.length) {
          products.splice(id - 1, 1, { error: 'not available' });
          res.status(201).send({ message: 'Deleted product OK' });
        } else {
          res.status(400).send({ error: 'not found' });
        }
      };
    }
    
    new Products(products);
    
    module.exports = router;
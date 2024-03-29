const express = require('express');
const app = express();
const PORT = 4000
const productRoutes = require('./routes');
const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://semi:0000@express-cluster.fdwrb4c.mongodb.net/?retryWrites=true&w=majority&appName=express-cluster')
  .then(() => console.log('MongoDB Connected'))
  .catch((error) => console.error(error));

app.use(express.json());

app.get('/', (req, res) => {
  res.send("Hello world");
})

app.use('/api/products', productRoutes);

app.listen(PORT, () => {
  console.log('listen on port '+ PORT);
})
 
const express = require('express')
const cors = require('cors')
const app = express()
app.use(cors())
const PORT = 4000
// const PORT = process.env.REACT_APP_PORT
const mongoDBClient = require('./mongoClient')

const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema/index')


app.get('/', (req, res) => {
  res.send('Hello World!')
})

// PAI REST
const Product = require('./models/product');

app.get('/products', async (req, res) => {
  const products = await Product.find({})
  try {
    res.send(products);
  } catch (e) {
    res.status(500).send(e.message);
  }
})

app.get('/products/:category', async (req, res) => {
  const category = req.params.category

  const products = await Product.find({ category: category })
  try {
    res.send(products);
  } catch (e) {
    res.status(500).send(e.message);
  }
})

// Graphql UI
app.use(
  '/graphql',
  graphqlHTTP({
    schema: schema,
    graphiql: true,
  }),
);

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`)
  mongoDBClient.initialize()
})
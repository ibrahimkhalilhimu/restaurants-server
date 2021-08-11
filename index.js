const express = require('express')
const { MongoClient } = require('mongodb');
const bodyParser = require('body-parser');
const cors = require('cors')
require('dotenv').config()





const app = express()
app.use(cors())
app.use(bodyParser.json());

const port = 5000

app.get('/', (req, res) => {
  res.send('Hello World')
})

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.huwqv.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;


const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

client.connect(err => {
  const ProductsCollection = client.db("restaurant").collection("products");

  app.post('/addProducts',(req,res)=>{
    const newProduct = req.body
    ProductsCollection.insertOne(newProduct)
    .then(result=>{
      res.send(result)
      
    })
  })


  app.get('/product',(req, res)=>{
    ProductsCollection.find({})
    .toArray((err,documents)=>{
      res.send(documents)
    })
  })

  
});




app.listen(port)


// ai project a amr ekta error ascilo solve korta partacilam na oita holo monogodb ar error 
// ar error ta holo [MongoDriverError: Topology is closed, please connect] aita
// than ami addProduct a sudu result dici tokhn solve hoica tar aga cilo result ar satha cilo [res.send(result.insertedCount>0)]



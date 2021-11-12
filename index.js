const express = require('express');
const app = express();
const cors = require('cors');
const { MongoClient } = require('mongodb');
// const ObjectId = require('mongodb').ObjectId;
require('dotenv').config();
const port = process.env.PORT || 5000;

//middle ware
app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.dw55m.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run(){
    try{
        await client.connect();
        const database = client.db('ultraLipstickShopDB');
        const reviewsCollection = database.collection('reviews');
        const productsCollection = database.collection('products');

        app.get('/reviews', async(req, res)=>{
            const result = await reviewsCollection.find({}).toArray();
            res.send(result);
        })

        app.get('/products', async(req, res) =>{
            const result = await productsCollection.find({}).toArray();
            res.send(result);
        })
    }
    finally{
        // await client.close();
    }
}

run().catch(console.dir);

app.get('/', (req, res) => {
    res.send("Server is Running...");
})

app.listen(port, () => {
    console.log("Server is running on port: ", port);
})
const express = require('express');
// const {connectToDb, db } = require('./db.js');

const MongoClient = require('mongodb').MongoClient;

const app = express();
app.use(express.json());

app.get('/api/articles/:name', async (req, res)=>{
    const {name} = req.params;
    const client =  new MongoClient('mongodb://127.0.0.1:27017');
    await client.connect();
    db = client.db('react-blog-db');

     const article = await db.collection('articles').findOne({name});

     if(article){
        res.json(article);
     } else{
        res.sendStatus(404);
     }
     
    })

app.put('/api/articles/:name/upvote', async(req, res)=>{
    const {name}= req.params;
    
    const client =  new MongoClient('mongodb://127.0.0.1:27017');
    await client.connect();
    db = client.db('react-blog-db');
    await db.collection('articles').updateOne({name}, {
        $inc:{upvote:1}
    });
    const article = await db.collection('articles').findOne({name})

    
    if(article){
        res.send(article) //i made chages
    }
    else{
        res.send('That article doesn\'t exist');
    }
   

})
 
app.post('/api/articles/:name/comments',async(req, res)=>{
      const {name}= req.params;
      const {postedBy, text}= req.body;
      const client =  new MongoClient('mongodb://127.0.0.1:27017');
       await client.connect();
        db=client.db('react-blog-db');

      await  db.collection('articles').updateOne({name},{
        $push:{ comments: {postedBy, text}}
      });
      const article = await db.collection('articles').findOne({name})
      
      if(article){
        res.json(article);
      }
      else{
        res.send('That article doesn\'t exist');
      }
});


    console.log('Successfully connected to database');
  app.listen(8080, () => {
    console.log('Server listening on port 8080');
  });

  


    


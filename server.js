const express = require('express')
const app = express()
const MongoClient = require('mongodb').MongoClient

app.set('viewengine','ejs')
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

const connectionString = 'mongodb+srv://arvinnemati95:JVaSHDTcTRW0mrX2@cluster0.lhmmd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
MongoClient.connect(connectionString)
.then(client => {
  console.log('Connected to Database')
  const db = client.db('war-game')
  const soldiersCollection = db.collection('soldiers')
  
  app.get('/',(req,res) => {
    soldiersCollection
      .find()
      .toArray()
      .then(results => {
        res.render('index.ejs',{soldiers :results })
      })
      .catch(err => console.log(err))
  })

  app.post('/soldiers',(req,res) => {
    soldiersCollection
      .insertOne(req.body)
      .then(result => {
        console.log(result)
        res.redirect('/')
      })
      .catch(err => console.log(err))
  })

  app.put('/soldiers',(req,res) => {
    soldiersCollection
        .findOneAndUpdate({allegiance : 'Red Army'},
          {
            $set: {
              name: req.body.name,
              rank: req.body.quote,
              allegiance : req.body.allegiance
            },
          },
          {
            upsert: true,
          }
        )
        .then(result => {
          res.json('Success')
        })
  })

  app.delete('/soldiers', (req,res) => {
    soldiersCollection
        .deleteOne({allegiance : req.body.allegiance})
        .then(result => {
          if (result.deletedCount == 0) {
            return res.json('No soldier standing')
          }
          res.json('Soldier KIA')
        })
        .catch(err => console.log(err))
  })

  app.listen('3000',(req,res) => {
    console.log('Listening on port 3000')
  })
})
.catch(error => console.log(error))
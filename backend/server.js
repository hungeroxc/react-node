import express from 'express'
import mongodb from 'mongodb'

const app = express()
const dbUrl = "mongodb://localhost"

mongodb.MongoClient.connect(dbUrl, (err, client) => {
    if (err) throw err

    const db = client.db('express-blog')
    app.get('/api/games', (req, res) => {
        db.collection('articles').find({}).toArray((err, games) => {
            res.json({ games })
        })
    })
    app.listen(5050, () => console.log('Server is running on localhost:5050'))
})

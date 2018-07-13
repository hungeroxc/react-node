import express from 'express'
import mongodb from 'mongodb'

const app = express()
const dbUrl = "mongodb://localhost"
const port = 6060

mongodb.MongoClient.connect(dbUrl, (err, client) => {
    if (err) throw err

    const db = client.db('crud')
    app.get('/api/games', (req, res) => {
        db.collection('games').find({}).toArray((err, games) => {
            res.json({ games })
        })
    })

    app.post('/api/games', (req, res) => {
        console.log(res.body)
    })

    app.listen(port, () => console.log(`Server is running on localhost:${port}`))
})

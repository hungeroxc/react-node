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

    // app.post('/api/games', (req, res) => {
    //     console.log(res.body)
    // })

    // 错误处理
    app.use((req, res) => {
        res.status(404).json({
            errors: {
                global: 'Still working on it. Please try again later than when we implement it'
            }
        })
    })

    app.listen(port, () => console.log(`Server is running on localhost:${port}`))
})

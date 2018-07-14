import express from 'express'
import mongodb from 'mongodb'
import bodyParser from 'body-parser'

const app = express()
const dbUrl = "mongodb://localhost"
const port = 6060
// 获取post请求参数的中间件
app.use(bodyParser.json())

mongodb.MongoClient.connect(dbUrl, (err, client) => {
    if (err) throw err

    const db = client.db('crud')
    app.get('/api/games', (req, res) => {
        db.collection('games').find({}).toArray((err, games) => {
            res.json({ games })
        })
    })

    app.post('/api/games', (req, res) => {
        const {title, cover} = req.body
        db.collection('games').insert({title, cover}, (err, result) => {
            if(err) {
                res.status(500).json({errors: {global: 'Something went wrong'}})
            } else {
                console.log(result.ops)
                res.json({game: result.ops[0]})
            }
        })
    })

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

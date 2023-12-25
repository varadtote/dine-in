const express = require('express')
const app = express()
const PORT = 8080
const cors = require('cors')
const mongoDbConnection = require('./connect')


// middlewares
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }));

// custom middlewares
const authenticateMiddleware = require('./middleware/auth')

// database connection
mongoDbConnection('mongodb://localhost:27017/DineIn')

app.get('/', (req, res) => {
    res.send('route working')
})

// routes
let authRouter = require('./routes/auth')
let restaurantRouter = require('./routes/restaurant')

app.use('/auth', authRouter)
// app.use('/restaurant', authenticateMiddleware, restaurantRouter)
app.use('/restaurant', restaurantRouter)


app.listen(PORT, () => console.log(`http://localhost:${PORT}`))
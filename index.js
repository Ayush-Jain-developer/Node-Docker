const express = require('express')
const mongoose = require('mongoose')
const session = require('express-session')
const redis = require('redis')
const cors =  require('cors')
let RedisStore = require('connect-redis')(session)
const {
  MONGO_USER,
  MONGO_PASSWORD,
  MONGO_IP,
  MONGO_PORT,
  SESSION_SECRET,
  REDIS_URL,
  REDIS_PORT,
} = require('./config/config')


let redisClient = redis.createClient({
  url : `redis://${REDIS_URL}:${REDIS_PORT}`,
  legacyMode: true
});
  
redisClient.connect()

redisClient.on("ready", ()=>{
  console.log("Connected to redis");
})

const app = express()
const postRouter = require('./routes/postRoute')
const userRouter = require('./routes/userRoutes')

const mongoURL = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/`

const connectWithRetry = () => {
  mongoose
    .connect(mongoURL)
    .then(() => {
      console.log('Successfully connected to database.')
    })
    .catch((err) => {
      console.log(err.message)
      setTimeout(connectWithRetry, 5000)
    })
}

connectWithRetry()

mongoose.set('strictQuery', true)

const port = process.env.PORT

app.use(express.json())

app.enable('trust proxy')
app.use(cors())
app.use(
  session({
    secret: SESSION_SECRET,
    store: new RedisStore({client : redisClient}),
    cookie: {
      secure: false,
      resave: false,
      saveUninitialised: false,
      httpOnly: true,
      maxAge: 6000,
    },
  })
)

app.get('/api/home', (req, res) => {
  res.send('Hello There!!')
})

app.use(postRouter)
app.use(userRouter)



app.listen(port, () => {
  console.log('server listening on port ' + port)
})


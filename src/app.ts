import express from 'express'
import config from 'config'
import bodyParser from 'body-parser'
import AuthenticationRouter from './controllers/Authentication.controller'
import connect from './utils/Db'
import authentication from './middlewares/Authentication.middleware'
import WalletRouter from './controllers/Wallet.controller'
import TokenRouter from './controllers/Token.controller'
import RichListRouter from './controllers/RichList.controller'
import cors from 'cors'
import AdminRouter from './controllers/Admin.controller'
import TrendingContractRouter from './controllers/TrendingContract.controller'

const app = express()
const PORT = config.get<number>('PORT')



/* Middlewares */
app.use(cors())
app.use(bodyParser.json())

/* Routers */
app.use('/api/authentication', AuthenticationRouter)
app.use('/api/wallet', WalletRouter)
app.use('/api/token', TokenRouter)
app.use('/api/richlist',RichListRouter)
app.use('/api/admin',AdminRouter)
app.use('/trendingcontracts',TrendingContractRouter)

app.listen(PORT, () => {
    console.log(`Server started successfully at http://localhost:${PORT}`)
    connect()
})
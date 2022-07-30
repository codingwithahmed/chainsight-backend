import {Request, Response, Router} from 'express'
import { tokenToString } from 'typescript'
import authentication from '../middlewares/Authentication.middleware'
import {getTokenData, listTokens} from '../services/Token.service'

const TokenRouter = Router()

TokenRouter.use(authentication)

TokenRouter.get('/list', (req: Request, res: Response) => {
    res.json(listTokens())
})

TokenRouter.get('/analyze', (req: Request, res: Response) => {
    let address = req.query.address

    // @ts-ignore
    res.json(getTokenData(address))

})


export default TokenRouter
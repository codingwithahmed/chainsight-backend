import {Request, Response, Router} from 'express'
import config from 'config'
import authentication from '../middlewares/Authentication.middleware'
import { request } from 'http'
import { getAddressInfo } from '../services/Ethplorer.service'

const WalletRouter = Router()

WalletRouter.use(authentication)
WalletRouter.get('/analyze', async (req: Request, res: Response) => {
    
    //@ts-ignore    
    const User = req.user

   if (req.user) {
        //@ts-ignore
        const AddrressInfo = await getAddressInfo(req.query.address, res)
        res.json(AddrressInfo)
    }


})

export default WalletRouter
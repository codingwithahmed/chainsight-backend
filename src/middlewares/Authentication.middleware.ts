import jwt from 'jsonwebtoken'
import config from 'config'
import {Request, Response, NextFunction} from 'express'
import User from '../models/User.model'

async function authentication(req: Request, res: Response, next: NextFunction) {
    let privateKey = config.get<string>('PRIVATE_KEY')
    const bearerHeader = req.headers.authorization
    console.log(bearerHeader)
    if(typeof bearerHeader != 'undefined') {

        // @ts-ignore
        const bearer = bearerHeader.split(' ')
        const bearerToken = bearer[1]
        
        
    /* Verify token */
    try {
        //@ts-ignore
        let requestData = await jwt.verify(bearerToken, privateKey)

        //@ts-ignore
        if(requestData.type === 'access'){
            
            //@ts-ignore
            let users = await User.find({email: requestData.email})
            
            if(users.length < 1){
            res.sendStatus(400)
            return
              } else {
                
                // @ts-ignore
                req.user = users[0]
                console.log(users.length)
              }
        //@ts-ignore
        req.user = users[0]
        } else {
            res.sendStatus(400)
        }
        
    }  catch(e){
        res.sendStatus(400)
        return
    }
 

    next()
} else {
    res.sendStatus(400)
    return
}
}

export default authentication
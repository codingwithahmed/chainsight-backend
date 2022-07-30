import {Response, Request, Router} from 'express'
import User from '../models/User.model'
import config from 'config'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import RefreshToken from '../models/RefreshToken.model'

const AuthenticationRouter = Router()

AuthenticationRouter.post('/signup', async (req: Request, res: Response) => {
    let email = req.body.email
    let firstName = req.body.first_name
    let lastName = req.body.last_name
    let password = req.body.password

    /* checking for duplicate email */
    let existingUser = await User.find({
        email: email
    })

    if(existingUser.length > 0) {
        res.sendStatus(400)
        return
    }
    
    /* Hashing password */
    let saltRounds:number = config.get<number>('SALT_ROUNDS')
    let hashedPassword = await bcrypt.hash(password, saltRounds)


    const newUser = new User({
        email: email,
        first_name: firstName,
        last_name: lastName,
        password: hashedPassword
    })
    

    try {
        await newUser.save()
        res.status(200).json({
            email: newUser.email,
            first_name: newUser.first_name,
            last_name: newUser.last_name
        })
    } catch (e){
        res.status(400).json({
            error: e
        })
    }
})


AuthenticationRouter.post('/login', async (req: Request, res: Response) => {
    let email = req.body.email
    let password = req.body.password

    let users = await User.find({
        email: email
    })

    if (users.length === 0) {
        res.status(400).json({
            'message': 'No user exists with this email.'
        })

        return
    } 
    
    let hashedPassword = users[0].password

    if (await !bcrypt.compare(password, hashedPassword)) {
        res.sendStatus(400)
        return
    }

    /* generate jwt */
    let privateKey = config.get<string>('PRIVATE_KEY')
    let access_token = await jwt.sign({email: users[0].email, type: 'access'}, privateKey, {expiresIn: 60*15})
    let refresh_token = await jwt.sign({email: users[0].email, type: 'refresh'}, privateKey, {expiresIn: 60*30})
    
    res.status(200).json({
        'access_token': access_token,
        'refresh_token': refresh_token
    })
    
})

AuthenticationRouter.post('/refresh_token',async (req: Request, res: Response) => {
    let privateKey = config.get<string>('PRIVATE_KEY')
    let oldRefreshToken = req.body.refresh_token
    
    let user = {email:''}

    /* Verify token */
    try {
        //@ts-ignore
        user = await jwt.verify(oldRefreshToken, privateKey)
    } catch(e){
        res.sendStatus(400)
        return
    }

    /* generate jwt */
    let access_token = await jwt.sign({email: user.email}, privateKey, {expiresIn: 60*15})
    let refresh_token = await jwt.sign({email: user.email}, privateKey, {expiresIn: 60*30})

    let newRefreshToken = new RefreshToken({
        token: refresh_token
    })

    try {
        await newRefreshToken.save()
        res.status(200).json({
            'access_token': access_token,
            'refresh_token': refresh_token
        })

    } catch(e){
        res.sendStatus(400)
    }


})

export default AuthenticationRouter
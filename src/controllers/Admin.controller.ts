import {Response,Request,Router} from 'express'
import User from '../models/User.model'
import axios from 'axios'

const AdminRouter = Router()

AdminRouter.get('/',async (req:Request,res:Response) => {
    
    try {
        let data = await User.find()
    // console.log(data)
        res.status(201).json(data)
        
    } catch (error) {
        console.log(error)
        res.status(404).json(error)
    }
    
})


AdminRouter.post('/create',async (req:Request,res:Response) => {

    let {email,first_name,last_name,password} = req.body;

    try{
        User.create({
            email,first_name,last_name,password
        })

        try {
            res.json(
                {
                    "Success" : true,
                }
            ).status(201)
        } catch (err) {
            res.json(
                {
                    "Success" : false,
                }
            ).status(401)
        }
    }

    catch (error) {
            console.log(error)

            res.json(error).status(404)
    }

})

export default AdminRouter
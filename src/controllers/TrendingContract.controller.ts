import {Response,Request,Router} from 'express'
import axios from 'axios'

const TrendingContractRouter = Router()

TrendingContractRouter.get('/',async (req:Request,res:Response) => {
    
    try {
     
     let data = await axios.get('https://api.ethplorer.io/getTopTokens?apiKey=freekey')

     console.log("Data : Retrived")
    
        res.status(200).json(JSON.stringify(data.data))
    } catch (e) {
        console.log("Error")
        res.status(404).json({
            "SUCCES" : "FALSE"
        })
    }
    
})

export default TrendingContractRouter
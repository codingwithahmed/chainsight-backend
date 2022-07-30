import {Response,Request,Router} from 'express'
import axios from 'axios'

const RichListRouter = Router()

RichListRouter.get('/',async (req:Request,res:Response) => {
    
    try {
     
     let data = await (await axios.get('https://api.ethplorer.io/getTop?apiKey=freekey&criteria=count')).data
     // let trendingContract = 'https://services.tokenview.com/vipapi/address/richrange/eth_0xe36df5bb57e80629cfc28a31e5f794071c085eca/1/200?apikey=R8UNuoal7yGtw32PlksD'
     //const data = 'sada'   
     console.log("Data : ",data)
    
        res.status(200).json(data)
    } catch (e) {
        console.log("Error")
        res.status(404).json({
            "SUCCES" : "FALSE"
        })
    }
    
});



export default RichListRouter
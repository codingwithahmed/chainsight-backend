import axios from 'axios'
import config from 'config'
import {response, Response} from 'express'

const EthplorerApiKey = config.get<string>('ETHPLORER_API_KEY')
const EthplorerBaseUrl = config.get<string>('ETHPLORER_BASE_URL')

export async function  getAddressInfo(address: string, res: Response){

    let req_url =  `${EthplorerBaseUrl}/getAddressInfo/${address}`
    try {
        const response = await axios({
            method: 'post',
            url: req_url,
            params: {
                apiKey: EthplorerApiKey
            }
        })      
        console.log(response.data)
        return response.data
    } catch(e){
        console.log(e)
        res.sendStatus(400)
    }

}
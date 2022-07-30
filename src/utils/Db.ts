import mongoose from 'mongoose'
import config from 'config'

const DB_ADDRESS = config.get<string>('DB_ADDRESS')

async function connect(){

    try {
        await mongoose.connect(DB_ADDRESS)
        console.log('Datebase connected!')
        return true
    } catch(e){
        console.log(e)
        return false
    }
}   

export default connect
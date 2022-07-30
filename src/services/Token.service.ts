import tokens from '../utils/tokens-eth.js'

export function listTokens(){

    let loadedTokens = tokens()
    return loadedTokens
}

export function getTokenData(address: string) {
    let tokenList = listTokens()
    
    let reqToken = tokenList.find(token => token.address === address)

    return reqToken

}
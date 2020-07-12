
'use strict';

const data = require('./controllers/data')
const constantes = require('./resources/constantes')

/**
 * Headers to send back to client
 */
const headers = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE, HEAD, OPTIONS'
}

/**
 * Function to send response to client
 * @param statusCode {number}
 * @param body {*}
 * @returns {{statusCode: *, headers: string, body: *}}
 */
const sendResponse = (statusCode, body) => {
  const response = {
    statusCode: statusCode,
    headers: headers,
    body: body
  }
return response
}



module.exports.create = async (event, context, callback) => {
  try {
    console.log(`init create productos ${JSON.stringify(event)}`)
    await data.insertProduct(JSON.parse(event.body))
    return callback(null, sendResponse(constantes.SUCESSFULL_EXECUTION, JSON.stringify({
      message: 'Se creo con exito!'
    })))
  } catch (error) {
    console.error(error)
    if (error instanceof TypeError){
      return callback(null, sendResponse(constantes.SERVER_ERROR, JSON.stringify({
        message: error.message
      })))
    } else {
      return callback(null, sendResponse(constantes.SERVER_ERROR, JSON.stringify({
        message: error
      })))
    }
  }
}

module.exports.getAll = async (event, context) => {
  try{
    console.log(`init getAll productos ${JSON.stringify(event)}`)
    const datos = await data.getAllProducts()
    return sendResponse(constantes.SUCESSFULL_EXECUTION, JSON.stringify(datos))
  } catch (error){
    console.error(error)
    return sendResponse(constantes.SERVER_ERROR, JSON.stringify(error))
  }
}


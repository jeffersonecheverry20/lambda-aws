'use strict'

const DynamoHelper = require('../resources/dynamo_helper')
const constantes = require('../resources/constantes')
const dynamo = new DynamoHelper()

async function insertProduct (data) {
  console.log(`${process.env.LOG_ENVIRONMENT} -> start insertProduct... ${JSON.stringify(data)}`)
  if (data.marca && constantes.ALPHANUMERIC_REGEX.test(data.marca) && data.referencia && constantes.ALPHANUMERIC_REGEX.test(data.referencia)){
    const params = {
      TableName: process.env.TABLE_PRODUCTS,
      Item: {
        marca: data.marca,
        referencia: data.referencia,
        fechaCreacion: new Date().toLocaleString('en-US',{ timeZone: 'America/Bogota'}),
        precio: data.precio ? data.precio : 0  
      }  
    }
    await dynamo.saveData(params)
    console.log(`${process.env.LOG_ENVIRONMENT} -> end insertProduct successful`)
  } else {
    console.error(`${process.env.LOG_ENVIRONMENT} -> throws insertProduct... incomplete data`)
    throw new TypeError('Los campos marca y referencia son requeridos') 
  }
}

async function getAllProducts () {
    console.log(`${process.env.LOG_ENVIRONMENT} -> start getAllProducts...`)
    const params = {
      TableName: process.env.TABLE_PRODUCTS  
    } 
    const data = await dynamo.loadData(params)
    console.log(`${process.env.LOG_ENVIRONMENT} -> end getAllProducts successfull with ${JSON.stringify(data)}`)
    return data.Items
}

module.exports = {
   insertProduct, getAllProducts
}
const AWS = require('aws-sdk')
const TABLE = process.env.TABLE
const API_KEY = process.env.API_KEY
const documentClient = new AWS.DynamoDB.DocumentClient()

let body
let statusCode

const handler = async function (spec) {

  
  // get list of species

  try {
    const req = {
      TableName: TABLE,
      KeyConditions: {
        pk: { ComparisonOperator: 'EQ', AttributeValueList: [`species`] }
      }
    }

    const response = await documentClient.query(req).promise()

    console.log("response is ", JSON.stringify(response))

    body = {
      ok: true,
      species: response.Items.map((i) => {
        return i.sk.slice(1) //return only the species name, and without the prefixed # 
      })
    }
    statusCode = 200
  } catch (e) {
    body = { ok: false, message: 'Query Failed' }
    console.log(e)
    statusCode = 500
  }

  // return API response
  return { 
    body: JSON.stringify(body),
    statusCode: statusCode  }

}

module.exports = { handler }

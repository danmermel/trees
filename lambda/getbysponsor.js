const AWS = require('aws-sdk')
const TABLE = process.env.TABLE
const API_KEY = process.env.API_KEY
const documentClient = new AWS.DynamoDB.DocumentClient()

let body
let statusCode

const handler = async function (spec) {
  // first check if the API KEY is correct
  //   if (!spec.queryStringParameters || !spec.queryStringParameters.apikey || spec.queryStringParameters.apikey !== API_KEY) {
  //     return { statusCode: 401, body: '{"ok": false}' }
  //   }

  spec = spec.queryStringParameters
  //console.log('spec is ', spec)

  // check data
  if (!spec.sponsor) {

    return { statusCode: 400, body: `{"ok": false, "message": "Missing sponsor parameter"}` }

  }

  
  // get items by sponsor

  try {
    const req = {
      TableName: TABLE,
      KeyConditions: {
        pk: { ComparisonOperator: 'EQ', AttributeValueList: [`sponsor#${spec.sponsor}`] }
      }
    }

    const response = await documentClient.query(req).promise()

    //console.log("response is ", JSON.stringify(response))

    body = {
      ok: true,
      trees: response.Items.map((i) => {
        return i
      })
    }
    statusCode = 200
  } catch (e) {
    body = { ok: false, message: 'Query Failed' }
    statusCode = 500
  }

  // return API response
  return { 
    body: JSON.stringify(body),
    statusCode: statusCode  }

}

module.exports = { handler }

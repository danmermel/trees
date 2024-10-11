const AWS = require('aws-sdk')
const TABLE = process.env.TABLE
const API_KEY = process.env.API_KEY
const documentClient = new AWS.DynamoDB.DocumentClient()

let body
let statusCode

const handler = async function (spec) {
  // first check if the API KEY is correct
  if (!spec.queryStringParameters || !spec.queryStringParameters.apiKey || spec.queryStringParameters.apiKey !== API_KEY) {
    return { statusCode: 401, body: '{"ok": false}' }
  }

  // get list of sponsors

  try {
    const req = {
      TableName: TABLE,
      KeyConditions: {
        pk: { ComparisonOperator: 'EQ', AttributeValueList: [`sponsors`] }
      }
    }

    const response = await documentClient.query(req).promise()

    console.log("response is ", JSON.stringify(response))

    body = {
      ok: true,
      sponsors: response.Items.map((i) => {
        let obj = {}
        obj.id = i.sk.slice(1) //return only the sponsor's  name, and without the prefixed # 
        obj.sponsorName = i.sponsorName
        obj.sponsorEmail = i.sponsorEmail
        return obj
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

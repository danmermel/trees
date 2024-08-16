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

  spec = spec.queryStringParameters || {}
  //console.log('spec is ', spec)

  // check data
  if (!spec.geohash) {

    return { statusCode: 400, body: `{"ok": false, "message": "Missing geohash parameter"}` }

  }


  // get items by geohash

  try {

    const req = {
      TableName: TABLE,
      IndexName: 'gsi2',
      KeyConditions: {
        GSI2PK: { ComparisonOperator: 'EQ', AttributeValueList: [`geo#${spec.geohash}`] }
      },
      ProjectionExpression: ['locationName', 'locationDescription', 'species', 'treeId', 'latitude', 'longitude', 'datePlanted', 'geohash', 'sponsor']
    }
    const response = await documentClient.query(req).promise()

    console.log("response is ", JSON.stringify(response))

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
    statusCode: statusCode
  }

}

module.exports = { handler }

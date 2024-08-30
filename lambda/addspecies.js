const AWS = require('aws-sdk')
const TABLE = process.env.TABLE
const API_KEY = process.env.API_KEY
const documentClient = new AWS.DynamoDB.DocumentClient()

let params

const handler = async function (spec) {
  // first check if the API KEY is correct
  if (!spec.queryStringParameters || !spec.queryStringParameters.apiKey || spec.queryStringParameters.apiKey !== API_KEY) {
    return { statusCode: 401, body: '{"ok": false}' }
  }
  spec = spec.queryStringParameters || {}
  console.log('spec is ', spec)

  // check data
  if (!spec.speciesDescription || !spec.speciesCareData || !spec.species) {

    return { statusCode: 400, body: `{"ok": false, "message": "Missing Parameters"}` }

  }

  // create dynamodb object

  item = {
    pk: "species",
    sk: `#${spec.species}`,
    type: "species",
    speciesDescription: spec.speciesDescription,
    speciesCareData: spec.speciesCareData
  }


  // add the feed to the database
  params = {
    TableName: TABLE,
    Item: item
  }
  console.log('writing this:', item)
  await documentClient.put(params).promise()
  return { statusCode: 200, body: `{"ok": true}` }
}

module.exports = { handler }

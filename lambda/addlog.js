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
  if (!spec.sponsor || !spec.treeId || !spec.description) {

    return { statusCode: 400, body: `{"ok": false, "message": "Missing Parameters"}` }

  }

  //load the tree to make sure it exists

  const pk = `sponsor#${spec.sponsor}`
  const sk = `#treeId#${spec.treeId}`


  try {

    const req = {
      TableName: TABLE,
      Key: {
        pk,
        sk
      }
    };

    // Fetch the document from DynamoDB
    const response = await documentClient.get(req).promise()
    if (!response.Item) {
      //could not find document so exit
      return { statusCode: 400, body: `{"ok": false, "message":"Could not find tree/sponsor combination"}` }
    }
    //console.log("response is ", JSON.stringify(response))

  } catch (e) {
    return { statusCode: 500, body: `{"ok": false, "message":"Query Failed"}` }
  }

  // if you get here, tree exists!
  // create dynamodb object
  // get date

  const date = new Date().toISOString()

  item = {
    pk: `treeId#${spec.treeId}`,
    sk: `#date#${date}`,
    type: "log",
    treeId: spec.treeId,
    sponsor: spec.sponsor,
    logDate: date,
    logDescription: spec.description,
    GSI1PK: `sponsor#${spec.sponsor}`,
    GSI1SK: `#logDate#${date}`,
    GSI3PK: "type#log",
    GSI3SK: `#logDate#${date}`
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
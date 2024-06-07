const AWS = require('aws-sdk')
const TABLE = process.env.TABLE
const API_KEY = process.env.API_KEY
const documentClient = new AWS.DynamoDB.DocumentClient()

let params


const handler = async function (spec) {
  // first check if the API KEY is correct
  //   if (!spec.queryStringParameters || !spec.queryStringParameters.apikey || spec.queryStringParameters.apikey !== API_KEY) {
  //     return { statusCode: 401, body: '{"ok": false}' }
  //   }
  spec = spec.queryStringParameters || {}
  console.log('spec is ', spec)

  // check data
  if (!spec.sponsor || !spec.treeId) {

    return { statusCode: 400, body: `{"ok": false, "message": "Missing Parameters"}` }

  }

  //load the tree to make sure it exists

  const pk = `sponsor#${spec.sponsor}`
  const sk = `#treeId#${spec.treeId}`
  let response 

  try {

    const req = {
      TableName: TABLE,
      Key: {
        pk,
        sk
      },
        ProjectionExpression:['locationName', 'locationDescription', 'species', 'treeId','latitude', 'longitude','datePlanted', 'geohash']

    };
    
    // Fetch the document from DynamoDB
    response = await documentClient.get(req).promise()
    if (!response.Item) {
      //could not find document so exit
      return { statusCode: 404, body: `{"ok": false, "message":"Could not find tree/sponsor combination"}` }
    }
    //console.log("response is ", JSON.stringify(response))

  } catch (e) {
    console.log(e)
    return { statusCode: 500, body: `{"ok": false, "message":"Query Failed"}` }
  }
  return { statusCode: 200, body: `{"ok": true, "tree":${JSON.stringify(response.Item)}}` }
}

module.exports = { handler }

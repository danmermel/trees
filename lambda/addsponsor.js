const AWS = require('aws-sdk')
const TABLE = process.env.TABLE
const API_KEY = process.env.API_KEY
const documentClient = new AWS.DynamoDB.DocumentClient()

const generateid = function () {
    //this is a simple randomness generator.. assuming that the probability of generatign the same id twice is tiny
    const chars = "ABCDEFGHJKLMNPQRTUVWXYZ2346789";
    let sponsorid = "";
    for (var i = 0; i < 6; i++) {
      let nextchar = Math.floor(Math.random() * chars.length);
      sponsorid = sponsorid + chars[nextchar];
    }
    return sponsorid;
  };

let params

const handler = async function (spec) {
  // first check if the API KEY is correct
  if (!spec.queryStringParameters || !spec.queryStringParameters.apiKey || spec.queryStringParameters.apiKey !== API_KEY) {
    return { statusCode: 401, body: '{"ok": false}' }
  }
  spec = spec.queryStringParameters || {}
  console.log('spec is ', spec)

  // check data
  if ( !spec.sponsorName || !spec.sponsorEmail) {

    return { statusCode: 400, body: `{"ok": false, "message": "Missing Parameters"}` }

  }

  // create dynamodb object
 const sponsorId = generateid()
  item = {
    pk: "sponsors",
    sk: `#${sponsorId}`,
    type: "sponsor",
    sponsorName: spec.sponsorName,
    sponsorEmail: spec.sponsorEmail
  }


  // add the feed to the database
  params = {
    TableName: TABLE,
    Item: item
  }
  console.log('writing this:', item)
  await documentClient.put(params).promise()
  let retval = {
    "ok":true,
    "sponsorId":sponsorId
  }
  return { statusCode: 200, body: JSON.stringify(retval) }
}

module.exports = { handler }

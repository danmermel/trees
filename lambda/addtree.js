const AWS = require('aws-sdk')
const TABLE = process.env.TABLE
const API_KEY = process.env.API_KEY
const documentClient = new AWS.DynamoDB.DocumentClient()
const geohash = require("./geohash.js")

let params


const handler = async function (spec) {
  // first check if the API KEY is correct
  //   if (!spec.queryStringParameters || !spec.queryStringParameters.apikey || spec.queryStringParameters.apikey !== API_KEY) {
  //     return { statusCode: 401, body: '{"ok": false}' }
  //   }
  spec = spec.queryStringParameters
  console.log('spec is ', spec)

  // check data
  if (!spec.sponsor || !spec.treeId || !spec.lat ||
    !spec.long || !spec.species || !spec.locationDescription ||
    !spec.locationName || !spec.datePlanted) {

    return { statusCode: 400, body: `{"ok": false, "message": "Missing Parameters"}` }

  }

  // create dynamodb object
  spec.lat = parseFloat(spec.lat)
  spec.long = parseFloat(spec.long)
  const g = geohash.encode(spec.lat, spec.long, 5)

  item = {
    pk: `sponsor#${spec.sponsor}`,
    sk: `#treeId#${spec.treeId}`,
    type: "tree",
    treeId: spec.treeId,
    species: spec.species,
    locationDescription: spec.locationDescription,
    locationName: spec.locationName,
    dateplanted: spec.datePlanted,
    sponsor: spec.sponsor,
    lat: spec.lat,
    long: spec.long,
    geohash: g,
    GSI1PK: `species#${spec.species}`,
    GSI1SK: `#date#${spec.datePlanted.substr(0, 10)}`,
    GSI2PK: `geo#${g}`,
    GSI3PK: "type#tree",
    GSI3SK: `#date#${spec.datePlanted.substr(0, 10)}`
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
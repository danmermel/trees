const AWS = require('aws-sdk')
const TABLE = process.env.TABLE
const API_KEY = process.env.API_KEY
const documentClient = new AWS.DynamoDB.DocumentClient()

let params

const base32 = '0123456789bcdefghjkmnpqrstuvwxyz'; // (geohash-specific) Base32 map

function encode(lat, lon, precision) {


  if (isNaN(lat) || isNaN(lon) || isNaN(precision)) throw new Error('Invalid geohash');

  let idx = 0; // index into base32 map
  let bit = 0; // each char holds 5 bits
  let evenBit = true;
  let geohash = '';

  let latMin = -90, latMax = 90;
  let lonMin = -180, lonMax = 180;

  while (geohash.length < precision) {
    if (evenBit) {
      // bisect E-W longitude
      const lonMid = (lonMin + lonMax) / 2;
      if (lon >= lonMid) {
        idx = idx * 2 + 1;
        lonMin = lonMid;
      } else {
        idx = idx * 2;
        lonMax = lonMid;
      }
    } else {
      // bisect N-S latitude
      const latMid = (latMin + latMax) / 2;
      if (lat >= latMid) {
        idx = idx * 2 + 1;
        latMin = latMid;
      } else {
        idx = idx * 2;
        latMax = latMid;
      }
    }
    evenBit = !evenBit;

    if (++bit == 5) {
      // 5 bits gives us a character: append it and start over
      geohash += base32.charAt(idx);
      bit = 0;
      idx = 0;
    }
  }

  return geohash;
}

const handler = async function (spec) {
  // first check if the API KEY is correct
  if (!spec.queryStringParameters || !spec.queryStringParameters.apiKey || spec.queryStringParameters.apiKey !== API_KEY) {
    return { statusCode: 401, body: '{"ok": false}' }
  }
  spec = spec.queryStringParameters || {}
  console.log('spec is ', spec)

  // check data
  if (!spec.sponsor || !spec.treeId || !spec.latitude ||
    !spec.longitude || !spec.species || !spec.locationDescription ||
    !spec.locationName || !spec.datePlanted) {

    return { statusCode: 400, body: `{"ok": false, "message": "Missing Parameters"}` }

  }

  // create dynamodb object
  spec.latitude = parseFloat(spec.latitude)
  spec.longitude = parseFloat(spec.longitude)
  const g = encode(spec.latitude, spec.longitude, 5)

  item = {
    pk: `sponsor#${spec.sponsor}`,
    sk: `#treeId#${spec.treeId}`,
    type: "tree",
    treeId: spec.treeId,
    species: spec.species,
    locationDescription: spec.locationDescription,
    locationName: spec.locationName,
    datePlanted: spec.datePlanted,
    sponsor: spec.sponsor,
    latitude: spec.latitude,
    longitude: spec.longitude,
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

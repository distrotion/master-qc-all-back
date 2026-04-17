const { MongoClient } = require('mongodb');

const SERVER_URLS = {
  'BP12-PH':  'mongodb://172.23.10.75:27017',
  'BP12-GAS': 'mongodb://172.23.10.99:27017',
  'GW-GAS':   'mongodb://172.23.10.71:27017',
  'HES-ISN':  'mongodb://172.23.10.70:27017',
  'HES-GAS':  'mongodb://172.23.10.73:27017',
  'HES-PH':   'mongodb://172.23.10.139:12020',
  'HES-PAL':  'mongodb://172.23.10.139:12022',
  'BP12-PAL': 'mongodb://172.23.10.139:12014',
  'BP12-PVD': 'mongodb://172.23.10.139:12016',
  'BP12-KNG': 'mongodb://172.23.10.139:12012',
  'HES-HYD':  'mongodb://172.23.10.80:12012', // PH
  'HES-FP':   'mongodb://172.23.10.80:12010', // GAS
  'HES-ZIF':  'mongodb://172.23.10.80:12014', // PAL
};

// Connection pool: เก็บ client แยกตาม server
const clients = {};

async function getClient(server) {
  const url = SERVER_URLS[server];
  if (!url) throw new Error(`Unknown server: ${server}`);

  if (!clients[server]) {
    const client = new MongoClient(url);
    try {
      await client.connect();
      clients[server] = client;
    } catch (err) {
      await client.close().catch(() => {});
      throw err;
    }
  }
  return clients[server];
}

exports.insertMany = async (server, db_input, collection_input, input) => {
  const client = await getClient(server);
  const collection = client.db(db_input).collection(collection_input);
  return await collection.insertMany(input);
};

exports.find = async (server, db_input, collection_input, input) => {
  const client = await getClient(server);
  const collection = client.db(db_input).collection(collection_input);
  return await collection.find(input).limit(0).sort({ "_id": -1 }).toArray();
};

exports.findsome = async (server, db_input, collection_input, input) => {
  const client = await getClient(server);
  const collection = client.db(db_input).collection(collection_input);
  return await collection.find(input).limit(500).sort({ "_id": -1 }).project({ "PO": 1, "CP": 1, "ALL_DONE": 1 }).toArray();
};

exports.findallC = async (server, db_input) => {
  const client = await getClient(server);
  const db = client.db(db_input);

  const collections = await db.listCollections().toArray();
  let res = {};
  for (const coll of collections) {
    res[coll.name] = await db.collection(coll.name).find({}).toArray();
  }
  return res;
};

exports.update = async (server, db_input, collection_input, input1, input2) => {
  const client = await getClient(server);
  const collection = client.db(db_input).collection(collection_input);
  const res = await collection.updateOne(input1, input2);
  const logCollection = client.db('LOG').collection('UPDATE_LOG');
  await logCollection.insertOne({
    "timestamp": new Date(),
    "server": server,
    "db": db_input,
    "collection": collection_input,
    "filter": input1,
    "update": input2,
    "matchedCount": res.matchedCount,
    "modifiedCount": res.modifiedCount,
  });
  return res;
};

exports.findSAP = async (server, db_input, collection_input, input) => {
  const client = await getClient(server);
  const collection = client.db(db_input).collection(collection_input);
  return await collection.find(input).limit(1000).sort({ "_id": -1 }).toArray();
};
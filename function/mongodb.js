const { MongoClient } = require('mongodb');
// const url = 'mongodb://127.0.0.1:17020';
// const url = 'mongodb://172.23.10.75:27017';

// const client = new MongoClient(url);
// await client.connect();
// //   console.log('Connected successfully to server');

//mongodb://172.23.10.39:12012/

function serverret(server) {
  let output = ''
  if (server === 'BP12-PH') {
    output = 'mongodb://172.23.10.75:27017'
  } else if (server === 'BP12-GAS') {
    // output = 'mongodb://172.23.10.32:27017'
    output = 'mongodb://172.23.10.99:27017'
  } else if (server === 'GW-GAS') {
    output = 'mongodb://172.23.10.71:27017'
  } else if (server === 'HES-ISN') {
    output = 'mongodb://172.23.10.70:27017'
  } else if (server === 'HES-GAS') {
    output = 'mongodb://172.23.10.73:27017'
  } else if (server === 'HES-PH') {
    output = 'mongodb://172.23.10.39:12020'
  } else if (server === 'HES-PAL') {
    output = 'mongodb://172.23.10.39:12022'
  } else if (server === 'BP12-PAL') {
    output = 'mongodb://172.23.10.39:12014'
  } else if (server === 'BP12-PVD') {
    output = 'mongodb://172.23.10.39:12016'
  } else if (server === 'BP12-KNG') {
    output = 'mongodb://172.23.10.39:12012'
  } else if (server === 'HES-HYD') {
    output = 'mongodb://172.23.10.80:12012'
  } else if (server === 'HES-FP') {
    output = 'mongodb://172.23.10.80:12010'
  } else if (server === 'HES-ZFC') {
    output = 'mongodb://172.23.10.80:12014'
  } 

  return output
}

exports.insertMany = async (server, db_input, collection_input, input) => {

  let  url = serverret(server);
  const client = new MongoClient(url);
  await client.connect();
  //   console.log('Connected successfully to server');
  const db = client.db(db_input);
  const collection = db.collection(collection_input);
  let res = await collection.insertMany(input);

  await client.close();

  return res;

};

exports.find = async (server, db_input, collection_input, input) => {

  const  url = serverret(server);
  console.log(url)
  const client = new MongoClient(url);
  await client.connect();

  const db = client.db(db_input);
  const collection = db.collection(collection_input);
  let res = await collection.find(input).limit(0).sort({ "_id": -1 }).toArray();

  await client.close();

  
  // console.log(serverret(server));
  // let res = [];

  return res;
};

exports.findsome = async (server, db_input, collection_input, input) => {

  let  url = serverret(server);
  const client = new MongoClient(url);
  await client.connect();

  const db = client.db(db_input);
  const collection = db.collection(collection_input);
  let res = await collection.find(input).limit(500).sort({ "_id": -1 }).project({ "PO": 1, "CP": 1, "ALL_DONE": 1 }).toArray();

  await client.close();

  return res;
};

exports.findallC = async (server, db_input, collection_input, input) => {

  const  url = serverret(server);
  console.log(url)
  const client = new MongoClient(url);
  await client.connect();

  

  // const db = client.db(db_input);

  // const collection = db.collection(collection_input);
  // // let res = await collection.find(input).limit(0).sort({ "_id": -1 }).toArray();
  // let res = await collection.find({}).toArray();

  let res = {}

  const db = client.db(db_input); // change to your database name

    // 1. Get all collections
    const collections = await db.listCollections().toArray();

    // 2. Loop through collections and get documents
    for (const coll of collections) {
      const collection = db.collection(coll.name);
      const documents = await collection.find({}).toArray(); // fetch all docs

      console.log(`\nCollection: ${coll.name}`);
      console.log(documents);
      res[coll.name] =  documents

       
    }



  await client.close();



  
  // console.log(serverret(server));
  // let res = [];

  return res;
};

exports.update = async (server, db_input, collection_input, input1, input2) => {

  let  url = serverret(server);
  const client = new MongoClient(url);
  await client.connect();

  const db = client.db(db_input);

  const collection = db.collection(collection_input);
  let res = await collection.updateOne(input1, input2);
  //updateOne({ a: 3 }, { $set: { b: 1 } });

  await client.close();

  return res;
};

exports.findSAP = async (server, db_input, collection_input, input) => {

  let  url = serverret(server);
  const client = new MongoClient(url);
  await client.connect();

  const db = client.db(db_input);
  const collection = db.collection(collection_input);
  let res = await collection.find(input).limit(1000).sort({ "_id": -1 }).toArray();

  await client.close();

  return res;
};
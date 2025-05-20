const express = require("express");
const router = express.Router();
var mongodb = require('../../function/mongodb');
var mssql = require('../../function/mssql');
var request = require('request');

let masterDB = "master_FN";
let PATTERN = "PATTERN";
//
let GRAPH_TABLE = "GRAPH_TABLE";
let TYPE = "TYPE";
let UNIT = "UNIT";
let ITEMs = "ITEMs";
let MACHINE = "MACHINE";
let METHOD = "METHOD";
let INSTRUMENTS = "INSTRUMENTS";
let RESULTFORMAT = "RESULTFORMAT";
let SPECIFICATION = "SPECIFICATION";
let TOLERANCE = "TOLERANCE";
let GRAPHTYPE = "GRAPHTYPE";
let CALCULATE = "CALCULATE";
let LOAD = "LOAD";
let CORETYPE = "CORETYPE";
let FREQUENCY = "FREQUENCY";
let PATTERN_01 = "PATTERN_01";



router.get('/FINALMASTER', async (req, res) => {
  return res.json("READY");
});

router.post('/INSPECTION_FINAL_GET_STEP1', async (req, res) => {
  //-------------------------------------
  console.log("--INSPECTION_FINAL_GET_STEP1--");
  let input = req.body;
  let headers = req.headers;
  //-------------------------------------
  output2 = [];
  //-------------------------------------

  let find2 = await mongodb.find(headers['server'], masterDB, ITEMs, { "activeid": "active_id" });
  if (find2.length > 0) {
    for (i = 0; i < find2.length; i++) {
      output2.push({ "ITEMs": find2[i]['ITEMs'], "RESULTFORMAT": find2[i]['RESULTFORMAT'], "TYPE": find2[i]['TYPE'], "GRAPHTYPE": find2[i]['GRAPHTYPE'], "INTERSECTION": find2[i]['INTERSECTION'], "masterID": find2[i]['masterID'] })
    }
  }
  // console.log("------------");
  // console.log(find2);
  // console.log("------------");


  return res.json({ "ITEMs": output2 });
});

router.get('/FINALMASTER', async (req, res) => {
  return res.json("READY");
});


router.post('/GET_MATCPLIST', async (req, res) => {
  //-------------------------------------
  console.log("--GET_MATCPLIST--");
  let input = req.body;
  let headers = req.headers;
  //-------------------------------------
  let output = []
  //-------------------------------------



  let find2 = await mongodb.find(`${headers['server']}`, "ERP_data", "ERP_AUTO", {});
  if (find2.length > 0) {
    output = find2[0][`data`];
  }

  let findP = await mongodb.find(`${headers['server']}`, PATTERN, PATTERN_01, {});

  // console.log(findP)
  // console.log(find2)

  for (let i = 0; i < output.length; i++) {

    for (let j = 0; j < findP.length; j++) {
      if (findP[j]['CP'] === output[i]['CP']) {
        // console.log(output[i]['CP']);
        output[i]['STATUS'] = 'Prepare';
        break;
      } else {

      }

    }


  }


  return res.json(output);
});


router.post('/graph_list', async (req, res) => {
  //-------------------------------------
  console.log("--graph_list--");
  let input = req.body;
  let headers = req.headers;
  //-------------------------------------
  let output = []
  //-------------------------------------
  //${headers['server']}
  let find1 = await mongodb.find(`${headers['server']}`, PATTERN, GRAPH_TABLE, {});

  output = find1;


  // console.log(output);

  return res.json(output);
});

router.post('/NEW_GRAPH', async (req, res) => {
  //-------------------------------------
  console.log("--NEW_GRAPH--");
  let input = req.body;
  let headers = req.headers;
  //-------------------------------------
  let output = "NOK"
  //-------------------------------------

  if (input['NO'] != undefined) {
    //${headers['server']}
    let find1 = await mongodb.find(`${headers['server']}`, PATTERN, GRAPH_TABLE, {"NO":input['NO']});
    if (find1.length > 0) {
      //
      // console.log("---------1");

      let out1 = { "NO": input['NO'] }

      // let out = [out1, { $set: out2 }];

      let updatePATTERN = await mongodb.update(`${headers['server']}`, PATTERN, GRAPH_TABLE, {  "NO": input['NO']}, {
        $set: {
          'GT1': input['GT1'] ?? "",
          'GT2': input['GT2'] ?? "",
          'GT3': input['GT3'] ?? "",
          'GT4': input['GT4'] ?? "",
          'GT5': input['GT5'] ?? "",
          'GT6': input['GT6'] ?? "",
          'GT7': input['GT7'] ?? "",
          'GT8': input['GT8'] ?? "",
          'GT9': input['GT9'] ?? "",
          'GT10': input['GT10'] ?? "",
          'GT11': input['GT11'] ?? "",
          'GT12': input['GT12'] ?? "",
          'GT13': input['GT13'] ?? "",
          'GT14': input['GT14'] ?? "",
          'GT15': input['GT15'] ?? "",
          'GT16': input['GT16'] ?? "",
          'GT17': input['GT17'] ?? "",
          'GT18': input['GT18'] ?? "",
          'GT19': input['GT19'] ?? "",
          'GT20': input['GT20'] ?? "",
        }
      });
    output = "OK"
    } else {
      //
      console.log("---------2");
      let neworder = {
        "NO": input['NO'],
        'GT1': input['GT1'] ?? "",
        'GT2': input['GT2'] ?? "",
        'GT3': input['GT3'] ?? "",
        'GT4': input['GT4'] ?? "",
        'GT5': input['GT5'] ?? "",
        'GT6': input['GT6'] ?? "",
        'GT7': input['GT7'] ?? "",
        'GT8': input['GT8'] ?? "",
        'GT9': input['GT9'] ?? "",
        'GT10': input['GT10'] ?? "",
        'GT11': input['GT11'] ?? "",
        'GT12': input['GT12'] ?? "",
        'GT13': input['GT13'] ?? "",
        'GT14': input['GT14'] ?? "",
        'GT15': input['GT15'] ?? "",
        'GT16': input['GT16'] ?? "",
        'GT17': input['GT17'] ?? "",
        'GT18': input['GT18'] ?? "",
        'GT19': input['GT19'] ?? "",
        'GT20': input['GT20'] ?? "",
      };
      let updatePATTERN = await mongodb.insertMany(`${headers['server']}`, PATTERN, GRAPH_TABLE, [neworder]);
      output = "OK"
    }
  }



  return res.json(output);
});



module.exports = router;

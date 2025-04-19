const express = require("express");
const router = express.Router();
var mongodb = require('../../function/mongodb');
var mssql = require('../../function/mssql');
var request = require('request');

let masterDB = "master_IP";
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
let COMMENT = "COMMENT";
let TOLERANCE = "TOLERANCE";
let GRAPHTYPE = "GRAPHTYPE";
let CALCULATE = "CALCULATE";
let LOAD = "LOAD";
let CORETYPE = "CORETYPE";
let FREQUENCY = "FREQUENCY";
let PATTERN_01 = "PATTERN_01";

//INPROCESS--->INPROCESS
//_IP--->_IP




router.post('/INSPECTION_INPROCESS_GET_STEP1', async (req, res) => {
  //-------------------------------------
  console.log("--INSPECTION_INPROCESS_GET_STEP1--");
  let input = req.body;
  let headers = req.headers;
   //-------------------------------------
  output2 = [];
  //-------------------------------------

  let find2 = await mongodb.find(headers['server'],masterDB, ITEMs, { "activeid": "active_id" });
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

router.get('/INPROCESSMASTER', async (req, res) => {
  return res.json("READY");
});

router.post('/INSPECTION_INPROCESS_GET_STEP2', async (req, res) => {
  //-------------------------------------
  console.log("--INSPECTION_INPROCESS_GET_STEP2--");
  let input = req.body;
  let headers = req.headers;
   //-------------------------------------
  let RESULTFORMATdata = "";
  let TYPEdata = "";
  let output3 = [];
  let output4 = [];
  let output5 = [];
  let output6 = [];
  let output7 = [];
  let output8 = [];
  let output9 = [];
  let output10 = [];
  let output11 = [];
  //-------------------------------------
  if (input[`ITEMs`] != undefined) {

    let ITEMsdata = await mongodb.find(headers['server'],masterDB, ITEMs, { "masterID": input['ITEMs'], "activeid": "active_id" });
    RESULTFORMATdata = ITEMsdata[0][`RESULTFORMAT`];
    TYPEdata = ITEMsdata[0][`TYPE`];


    let MACHINEdata = await mongodb.find(headers['server'],masterDB, MACHINE, { "activeid": "active_id" });
    let find3 = await mongodb.find(headers['server'],masterDB, METHOD, { "ITEMs": input['ITEMs'], "activeid": "active_id" });
    if (find3.length > 0) {
      for (i = 0; i < find3.length; i++) {
        let MC = "";
        for (j = 0; j < MACHINEdata.length; j++) {
          if (MACHINEdata[j][`masterID`] === find3[i][`METHOD`]) {
            MC = MACHINEdata[j][`METHOD`];
            break;
          }
        }
        output3.push({ "METHOD": MC, "masterID": MACHINEdata[j][`masterID`] });
      }
    }

    let find4 = await mongodb.find(headers['server'],masterDB, LOAD, {});
    if (find4.length > 0) {
      for (i = 0; i < find4.length; i++) {
        output4.push({ "LOAD": find4[i]['value'], "masterID": find4[i]['value'] })
      }
    }

    let find5 = await mongodb.find(headers['server'],masterDB, CORETYPE, {});
    if (find5.length > 0) {
      for (i = 0; i < find5.length; i++) {
        output5.push({ "CORETYPE": find5[i]['value'], "masterID": find5[i]['value'] })
      }
    }

    let find6 = await mongodb.find(headers['server'],PATTERN, GRAPH_TABLE, {});
    if (find6.length > 0) {
      for (i = 0; i < find6.length; i++) {
        output6.push({ "GT": find6[i]['NO'], "masterID": find6[i]['NO'] })
      }
    }

    let find7 = await mongodb.find(headers['server'],masterDB, UNIT, { "TYPE": TYPEdata, "activeid": "active_id" });
    if (find7.length > 0) {
      for (i = 0; i < find7.length; i++) {

        output7.push({ "UNIT": find7[i]['UNIT'], "masterID": find7[i]['masterID'] })
      }
    }

    let find8 = await mongodb.find(headers['server'],masterDB, FREQUENCY, {});
    if (find8.length > 0) {
      for (i = 0; i < find8.length; i++) {
        output8.push({ "FREQUENCY": find8[i]['value'], "masterID": find8[i]['value'] })
      }
    }

    let find9 = await mongodb.find(headers['server'],masterDB, CALCULATE, { "activeid": "active_id" });
    if (find9.length > 0) {
      console.log(find9)
      for (i = 0; i < find9.length; i++) {
        output9.push({ "CALCULATE": find9[i]['CALCULATE'], "masterID": find9[i]['masterID'] })
      }
    }

    let find10 = await mongodb.find(headers['server'],masterDB, SPECIFICATION, { "ITEMs": input[`ITEMs`], "activeid": "active_id" });
    if (find10.length > 0) {
      for (i = 0; i < find10.length; i++) {
        output10.push({ "SPECIFICATION": find10[i]['SPECIFICATION'], "masterID": find10[i]['masterID'] })
      }
    }

    let find11 = await mongodb.find(headers['server'],masterDB, COMMENT, { "activeid": "active_id" });
    if (find11.length > 0) {
      for (i = 0; i < find11.length; i++) {
        output11.push({ "COMMENT": find11[i]['COMMENT'], "masterID": find11[i]['masterID'] })
      }
    }



  }

  return res.json({ "RESULTFORMATdata": RESULTFORMATdata, "METHOD": output3, "LOAD": output4, "CORETYPE": output5, "GT": output6, "UNIT": output7, "FREQUENCY": output8, "CALCULATE": output9, "SPECIFICATION": output10, "COMMENT": output11 });

});

router.post('/GET_INPROCESS_DOCUMENT', async (req, res) => {
  //-------------------------------------
  console.log("--GET_INPROCESS_DOCUMENT--");
  let input = req.body;
  let headers = req.headers;
   //-------------------------------------
  output = { "DOCUMENT": "" }
  //-------------------------------------
  console.log(input);

  if (input['METHODid'] != undefined && input['ITEMs'] != undefined) {
    let find2 = await mongodb.find(headers['server'],masterDB, METHOD, { "METHOD": `${input['METHODid']}`, "ITEMs": `${input['ITEMs']}`, "activeid": "active_id" });
    if (find2.length > 0) {
      output[`DOCUMENT`] = find2[0][`DOCUMENTSM`];
    }
  }

  return res.json(output);
});

router.post('/GET_INPROCESS_COMMENT', async (req, res) => {
  //-------------------------------------
  console.log("--GET_INPROCESS_COMMENT--");
  let input = req.body;
  let headers = req.headers;
   //-------------------------------------
  output = { "COMMENT": "" }
  //-------------------------------------
  console.log(input);

  if (input['masterID'] != undefined) {
    let find2 = await mongodb.find(headers['server'],masterDB, COMMENT, { "masterID": `${input['masterID']}`, "activeid": "active_id" });
    if (find2.length > 0) {
      output[`COMMENT`] = find2[0][`COMMENT`];
    }
  }

  return res.json(output);
});

router.post('/GET_INPROCESS_CALCULATE', async (req, res) => {
  //-------------------------------------
  console.log("--GET_INPROCESS_CALCULATE--");
  let input = req.body;
  let headers = req.headers;
   //-------------------------------------
  output = {}
  //-------------------------------------
  console.log(input);

  if (input['CALid'] != undefined) {
    let find2 = await mongodb.find(headers['server'],masterDB, CALCULATE, { "masterID": `${input['CALid']}`, "activeid": "active_id" });
    if (find2.length > 0) {

      output = find2[0];
    }
  }

  return res.json(output);
});

router.post('/GET_INPROCESS_MATCP_DATA', async (req, res) => {
  //-------------------------------------
  console.log("--GET_INPROCESS_MATCP_DATA--");
  let input = req.body;
  let headers = req.headers;
   //-------------------------------------
  output = []
  //-------------------------------------
  console.log(input);

  let findTYPE = await mongodb.find(headers['server'],masterDB, TYPE, {});
  let findITEMs = await mongodb.find(headers['server'],masterDB, ITEMs, {});
  let findCALCULATE = await mongodb.find(headers['server'],masterDB, CALCULATE, {});
  let findMACHINE = await mongodb.find(headers['server'],masterDB, MACHINE, {});
  let findUNIT = await mongodb.find(headers['server'],masterDB, UNIT, {});
  let findSPECIFICATION = await mongodb.find(headers['server'],masterDB, SPECIFICATION, {});


  if (input['MATCP'] != undefined) {
    let find2 = await mongodb.find(headers['server'],PATTERN, PATTERN_01, { "CP": `${input['MATCP']}` });
    // console.log(find2);
    if (find2.length > 0) {
      output = find2;
    } else {
      output = [{
        "CP": input['MATCP'],
      }]
    }

  }
  output[0][`findTYPE`] = findTYPE;
  output[0][`findITEMs`] = findITEMs;
  output[0][`findCALCULATE`] = findCALCULATE;
  output[0][`findMACHINE`] = findMACHINE;
  output[0][`findUNIT`] = findUNIT;
  output[0][`findSPECIFICATION`] = findSPECIFICATION;

  return res.json(output);
});




router.post('/INSPECTION_INPROCESS_GETSPEC', async (req, res) => {
  //-------------------------------------
  console.log("--INSPECTION_INPROCESS_GETSPEC--");
  let input = req.body;
  let headers = req.headers;
   //-------------------------------------
  let output = []
  //-------------------------------------
  console.log(input);
  if (input[`ITEMs`] != undefined) {
    let findSPECIFICATION = await mongodb.find(headers['server'],masterDB, SPECIFICATION, { "ITEMs": input[`ITEMs`] });
    output = findSPECIFICATION;
  }

  return res.json(output);
});

router.post('/INPROCESS_SAVE', async (req, res) => {
  //-------------------------------------
  console.log("--INPROCESS_SAVE--");
  let input = req.body;
  let headers = req.headers;
   //-------------------------------------
  let output = {}
  //-------------------------------------
  console.log(input);
  if (input['CPorder'] != null && input['MASTERdatalist'] != null && input['editedItem_IP'] != null) {
    let findPATTERN = await mongodb.find(headers['server'],PATTERN, PATTERN_01, { "CP": input[`CPorder`]['CP'] });
    if (findPATTERN.length == 0) {
      let out = input['CPorder'];
      let newob = {
        'SEQ': 1,
        'TYPE': input.MASTERdatalist.TYPE,
        'ITEMs': input.editedItem_IP.ITEMs,
        'RESULTFORMAT': input.MASTERdatalist.RESULTFORMAT,
        'GRAPHTYPE': input.MASTERdatalist.GRAPHTYPE,
        'INTERSECTION': input.MASTERdatalist.INTERSECTION,
        'DOCUMENT': input.editedItem_IP.DOCUMENT,
        'SCMARK': input.editedItem_IP.SCMARK,
        'METHOD': input.editedItem_IP.METHOD,
        'INSTRUMENTS': input.editedItem_IP.INSTRUMENTS,
        'SPECIFICATION': input.editedItem_IP.SPECIFICATION,
        'SPECIFICATIONve': input.editedItem_IP.SPECIFICATIONve,
        'UNIT': input.editedItem_IP.UNIT,
        'POINTPCS': input.editedItem_IP.POINTPCS,
        'POINT': input.editedItem_IP.POINT,
        'PCS': input.editedItem_IP.PCS,
        'FREQUENCY': input.editedItem_IP.FREQUENCY,
        'MODE': input.editedItem_IP.MODE,
        'REMARK': input.editedItem_IP.REMARK,
        'LOAD': input.editedItem_IP.LOAD,
        'CONVERSE': input.editedItem_IP.CONVERSE,
        'GRAPH_TABLE_IP': input.editedItem_IP.GRAPH_TABLE_IP,


        "SWreport": input.editedItem_IP.SWreport ?? "",
        "K1b": input.editedItem_IP.K1b ?? "",
        "K1v": input.editedItem_IP.K1v ?? "",
        //--------------
        "AQL": input.editedItem_IP.AQL ?? "",
        "AQLV": input.editedItem_IP.AQLV ?? "",
        "CONVERSEDATA": input.editedItem_IP.CONVERSEDATA ?? "",
        "SUMDATA": input.editedItem_IP.SUMDATA ?? "",
        "SRAWDATA": input.editedItem_IP.SRAWDATA ?? "",
        "SCMARKTYPE": input.editedItem_IP.SCMARKTYPE ?? "",
        "SUMDATATEXT": input.editedItem_IP.SUMDATATEXT ?? "",

        "CONIP": input.editedItem_IP.CONIP ?? "",
        "CONIPITEM": input.editedItem_IP.CONIPITEM ?? "",
        "CONIPITEMVAR": input.editedItem_IP.CONIPITEMVAR ?? "",


      };


      out[`INPROCESS`] = [newob]

      let updatePATTERN = await mongodb.insertMany(headers['server'],PATTERN, PATTERN_01, [out]);
      return res.json("ok");

    } else if ('INPROCESS' in findPATTERN[0]) {


      PATTERN_create_buff = input
      ans = false
      for (i = 0; i < findPATTERN[0].INPROCESS.length; i++) {
        if (PATTERN_create_buff.editedItem_IP.ITEMs === findPATTERN[0].INPROCESS[i].ITEMs) {
          ans = true
          break
        }
      }
      if (ans) {
        let input2 = findPATTERN;
        let out = input['CPorder'];
        let CP = input2[0].CP;
        let INPROCESS = input2[0].INPROCESS;
        let NEXT_I = i + 1
        let n = NEXT_I;
        var newob = {
          'SEQ': NEXT_I,
          'TYPE': input.MASTERdatalist.TYPE,
          'ITEMs': input.editedItem_IP.ITEMs,
          'RESULTFORMAT': input.MASTERdatalist.RESULTFORMAT,
          'GRAPHTYPE': input.MASTERdatalist.GRAPHTYPE,
          'INTERSECTION': input.MASTERdatalist.INTERSECTION,
          'DOCUMENT': input.editedItem_IP.DOCUMENT,
          'SCMARK': input.editedItem_IP.SCMARK,
          'METHOD': input.editedItem_IP.METHOD,
          'INSTRUMENTS': input.editedItem_IP.INSTRUMENTS,
          'SPECIFICATION': input.editedItem_IP.SPECIFICATION,
          'SPECIFICATIONve': input.editedItem_IP.SPECIFICATIONve,
          'UNIT': input.editedItem_IP.UNIT,
          'POINTPCS': input.editedItem_IP.POINTPCS,
          'POINT': input.editedItem_IP.POINT,
          'PCS': input.editedItem_IP.PCS,
          'FREQUENCY': input.editedItem_IP.FREQUENCY,
          'MODE': input.editedItem_IP.MODE,
          'REMARK': input.editedItem_IP.REMARK,
          'LOAD': input.editedItem_IP.LOAD,
          'CONVERSE': input.editedItem_IP.CONVERSE,
          'GRAPH_TABLE_IP': input.editedItem_IP.GRAPH_TABLE_IP,

          "SWreport": input.editedItem_IP.SWreport ?? "",
          "K1b": input.editedItem_IP.K1b ?? "",
          "K1v": input.editedItem_IP.K1v ?? "",
          //--------------
          "AQL": input.editedItem_IP.AQL ?? "",
          "AQLV": input.editedItem_IP.AQLV ?? "",
          "CONVERSEDATA": input.editedItem_IP.CONVERSEDATA ?? "",
          "SUMDATA": input.editedItem_IP.SUMDATA ?? "",
          "SRAWDATA": input.editedItem_IP.SRAWDATA ?? "",
          "SCMARKTYPE": input.editedItem_IP.SCMARKTYPE ?? "",
          "SUMDATATEXT": input.editedItem_IP.SUMDATATEXT ?? "",

          "CONIP": input.editedItem_IP.CONIP ?? "",
          "CONIPITEM": input.editedItem_IP.CONIPITEM ?? "",
          "CONIPITEMVAR": input.editedItem_IP.CONIPITEMVAR ?? "",
        };



        INPROCESS[n - 1] = newob;
        out = [{ 'CP': CP }, { $set: { 'INPROCESS': INPROCESS } }]
        console.log(out);

        let updatePATTERN = await mongodb.update(headers['server'],PATTERN, PATTERN_01, { 'CP': CP }, { $set: { 'INPROCESS': INPROCESS } });
        return res.json("ok");

      } else {
        let input2 = findPATTERN;
        let out = input['CPorder'];
        let CP = input2[0].CP;
        let INPROCESS = input2[0].INPROCESS;
        let n = INPROCESS.length;
        var newob = {
          'SEQ': INPROCESS.length + 1,
          'TYPE': input.MASTERdatalist.TYPE,
          'ITEMs': input.editedItem_IP.ITEMs,
          'RESULTFORMAT': input.MASTERdatalist.RESULTFORMAT,
          'GRAPHTYPE': input.MASTERdatalist.GRAPHTYPE,
          'INTERSECTION': input.MASTERdatalist.INTERSECTION,
          'DOCUMENT': input.editedItem_IP.DOCUMENT,
          'SCMARK': input.editedItem_IP.SCMARK,
          'METHOD': input.editedItem_IP.METHOD,
          'INSTRUMENTS': input.editedItem_IP.INSTRUMENTS,
          'SPECIFICATION': input.editedItem_IP.SPECIFICATION,
          'SPECIFICATIONve': input.editedItem_IP.SPECIFICATIONve,
          'UNIT': input.editedItem_IP.UNIT,
          'POINTPCS': input.editedItem_IP.POINTPCS,
          'POINT': input.editedItem_IP.POINT,
          'PCS': input.editedItem_IP.PCS,
          'FREQUENCY': input.editedItem_IP.FREQUENCY,
          'MODE': input.editedItem_IP.MODE,
          'REMARK': input.editedItem_IP.REMARK,
          'LOAD': input.editedItem_IP.LOAD,
          'CONVERSE': input.editedItem_IP.CONVERSE,
          'GRAPH_TABLE_IP': input.editedItem_IP.GRAPH_TABLE_IP,

          "SWreport": input.editedItem_IP.SWreport ?? "",
          "K1b": input.editedItem_IP.K1b ?? "",
          "K1v": input.editedItem_IP.K1v ?? "",
          //--------------
          "AQL": input.editedItem_IP.AQL ?? "",
          "AQLV": input.editedItem_IP.AQLV ?? "",
          "CONVERSEDATA": input.editedItem_IP.CONVERSEDATA ?? "",
          "SUMDATA": input.editedItem_IP.SUMDATA ?? "",
          "SRAWDATA": input.editedItem_IP.SRAWDATA ?? "",
          "SCMARKTYPE": input.editedItem_IP.SCMARKTYPE ?? "",
          "SUMDATATEXT": input.editedItem_IP.SUMDATATEXT ?? "",

          "CONIP": input.editedItem_IP.CONIP ?? "",
          "CONIPITEM": input.editedItem_IP.CONIPITEM ?? "",
          "CONIPITEMVAR": input.editedItem_IP.CONIPITEMVAR ?? "",
        };
        INPROCESS[n] = newob;
        out = [{ 'CP': CP }, { $set: { 'INPROCESS': INPROCESS } }]
        console.log(out);

        let updatePATTERN = await mongodb.update(headers['server'],PATTERN, PATTERN_01, { 'CP': CP }, { $set: { 'INPROCESS': INPROCESS } });
        return res.json("ok");

      }

      // } else if (('INPROCESS' in findPATTERN[0])) {
    } else {

      let input2 = findPATTERN;
      let out = input['CPorder'];
      let CP = input2[0].CP;
      let INPROCESS = input2[0].INPROCESS;

      INPROCESS = [{
        'SEQ': 1,
        'TYPE': input.MASTERdatalist.TYPE,
        'ITEMs': input.editedItem_IP.ITEMs,
        'RESULTFORMAT': input.MASTERdatalist.RESULTFORMAT,
        'GRAPHTYPE': input.MASTERdatalist.GRAPHTYPE,
        'INTERSECTION': input.MASTERdatalist.INTERSECTION,
        'DOCUMENT': input.editedItem_IP.DOCUMENT,
        'SCMARK': input.editedItem_IP.SCMARK,
        'METHOD': input.editedItem_IP.METHOD,
        'INSTRUMENTS': input.editedItem_IP.INSTRUMENTS,
        'SPECIFICATION': input.editedItem_IP.SPECIFICATION,
        'SPECIFICATIONve': input.editedItem_IP.SPECIFICATIONve,
        'UNIT': input.editedItem_IP.UNIT,
        'POINTPCS': input.editedItem_IP.POINTPCS,
        'POINT': input.editedItem_IP.POINT,
        'PCS': input.editedItem_IP.PCS,
        'FREQUENCY': input.editedItem_IP.FREQUENCY,
        'MODE': input.editedItem_IP.MODE,
        'REMARK': input.editedItem_IP.REMARK,
        'LOAD': input.editedItem_IP.LOAD,
        'CONVERSE': input.editedItem_IP.CONVERSE,
        'GRAPH_TABLE_IP': input.editedItem_IP.GRAPH_TABLE_IP,

        "SWreport": input.editedItem_IP.SWreport ?? "",
        "K1b": input.editedItem_IP.K1b ?? "",
        "K1v": input.editedItem_IP.K1v ?? "",
        //--------------
        "AQL": input.editedItem_IP.AQL ?? "",
        "AQLV": input.editedItem_IP.AQLV ?? "",
        "CONVERSEDATA": input.editedItem_IP.CONVERSEDATA ?? "",
        "SUMDATA": input.editedItem_IP.SUMDATA ?? "",
        "SRAWDATA": input.editedItem_IP.SRAWDATA ?? "",
        "SCMARKTYPE": input.editedItem_IP.SCMARKTYPE ?? "",
        "SUMDATATEXT": input.editedItem_IP.SUMDATATEXT ?? "",

        "CONIP": input.editedItem_IP.CONIP ?? "",
        "CONIPITEM": input.editedItem_IP.CONIPITEM ?? "",
        "CONIPITEMVAR": input.editedItem_IP.CONIPITEMVAR ?? "",
      }];

      let updatePATTERN = await mongodb.update(headers['server'],PATTERN, PATTERN_01, { 'CP': CP }, { $set: { 'INPROCESS': INPROCESS } });
      return res.json("ok");
    }

  }

  return res.json("output");
});


router.post('/INPROCESS_DELETE', async (req, res) => {
  //-------------------------------------
  console.log("--INPROCESS_DELETE--");
  let input = req.body;
  let headers = req.headers;
   //-------------------------------------
  let output = {}
  //-------------------------------------
  // console.log(input);
  if (input['CPorder'] != null && input['MASTERdatalist'] != null && input['editedItem_IP'] != null) {

    let findPATTERN = await mongodb.find(headers['server'],PATTERN, PATTERN_01, { "CP": input[`CPorder`]['CP'] });
    console.log(findPATTERN);
    if (findPATTERN.length == 0) {

      return res.json("nok");

    } else if ('INPROCESS' in findPATTERN[0]) {





      PATTERN_create_buff = input

      for (i = 0; i < findPATTERN[0].INPROCESS.length; i++) {
        console.log(PATTERN_create_buff.editedItem_IP.ITEMs)
        if (PATTERN_create_buff.editedItem_IP.ITEMs === findPATTERN[0].INPROCESS[i].ITEMs) {



          let input2 = findPATTERN;
          let out = input['CPorder'];
          let CP = input2[0].CP;
          let INPROCESS = input2[0].INPROCESS;


          INPROCESS.splice(i, 1);

          for (j = 0; j < INPROCESS.length; j++) {
            INPROCESS[j].SEQ = j + 1;
          }

          out = [{ 'CP': CP }, { $set: { 'INPROCESS': INPROCESS } }]

          let updatePATTERN = await mongodb.update(headers['server'],PATTERN, PATTERN_01, { 'CP': CP }, { $set: { 'INPROCESS': INPROCESS } });
          return res.json("ok");
          break
        }
      }


    } else {


      return res.json("nok");
    }

  }

  return res.json("output");
});








module.exports = router;

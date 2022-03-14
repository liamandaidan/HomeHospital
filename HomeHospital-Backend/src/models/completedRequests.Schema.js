/* 
import mongoose from "mongoose";
import visitRequest from "./visitRequest.Model.js";
import Patient from "./patient.Model.js";
import { request } from "express";
export default mongoose.model("CompletedRequest", completedRequestsSchema);
*/


/* install modules used by 
    npm install moment json2csv
    */
    import express from 'express'
    import fs from 'fs'
    import Request from './visitRequest.Model.js'
    
//writes file in export directory
const fs= require('fs');

//gives the file a unique name
const moment  = require ('moment');

//converts the json to csv
const json2csv = require('json2csv').parse;

//finds exact path of directory
const path = require('path');

//The model we will export
const Request = require('./visitRequest.Model');

//Fields to import
const fields = [];

//THIS WILL SEARCH DB FOR COMPLETED REQUESTS
router.get('/',function(req, res){
  Request.find({completed:true}, function(err, Request){
    if(err){
      return res.status(500).json({err});
    }
    else{
      let csv
      try{
        csv=json2csv(Request,{fields});
      }catch(err){
        return res.status(500).json({err});
      }
      const dateTime=moment().format('YYYYMMDDhhmmss');
      const filePath = path.join(__dirname,"..","public","exports","csv-"+dateTime+".csv")

//THIS WILL WRITE COMPLETED REQUESTS TO CSV
      fs.writeFile(filePath,csv,function(err){
        if(err){
          return res.json(err).status(500);
        }
        else{
          return res.json("/exports/csv-"+dateTime+".csv");

//THIS WILL DELETE THE COMPLETED REQUESTS FROM DB
          Request.deleteMany({completed:true})
        }
      })
    }
  })
})
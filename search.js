const ytsr = require('ytsr');
const express=require('express')
const router=express.Router();

let filter;

const searchVideo=(req, res)=>{
    if(req.query.search){
        ytsr.getFilters(req.query.search, function(err, filters) {
            if(err) throw err;
              filter = filters.get('Type').find(o => o.name === 'Video');
            ytsr.getFilters(filter.ref, function(err, filters) {
              if(err) throw err;
                var options = {
                    limit: 10,
                    nextpageRef: filter.ref,
                }
                ytsr(null, options, function(err, searchResults) {
                    if(err) throw err;
                    return res.send(searchResults);
                });
              });
          });
    }else res.send("search string is required")
    
}

module.exports=searchVideo
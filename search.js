const ytsr = require('ytsr');
const express=require('express')
const router=express.Router();

let filter;

const searchVideo=(req, res)=>{
    if(req.query.query){
        ytsr.getFilters(req.query.query, function(err, filters) {
            if(err) return res.send("search failed", 500);
              filter = filters.get('Type').find(o => o.name === 'Video');
            ytsr.getFilters(filter.ref, function(err, filters) {
              if(err) return res.send("search failed", 500);
                var options = {
                    limit: req.query.amount || 10,
                    nextpageRef: filter.ref,
                }
                ytsr(null, options, function(err, searchResults) {
                    if(err) return res.send("search failed", 500);
                    return res.send("searchResults");
                });
              });
          });
    }else res.send("search string is required", 404)
    
}

module.exports=searchVideo
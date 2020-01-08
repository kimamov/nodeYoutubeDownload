const ytsr = require('ytsr');


const searchVideo=(req, res)=>{
    let filter;
    if(req.query.query){
        ytsr.getFilters(req.query.query, function(err, filters) {
            if(err) return res.send("search failed", 500);
              filter = filters.get('Type').find(o => o.name === 'Video');
            ytsr.getFilters(filter.ref, function(err, filters) {
              if(err) return res.send("search failed", 500);
                const options = {
                    limit: req.query.amount || 10,
                    nextpageRef: filter.ref,
                }
                ytsr(null, options, function(err, searchResults) {
                    if(err) return res.send("search failed", 500);
                    return res.send(searchResults);
                });
              });
          });
    }else res.send("search string is required", 404)
    
}
const simpleVideoList=(videoList)=>{
  const out={};
  out.nextpageRef=videoList.nextpageRef;
  out.currentRef=videoList.currentRef;
  out.query=videoList.query;
  out.items=videoList.items.map(item=>{
    return {title: item.title, link: item.link, thumbnail: item.thumbnail}
  })

  return out;
}

const searchVideoSimple=(req, res)=>{
  let filter;
  if(req.query.query){
      ytsr.getFilters(req.query.query, function(err, filters) {
          if(err) return res.send("search failed", 500);
            filter = filters.get('Type').find(o => o.name === 'Video');
          ytsr.getFilters(filter.ref, function(err, filters) {
            if(err) return res.send("search failed", 500);
              const options = {
                  limit: req.query.amount || 10,
                  nextpageRef: filter.ref,
              }
              ytsr(null, options, function(err, searchResults) {
                  if(err) return res.send("search failed", 500);
                  return res.send(simpleVideoList(searchResults));
              });
            });
        });
  }else res.send("search string is required", 404)
  
}

module.exports={searchVideo, searchVideoSimple}
const searchYt=require("./searchYt")


const searchVideoSimple=(req, res)=>{
  if(req.query.q){
      searchYt(req.query.q, req.query.page).then(data=>{
        return res.status(200).send(data);
      }).catch(e=>{
        console.log(e)
        return res.status(500).send("search failed");
      })
  }else res.status(404).send("search string is required", 404)
  
}

module.exports=searchVideoSimple